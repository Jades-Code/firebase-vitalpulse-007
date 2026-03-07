import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("vitalpulse.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  );

  CREATE TABLE IF NOT EXISTS sensor_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    heart_rate REAL,
    spo2 REAL,
    body_temp REAL,
    ambient_temp REAL,
    motion_status TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

// Auth Middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- API Routes ---

// Register
app.post("/api/auth/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Username and password required" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const stmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    stmt.run(username, hashedPassword);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    if (error.code === 'SQLITE_CONSTRAINT') {
      res.status(400).json({ error: "Username already exists" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  const user: any = db.prepare("SELECT * FROM users WHERE username = ?").get(username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ token, username: user.username });
});

// ESP32 Data Ingestion (No auth for simplicity of ESP32 code, or use a simple API key)
app.post("/api/sensor-data", (req, res) => {
  const { heart_rate, spo2, body_temp, ambient_temp, motion_status } = req.body;
  
  try {
    const stmt = db.prepare(`
      INSERT INTO sensor_data (heart_rate, spo2, body_temp, ambient_temp, motion_status)
      VALUES (?, ?, ?, ?, ?)
    `);
    stmt.run(heart_rate, spo2, body_temp, ambient_temp, motion_status);
    res.status(201).json({ message: "Data received" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save data" });
  }
});

// Get Latest Sensor Data
app.get("/api/sensor-data/latest", authenticateToken, (req, res) => {
  const data = db.prepare("SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT 1").get();
  res.json(data || {
    heart_rate: 0,
    spo2: 0,
    body_temp: 0,
    ambient_temp: 0,
    motion_status: "No Data",
    timestamp: new Date().toISOString()
  });
});

// Get History for Graphs
app.get("/api/sensor-data/history", authenticateToken, (req, res) => {
  const data = db.prepare("SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT 20").all();
  res.json(data.reverse());
});

// --- Vite Middleware ---
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
