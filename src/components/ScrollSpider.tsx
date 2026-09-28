import { motion, useTransform, useSpring } from "framer-motion";
import { useScrollProgress } from "../hooks/useScrollProgress";

/**
 * A small spider silhouette that climbs a web strand on the right side
 * as the user scrolls down the page.
 */
export default function ScrollSpider() {
  const progress = useScrollProgress();
  const springProgress = useSpring(progress, { stiffness: 60, damping: 15 });

  return (
    <div className="fixed right-0 top-0 h-full w-8 z-40 pointer-events-none hidden sm:block" aria-hidden>
      {/* Web strand */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 32 800" preserveAspectRatio="none">
        <defs>
          <linearGradient id="strandGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E31E24" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#0066CC" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#E31E24" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <line x1="16" y1="0" x2="16" y2="800" stroke="url(#strandGrad)" strokeWidth="1.5" strokeDasharray="6 6" />
        {/* Horizontal web threads */}
        {[100, 200, 300, 400, 500, 600, 700].map((y) => (
          <line key={y} x1="6" y1={y} x2="26" y2={y} stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        ))}
      </svg>

      {/* Spider silhouette */}
      <motion.div
        className="absolute right-1"
        style={{ top: useTransform(springProgress, [0, 1], ["5%", "92%"]) }}
      >
        <motion.div
          animate={{ rotate: [0, -3, 3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-lg"
        >
          🕷️
        </motion.div>
      </motion.div>
    </div>
  );
}
