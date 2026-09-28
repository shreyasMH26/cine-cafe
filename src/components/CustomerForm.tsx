import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

interface CustomerEntry {
  id: number;
  name: string;
  phone: string;
  token: string;
  time: string;
}

let tokenCounter = 1;

function generateToken() {
  const num = String(tokenCounter++).padStart(3, "0");
  return `CC-${num}`;
}

export default function CustomerForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [entries, setEntries] = useState<CustomerEntry[]>([]);
  const [lastAdded, setLastAdded] = useState<CustomerEntry | null>(null);
  const [torn, setTorn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const entry: CustomerEntry = {
      id: Date.now(),
      name: name.trim().toUpperCase(),
      phone: phone.trim(),
      token: generateToken(),
      time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
    };

    setEntries((prev) => [entry, ...prev]);
    setLastAdded(entry);
    setName("");
    setPhone("");
    setTorn(false);

    // Auto-clear the confirmation after 4 seconds
    setTimeout(() => setLastAdded(null), 4000);
  };

  return (
    <section
      ref={ref}
      className="relative py-16 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #040008 0%, #000510 100%)" }}
    >
      {/* Top tear border */}
      <svg className="absolute top-0 inset-x-0 w-full" viewBox="0 0 375 20" preserveAspectRatio="none" aria-hidden>
        <path
          d="M0,0 L375,0 L375,8 Q360,18 345,8 Q330,0 315,10 Q300,18 285,8 Q270,0 255,12 Q240,20 225,8 Q210,0 195,14 Q180,20 165,8 Q150,0 135,12 Q120,20 105,8 Q90,0 75,14 Q60,20 45,8 Q30,0 15,12 Q8,18 0,8 Z"
          fill="#E31E24"
          opacity="0.7"
        />
      </svg>

      <div className="max-w-lg mx-auto px-4 pt-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="text-xs tracking-[0.5em] text-[#E31E24] mb-2">🎟️ TICKET STUB</div>
          <h2
            className="font-['Bebas_Neue',Impact,sans-serif] text-4xl sm:text-5xl tracking-widest text-white"
            style={{ textShadow: "0 0 20px rgba(227,30,36,0.5)" }}
          >
            CUSTOMER{" "}
            <span style={{ color: "#E31E24" }}>DETAILS</span>
          </h2>
          <p className="mt-2 text-sm text-white/40 tracking-wider">
            Fill in after tearing the ticket 🕷️
          </p>
        </motion.div>

        {/* Form card styled as a torn ticket stub */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0D0015, #000A1A)",
            border: "1.5px solid #E31E24",
            boxShadow: "0 0 40px rgba(227,30,36,0.15)",
          }}
        >
          {/* Perforated top edge (torn look) */}
          <div
            className="h-4 w-full"
            style={{
              backgroundImage: "radial-gradient(circle at center, #040008 4px, #E31E24 4px, #E31E24 5px, transparent 5px)",
              backgroundSize: "18px 18px",
              backgroundPosition: "top center",
              borderBottom: "1px dashed rgba(227,30,36,0.4)",
            }}
          />

          {/* Stub header */}
          <div className="px-5 py-3 flex items-center justify-between"
            style={{ borderBottom: "1px solid rgba(227,30,36,0.2)", background: "rgba(227,30,36,0.06)" }}>
            <div>
              <div className="font-['Bebas_Neue',Impact,sans-serif] text-lg tracking-widest text-white">
                THE CINE CAFÉ
              </div>
              <div className="text-[10px] tracking-[0.4em] text-[#E31E24]/70">STALL NO. 08 · TEAM DYNAMOS</div>
            </div>
            <div className="text-3xl" style={{ filter: "drop-shadow(0 0 8px rgba(227,30,36,0.6))" }}>🕷️</div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {/* Name */}
            <div>
              <label className="block text-[10px] tracking-[0.4em] text-[#E31E24]/70 mb-1.5">
                CUSTOMER NAME *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
                required
                className="w-full px-4 py-3 bg-black/40 text-white placeholder-white/20 tracking-wider text-sm outline-none font-['Rajdhani',sans-serif]"
                style={{
                  border: "1px solid rgba(227,30,36,0.4)",
                  boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#E31E24")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(227,30,36,0.4)")}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[10px] tracking-[0.4em] text-[#E31E24]/70 mb-1.5">
                PHONE NUMBER (OPTIONAL)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                className="w-full px-4 py-3 bg-black/40 text-white placeholder-white/20 tracking-wider text-sm outline-none font-['Rajdhani',sans-serif]"
                style={{
                  border: "1px solid rgba(0,102,204,0.4)",
                  boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#0066CC")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(0,102,204,0.4)")}
              />
            </div>

            {/* Torn confirmation toggle */}
            <div
              className="flex items-center gap-3 cursor-pointer select-none"
              onClick={() => setTorn((t) => !t)}
            >
              <div
                className="w-5 h-5 flex items-center justify-center border transition-colors"
                style={{
                  borderColor: torn ? "#E31E24" : "rgba(255,255,255,0.2)",
                  background: torn ? "rgba(227,30,36,0.2)" : "transparent",
                }}
              >
                {torn && <span className="text-[#E31E24] text-xs font-bold">✓</span>}
              </div>
              <span className="text-sm text-white/60 tracking-wider">Ticket has been torn ✂️</span>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(227,30,36,0.5)" }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-4 font-['Bebas_Neue',Impact,sans-serif] text-xl tracking-[0.4em] text-white"
              style={{
                background: "linear-gradient(135deg, rgba(227,30,36,0.8), rgba(180,20,20,0.9))",
                border: "1px solid #E31E24",
              }}
            >
              🕷️ REGISTER CUSTOMER
            </motion.button>
          </form>
        </motion.div>

        {/* Success confirmation */}
        <AnimatePresence>
          {lastAdded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="mt-4 p-4 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(0,102,204,0.15), rgba(0,40,80,0.9))",
                border: "1.5px solid #0066CC",
                boxShadow: "0 0 30px rgba(0,102,204,0.3)",
              }}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">✅</div>
                <div>
                  <div className="text-[10px] tracking-[0.4em] text-[#0066CC] mb-1">CUSTOMER REGISTERED</div>
                  <div className="font-['Bebas_Neue',Impact,sans-serif] text-2xl text-white tracking-wider">
                    {lastAdded.name}
                  </div>
                  {lastAdded.phone && (
                    <div className="text-sm text-white/50">{lastAdded.phone}</div>
                  )}
                  <div className="mt-2 flex items-center gap-3">
                    <div
                      className="px-3 py-1 font-['Bebas_Neue',Impact,sans-serif] text-sm tracking-widest"
                      style={{ background: "rgba(227,30,36,0.2)", border: "1px solid #E31E24", color: "#E31E24" }}
                    >
                      TOKEN: {lastAdded.token}
                    </div>
                    <div className="text-xs text-white/30">{lastAdded.time}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Customer log */}
        {entries.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="text-[10px] tracking-[0.5em] text-white/30">
                REGISTERED TODAY — {entries.length} CUSTOMER{entries.length !== 1 ? "S" : ""}
              </div>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1"
              style={{ scrollbarWidth: "thin", scrollbarColor: "#E31E24 transparent" }}>
              {entries.map((entry, i) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i === 0 ? 0 : 0 }}
                  className="flex items-center justify-between px-4 py-2"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs font-mono"
                      style={{ color: "#E31E24" }}
                    >
                      {entry.token}
                    </span>
                    <span className="text-sm text-white font-['Rajdhani',sans-serif] font-semibold">
                      {entry.name}
                    </span>
                    {entry.phone && (
                      <span className="text-xs text-white/30">{entry.phone}</span>
                    )}
                  </div>
                  <span className="text-xs text-white/20">{entry.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
