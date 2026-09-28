import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import type { MenuItem } from "../data/menuData";

const FOOD_EMOJIS: Record<string, string> = {
  "fried-rice": "🍚",
  "gobi": "🥦",
  "masala-soda": "🥤",
  "asian-salad": "🥗",
  "carrot-halwa": "🥕",
};

const DESCRIPTIONS: Record<string, string> = {
  "fried-rice": "Wok-tossed masala fried rice — smoky, spicy & heroic.",
  "gobi": "Crispy cauliflower bites seasoned with bold spices.",
  "masala-soda": "Fizzy, tangy, ice-cold masala soda. Web-slinging fuel.",
  "asian-salad": "Fresh crunchy greens with an Asian-inspired kick.",
  "carrot-halwa": "Rich warm halwa — the sweetest finale to your mission.",
};

interface Props {
  item: MenuItem;
  index: number;
}

export default function MenuCard({ item, index }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 60, rotate: index % 2 === 0 ? -5 : 5 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 18,
        delay: index * 0.1,
      },
    },
  };

  const emoji = FOOD_EMOJIS[item.id] || item.emoji;
  const desc = DESCRIPTIONS[item.id] || item.description;

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative group cursor-default overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0D0015 0%, #000A1A 100%)",
        border: "1.5px solid #E31E24",
        boxShadow: "0 0 0 1px rgba(227,30,36,0.2), 0 4px 30px rgba(0,0,0,0.8)",
      }}
    >
      {/* Web corner decoration */}
      <svg className="absolute top-0 left-0 w-16 h-16 opacity-20 group-hover:opacity-40 transition-opacity" viewBox="0 0 60 60" aria-hidden>
        <g fill="none" stroke="#E31E24" strokeWidth="0.8">
          {[10, 20, 30, 40, 50].map((r) => (
            <circle key={r} cx="0" cy="0" r={r} />
          ))}
          {[0, 15, 30, 45, 60, 75, 90].map((a) => {
            const rad = (a * Math.PI) / 180;
            return <line key={a} x1="0" y1="0" x2={Math.cos(rad) * 55} y2={Math.sin(rad) * 55} />;
          })}
        </g>
      </svg>

      {/* Blue glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: "inset 0 0 40px rgba(0,102,204,0.15)", background: "linear-gradient(135deg, rgba(0,102,204,0.05), transparent)" }}
      />

      {/* Comic word badge */}
      <div
        className="absolute top-3 right-3 comic-word text-xs z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ fontFamily: "Bebas Neue, Impact, sans-serif" }}
      >
        {item.comicWord}
      </div>

      {/* Food emoji / image area */}
      <div
        className="relative h-40 flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(227,30,36,0.08), rgba(0,102,204,0.08))",
          borderBottom: "1px solid rgba(227,30,36,0.3)",
        }}
      >
        <motion.div
          className="text-7xl"
          whileHover={{ scale: 1.15 }}
          transition={{ type: "spring", stiffness: 200 }}
          style={{ filter: "drop-shadow(0 0 20px rgba(227,30,36,0.5))" }}
        >
          {emoji}
        </motion.div>

        {/* Scan line effect */}
        <motion.div
          className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#E31E24] to-transparent opacity-40"
          animate={{ y: [0, 160, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: index * 0.4 }}
        />

        {/* Halftone corners */}
        <div className="absolute top-0 left-0 w-8 h-8 halftone opacity-30" />
        <div className="absolute bottom-0 right-0 w-8 h-8 halftone opacity-30" />
      </div>

      {/* Card content */}
      <div className="p-4">
        {/* Comic panel number */}
        <div className="text-[10px] tracking-[0.4em] text-[#E31E24]/50 mb-1">
          PANEL {String(index + 1).padStart(2, "0")} / 05
        </div>

        {/* Name */}
        <h3
          className="font-['Bebas_Neue',Impact,sans-serif] text-2xl tracking-wider text-white mb-1 group-hover:text-[#E31E24]"
          style={{ transition: "color 0.2s" }}
        >
          {item.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/50 leading-relaxed">{desc}</p>

        {/* Web sling indicator on hover */}
        <motion.div
          className="mt-3 h-px bg-gradient-to-r from-[#E31E24] to-[#0066CC] origin-left"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}
