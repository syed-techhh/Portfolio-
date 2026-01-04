import { useState } from "react";
import "./Photos.css";

/* IMPORT YOUR JPG ASSETS */
import photo1 from "../../assets/photos/photo1.jpg";
import photo2 from "../../assets/photos/photo2.jpg";
import photo3 from "../../assets/photos/photo3.jpg";
import photo4 from "../../assets/photos/photo4.jpg";
import photo5 from "../../assets/photos/photo5.jpg";
import photo6 from "../../assets/photos/photo6.jpg";

const photos = [photo1, photo2, photo3, photo4, photo5, photo6];

export default function Photos({ onClose }) {
  const [selected, setSelected] = useState(0);
  const [maximized, setMaximized] = useState(false);

  return (
    <div className={`photos-window ${maximized ? "maximized" : ""}`}>
      {/* HEADER */}
      <div className="photos-header">
        <span className="photos-title">Photos</span>

        <div className="window-controls">
          {/* 🟡 MINIMIZE → handled by Desktop */}
          <span className="btn yellow" onClick={onClose} />

          {/* 🟢 MAXIMIZE */}
          <span
            className="btn green"
            onClick={() => setMaximized((p) => !p)}
          />

          {/* 🔴 CLOSE */}
          <span className="btn red" onClick={onClose} />
        </div>
      </div>

      {/* BODY */}
      <div className="photos-body">
        {/* LEFT GRID */}
        <div className="photos-sidebar">
          <div className="sidebar-title">
            My Photos ({photos.length})
          </div>

          <div className="photos-grid">
            {photos.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className={i === selected ? "active" : ""}
                onClick={() => setSelected(i)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT PREVIEW */}
        <div className="photos-preview">
          <img src={photos[selected]} alt="preview" />
        </div>
      </div>
    </div>
  );
}
