import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const details = [
  { label: "DATE", value: "10 OCTOBER 2026", icon: "📅" },
  { label: "TIME", value: "3:00 PM – 5:00 PM", icon: "🕒" },
  {
    label: "LOCATION",
    value: "BAPUJI SAMUDAYA BHAVAN\nSHAMANUR ROAD\nDAVANAGERE",
    icon: "📍",
  },
  { label: "STALL", value: "WEB BITES\nSTALL NO. 08", icon: "🎪" },
];

export default function MissionDetails() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #000510 0%, #0A0A0F 100%)" }}
    >
      {/* Diagonal background shapes */}
      <div
        className="absolute top-0 inset-x-0 h-2 bg-[#0066CC]"
        style={{ opacity: 0.6 }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(0,102,204,0.05) 0%, transparent 50%, rgba(227,30,36,0.05) 100%)",
        }}
      />

      <div className="max-w-lg mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <div className="text-xs tracking-[0.5em] text-[#0066CC] mb-2">🕷️</div>
          <h2
            className="font-['Bebas_Neue',Impact,sans-serif] text-5xl tracking-widest"
            style={{ color: "#fff", textShadow: "0 0 30px rgba(0,102,204,0.5)" }}
          >
            MISSION{" "}
            <span style={{ color: "#0066CC", textShadow: "0 0 20px rgba(0,102,204,0.8)" }}>
              DETAILS
            </span>
          </h2>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#0066CC]" />
            <div className="text-[#0066CC]">◆</div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#0066CC]" />
          </div>
        </motion.div>

        {/* Mission card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0D0015, #000A1A)",
            border: "1.5px solid #0066CC",
            boxShadow: "0 0 0 1px rgba(0,102,204,0.3), 0 0 40px rgba(0,102,204,0.15)",
          }}
        >
          {/* Web corner top-right */}
          <svg className="absolute top-0 right-0 w-24 h-24 opacity-10" viewBox="0 0 80 80" aria-hidden>
            <g fill="none" stroke="#0066CC" strokeWidth="0.6">
              {[15, 30, 45, 60, 75].map((r) => (
                <circle key={r} cx="80" cy="0" r={r} />
              ))}
            </g>
          </svg>

          {/* Mission file header */}
          <div
            className="px-5 py-3 flex items-center gap-3"
            style={{ background: "rgba(0,102,204,0.1)", borderBottom: "1px solid rgba(0,102,204,0.3)" }}
          >
            <div className="text-[#0066CC] text-sm">⚡</div>
            <span
              className="font-['Bebas_Neue',Impact,sans-serif] text-sm tracking-[0.4em] text-[#0066CC]"
            >
              S.H.I.E.L.D. MISSION FILE — OPERATION WEB BITES
            </span>
          </div>

          {/* Detail rows */}
          <div className="p-5 space-y-5">
            {details.map(({ label, value, icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex gap-4"
              >
                <div className="text-2xl">{icon}</div>
                <div>
                  <div className="text-[10px] tracking-[0.4em] text-[#0066CC]/70 mb-0.5">{label}</div>
                  <div
                    className="font-['Bebas_Neue',Impact,sans-serif] text-xl tracking-widest text-white whitespace-pre-line"
                  >
                    {value}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Classified stamp */}
          <div className="px-5 pb-5">
            <div
              className="inline-block px-4 py-1 border-2 border-[#E31E24]/60 text-[#E31E24]/60 font-['Bebas_Neue',Impact,sans-serif] tracking-widest text-sm rotate-[-3deg]"
            >
              MISSION STATUS: ACTIVE
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
