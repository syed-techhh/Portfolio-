import { useEffect, useRef, useState } from "react";
import AnimatedBackground from "../background/AnimatedBackground";
import SettingsPanel from "./SettingsPanel"; // 🔹 top-right quick panel
import PowerPanel from "./PowerPanel";

import Terminal from "./apps/Terminal";
import Browser from "./apps/Browser";
import Files from "./apps/Files";
import Photos from "./apps/Photos";
import Music from "./apps/Music";
import Settings from "./apps/Settings";// ✅ FULL SETTINGS APP
import AboutMe from "./apps/AboutMe";


export default function Desktop() {
  const [time, setTime] = useState(new Date());

  /* PANELS */
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  const [showPower, setShowPower] = useState(false);

  /* APPS */
  const [showTerminal, setShowTerminal] = useState(false);
  const [showBrowser, setShowBrowser] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [showSettingsApp, setShowSettingsApp] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  



  /* SYSTEM */
  const [brightness, setBrightness] = useState(80);
  const [volume, setVolume] = useState(80);

  const audioRef = useRef(null);

  /* CLOCK */
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  /* GLOBAL VOLUME */
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  return (
    <div className="desktop">
      {/* BRIGHTNESS OVERLAY */}
      <div
        className="brightness-overlay"
        style={{ opacity: (100 - brightness) / 100 }}
      />

      <AnimatedBackground />
      <audio ref={audioRef} />

      {/* TOP BAR */}
      <div className="top-bar">
        <div className="top-left">
          <span className="brand-title">Syed’s Portfolio</span>
        </div>

        <div className="top-right">
          <span className="datetime">
            {time.toLocaleString("en-GB", {
              weekday: "short",
              day: "numeric",
              month: "short",
              hour: "2-digit",
              minute: "2-digit"
            })}
          </span>

          {/* 🔹 QUICK SETTINGS PANEL */}
          <span
            className="icon"
            onClick={() => {
              setShowSettingsPanel((p) => !p);
              setShowPower(false);
            }}
          >
            ⚙️
          </span>

          {/* POWER */}
          <span
            className="icon power"
            onClick={() => {
              setShowPower((p) => !p);
              setShowSettingsPanel(false);
            }}
          >
            ⏻
          </span>
        </div>
      </div>

      {/* PANELS */}
      {showSettingsPanel && (
        <SettingsPanel
          brightness={brightness}
          setBrightness={setBrightness}
          volume={volume}
          setVolume={setVolume}
        />
      )}

      {showPower && <PowerPanel />}

      {/* APPS */}
      {showTerminal && <Terminal onClose={() => setShowTerminal(false)} />}
      {showBrowser && <Browser onClose={() => setShowBrowser(false)} />}
      {showFiles && <Files onClose={() => setShowFiles(false)} />}
      {showPhotos && <Photos onClose={() => setShowPhotos(false)} />}
      {showMusic && <Music onClose={() => setShowMusic(false)} />}

    {showSettingsApp && (
  <Settings
    brightness={brightness}
    setBrightness={setBrightness}
    volume={volume}
    setVolume={setVolume}
    onClose={() => setShowSettingsApp(false)}
    onMinimize={() => setShowSettingsApp(false)}   // ✅ ADD THIS
  />
)}
{showAbout && (
  <AboutMe
    onClose={() => setShowAbout(false)}
    onMinimize={() => setShowAbout(false)}
  />
)}

{showBrowser && (
  <Browser
    onClose={() => setShowBrowser(false)}
    onMinimize={() => setShowBrowser(false)}
  />
)}

{showMusic && (
  <Music
    onClose={() => setShowMusic(false)}
    onMinimize={() => setShowMusic(false)}
  />
)}

      {/* DOCK */}
      <div className="dock">
        <div className="dock-item" onClick={() => setShowTerminal(true)}>⌨️</div>
        <div className="dock-item" onClick={() => setShowBrowser(true)}>🌐</div>
        <div className="dock-item" onClick={() => setShowFiles(true)}>📁</div>
        <div className="dock-item" onClick={() => setShowPhotos(true)}>🖼️</div>
        <div className="dock-item" onClick={() => setShowMusic(true)}>🎵</div>
        <div className="dock-item" onClick={() => setShowAbout(true)}>👤</div>


        


        {/* ✅ SETTINGS APP ICON */}
        <div className="dock-item" onClick={() => setShowSettingsApp(true)}>
          ⚙️
        </div>

        
      </div>
    </div>
  );
}
