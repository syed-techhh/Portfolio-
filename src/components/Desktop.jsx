import { useEffect, useRef, useState } from "react";
import AnimatedBackground from "../background/AnimatedBackground";
import SettingsPanel from "./SettingsPanel";
import PowerPanel from "./PowerPanel";

import Terminal from "./apps/Terminal";
import Browser from "./apps/Browser";
import Files from "./apps/Files";
import Photos from "./apps/Photos";
import Music from "./apps/Music";
import Settings from "./apps/Settings";
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
              minute: "2-digit",
            })}
          </span>

          <span
            className="icon"
            onClick={() => {
              setShowSettingsPanel((p) => !p);
              setShowPower(false);
            }}
          >
            ⚙️
          </span>

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

      {showBrowser && (
        <Browser
          onClose={() => setShowBrowser(false)}
          onMinimize={() => setShowBrowser(false)}
        />
      )}

      {showFiles && <Files onClose={() => setShowFiles(false)} />}

      {showPhotos && <Photos onClose={() => setShowPhotos(false)} />}

      {showMusic && (
        <Music
          onClose={() => setShowMusic(false)}
          onMinimize={() => setShowMusic(false)}
        />
      )}

      {showSettingsApp && (
        <Settings
          brightness={brightness}
          setBrightness={setBrightness}
          volume={volume}
          setVolume={setVolume}
          onClose={() => setShowSettingsApp(false)}
          onMinimize={() => setShowSettingsApp(false)}
        />
      )}

      {showAbout && (
        <AboutMe
          onClose={() => setShowAbout(false)}
          onMinimize={() => setShowAbout(false)}
        />
      )}

      {/* DOCK */}
      <div className="dock">
        <div
          className="dock-item"
          onClick={() => setShowTerminal(true)}
        >
          <span className="dock-tooltip">Terminal</span>
          ⌨
        </div>

        <div
          className="dock-item"
          onClick={() => setShowBrowser(true)}
        >
          <span className="dock-tooltip">Browser</span>
          🌐
        </div>

        <div
          className="dock-item"
          onClick={() => setShowFiles(true)}
        >
          <span className="dock-tooltip">Files</span>
          📁
        </div>

        <div
          className="dock-item"
          onClick={() => setShowPhotos(true)}
        >
          <span className="dock-tooltip">Photos</span>
          🖼️
        </div>

        <div
          className="dock-item"
          onClick={() => setShowMusic(true)}
        >
          <span className="dock-tooltip">Music</span>
          ♫
        </div>

        <div
          className="dock-item"
          onClick={() => setShowAbout(true)}
        >
          <span className="dock-tooltip">About Me</span>
          👤
        </div>

        <div
          className="dock-item"
          onClick={() => setShowSettingsApp(true)}
        >
          <span className="dock-tooltip">Settings</span>
          ⚙
        </div>
      </div>
    </div>
  );
}