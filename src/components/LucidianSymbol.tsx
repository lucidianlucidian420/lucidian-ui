export default function LucidianSymbol({ className = "" }) {
  return (
    <div className={`w-16 h-16 ${className}`}>
      <svg
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#93c5fd" />
          </filter>
        </defs>

        <g
          transform="translate(300,300)"
          stroke="#93c5fd"
          fill="none"
          strokeWidth="2"
          filter="url(#glow)"
        >
          {Array.from({ length: 19 }).map((_, i) => {
            const angle = (Math.PI * 2 * i) / 19;
            const r = 100;
            const x = (Math.cos(angle) * r).toFixed(3);
            const y = (Math.sin(angle) * r).toFixed(3);
            return <circle key={i} cx={x} cy={y} r={100} />;
          })}
          <circle cx={0} cy={0} r={100} />
        </g>
      </svg>
    </div>
  );
}

