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
          {/* Official Badge Header */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/60 border border-[#E31E24]/60 text-[#E31E24] rounded-full text-xs font-bold tracking-[0.3em] uppercase mb-4 shadow-[0_0_15px_rgba(227,30,36,0.2)]">
            ★ OFFICIAL SPONSOR ★
          </div>

          <h2 className="font-['Bebas_Neue',Impact,sans-serif] text-4xl sm:text-5xl tracking-[0.25em] text-white mb-2">
            POWERED BY <span className="text-[#E31E24]">XTICH</span>
          </h2>
          <p className="text-gray-400 text-xs tracking-widest uppercase mb-8">
            Fueling The Ultimate Cinematic Feast Experience
          </p>

          {/* Official Logo Card from Physical Banner & Ticket */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
            whileHover={{ scale: 1.04 }}
            className="relative inline-block p-4 sm:p-6 bg-black rounded-xl border-2 border-[#E31E24] shadow-[0_0_35px_rgba(227,30,36,0.4)]"
          >
            {/* Film strip edge decors */}
            <div className="absolute top-1 left-2 right-2 h-1.5 flex justify-between opacity-30">
              <span className="w-1.5 h-1.5 bg-white rounded-xs"></span>
              <span className="w-1.5 h-1.5 bg-white rounded-xs"></span>
              <span className="w-1.5 h-1.5 bg-white rounded-xs"></span>
              <span className="w-1.5 h-1.5 bg-white rounded-xs"></span>
              <span className="w-1.5 h-1.5 bg-white rounded-xs"></span>
            </div>

            <div className="my-2">
              <img
                src="/assets/xtich-official-card.png"
                alt="XTICH Official Sponsor"
                className="max-h-20 sm:max-h-24 w-auto object-contain mx-auto rounded drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                loading="eager"
              />
            </div>

            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400 font-mono">
              <span className="text-[#00AAFF]">✦ TECH & MEDIA</span>
              <span className="text-white font-bold tracking-widest">XTICH.COM</span>
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
