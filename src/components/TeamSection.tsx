import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SpiderWebBackground from "./SpiderWebBackground";

export default function TeamSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0A0A0F 0%, #0D0010 100%)" }}
    >
      <SpiderWebBackground opacity={0.06} />

      {/* Comic diagonal */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(227,30,36,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-lg mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
        >
          {/* Web divider */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#E31E24]" />
            <div className="text-2xl">🕸️</div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#E31E24]" />
          </div>

          {/* Superhero intro text */}
          <p className="text-xs tracking-[0.6em] text-[#E31E24] mb-3">INTRODUCING</p>

          <h2
            className="font-['Bebas_Neue',Impact,sans-serif] text-6xl sm:text-7xl tracking-widest mb-2"
            style={{
              color: "#fff",
              textShadow: "0 0 40px rgba(227,30,36,0.4)",
            }}
          >
            THE
          </h2>
          <h2
            className="font-['Bebas_Neue',Impact,sans-serif] text-6xl sm:text-7xl tracking-widest"
            style={{
              color: "#E31E24",
              textShadow: "0 0 30px rgba(227,30,36,0.8), 0 0 60px rgba(0,102,204,0.3)",
            }}
          >
            DYNAMOS
          </h2>

          {/* Team card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="mt-8 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(227,30,36,0.06), rgba(0,102,204,0.06))",
              border: "1.5px solid rgba(227,30,36,0.4)",
            }}
          >
            {/* Halftone */}
            <div className="absolute inset-0 halftone opacity-30 pointer-events-none" />

            <div className="p-8 relative z-10">
              {/* Big spider */}
              <motion.div
                className="text-6xl mb-4"
                animate={{ rotate: [0, -5, 5, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ filter: "drop-shadow(0 0 20px rgba(227,30,36,0.6))" }}
              >
                🕷️
              </motion.div>

              <div
                className="font-['Bebas_Neue',Impact,sans-serif] text-3xl tracking-[0.4em] text-white mb-1"
              >
                TEAM DYNAMOS
              </div>
              <div className="text-sm tracking-[0.4em] text-[#E31E24]">STALL NO. 08</div>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#E31E24]" />
                <div className="text-[#E31E24] text-xs">◆</div>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#E31E24]" />
              </div>

              <p className="mt-4 text-sm text-white/50 italic">
                "Not all heroes wear capes.<br />Some serve fried rice."
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
