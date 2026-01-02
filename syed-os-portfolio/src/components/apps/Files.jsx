import { useState } from "react";
import "./Files.css";

export default function Files({ onClose }) {
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <div className={`files-window ${isMaximized ? "maximized" : ""}`}>
      {/* HEADER */}
      <div className="files-header">
        <span className="files-title">Files</span>

        <div className="window-controls">
          {/* MINIMIZE */}
          <span className="btn yellow" onClick={onClose} />

          {/* MAXIMIZE */}
          <span
            className="btn green"
            onClick={() => setIsMaximized((p) => !p)}
          />

          {/* CLOSE */}
          <span className="btn red" onClick={onClose} />
        </div>
      </div>

      {/* BODY */}
      <div className="files-body">
        <h2 className="folder-title">📁 My Projects</h2>

        {/* PROJECT 1 */}
        <div className="project-card">
          <h3>OD Management System</h3>
          <p>
            A web-based OD Management System that handles student on-duty
            requests, approvals, and tracking in a structured digital format.
          </p>

          <div className="tags">
            <span>Web App</span>
            <span>Management</span>
            <span>College System</span>
          </div>

          <a
            href="https://github.com/syed-techhh/OD-Management.git"
            target="_blank"
            rel="noopener noreferrer"
            className="view-code-btn"
          >
            View Code
          </a>
        </div>

        {/* PROJECT 2 */}
        <div className="project-card">
          <h3>Real-Time Chat Application (MERN)</h3>
          <p>
            A real-time chat application built using the MERN stack with
            Socket.IO for instant messaging and secure authentication.
          </p>

          <div className="tags">
            <span>React</span>
            <span>Node.js</span>
            <span>MongoDB</span>
            <span>Socket.IO</span>
            <span>Express.js</span>
          </div>

          <a
            href="https://github.com/syed-techhh/Real-time-chat-application-/tree/master/chat-app-mern-master"
            target="_blank"
            rel="noopener noreferrer"
            className="view-code-btn"
          >
            View Code
          </a>
        </div>

        {/* PROJECT 3 */}
        <div className="project-card">
          <h3>Task Management System</h3>
          <p>
            A task management web application that allows users to create,
            update, track, and manage daily tasks efficiently.
          </p>

          <div className="tags">
            <span>React</span>
            <span>JavaScript</span>
            <span>Frontend</span>
            <span>Next JS</span>
            <span>Docker</span>
            
          </div>

          <a
            href="https://github.com/syed-techhh/Task-Management.git"
            target="_blank"
            rel="noopener noreferrer"
            className="view-code-btn"
          >
            View Code
          </a>
        </div>

        {/* PROJECT 4 – ACADEMIC */}
        <div className="project-card">
          <h3>IoT – U-Turn Accident Prevention System</h3>
          <p>
            An IoT-based accident prevention system designed to reduce
            collisions at U-turns using sensors and real-time alerts.
            This was developed as an academic project.
          </p>

          <div className="tags">
            <span>IoT</span>
            <span>Sensors</span>
            <span>Embedded</span>
            <span>Safety System</span>
          </div>

          <div className="academic-tag">
            🎓 Academic Project
          </div>
        </div>
      </div>
    </div>
  );
}
