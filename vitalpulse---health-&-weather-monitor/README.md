 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/vitalpulse---health-&-weather-monitor/README.md b/vitalpulse---health-&-weather-monitor/README.md
index ebdf923b1e4c7d6f83498a10bb1078256dffad21..3fb4233a4d8752a0f5e5355b3d037357fd935d24 100644
--- a/vitalpulse---health-&-weather-monitor/README.md
+++ b/vitalpulse---health-&-weather-monitor/README.md
@@ -1,20 +1,59 @@
 <div align="center">
 <img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
 </div>
 
 # Run and deploy your AI Studio app
 
 This contains everything you need to run your app locally.
 
 View your app in AI Studio: https://ai.studio/apps/53244277-6519-452e-b641-6566f212b2ea
 
 ## Run Locally
 
-**Prerequisites:**  Node.js
-
+**Prerequisites:** Node.js
 
 1. Install dependencies:
    `npm install`
-2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
-3. Run the app:
+2. Run the app:
+   `npm run dev`
+
+## Arduino Serial Integration (your current sketch)
+
+Your sketch currently prints serial lines in this format:
+
+`HR: 78 BPM | IR: 120345 | Accel: 1.02 g | X:0.1 Y:-0.2 Z:9.7 | ⚠️ FALL!`
+
+This project now supports posting that raw line directly to the backend. The server parses it and stores:
+
+- `heart_rate` from `HR`
+- `motion_status` as `Fall Detected` when `FALL!` is present, otherwise `Stable`
+- `spo2`, `body_temp`, `ambient_temp` as `0` for now (until you add those sensors)
+
+### Option A: Use the included serial bridge script
+
+1. Start VitalPulse server:
    `npm run dev`
+2. In a second terminal, run the bridge with your serial device path:
+   `npm run bridge:serial -- /dev/cu.usbserial-0001 115200`
+
+The script now supports both Linux and macOS automatically (`stty -F` on Linux, `stty -f` on macOS).
+
+Find your serial device:
+- macOS: `ls /dev/cu.*`
+- Linux: `ls /dev/ttyUSB* /dev/ttyACM*`
+
+### Option B: Post one test line manually
+
+```bash
+curl -X POST http://localhost:3000/api/sensor-data \
+  -H "Content-Type: application/json" \
+  -d '{"serial_line":"HR: 76 BPM | IR: 113000 | Accel: 1.01 g | X:0.2 Y:0.0 Z:9.8"}'
+```
+
+## Arduino sketch note
+
+In the code you pasted, there is a typo:
+
+- `beatsPerMinume` should be `beatsPerMinute`
+
+If not fixed, BPM averaging will fail to update correctly.
 
EOF
)
