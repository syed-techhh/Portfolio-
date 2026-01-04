import { useEffect, useRef, useState } from "react";
import "./Music.css";

/* IMPORT 10 SONGS */
import music1 from "../../assets/music/music1.mp3";
import music2 from "../../assets/music/music2.mp3";
import music3 from "../../assets/music/music3.mp3";
import music4 from "../../assets/music/music4.mp3";
import music5 from "../../assets/music/music5.mp3";
import music6 from "../../assets/music/music6.mp3";
import music7 from "../../assets/music/music7.mp3";
import music8 from "../../assets/music/music8.mp3";
import music9 from "../../assets/music/music9.mp3";
import music10 from "../../assets/music/music10.mp3";

const SONGS = [
  music1, music2, music3, music4, music5,
  music6, music7, music8, music9, music10
];

export default function Music({ onClose, onMinimize }) {
  const audioRef = useRef(null);

  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [maximized, setMaximized] = useState(false);

  /* FORMAT TIME */
  const format = (t) =>
    `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

  /* AUDIO EVENTS */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => setProgress(audio.currentTime);
    const loaded = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", update);
    audio.addEventListener("loadedmetadata", loaded);

    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("loadedmetadata", loaded);
    };
  }, [current]);

  /* VOLUME */
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  /* PLAY / PAUSE */
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  /* SONG CHANGE */
  const prevSong = () => {
    setCurrent((p) => (p - 1 + SONGS.length) % SONGS.length);
    setPlaying(false);
  };

  const nextSong = () => {
    setCurrent((p) => (p + 1) % SONGS.length);
    setPlaying(false);
  };

  return (
    <div className={`music-window ${maximized ? "maximized" : ""}`}>
      {/* HEADER */}
      <div className="music-header">
        <span>Music</span>

        <div className="window-controls">
          {/* MINIMIZE → DESKTOP */}
          <span className="btn yellow" onClick={onMinimize} />

          {/* MAXIMIZE */}
          <span
            className="btn green"
            onClick={() => setMaximized((p) => !p)}
          />

          {/* CLOSE */}
          <span className="btn red" onClick={onClose} />
        </div>
      </div>

      {/* CENTER PLAYER */}
      <div className="music-center">
        {/* ICON */}
        <div className="music-cover">🎵</div>

        {/* TITLE */}
        <div className="music-title">Music</div>

        {/* PROGRESS BAR */}
        <div className="music-progress">
          <span>{format(progress)}</span>

          <input
            type="range"
            min="0"
            max={duration || 0}
            value={progress}
            onChange={(e) =>
              (audioRef.current.currentTime = e.target.value)
            }
          />

          <span>{format(duration)}</span>
        </div>

        {/* CONTROLS */}
        <div className="music-controls">
          <button onClick={prevSong}>⏮</button>
          <button onClick={togglePlay}>
            {playing ? "⏸" : "▶"}
          </button>
          <button onClick={nextSong}>⏭</button>
        </div>

        {/* VOLUME */}
        <div className="music-volume">
          🔊
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />
        </div>
      </div>

      {/* AUDIO */}
      <audio ref={audioRef} src={SONGS[current]} />
    </div>
  );
}
