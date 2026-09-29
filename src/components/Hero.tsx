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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0A0A0F 0%, #0D0010 60%, #000A1A 100%)" }}
    >
      {/* Web background */}
      <SpiderWebBackground opacity={0.08} />

      {/* City skyline SVG */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 375 200"
        preserveAspectRatio="xMidYMax meet"
        aria-hidden
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E31E24" stopOpacity="0" />
            <stop offset="100%" stopColor="#E31E24" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="skyBlue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0066CC" stopOpacity="0" />
            <stop offset="100%" stopColor="#0066CC" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <rect width="375" height="200" fill="url(#skyGrad)" />
        {/* Far buildings */}
        <g fill="rgba(20,0,30,0.9)">
          <rect x="0"   y="120" width="30" height="80" />
          <rect x="35"  y="100" width="20" height="100" />
          <rect x="60"  y="130" width="25" height="70" />
          <rect x="90"  y="90"  width="18" height="110" />
          <rect x="115" y="110" width="30" height="90" />
          <rect x="150" y="80"  width="22" height="120" />
          <rect x="178" y="105" width="28" height="95" />
          <rect x="212" y="95"  width="20" height="105" />
          <rect x="238" y="115" width="30" height="85" />
          <rect x="274" y="85"  width="24" height="115" />
          <rect x="304" y="110" width="30" height="90" />
          <rect x="340" y="100" width="35" height="100" />
        </g>
        {/* Windows glow */}
        <g fill="rgba(0,170,255,0.15)">
          {[20, 50, 100, 160, 230, 290, 350].map((x) =>
            [100, 115, 130].map((y) => (
              <rect key={`${x}-${y}`} x={x} y={y} width="3" height="4" rx="0.5" />
            ))
          )}
        </g>
        {/* Blue overlay */}
        <rect width="375" height="200" fill="url(#skyBlue)" />
        {/* Red atmospheric glow at horizon */}
        <ellipse cx="187" cy="200" rx="280" ry="60" fill="rgba(227,30,36,0.08)" />
      </svg>

      {/* Halftone overlay */}
      <div className="absolute inset-0 halftone pointer-events-none" />

      {/* Red + Blue ambient lights */}
      <div
        className="absolute top-0 left-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(227,30,36,0.15) 0%, transparent 70%)", transform: "translate(-30%, -30%)" }}
      />
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,102,204,0.15) 0%, transparent 70%)", transform: "translate(30%, -30%)" }}
      />

      {/* Hanging web thread */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 opacity-30"
        style={{ background: "linear-gradient(to bottom, transparent, white)" }}
      />

      {/* Hero character silhouette */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 text-5xl"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        style={{ filter: "drop-shadow(0 0 20px rgba(227,30,36,0.8))" }}
      >
        <motion.div
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          🕷️
        </motion.div>
      </motion.div>

      {/* Main hero content */}
      <div className="relative z-10 text-center px-6 mt-16 sm:mt-0">
        {/* Film strip top */}
        <div className="film-strip h-6 w-full mb-6 opacity-30" />

        {/* Stall badge & Sponsor badge */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs tracking-[0.3em] border border-[#E31E24]/50 text-[#E31E24] bg-black/40"
          >
            🕷️ TEAM DYNAMOS · STALL NO. 08
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-black rounded text-xs font-['Bebas_Neue',Impact,sans-serif] tracking-widest shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          >
            <span className="text-[10px] text-gray-500 font-semibold tracking-wider">POWERED BY</span>
            <strong className="text-sm tracking-wider text-black font-bold">XTICH</strong>
          </motion.div>
        </div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.5, duration: 0.7, type: "spring", stiffness: 120 }}
          className="font-['Bebas_Neue',Impact,sans-serif] text-[clamp(3.5rem,18vw,8rem)] leading-none tracking-wider"
          style={{ color: "#E31E24", textShadow: "0 0 40px rgba(227,30,36,0.6), 0 0 80px rgba(227,30,36,0.3)" }}
        >
          WEB
          <br />
          BITES
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-2 font-['Bebas_Neue',Impact,sans-serif] text-[clamp(1.1rem,5vw,2rem)] tracking-[0.35em] text-white/70"
        >
          SMALL BITES,
          <span className="text-[#0066CC]" style={{ textShadow: "0 0 15px rgba(0,102,204,0.8)" }}> BIG BLOCKBUSTER.</span>
        </motion.p>

        {/* Event date */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-4 font-['Bebas_Neue',Impact,sans-serif] text-sm tracking-[0.4em] text-white/40"
        >
          10 OCT 2026 &nbsp;·&nbsp; 3:00 PM – 5:00 PM
        </motion.div>

        {/* CTA button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(227,30,36,0.7), 0 0 80px rgba(0,102,204,0.4)" }}
          whileTap={{ scale: 0.97 }}
          onClick={handleEnter}
          className="mt-8 px-10 py-4 font-['Bebas_Neue',Impact,sans-serif] text-xl tracking-[0.4em] text-white border-2 border-[#E31E24] relative overflow-hidden group"
          style={{
            background: "linear-gradient(135deg, rgba(227,30,36,0.15), rgba(0,102,204,0.15))",
            boxShadow: "0 0 20px rgba(227,30,36,0.4), inset 0 0 20px rgba(0,102,204,0.1)",
          }}
        >
          <motion.span
            className="absolute inset-0 bg-[#E31E24] opacity-0 group-hover:opacity-10"
            transition={{ duration: 0.2 }}
          />
          🕷️ ENTER THE CAFÉ
        </motion.button>

        {/* XTICH Official Sponsor Presenter on Front Page */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="mt-6 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded border-2 border-[#E31E24] shadow-[0_0_25px_rgba(255,255,255,0.35)]">
            <span className="text-[10px] tracking-[0.25em] text-gray-500 font-bold">POWERED BY</span>
            <span className="font-['Bebas_Neue',Impact,sans-serif] text-2xl tracking-[0.2em] text-black font-extrabold leading-none">
              XTICH
            </span>
            <span className="text-[9px] tracking-wider px-2 py-0.5 bg-[#E31E24] text-white font-bold rounded">
              OFFICIAL SPONSOR
            </span>
          </div>
        </motion.div>

        {/* Film strip bottom */}
        <div className="film-strip h-6 w-full mt-6 opacity-30" />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="text-xs tracking-[0.3em] text-white/30">SCROLL</div>
        <div className="w-px h-8 bg-gradient-to-b from-[#E31E24] to-transparent" />
      </motion.div>

      {/* Red/blue light streaks */}
      <motion.div
        className="absolute left-0 top-1/3 w-1 h-40 opacity-50 pointer-events-none"
        animate={{ opacity: [0, 0.5, 0], scaleY: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        style={{ background: "linear-gradient(to bottom, transparent, #E31E24, transparent)" }}
      />
      <motion.div
        className="absolute right-0 top-1/2 w-1 h-40 opacity-50 pointer-events-none"
        animate={{ opacity: [0, 0.5, 0], scaleY: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, delay: 2.5 }}
        style={{ background: "linear-gradient(to bottom, transparent, #0066CC, transparent)" }}
      />
    </section>
  );
}
