import { useState, useRef } from "react";
import "./Browser.css";

const EXTERNAL_SITES = [
  "youtube.com",
  "google.com",
  "spotify.com",
  "github.com",
  "wikipedia.org",
  "developer.mozilla.org"
];

export default function Browser({ onClose, onMinimize }) {
  const [maximized, setMaximized] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const iframeRef = useRef(null);

  /* CHECK IF URL SHOULD OPEN IN NEW TAB */
  const isExternalBlockedSite = (url) =>
    EXTERNAL_SITES.some(site => url.includes(site));

  const navigate = (url) => {
    if (!url) return;

    // SEARCH TEXT
    if (!url.startsWith("http")) {
      const searchUrl =
        "https://duckduckgo.com/?q=" + encodeURIComponent(url);
      setCurrentUrl(searchUrl);
      return;
    }

    // BLOCKED SITES → OPEN IN NEW TAB
    if (isExternalBlockedSite(url)) {
      window.open(url, "_blank");
      return;
    }

    // SAFE SITE → IFRAME
    setCurrentUrl(url);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(e.target.value.trim());
    }
  };

  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  return (
    <div className={`browser-window ${maximized ? "browser-maximized" : ""}`}>
      {/* HEADER */}
      <div className="browser-header">
        <span className="browser-title">Browser</span>

        <div className="window-controls">
          <span className="btn yellow" onClick={onMinimize} />
          <span
            className="btn green"
            onClick={() => setMaximized(p => !p)}
          />
          <span className="btn red" onClick={onClose} />
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="browser-toolbar">
        <button onClick={() => iframeRef.current?.contentWindow?.history.back()}>
          ⬅
        </button>

        <button onClick={() => iframeRef.current?.contentWindow?.history.forward()}>
          ➡
        </button>

        <button onClick={handleRefresh}>⟳</button>

        <button onClick={() => setCurrentUrl("")}>⌂</button>

        <input
          type="text"
          placeholder="Search or enter URL…"
          onKeyDown={handleSearch}
        />
      </div>

      <div className="browser-content">
  {!currentUrl ? (
    <>

            <div className="browser-hero">
              <div className="browser-icon">🌐</div>
              <h1>Web Browser</h1>
              <p>Search the web or open a website</p>
              <small>Quick links open in new tab</small>
            </div>

            <div className="apps-grid">
              <div
                className="app-tile youtube"
                onClick={() => window.open("https://www.youtube.com", "_blank")}
              >
                ▶ <span>YouTube</span>
              </div>

              <div
                className="app-tile google"
                onClick={() => window.open("https://www.google.com", "_blank")}
              >
                G <span>Google</span>
              </div>

              <div
                className="app-tile spotify"
                onClick={() => window.open("https://open.spotify.com", "_blank")}
              >
                ♬ <span>Spotify</span>
              </div>

              <div
                className="app-tile github"
                onClick={() => window.open("https://github.com", "_blank")}
              >
                ⌘ <span>GitHub</span>
              </div>

              <div
                className="app-tile wiki"
                onClick={() => window.open("https://www.wikipedia.org", "_blank")}
              >
                W <span>Wikipedia</span>
              </div>

              <div
                className="app-tile mdn"
                onClick={() =>
                  window.open("https://developer.mozilla.org", "_blank")
                }
              >
                {"{}"} <span>MDN Docs</span>
              </div>
            </div>
          </>
        ) : (
          <iframe
            ref={iframeRef}
            src={currentUrl}
            title="browser"
            className="browser-iframe"
          />
        )}
      </div>
    </div>
  );
}
