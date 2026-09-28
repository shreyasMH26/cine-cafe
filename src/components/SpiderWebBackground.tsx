interface Props {
  className?: string;
  opacity?: number;
}

/**
 * Animated SVG spider-web that covers its parent container.
 * Uses pure CSS so it's GPU-friendly.
 */
export default function SpiderWebBackground({ className = "", opacity = 0.07 }: Props) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="webFade" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="white" stopOpacity={opacity * 1.5} />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <filter id="webGlow">
          <feGaussianBlur stdDeviation="0.5" />
        </filter>
      </defs>

      {/* Concentric circles */}
      {[60, 120, 180, 240, 300, 360].map((r) => (
        <ellipse
          key={r}
          cx="50%"
          cy="50%"
          rx={`${r / 2}px`}
          ry={`${r / 2}px`}
          fill="none"
          stroke="url(#webFade)"
          strokeWidth="0.6"
          filter="url(#webGlow)"
        />
      ))}

      {/* Radial spokes from center */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        const rad = (angle * Math.PI) / 180;
        const cx = 50;
        const cy = 50;
        const ex = cx + Math.cos(rad) * 55;
        const ey = cy + Math.sin(rad) * 55;
        return (
          <line
            key={i}
            x1={`${cx}%`}
            y1={`${cy}%`}
            x2={`${ex}%`}
            y2={`${ey}%`}
            stroke={`rgba(255,255,255,${opacity})`}
            strokeWidth="0.5"
          />
        );
      })}

      {/* Corner webs */}
      <g stroke={`rgba(255,34,51,${opacity * 0.6})`} strokeWidth="0.4" fill="none">
        {[30, 60, 90, 120, 150].map((r) => (
          <path
            key={r}
            d={`M 0 0 Q ${r / 2} ${r / 4} ${r} 0`}
            opacity="0.6"
          />
        ))}
      </g>
    </svg>
  );
}
