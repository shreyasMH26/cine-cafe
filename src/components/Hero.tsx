import { useRef } from "react";
import { motion } from "framer-motion";
import SpiderWebBackground from "./SpiderWebBackground";

export default function Hero() {
  const ref = useRef(null);

  const handleEnter = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-12 px-4"
      style={{ background: "linear-gradient(180deg, #07070B 0%, #0F0014 50%, #000B1D 100%)" }}
    >
      {/* Dynamic spider-web background overlay */}
      <SpiderWebBackground opacity={0.1} />

      {/* Comic Halftone Overlay */}
      <div className="absolute inset-0 halftone pointer-events-none opacity-25" />

      {/* Red & Blue atmospheric ambient lights */}
      <div
        className="absolute top-0 left-0 w-80 h-80 rounded-full pointer-events-none blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(227,30,36,0.25) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(0,102,204,0.2) 0%, transparent 70%)" }}
      />

      {/* Main Ticket Container - Digital replica of physical ticket */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Top Filmstrip Perforation Edge */}
        <div className="film-strip h-6 w-full opacity-40 mb-3" />

        {/* Digital Ticket Frame */}
        <div
          className="relative bg-[#0C0D14]/95 border-2 border-[#E31E24] rounded-2xl p-6 sm:p-10 shadow-[0_0_50px_rgba(227,30,36,0.35)] backdrop-blur-md overflow-hidden"
          style={{
            backgroundImage: "radial-gradient(rgba(227,30,36,0.08) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        >
          {/* Perforated side notch simulation (classic ticket look) */}
          <div className="hidden sm:block absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#07070B] border-r-2 border-[#E31E24]" />
          <div className="hidden sm:block absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#07070B] border-l-2 border-[#E31E24]" />

          {/* Top Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
            {/* Team Dynamos Branding */}
            <div className="flex items-center gap-3">
              <img
                src="/assets/dynamos-crest.png"
                alt="Team Dynamos Lion Crest"
                className="w-9 h-9 object-contain drop-shadow-[0_0_8px_rgba(227,30,36,0.8)]"
              />
              <div>
                <div className="font-['Bebas_Neue',Impact,sans-serif] text-lg sm:text-xl tracking-wider text-white leading-none">
                  TEAM DYNAMOS
                </div>
                <div className="text-[10px] tracking-[0.2em] text-[#00AAFF] font-semibold">
                  II YEAR B.COM &bull; EVENT HOST
                </div>
              </div>
            </div>

            {/* Stall Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E31E24]/20 border border-[#E31E24] text-[#E31E24] rounded-md font-['Bebas_Neue',Impact,sans-serif] text-base tracking-widest shadow-[0_0_15px_rgba(227,30,36,0.4)]">
              🕷️ STALL NO. 08
            </div>

            {/* Price Pass Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-[#E31E24] to-[#B31418] text-white rounded-md font-['Bebas_Neue',Impact,sans-serif] text-xl tracking-wider shadow-[0_0_20px_rgba(227,30,36,0.6)]">
              ★ ₹199 FOOD PASS ★
            </div>
          </div>

          {/* Central Showcase: Graphic + Title Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-4">
            {/* Left: Original Comic Character Artwork from physical ticket */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, type: "spring" }}
              className="md:col-span-5 flex flex-col items-center justify-center text-center order-2 md:order-1"
            >
              <div className="relative p-2 bg-black/60 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(227,30,36,0.3)]">
                <img
                  src="/assets/hero-ticket-comic.png"
                  alt="Web Slinger enjoying blockbuster noodles"
                  className="w-56 sm:w-64 h-auto object-contain rounded-xl drop-shadow-[0_0_25px_rgba(227,30,36,0.7)]"
                />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#E31E24] text-white px-3 py-1 rounded text-[10px] font-['Bebas_Neue',Impact,sans-serif] tracking-widest uppercase whitespace-nowrap shadow-lg">
                  💥 GREAT POWER, EPIC FLAVORS!
                </div>
              </div>
            </motion.div>

            {/* Right: Title, Slogan, and Details */}
            <div className="md:col-span-7 text-center md:text-left order-1 md:order-2">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block text-xs font-bold tracking-[0.35em] text-[#00AAFF] uppercase mb-1"
              >
                ✦ OFFICIAL CINEMA FOOD EXPERIENCE ✦
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
                className="font-['Bebas_Neue',Impact,sans-serif] text-6xl sm:text-7xl lg:text-8xl leading-none tracking-wider text-[#E31E24]"
                style={{
                  textShadow: "0 0 35px rgba(227,30,36,0.7), 0 0 70px rgba(227,30,36,0.3)",
                }}
              >
                WEB BITES
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="font-['Bebas_Neue',Impact,sans-serif] text-2xl sm:text-3xl tracking-[0.25em] text-white/90 mt-2"
              >
                SMALL BITES,{" "}
                <span className="text-[#00AAFF]" style={{ textShadow: "0 0 15px rgba(0,170,255,0.8)" }}>
                  BIG BLOCKBUSTER.
                </span>
              </motion.p>

              {/* Event Date & Venue Pill */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-4 p-3 bg-black/50 border border-white/10 rounded-lg text-xs font-mono text-gray-300 space-y-1"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[#E31E24]">📅 DATE:</span>
                  <span className="font-bold text-white">10 OCTOBER 2026</span>
                  <span className="text-gray-500">|</span>
                  <span className="text-[#00AAFF]">🕒 TIME:</span>
                  <span className="font-bold text-white">3:00 PM – 5:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#E31E24]">📍 VENUE:</span>
                  <span className="text-white">Bapuji Samudaya Bhavan, MCC B Block, Davanagere</span>
                </div>
              </motion.div>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(227,30,36,0.8)" }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleEnter}
                  className="px-8 py-3.5 bg-[#E31E24] hover:bg-[#c9181e] text-white font-['Bebas_Neue',Impact,sans-serif] text-xl tracking-[0.3em] rounded-lg shadow-[0_0_20px_rgba(227,30,36,0.5)] transition"
                >
                  🕷️ VIEW MENU & COMBO
                </motion.button>

                <a
                  href="#experience"
                  className="px-6 py-3.5 bg-white/5 hover:bg-white/15 border border-white/20 text-white font-['Bebas_Neue',Impact,sans-serif] text-lg tracking-[0.2em] rounded-lg transition"
                >
                  WHAT'S INCLUDED (₹199)
                </a>
              </div>
            </div>
          </div>

          {/* Ticket Footer Strip - Official Sponsor XTICH Asset */}
          <div className="mt-6 pt-5 border-t border-dashed border-white/20 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold tracking-[0.25em] text-[#E31E24] uppercase">
                ★ OFFICIAL SPONSOR:
              </span>
              <img
                src="/assets/xtich-official-card.png"
                alt="XTICH Official Sponsor"
                className="h-8 sm:h-9 object-contain rounded drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
              />
            </div>

            <div className="text-[11px] text-gray-400 font-mono tracking-wider">
              TICKET STUB #WB-2026-08 &bull; ADMIT ONE
            </div>
          </div>
        </div>

        {/* Bottom Filmstrip Perforation Edge */}
        <div className="film-strip h-6 w-full opacity-40 mt-3" />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="mt-8 flex flex-col items-center gap-1.5 cursor-pointer"
        onClick={handleEnter}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="text-[10px] tracking-[0.3em] text-white/40 uppercase">EXPLORE BLOCKBUSTER MENU</div>
        <div className="w-px h-6 bg-gradient-to-b from-[#E31E24] to-transparent" />
      </motion.div>
    </section>
  );
}
