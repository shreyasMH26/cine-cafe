import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function SponsorSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative py-20 overflow-hidden"
      style={{ background: "#08080C" }}
    >
      {/* Top comic panel border */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#E31E24] via-[#0066CC] to-[#E31E24]" />

      {/* Spider web background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(#E31E24 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="max-w-md mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Creative Team Badge Header */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0066CC]/20 border border-[#00AAFF]/50 text-[#00AAFF] rounded-full text-xs font-bold tracking-[0.3em] uppercase mb-4 shadow-[0_0_15px_rgba(0,170,255,0.2)]">
            ✦ CREATIVE TEAM ✦
          </div>

          <h2 className="font-['Bebas_Neue',Impact,sans-serif] text-4xl sm:text-5xl tracking-[0.25em] text-white mb-2">
            DESIGNED BY <span className="text-[#E31E24]">XTICH.</span>
          </h2>
          <p className="text-gray-400 text-xs tracking-widest uppercase mb-8">
            Creative Direction, Visual Identity & Digital Experience
          </p>

          {/* Official Logo Card matching uploaded xtich asset */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
            whileHover={{ scale: 1.04 }}
            className="relative inline-block p-6 sm:p-8 bg-white rounded-2xl border-2 border-[#E31E24] shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            {/* Corner accent details */}
            <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-[#E31E24]" />
            <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-[#E31E24]" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-[#E31E24]" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-[#E31E24]" />

            <div className="my-1 px-4">
              <img
                src="/assets/xtich-cropped-card.png"
                alt="xtich. Creative Team"
                className="max-h-16 sm:max-h-20 w-auto object-contain mx-auto"
                loading="eager"
              />
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between text-[11px] text-gray-600 font-mono">
              <span className="text-[#E31E24] font-bold">✦ CREATIVE TEAM</span>
              <span className="text-black font-extrabold tracking-widest">XTICH.COM</span>
            </div>
          </motion.div>

          <p className="mt-8 text-xs text-gray-500 tracking-wider">
            Web Bites &bull; Team Dynamos &bull; Stall No. 08 &bull; Davanagere
          </p>
        </motion.div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#0066CC] via-[#E31E24] to-[#0066CC]" />
    </section>
  );
}
