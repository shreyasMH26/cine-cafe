import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { menuItems } from "../data/menuData";
import MenuCard from "./MenuCard";
import SpiderWebBackground from "./SpiderWebBackground";

export default function MenuSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="menu"
      ref={ref}
      className="relative py-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #000A1A 0%, #0A0A0F 50%, #0D0010 100%)" }}
    >
      <SpiderWebBackground opacity={0.05} />

      {/* Comic panel top border */}
      <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#E31E24] via-[#0066CC] to-[#E31E24]" />

      {/* "THWIP!" comic transition */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
        animate={inView ? { opacity: [0, 1, 0], scale: [0.5, 1.4, 1.4], rotate: [-15, 5, 5] } : {}}
        transition={{ duration: 0.8, times: [0, 0.3, 1] }}
        className="absolute top-8 left-6 comic-word text-3xl pointer-events-none z-20"
      >
        THWIP!
      </motion.div>

      <div className="max-w-2xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Film strip */}
          <div className="film-strip h-5 mb-6 opacity-40" />

          <div className="text-[#E31E24] tracking-[0.5em] text-xs mb-3 font-semibold">
            🕷️ THE CINE CAFÉ MENU
          </div>

          <h2
            className="font-['Bebas_Neue',Impact,sans-serif] text-5xl sm:text-6xl tracking-wider"
            style={{ color: "#fff", textShadow: "0 0 30px rgba(0,102,204,0.5)" }}
          >
            WHAT'S ON
            <span style={{ color: "#E31E24", textShadow: "0 0 20px rgba(227,30,36,0.7)" }}> THE MENU</span>
          </h2>

          <p
            className="mt-4 text-lg italic text-white/60"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            "With great hunger comes great food."
          </p>

          {/* Divider web line */}
          <div className="relative mt-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#E31E24]" />
            <div className="text-xl">🕸️</div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#E31E24]" />
          </div>
        </motion.div>

        {/* Menu grid - clean 2-column balanced grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {menuItems.map((item, i) => (
            <div key={item.id} className="w-full">
              <MenuCard item={item} index={i} total={menuItems.length} />
            </div>
          ))}
        </div>

        {/* Bottom web decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#0066CC]" />
            <div className="text-xl">🕷️</div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#0066CC]" />
          </div>
          <p className="mt-4 text-xs tracking-[0.3em] text-white/30">END OF MENU — PART 1</p>
        </motion.div>
      </div>

      {/* Comic panel bottom border */}
      <div className="absolute bottom-0 inset-x-0 h-2 bg-gradient-to-r from-[#0066CC] via-[#E31E24] to-[#0066CC]" />
    </section>
  );
}
