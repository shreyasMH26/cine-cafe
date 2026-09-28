import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            {["+91 95386 65959", "+91 91085 40017"].map((num) => (
              <motion.a
                key={num}
                href={`tel:${num.replace(/\s/g, "")}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 font-['Bebas_Neue',Impact,sans-serif] text-lg tracking-widest text-white"
                style={{
                  background: "linear-gradient(135deg, rgba(227,30,36,0.1), rgba(0,102,204,0.1))",
                  border: "1px solid rgba(227,30,36,0.4)",
                  boxShadow: "0 0 10px rgba(227,30,36,0.15)",
                }}
              >
                📞 {num}
              </motion.a>
            ))}
          </div>

          <p className="mt-6 text-xs text-white/30 tracking-widest">FOR ENQUIRIES · TEAM DYNAMOS</p>
        </motion.div>
      </div>
    </section>
  );
}
