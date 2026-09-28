import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: Props) {
  const [phase, setPhase] = useState<"web" | "sweep" | "title" | "subtitle" | "cta" | "done">("web");
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    if (skipped) return;
    const timers = [
      setTimeout(() => setPhase("sweep"), 500),
      setTimeout(() => setPhase("title"), 1100),
      setTimeout(() => setPhase("subtitle"), 1600),
      setTimeout(() => setPhase("cta"), 2100),
      setTimeout(() => { setPhase("done"); onComplete(); }, 3500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete, skipped]);

  const skip = () => {
    setSkipped(true);
    setPhase("done");
    onComplete();
  };

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center cursor-pointer select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          onClick={skip}
        >
          {/* Animated web */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.svg
              viewBox="0 0 400 400"
              className="w-full h-full max-w-[500px] opacity-30"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: phase !== "web" ? 2 : 1, rotate: 0, opacity: phase === "sweep" ? 0.15 : 0.3 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <g fill="none" stroke="white" strokeWidth="0.8">
                {[40, 80, 120, 160, 200].map((r) => (
                  <circle key={r} cx="200" cy="200" r={r} />
                ))}
                {Array.from({ length: 12 }).map((_, i) => {
                  const a = (i / 12) * Math.PI * 2;
                  return (
                    <line
                      key={i}
                      x1="200" y1="200"
                      x2={200 + Math.cos(a) * 210}
                      y2={200 + Math.sin(a) * 210}
                    />
                  );
                })}
              </g>
            </motion.svg>
          </div>

          {/* Red sweep */}
          <AnimatePresence>
            {phase === "sweep" && (
              <motion.div
                className="absolute inset-0"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ background: "linear-gradient(to right, transparent, rgba(227,30,36,0.4), transparent)" }}
              />
            )}
          </AnimatePresence>

          {/* Blue sweep */}
          <AnimatePresence>
            {(phase === "title" || phase === "subtitle" || phase === "cta") && (
              <motion.div
                className="absolute inset-0"
                initial={{ x: "100%" }}
                animate={{ x: "-100%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ background: "linear-gradient(to left, transparent, rgba(0,102,204,0.35), transparent)" }}
              />
            )}
          </AnimatePresence>

          {/* Title content */}
          <div className="relative z-10 text-center px-6 flex flex-col items-center gap-2">
            {/* Spider icon */}
            <AnimatePresence>
              {(phase === "title" || phase === "subtitle" || phase === "cta") && (
                <motion.div
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="text-5xl mb-2"
                >
                  🕷️
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {(phase === "title" || phase === "subtitle" || phase === "cta") && (
                <motion.h1
                  initial={{ opacity: 0, scale: 0.7, filter: "blur(20px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="font-['Bebas_Neue',Impact,sans-serif] text-6xl sm:text-8xl tracking-widest neon-red"
                  style={{ color: "#E31E24" }}
                >
                  THE CINE CAFÉ
                </motion.h1>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {(phase === "subtitle" || phase === "cta") && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="font-['Bebas_Neue',Impact,sans-serif] text-2xl sm:text-3xl tracking-[0.4em] text-white/80"
                >
                  SMALL BITES. BIG BLOCKBUSTER.
                </motion.p>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {phase === "cta" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="mt-6 flex flex-col items-center gap-3"
                >
                  <div
                    className="px-8 py-3 text-lg font-bold tracking-[0.3em] border-2 border-[#E31E24] rounded-none"
                    style={{
                      fontFamily: "Bebas Neue, Impact, sans-serif",
                      background: "linear-gradient(135deg, rgba(227,30,36,0.2), rgba(0,102,204,0.2))",
                      boxShadow: "0 0 20px rgba(227,30,36,0.5), 0 0 40px rgba(0,102,204,0.3)",
                    }}
                  >
                    🕷️ TAP TO ENTER
                  </div>
                  <p className="text-xs text-white/40 tracking-widest">TAP ANYWHERE TO SKIP</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Ambient particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: i % 2 === 0 ? "#E31E24" : "#0066CC",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
