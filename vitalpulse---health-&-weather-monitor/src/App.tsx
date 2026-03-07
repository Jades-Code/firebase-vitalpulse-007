import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, 
  Activity, 
  Thermometer, 
  Wind, 
  AlertCircle, 
  User, 
  LogOut, 
  RefreshCw, 
  ChevronRight,
  Shield,
  Zap,
  Bell,
  Smartphone,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

// --- Types ---
interface SensorData {
  id: number;
  heart_rate: number;
  spo2: number;
  body_temp: number;
  ambient_temp: number;
  motion_status: string;
  timestamp: string;
}

// --- Components ---

const LoadingScreen = ({ onComplete }: { onComplete: () => void, key?: string }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-black"
    >
      <div className="relative">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-32 h-32 border-2 border-brand-red rounded-full flex items-center justify-center"
        >
          <Heart className="w-12 h-12 text-brand-red fill-brand-red/20" />
        </motion.div>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="absolute -bottom-8 left-0 h-0.5 bg-gradient-to-r from-brand-red via-brand-orange to-brand-yellow"
        />
      </div>
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-sm font-display tracking-[0.3em] uppercase text-brand-red"
      >
        Initializing VitalPulse
      </motion.p>
    </motion.div>
  );
};

const LandingPage = ({ onAuthClick }: { onAuthClick: () => void, key?: string }) => {
  return (
    <div className="min-h-screen bg-brand-black overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex justify-between items-center glass">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-display font-bold tracking-tighter">VitalPulse</span>
        </div>
        <button 
          onClick={onAuthClick}
          className="px-6 py-2 bg-brand-red hover:bg-brand-red/80 rounded-full text-sm font-medium transition-all flex items-center gap-2"
        >
          <User className="w-4 h-4" />
          Login / Register
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,26,26,0.15),transparent_70%)]" />
        <div className="relative z-10 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-9xl font-display font-black tracking-tighter leading-none mb-6"
          >
            VITAL <span className="text-brand-red">PULSE</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-white/60 font-light max-w-2xl mx-auto mb-12"
          >
            Advanced health and environmental monitoring system. Real-time insights, 
            instant alerts, and seamless integration for your well-being.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button 
              onClick={onAuthClick}
              className="px-12 py-4 bg-white text-brand-black hover:bg-brand-red hover:text-white rounded-full text-lg font-bold transition-all flex items-center gap-3 mx-auto group"
            >
              Get Started
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Floating Numbers / Decorative elements inspired by Pinterest image 2 */}
        <div className="absolute top-1/4 left-10 text-[10vw] font-display font-black text-white/5 select-none">1915</div>
        <div className="absolute bottom-1/4 right-10 text-[10vw] font-display font-black text-brand-red/5 select-none">2026</div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-5xl font-display font-bold mb-12 leading-tight">
              Comprehensive <br />
              <span className="text-brand-red">Monitoring</span>
            </h2>
            <div className="space-y-8">
              {[
                { icon: Heart, title: "Heart Rate & SpO2", desc: "Precision tracking with MAX30102 sensor integration." },
                { icon: Thermometer, title: "Body Temperature", desc: "Accurate DS18B20 sensor for real-time health metrics." },
                { icon: AlertCircle, title: "Fall Detection", desc: "MPU6050 motion tracking for instant emergency alerts." },
                { icon: Wind, title: "Weather Insights", desc: "Ambient temperature and environmental status monitoring." }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-red/10 flex items-center justify-center shrink-0">
                    <feature.icon className="w-6 h-6 text-brand-red" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-white/50">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden glass p-8 flex items-center justify-center">
              <div className="w-full h-full border-2 border-brand-red/20 rounded-2xl border-dashed flex items-center justify-center relative">
                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-8xl font-display font-black text-brand-red/20"
                >
                  LIVE
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Activity className="w-32 h-32 text-brand-red animate-pulse" />
                </div>
              </div>
            </div>
            {/* Decorative dots */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-red/20 blur-3xl rounded-full" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-brand-orange/20 blur-3xl rounded-full" />
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-32 bg-brand-red/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-display font-bold mb-16">The Ecosystem</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Smartphone, title: "ESP32 Core", desc: "High-performance processing" },
              { icon: Bell, title: "Smart Alerts", desc: "Buzzer & Vibration feedback" },
              { icon: Zap, title: "Cloud Sync", desc: "Real-time Node.js integration" },
              { icon: Shield, title: "Secure Auth", desc: "Protected user data" }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl glass hover:bg-white/10 transition-colors">
                <item.icon className="w-10 h-10 text-brand-red mx-auto mb-6" />
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-white/40 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="py-32 px-6 text-center">
        <h2 className="text-5xl font-display font-bold mb-12">Ready to monitor your <span className="text-brand-red">vitals?</span></h2>
        <button 
          onClick={onAuthClick}
          className="px-12 py-4 bg-brand-red hover:bg-brand-red/80 rounded-full text-lg font-bold transition-all"
        >
          Join VitalPulse Now
        </button>
        <p className="mt-24 text-white/20 text-sm">© 2026 VitalPulse. All rights reserved.</p>
      </footer>
    </div>
  );
};

const AuthPage = ({ onBack, onLoginSuccess }: { onBack: () => void, onLoginSuccess: (token: string, username: string) => void, key?: string }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      if (isLogin) {
        onLoginSuccess(data.token, data.username);
      } else {
        setIsLogin(true);
        setUsername("");
        setPassword("");
        setError("Registration successful! Please login.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen auth-gradient flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background 404-style numbers inspired by Image 4 */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
        <span className="text-[40vw] font-display font-black leading-none">AUTH</span>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass p-10 rounded-[2rem] relative z-10"
      >
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 text-white/40 hover:text-white transition-colors"
        >
          ← Back
        </button>

        <div className="text-center mb-10 mt-4">
          <h2 className="text-3xl font-display font-bold mb-2">{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p className="text-white/50 text-sm">{isLogin ? "Enter your credentials to access dashboard" : "Join the VitalPulse network today"}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Username</label>
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-red transition-colors"
              placeholder="Enter username"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-red transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-2xl flex items-center gap-3 text-sm ${error.includes("successful") ? "bg-emerald-500/10 text-emerald-500" : "bg-brand-red/10 text-brand-red"}`}
            >
              {error.includes("successful") ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
              {error}
            </motion.div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-brand-red hover:bg-brand-red/80 rounded-2xl font-bold transition-all disabled:opacity-50"
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-white/40 hover:text-white transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const Dashboard = ({ token, username, onLogout }: { token: string, username: string, onLogout: () => void, key?: string }) => {

  const [latestData, setLatestData] = useState<SensorData | null>(null);
  const [history, setHistory] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const [latestRes, historyRes] = await Promise.all([
        fetch("/api/sensor-data/latest", { headers: { "Authorization": `Bearer ${token}` } }),
        fetch("/api/sensor-data/history", { headers: { "Authorization": `Bearer ${token}` } })
      ]);

      const latest = await latestRes.json();
      const hist = await historyRes.json();

      setLatestData(latest);
      setHistory(hist);
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // Auto refresh every 10s
    return () => clearInterval(interval);
  }, [token]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <RefreshCw className="w-12 h-12 text-brand-red animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-black p-6 md:p-10">
      {/* Header */}
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-display font-bold">Vital<span className="text-brand-red">Pulse</span> Dashboard</h1>
          <p className="text-white/40">Welcome back, {username}</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={fetchData}
            disabled={refreshing}
            className="p-3 glass rounded-2xl hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`} />
          </button>
          <button 
            onClick={onLogout}
            className="p-3 glass rounded-2xl hover:bg-brand-red/20 text-brand-red transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Top Stats - Weather & Motion */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass p-8 rounded-[2rem] flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 flex items-center justify-center">
            <Thermometer className="w-8 h-8 text-brand-orange" />
          </div>
          <div>
            <p className="text-white/40 text-sm uppercase tracking-widest font-bold">Ambient Temp</p>
            <h3 className="text-4xl font-display font-bold">{latestData?.ambient_temp || 0}°C</h3>
          </div>
        </div>
        <div className="glass p-8 rounded-[2rem] flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-brand-yellow/10 flex items-center justify-center">
            <Wind className="w-8 h-8 text-brand-yellow" />
          </div>
          <div>
            <p className="text-white/40 text-sm uppercase tracking-widest font-bold">Body Temp</p>
            <h3 className="text-4xl font-display font-bold">{latestData?.body_temp || 0}°C</h3>
          </div>
        </div>
        <div className="glass p-8 rounded-[2rem] flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-brand-red/10 flex items-center justify-center">
            <Activity className="w-8 h-8 text-brand-red" />
          </div>
          <div>
            <p className="text-white/40 text-sm uppercase tracking-widest font-bold">Motion Status</p>
            <h3 className={`text-2xl font-display font-bold ${latestData?.motion_status === 'Fall Detected' ? 'text-brand-red animate-pulse' : 'text-emerald-500'}`}>
              {latestData?.motion_status || "Stable"}
            </h3>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Heart Rate Chart */}
        <div className="glass p-8 rounded-[2rem]">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-brand-red" />
              <h3 className="text-xl font-bold">Heart Rate (BPM)</h3>
            </div>
            <span className="text-3xl font-display font-bold text-brand-red">{latestData?.heart_rate || 0}</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history}>
                <defs>
                  <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff1a1a" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ff1a1a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis 
                  dataKey="timestamp" 
                  hide 
                />
                <YAxis stroke="#ffffff40" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#050505', border: '1px solid #ffffff20', borderRadius: '12px' }}
                  itemStyle={{ color: '#ff1a1a' }}
                />
                <Area type="monotone" dataKey="heart_rate" stroke="#ff1a1a" strokeWidth={3} fillOpacity={1} fill="url(#colorHr)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SpO2 Chart */}
        <div className="glass p-8 rounded-[2rem]">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <Wind className="w-6 h-6 text-brand-orange" />
              <h3 className="text-xl font-bold">Oxygen Level (SpO2 %)</h3>
            </div>
            <span className="text-3xl font-display font-bold text-brand-orange">{latestData?.spo2 || 0}%</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history}>
                <defs>
                  <linearGradient id="colorSpo2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff4d00" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ff4d00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis 
                  dataKey="timestamp" 
                  hide 
                />
                <YAxis stroke="#ffffff40" fontSize={12} domain={[80, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#050505', border: '1px solid #ffffff20', borderRadius: '12px' }}
                  itemStyle={{ color: '#ff4d00' }}
                />
                <Area type="monotone" dataKey="spo2" stroke="#ff4d00" strokeWidth={3} fillOpacity={1} fill="url(#colorSpo2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Alerts / History Table */}
      <div className="mt-8 glass p-8 rounded-[2rem]">
        <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-white/40 text-xs uppercase tracking-widest border-b border-white/10">
                <th className="pb-4">Time</th>
                <th className="pb-4">Heart Rate</th>
                <th className="pb-4">SpO2</th>
                <th className="pb-4">Temp</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {history.slice(0, 5).map((row, i) => (
                <tr key={i} className="border-b border-white/5 last:border-0">
                  <td className="py-4 text-white/60">{new Date(row.timestamp).toLocaleTimeString()}</td>
                  <td className="py-4 font-bold">{row.heart_rate} BPM</td>
                  <td className="py-4 font-bold">{row.spo2}%</td>
                  <td className="py-4 font-bold">{row.body_temp}°C</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${row.motion_status === 'Fall Detected' ? 'bg-brand-red/20 text-brand-red' : 'bg-emerald-500/20 text-emerald-500'}`}>
                      {row.motion_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<"loading" | "landing" | "auth" | "dashboard">("loading");
  const [auth, setAuth] = useState<{ token: string, username: string } | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("vp_token");
    const savedUsername = localStorage.getItem("vp_username");
    if (savedToken && savedUsername) {
      setAuth({ token: savedToken, username: savedUsername });
      setView("dashboard");
    }
  }, []);

  const handleLoginSuccess = (token: string, username: string) => {
    localStorage.setItem("vp_token", token);
    localStorage.setItem("vp_username", username);
    setAuth({ token, username });
    setView("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("vp_token");
    localStorage.removeItem("vp_username");
    setAuth(null);
    setView("landing");
  };

  return (
    <div className="min-h-screen bg-brand-black text-white font-sans">
      <AnimatePresence mode="wait">
        {view === "loading" && (
          <LoadingScreen key="loading" onComplete={() => setView(auth ? "dashboard" : "landing")} />
        )}
        {view === "landing" && (
          <LandingPage key="landing" onAuthClick={() => setView("auth")} />
        )}
        {view === "auth" && (
          <AuthPage 
            key="auth" 
            onBack={() => setView("landing")} 
            onLoginSuccess={handleLoginSuccess}
          />
        )}
        {view === "dashboard" && auth && (
          <Dashboard 
            key="dashboard" 
            token={auth.token} 
            username={auth.username} 
            onLogout={handleLogout}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
