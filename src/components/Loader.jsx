import { useEffect, useRef, useState } from "react";

export default function Loader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const lettersRef = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });

  /* SCROLL PROGRESS */
  useEffect(() => {
    const handleScroll = () => {
      setProgress((p) => {
        const n = Math.min(p + 10, 100);
        if (n === 100) setTimeout(onFinish, 600);
        return n;
      });
    };
    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [onFinish]);

  /* TRACK MOUSE (GLOBAL) */
  useEffect(() => {
    const move = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* MAGNETIC LOOP */
  useEffect(() => {
    const animate = () => {
      lettersRef.current.forEach((el) => {
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const dx = mouse.current.x - (rect.left + rect.width / 2);
        const dy = mouse.current.y - (rect.top + rect.height / 2);

        const distance = Math.sqrt(dx * dx + dy * dy);
        const strength = Math.max(0, 1 - distance / 300);

        el.style.transform = `
          translate(${dx * strength * 0.35}px,
                    ${dy * strength * 0.35}px)
        `;
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  const text = "SYED’S PORTFOLIO";

  return (
    <div className="loader-screen">
      <div className="loader-content">
        <h1 className="portfolio-title">
          {text.split("").map((char, i) => (
            <span
              key={i}
              ref={(el) => (lettersRef.current[i] = el)}
              className="loader-letter"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <h2 className="subtitle">Explore Desktop</h2>
        <p className="progress">{progress}%</p>

        <div className="scroll-down">
          <span className="scroll-text">SCROLL DOWN</span>
          <span className="arrow">⮟</span>
        </div>
      </div>
    </div>
  );
}
