import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SpiderWebBackground from "./SpiderWebBackground";

const ITEMS = ["FRIED RICE", "GOBI", "NOODLES", "AMERICAN SWEET CORN", "MOCKTAIL", "CARROT HALWA"];

export default function PriceExperience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [revealed, setRevealed] = useState(false);

  // Auto-reveal when in view
  useEffect(() => {
    if (inView && !revealed) {
      const t = setTimeout(() => setRevealed(true), 600);
      return () => clearTimeout(t);
    }
  }, [inView, revealed]);

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0D0010 0%, #040008 50%, #000510 100%)" }}
    >
      <SpiderWebBackground opacity={0.06} />

      {/* Speed lines */}
      <div className="absolute inset-0 speed-lines opacity-10 pointer-events-none" />

      {/* Diagonal shape */}
      <div
        className="absolute top-0 inset-x-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(135deg, #E31E24 0%, transparent 50%)", opacity: 0.05 }}
      />

      <div className="max-w-lg mx-auto px-4 text-center">
        {/* Comic word */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: 20 }}
          animate={inView ? { opacity: [0, 1, 0], scale: [0, 1.5, 1.5], rotate: [20, -5, -5] } : {}}
          transition={{ duration: 0.7 }}
          className="comic-word text-4xl mb-4 absolute top-10 right-8 pointer-events-none"
        >
          WHOOSH!
        </motion.div>

        {/* "The complete experience" label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-[#E31E24] tracking-[0.5em] text-xs mb-6"
        >
          🎟️ THE COMPLETE WEB BITES EXPERIENCE
        </motion.div>

        {/* Ticket container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          className="relative mx-auto"
          style={{
            background: "linear-gradient(135deg, #0D0015, #000A1A)",
            border: "2px solid #E31E24",
            boxShadow: "0 0 0 1px rgba(227,30,36,0.3), 0 0 60px rgba(227,30,36,0.2), 0 0 120px rgba(0,102,204,0.1)",
          }}
        >
          {/* Ticket top perforations */}
          <div className="ticket-perfs h-6 border-b border-dashed border-[#E31E24]/30" />

          {/* Price reveal */}
          <div className="py-10 px-6">
            <div className="text-sm tracking-[0.5em] text-white/40 mb-3">ONE TICKET · ONE ENTRY · ONE MEAL</div>

            <AnimatePresence mode="wait">
              {!revealed ? (
                <motion.div
                  key="hidden"
                  className="font-['Bebas_Neue',Impact,sans-serif] text-[5rem] sm:text-[8rem] leading-none text-white/20 tracking-wider"
                  exit={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                  transition={{ duration: 0.4 }}
                >
                  ?????
                </motion.div>
              ) : (
                <motion.div
                  key="revealed"
                  className="relative"
                >
                  {/* Light streak behind price */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      background: "linear-gradient(to right, rgba(227,30,36,0.15), rgba(0,102,204,0.15))",
                    }}
                  />

                  <motion.div
                    className="font-['Bebas_Neue',Impact,sans-serif] leading-none relative"
                    style={{ fontSize: "clamp(5rem,30vw,9rem)" }}
                  >
                    {/* ₹ symbol */}
                    <motion.span
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                      style={{ color: "#0066CC", textShadow: "0 0 30px rgba(0,102,204,0.8)" }}
                    >
                      ₹
                    </motion.span>

                    {/* Number */}
                    {"199".split("").map((digit, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: -30, scale: 0.5 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.2 + i * 0.12, type: "spring", stiffness: 250, damping: 15 }}
                        style={{ color: "#E31E24", textShadow: "0 0 40px rgba(227,30,36,0.8), 0 0 80px rgba(227,30,36,0.4)" }}
                      >
                        {digit}
                      </motion.span>
                    ))}

                    {/* /- */}
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="text-4xl text-white/60"
                    >
                      /-
                    </motion.span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ticket labels */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={revealed ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
              className="flex justify-center gap-6 mt-4 text-xs tracking-[0.3em] text-white/50"
            >
              {["1 TICKET", "1 ENTRY", "1 MEAL"].map((t) => (
                <span key={t} className="flex flex-col items-center gap-1">
                  <span className="text-[#E31E24] text-xl">✦</span>
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Perforated divider */}
          <div className="ticket-perfs h-6 border-t border-dashed border-[#E31E24]/30" />

          {/* Meal items */}
          <div className="py-6 px-6">
            <div className="text-xs tracking-[0.4em] text-white/30 mb-4">INCLUDED IN YOUR TICKET</div>
            <div className="flex flex-col gap-2">
              {ITEMS.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={revealed ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-4 h-px bg-[#E31E24]" />
                  <span
                    className="font-['Bebas_Neue',Impact,sans-serif] text-xl tracking-widest text-white"
                  >
                    {item}
                  </span>
                  {i < ITEMS.length - 1 && (
                    <span className="text-[#E31E24]/40 ml-auto text-sm">+</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Barcode */}
          <div className="relative overflow-hidden px-6 py-4 border-t border-[#E31E24]/30">
            <div className="flex gap-0.5 justify-center h-10">
              {Array.from({ length: 48 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white/80"
                  style={{ width: i % 3 === 0 ? "3px" : "1.5px", height: "100%" }}
                />
              ))}
            </div>
            {/* Barcode scan line */}
            <motion.div
              className="absolute inset-x-0 top-4 h-0.5 bg-[#E31E24]"
              animate={{ y: [0, 32, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ boxShadow: "0 0 8px #E31E24" }}
            />
            <div className="mt-2 text-center font-mono text-xs text-white/30 tracking-widest">
              WEBBITES-2026-STALL08
            </div>
          </div>
        </motion.div>
      </div>

      {/* Ambient lights */}
      <div className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(227,30,36,0.12) 0%, transparent 70%)" }}
      />
      <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,102,204,0.12) 0%, transparent 70%)" }}
      />
    </section>
  );
}
