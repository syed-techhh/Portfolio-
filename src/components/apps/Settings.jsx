import { useEffect, useState } from "react";
import "./Settings.css";

export default function Settings({
  brightness,
  setBrightness,
  volume,
  setVolume,
  onClose,
  onMinimize
}) {
  const [maximized, setMaximized] = useState(false);

  /* REAL ONLINE STATUS */
  const [online, setOnline] = useState(navigator.onLine);

  /* REAL BLUETOOTH */
  const [btDevice, setBtDevice] = useState(null);
  const [btError, setBtError] = useState("");

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  const connectBluetooth = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true
      });
      setBtDevice(device.name || "Bluetooth Device");
      setBtError("");
    } catch {
      setBtError("Bluetooth permission denied");
    }
  };

  return (
    <div className={`settings-window ${maximized ? "maximized" : ""}`}>
      {/* HEADER */}
      <div className="settings-header">
        <span>Settings</span>

        <div className="window-controls">
          {/* MINIMIZE */}
          <span
            className="btn yellow"
            onClick={onMinimize}
          />

          {/* MAXIMIZE */}
          <span
            className="btn green"
            onClick={() => setMaximized(p => !p)}
          />

          {/* CLOSE */}
          <span
            className="btn red"
            onClick={onClose}
          />
        </div>
      </div>

      {/* BODY */}
      <div className="settings-body">
        <h2 className="settings-title">System Settings</h2>

        {/* DISPLAY */}
        <div className="settings-card">
          <h3>🖥 Display</h3>
          <div className="row">
            <span>Brightness</span>
            <span>{brightness}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(e.target.value)}
            className="glow-slider"
            style={{ "--val": `${brightness}%` }}
          />
        </div>

        {/* NETWORK */}
        <div className="settings-card">
          <h3>📶 Network</h3>
          <p className={online ? "active" : "muted"}>
            {online ? "Connected to Internet" : "Offline"}
          </p>
        </div>

        {/* WIFI */}
        <div className="settings-card">
          <h3>📡 Wi-Fi</h3>
          <p className={online ? "active" : "muted"}>
            {online ? "Wi-Fi Connected" : "Wi-Fi Disconnected"}
          </p>
        </div>

        {/* BLUETOOTH */}
        <div className="settings-card">
          <h3>ᛒ Bluetooth</h3>
          {btDevice ? (
            <p className="active">Connected: {btDevice}</p>
          ) : (
            <>
              <p className="muted">No device connected</p>
              <button className="bt-btn" onClick={connectBluetooth}>
                Connect Device
              </button>
              {btError && <p className="error">{btError}</p>}
            </>
          )}
        </div>

        {/* SOUND */}
        <div className="settings-card">
          <h3>🔊 Sound</h3>
          <div className="row">
            <span>System Volume</span>
            <span>{volume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="glow-slider"
            style={{ "--val": `${volume}%` }}
          />
        </div>

        {/* SYSTEM INFO */}
        <div className="settings-card">
          <h3>💻 System Information</h3>
          <p>OS: Ubuntu 22.04 LTS</p>
          <p>Kernel: 5.15.x</p>
          <p>Memory: 16 GB</p>
          <p>Disk: 500 GB</p>
        </div>
      </div>
    </div>
  );
}
