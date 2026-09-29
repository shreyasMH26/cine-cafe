import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function SponsorSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative py-20 overflow-hidden"
      style={{ background: "#F5F5F5" }}
    >
      {/* Top comic panel border */}
      <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#E31E24] via-[#0066CC] to-[#E31E24]" />

      {/* Speed-line stripes */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(-45deg, #000 0, #000 1px, transparent 0, transparent 50%)",
          backgroundSize: "6px 6px",
        }}
      />

      <div className="max-w-sm mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Label */}
          <div className="text-xs tracking-[0.5em] text-[#E31E24] font-semibold mb-2">
            ✦ PARTNER ✦
          </div>
          <p
            className="font-['Bebas_Neue',Impact,sans-serif] text-4xl tracking-[0.35em] text-gray-800 mb-8"
          >
            POWERED BY
          </p>

          {/* Logo container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center justify-center px-12 py-8 bg-white"
            style={{
              border: "2px solid #E31E24",
              boxShadow: "4px 4px 0 #E31E24, -2px -2px 0 #0066CC",
            }}
          >
            {/* XTICH logo placeholder — replace <img> src with actual logo */}
            <div className="flex flex-col items-center gap-1">
              <div
                className="font-['Bebas_Neue',Impact,sans-serif] text-6xl tracking-[0.2em] text-black"
                style={{ letterSpacing: "0.15em" }}
              >
                XTICH
              </div>
            </div>
            {/*
              TO USE REAL LOGO:
              Replace the div above with:
              <img src="/assets/xtich-logo.png" alt="XTICH" className="h-16 object-contain" />
            */}
          </motion.div>

          <p className="mt-6 text-xs text-gray-500 tracking-wider">
            Powering Web Bites · Team Dynamos
          </p>
        </motion.div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 inset-x-0 h-2 bg-gradient-to-r from-[#0066CC] via-[#E31E24] to-[#0066CC]" />
    </section>
  );
}
