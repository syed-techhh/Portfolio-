import { useState } from "react";
import "./AboutMe.css";
import profile from "../../assets/photos/photo7.jpeg"; // use your image

export default function AboutMe({ onClose, onMinimize }) {
  const [maximized, setMaximized] = useState(false);

  return (
    <div className={`about-window ${maximized ? "maximized" : ""}`}>
      {/* HEADER */}
      <div className="about-header">
        <span className="about-title">About Me</span>

        <div className="window-controls">
          <span className="btn yellow" onClick={onMinimize} />
          <span
            className="btn green"
            onClick={() => setMaximized((p) => !p)}
          />
          <span className="btn red" onClick={onClose} />
        </div>
      </div>

      {/* BODY */}
      <div className="about-body">
        {/* PROFILE */}
        <div className="about-profile">
          <img src={profile} alt="profile" />
          <h1>Syed Awaiz</h1>
          <p className="role">Data Analyst</p>
          <p className="role">Software Engineer</p>
        </div>

        {/* ABOUT */}
        <div className="about-card">
          <h3>📦 About Me</h3>
          <p>
           <p>
  Software Engineer and Data Analyst with a passion for building data-driven applications and extracting actionable insights from complex datasets. Skilled in full-stack development, data analysis, visualization, and business intelligence using technologies such as React, Python, SQL, Power BI, and cloud platforms. I enjoy solving real-world problems through technology, analytics, and innovative solutions.
</p>
          </p>
        </div>

   <div className="about-card resume-card">
  <h3>📄 Resume</h3>

  <a
    href="/resume.pdf"
    download
    className="resume-download"
  >
    ⬇ Download Resume
  </a>
</div>



        {/* SKILLS */}
        <div className="about-card">
          <h3>🛠 Technical Skills</h3>
          <div className="skill-grid">
            {[
              "Python", "JavaScript", "React", "Node.js",
              "MongoDB", "Express", "Git", "GitHub",
              "IoT", "REST API", "Java", "SQL", "Power BI",
                "Data Visualization","Cloud Computing","MS Word","Excel","PostgreSQL","OOPS"

            ].map((s) => (
              <span key={s} className="skill">{s}</span>
            ))}
          </div>
        </div>

     <div className="about-card">
  <h3>🔗 Let’s Connect</h3>

  <div className="connect-grid">
    <div className="connect-item">
      📧 Email:
      <a href="mailto:syedawaiz896@gmail.com">
        syedawaiz896@gmail.com
      </a>
    </div>

    <div className="connect-item">
      📱 Phone:
      <a href="tel:+91 9019669163">
        +91 9019669163
      </a>
    </div>

    <div className="connect-item">
      🐙 GitHub:
      <a
        href="https://github.com/syed-techhh"
        target="_blank"
        rel="noopener noreferrer"
      >
        github.com/syed-techhh
      </a>
    </div>

    <div className="connect-item">
      💼 LinkedIn:
      <a
        href="https://www.linkedin.com/in/awaiz12/"
        target="_blank"
        rel="noopener noreferrer"
      >
        linkedin.com/in/syed-awaiz
      </a>
    </div>
  </div>
</div>


     <div className="about-terminal">
  <div className="terminal-line">$ cat /proc/sysinfo</div>
  <div className="terminal-line">System: SyedOS Portfolio v1.0</div>
  <div className="terminal-line">Status: Online</div>
  <div className="terminal-line">Uptime: Always Available</div>
  <div className="terminal-line">Role: Data Analyst  Software Engineer</div>
</div>


      </div>
    </div>
  );
}
