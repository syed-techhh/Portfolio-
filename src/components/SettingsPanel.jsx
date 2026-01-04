import "./SettingsPanel.css";

export default function SettingsPanel({
  brightness,
  setBrightness,
  volume,
  setVolume
}) {
  return (
    <div className="settings-panel">
      <div className="settings-header">Settings</div>

      {/* VOLUME */}
      <div className="settings-item">
        <div className="settings-label">
          🔊 <span>Volume</span>
        </div>

        <div className="settings-slider">
          <span>0%</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />
          <span>{volume}%</span>
        </div>
      </div>

      {/* BRIGHTNESS */}
      <div className="settings-item">
        <div className="settings-label">
          🔅 <span>Brightness</span>
        </div>

        <div className="settings-slider">
          <span>0%</span>
          <input
            type="range"
            min="0"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(e.target.value)}
          />
          <span>{brightness}%</span>
        </div>
      </div>
    </div>
  );
}
