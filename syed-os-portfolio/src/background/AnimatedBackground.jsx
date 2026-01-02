export default function AnimatedBackground() {
  return (
    <div className="rain-bg">
      {Array.from({ length: 400 }).map((_, i) => (
        <span
          key={i}
          className="dot"
          style={{
            left: Math.random() * 100 + "vw",
            animationDuration: 5 + Math.random() * 7 + "s",
            animationDelay: Math.random() * 5 + "s",
            opacity: 0.3 + Math.random() * 0.7
          }}
        />
      ))}
    </div>
  );
}
