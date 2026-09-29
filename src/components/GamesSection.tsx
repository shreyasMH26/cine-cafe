import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SpiderWebBackground from "./SpiderWebBackground";

interface Game {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  emoji: string;
  comicWord: string;
  color: string;
  borderColor: string;
  description: string;
  rules: string[];
}

const GAMES: Game[] = [
  {
    id: "mr-bean",
    title: "MR. BEAN",
    tagline: "The Hilarious Comedy Challenge",
    badge: "CHALLENGE 01",
    emoji: "🎭",
    comicWord: "HAHAHA!",
    color: "from-amber-950/60 to-red-950/60",
    borderColor: "#E31E24",
    description:
      "Can you keep a straight face or master the quirky mimicry? Hilarious quick-fire challenges inspired by the comedy legend himself!",
    rules: [
      "Quirky expressions & reaction challenges",
      "No-laugh challenge against our counter crew",
      "Instant crowd entertainment & laughs",
    ],
  },
  {
    id: "coin-balance",
    title: "COIN BALANCE",
    tagline: "Stealth & Gravity Test",
    badge: "CHALLENGE 02",
    emoji: "🪙",
    comicWord: "STEADY!",
    color: "from-blue-950/60 to-cyan-950/60",
    borderColor: "#00AAFF",
    description:
      "Superheroes need nerves of steel. Balance coins on edge or stack them high on a precarious base without letting them tumble!",
    rules: [
      "Stack and balance coins under 60 seconds",
      "Zero hand-tremors allowed",
      "Highest coin stack claims the high-score board",
    ],
  },
  {
    id: "fill-the-circle",
    title: "FILL THE CIRCLE",
    tagline: "Precision Target & Reflex Blitz",
    badge: "CHALLENGE 03",
    emoji: "⭕",
    comicWord: "BULLSEYE!",
    color: "from-red-950/60 to-purple-950/60",
    borderColor: "#FF2233",
    description:
      "Rapid reflexes meets pin-point accuracy! Fill the designated circle zone within the strict boundary line before time runs out.",
    rules: [
      "Fast-paced target precision test",
      "Stay perfectly inside the boundary lines",
      "Beat the stopwatch to become stall champion",
    ],
  },
];

export default function GamesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  return (
    <section
      ref={ref}
      id="games"
      className="relative py-20 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0D0010 0%, #000A1A 50%, #040008 100%)",
      }}
    >
      <SpiderWebBackground opacity={0.06} />

      {/* Top panel border */}
      <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#0066CC] via-[#E31E24] to-[#0066CC]" />

      {/* Speed lines */}
      <div className="absolute inset-0 speed-lines opacity-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Film strip */}
          <div className="film-strip h-5 mb-6 opacity-30" />

          <div className="text-[#00AAFF] tracking-[0.5em] text-xs mb-3 font-semibold">
            🎯 STALL NO. 08 · FOOD COUNTER ATTRACTIONS
          </div>

          <h2
            className="font-['Bebas_Neue',Impact,sans-serif] text-5xl sm:text-6xl tracking-wider text-white"
            style={{ textShadow: "0 0 30px rgba(0,170,255,0.5)" }}
          >
            PLAY & WIN{" "}
            <span style={{ color: "#E31E24", textShadow: "0 0 25px rgba(227,30,36,0.8)" }}>
              AT THE COUNTER
            </span>
          </h2>

          <p
            className="mt-3 text-lg italic text-white/70 max-w-lg mx-auto"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            "While our chefs craft your hot blockbuster meal, step up to the counter and take on our challenges!"
          </p>

          {/* Web line */}
          <div className="relative mt-6 flex items-center gap-3 max-w-sm mx-auto">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#00AAFF]" />
            <div className="text-xl">🕸️</div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#00AAFF]" />
          </div>
        </motion.div>

        {/* 3 Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GAMES.map((game, i) => {
            const isExpanded = selectedGame === game.id;
            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 18,
                  delay: i * 0.15,
                }}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => setSelectedGame(isExpanded ? null : game.id)}
                className="cursor-pointer relative overflow-hidden rounded border transition-all flex flex-col justify-between"
                style={{
                  background: `linear-gradient(135deg, #0A0A12 0%, #050510 100%)`,
                  borderColor: game.borderColor,
                  boxShadow: isExpanded
                    ? `0 0 35px ${game.borderColor}66, inset 0 0 20px ${game.borderColor}33`
                    : `0 0 20px ${game.borderColor}22`,
                }}
              >
                {/* Comic Badge in corner */}
                <div
                  className="absolute top-3 right-3 font-['Bebas_Neue',Impact,sans-serif] text-xs px-2 py-0.5 rounded tracking-wider shadow"
                  style={{ background: game.borderColor, color: "#fff" }}
                >
                  {game.comicWord}
                </div>

                {/* Top preview visual */}
                <div
                  className="p-6 flex flex-col items-center justify-center text-center relative border-b border-white/10"
                  style={{
                    background: `linear-gradient(180deg, ${game.borderColor}15 0%, transparent 100%)`,
                  }}
                >
                  <span className="text-xs font-mono tracking-[0.3em] text-white/40 mb-2">
                    {game.badge}
                  </span>

                  <motion.div
                    animate={isExpanded ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-6xl my-2 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                  >
                    {game.emoji}
                  </motion.div>

                  <h3 className="font-['Bebas_Neue',Impact,sans-serif] text-3xl tracking-wider text-white mt-1">
                    {game.title}
                  </h3>

                  <span className="text-xs tracking-wider text-[#00AAFF] font-semibold">
                    {game.tagline}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <p className="text-sm text-white/70 leading-relaxed font-['Rajdhani',sans-serif]">
                    {game.description}
                  </p>

                  {/* Rules snippet */}
                  <div className="mt-4 pt-3 border-t border-white/10">
                    <span className="text-[10px] tracking-widest text-[#E31E24] font-bold block mb-1.5">
                      HOW TO PLAY:
                    </span>
                    <ul className="space-y-1">
                      {game.rules.map((rule, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-white/60 flex items-start gap-1.5 font-['Rajdhani',sans-serif]"
                        >
                          <span className="text-[#00AAFF]">✦</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Callout button */}
                  <div className="mt-5 text-center">
                    <div
                      className="py-1.5 px-3 rounded text-xs tracking-widest font-['Bebas_Neue',Impact,sans-serif] transition-colors"
                      style={{
                        background: `${game.borderColor}22`,
                        border: `1px solid ${game.borderColor}66`,
                        color: game.borderColor,
                      }}
                    >
                      {isExpanded ? "▲ TAP TO HIDE" : "▼ TAP FOR CHALLENGE INFO"}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Bottom panel border */}
      <div className="absolute bottom-0 inset-x-0 h-2 bg-gradient-to-r from-[#E31E24] via-[#0066CC] to-[#E31E24]" />
    </section>
  );
}
