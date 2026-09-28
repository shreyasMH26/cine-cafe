import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Draws thin SVG web lines that follow the cursor (desktop)
 * and burst on tap (mobile).
 */
export default function WebCursor() {
  const [pos, setPos] = useState({ x: -999, y: -999 });
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([]);
  const idRef = useRef(0);
  const isMobile = typeof window !== "undefined" && window.matchMedia("(pointer:coarse)").matches;

  useEffect(() => {
    if (isMobile) return;
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const click = (e: MouseEvent) => {
      const id = idRef.current++;
      setClicks((c) => [...c, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setClicks((c) => c.filter((v) => v.id !== id)), 700);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("click", click);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", click);
    };
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) return;
    const touch = (e: TouchEvent) => {
      const t = e.touches[0];
      const id = idRef.current++;
      setClicks((c) => [...c, { id, x: t.clientX, y: t.clientY }]);
      setTimeout(() => setClicks((c) => c.filter((v) => v.id !== id)), 700);
    };
    window.addEventListener("touchstart", touch, { passive: true });
    return () => window.removeEventListener("touchstart", touch);
  }, [isMobile]);

  return (
    <svg className="fixed inset-0 w-full h-full pointer-events-none z-50" style={{ mixBlendMode: "screen" }}>
      {/* Cursor follower lines */}
      {!isMobile && [0, 1, 2].map((i) => (
        <motion.line
          key={i}
          x1="0" y1="0"
          x2={pos.x} y2={pos.y}
          stroke={i === 0 ? "rgba(227,30,36,0.3)" : i === 1 ? "rgba(0,102,204,0.2)" : "rgba(255,255,255,0.15)"}
          strokeWidth={i === 0 ? "1" : "0.5"}
          animate={{ x2: pos.x, y2: pos.y }}
          transition={{ duration: 0.08 + i * 0.04, ease: "linear" }}
        />
      ))}

      {/* Web burst on click/tap */}
      {clicks.map(({ id, x, y }) => (
        <g key={id}>
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const len = 40 + Math.random() * 20;
            return (
              <motion.line
                key={i}
                x1={x} y1={y}
                x2={x + Math.cos(angle) * len}
                y2={y + Math.sin(angle) * len}
                stroke="#E31E24"
                strokeWidth="1.5"
                initial={{ opacity: 1, pathLength: 0 }}
                animate={{ opacity: 0, pathLength: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            );
          })}
          <motion.circle
            cx={x} cy={y} r="6"
            fill="none"
            stroke="#0066CC"
            strokeWidth="1.5"
            initial={{ r: 4, opacity: 1 }}
            animate={{ r: 30, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </g>
      ))}
    </svg>
  );
}
