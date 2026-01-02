export default function PowerPanel() {
  return (
    <div className="power-panel">
      <button
        className="power-item"
        onClick={() => window.location.reload()}
      >
        <span className="power-icon">⟳</span>
        <span>Restart</span>
      </button>

      <button
        className="power-item shutdown"
        onClick={() => {
          document.body.innerHTML = "";
          document.body.style.background = "black";
        }}
      >
        <span className="power-icon">⏻</span>
        <span>Shut Down</span>
      </button>
    </div>
  );
}
