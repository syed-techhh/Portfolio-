import { useState, useRef, useEffect } from "react";
import "./Terminal.css";

export default function Terminal({ onClose }) {
  const [lines, setLines] = useState([
    "Portfolio Terminal v1.0.0",
    'Type "help" to see available commands.',
    "",
    "syed@cloud-analyst:~$ "
  ]);

  const [maximized, setMaximized] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const command = inputRef.current.innerText.trim();
      let output = "";

      switch (command) {
        case "help":
          output = "Commands: help, whoami, skills, projects, clear";
          break;
        case "whoami":
          output = "Syed Awaiz – Cloud Computing & Data Analyst";
          break;
        case "skills":
          output =
            "AWS | OCI | Power BI | SQL | Python | Excel | Data Visualization";
          break;
        case "projects":
          output =
            "• Data Analytics Dashboard\n• Task Management System";
          break;
        case "clear":
          setLines(["syed@cloud-analyst:~$ "]);
          inputRef.current.innerText = "";
          return;
        default:
          output = `command not found: ${command}`;
      }

      setLines((prev) => [
        ...prev,
        command,
        output,
        "",
        "syed@cloud-analyst:~$ "
      ]);

      inputRef.current.innerText = "";
    }
  };

  return (
    <div className={`terminal-window ${maximized ? "maximized" : ""}`}>
      {/* HEADER */}
      <div className="terminal-header">
        <span className="terminal-title">Terminal</span>

        <div className="window-controls">
          {/* MINIMIZE */}
          <span
            className="btn yellow"
            title="Minimize"
            onClick={onClose}
          />

          {/* MAXIMIZE */}
          <span
            className="btn green"
            title="Maximize"
            onClick={() => setMaximized((p) => !p)}
          />

          {/* CLOSE */}
          <span
            className="btn red"
            title="Close"
            onClick={onClose}
          />
        </div>
      </div>

      {/* BODY */}
      <div className="terminal-body">
        {lines.map((line, i) => (
          <div key={i} className="terminal-line">
            {line}
          </div>
        ))}

        <div
          ref={inputRef}
          className="terminal-input"
          contentEditable
          onKeyDown={handleKeyDown}
          spellCheck={false}
        />
      </div>
    </div>
  );
}
