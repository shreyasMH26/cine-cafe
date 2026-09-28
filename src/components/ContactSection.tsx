import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const COORDINATORS = [
  { name: "Tanish.RD", phone: "+91 95386 65959", raw: "919538665959" },
  { name: "Rachana Pandit", phone: "+91 91085 40017", raw: "919108540017" },
];

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative py-16 overflow-hidden"
      style={{ background: "#050510" }}
    >
      {/* Top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-[#E31E24] opacity-40" />

      <div className="max-w-lg mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs tracking-[0.5em] text-[#0066CC] mb-2">FIND US AT</p>
          <h3
            className="font-['Bebas_Neue',Impact,sans-serif] text-3xl tracking-widest text-white mb-1"
          >
            📍 BAPUJI SAMUDAYA BHAVAN
          </h3>
          <p className="text-sm text-white/50 tracking-wider">SHAMANUR ROAD, DAVANAGERE</p>

          {/* Coordinators Contact Cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center">
            {COORDINATORS.map((coord) => (
              <motion.div
                key={coord.raw}
                whileHover={{ scale: 1.03 }}
                className="p-4 flex flex-col items-center gap-1 rounded"
                style={{
                  background: "linear-gradient(135deg, rgba(227,30,36,0.1), rgba(0,102,204,0.1))",
                  border: "1px solid rgba(227,30,36,0.4)",
                  boxShadow: "0 0 15px rgba(227,30,36,0.15)",
                }}
              >
                <span className="text-[10px] tracking-[0.3em] text-[#E31E24] font-bold">
                  COORDINATOR
                </span>
                <span className="font-['Bebas_Neue',Impact,sans-serif] text-2xl tracking-wider text-white">
                  {coord.name}
                </span>

                <div className="mt-2 flex items-center gap-2">
                  <a
                    href={`tel:${coord.raw}`}
                    className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-mono tracking-wider border border-white/20"
                  >
                    📞 {coord.phone}
                  </a>
                  <a
                    href={`https://wa.me/${coord.raw}?text=${encodeURIComponent(
                      "Hello! I am inquiring about The Cine Café (Stall 08) 🕷️"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] rounded text-xs font-bold border border-[#25D366]/40"
                    title="Chat on WhatsApp"
                  >
                    💬
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="mt-6 text-xs text-white/30 tracking-widest">FOR ENQUIRIES · TEAM DYNAMOS · STALL NO. 08</p>
        </motion.div>
      </div>
    </section>
  );
}
