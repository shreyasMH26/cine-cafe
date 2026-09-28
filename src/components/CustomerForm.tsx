import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

interface CustomerEntry {
  id: number;
  name: string;
  phone: string;
  token: string;
  time: string;
  torn: boolean;
}

const COORDINATORS = [
  { name: "Tanish.RD", phone: "+91 95386 65959", raw: "919538665959" },
  { name: "Rachana Pandit", phone: "+91 91085 40017", raw: "919108540017" },
];

export default function CustomerForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [torn, setTorn] = useState(true);
  const [selectedCoord, setSelectedCoord] = useState(COORDINATORS[0].raw);

  // Clear legacy test data on initial load to ensure it starts fresh at 0
  useEffect(() => {
    localStorage.removeItem("cine_cafe_customers");
    localStorage.removeItem("cine_cafe_now_serving");
  }, []);

  // Stored customer entries (starts fresh at 0)
  const [entries, setEntries] = useState<CustomerEntry[]>(() => {
    try {
      const saved = localStorage.getItem("cine_cafe_customers_v3");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Live Token Counter: Now Serving (starts fresh at 0)
  const [nowServing, setNowServing] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("cine_cafe_now_serving_v3");
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [lastAdded, setLastAdded] = useState<CustomerEntry | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem("cine_cafe_customers_v3", JSON.stringify(entries));
    } catch {
      // ignore
    }
  }, [entries]);

  useEffect(() => {
    try {
      localStorage.setItem("cine_cafe_now_serving_v3", String(nowServing));
    } catch {
      // ignore
    }
  }, [nowServing]);

  const activeCoordinator =
    COORDINATORS.find((c) => c.raw === selectedCoord) || COORDINATORS[0];

  // Automatic next token sequence based on total registered entries
  const nextTokenNum = String(entries.length + 1).padStart(3, "0");
  const nextToken = `CC-${nextTokenNum}`;
  const nowServingStr =
    nowServing === 0 ? "CC-000" : `CC-${String(nowServing).padStart(3, "0")}`;

  const createWhatsAppUrl = (entry: CustomerEntry, coordRaw: string) => {
    const coordObj =
      COORDINATORS.find((c) => c.raw === coordRaw) || COORDINATORS[0];
    const text =
      `🕷️ *THE CINE CAFÉ — TICKET REGISTRATION* 🎟️\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `🎫 *Token:* ${entry.token}\n` +
      `👤 *Customer Name:* ${entry.name}\n` +
      `📱 *Phone:* ${entry.phone || "Not provided"}\n` +
      `✂️ *Ticket Status:* ${entry.torn ? "Torn & Verified ✅" : "Pending ⏳"}\n` +
      `🎪 *Stall:* Stall No. 08 (Team Dynamos)\n` +
      `📞 *Coordinator Alert:* ${coordObj.name}\n` +
      `🕒 *Time:* ${entry.time}\n` +
      `📍 *Location:* Bapuji Samudaya Bhavan, Davanagere\n` +
      `━━━━━━━━━━━━━━━━━━━━`;
    return `https://wa.me/${coordRaw}?text=${encodeURIComponent(text)}`;
  };

  // Reset all counters back to 0
  const resetToZero = () => {
    if (window.confirm("Reset all token counters and customer log back to 0?")) {
      setEntries([]);
      setNowServing(0);
      setLastAdded(null);
      localStorage.removeItem("cine_cafe_customers_v3");
      localStorage.removeItem("cine_cafe_now_serving_v3");
      localStorage.removeItem("cine_cafe_customers");
      localStorage.removeItem("cine_cafe_now_serving");
    }
  };

  // Automatic enroll function
  const enrollCustomer = (custName: string, custPhone: string) => {
    const assignedToken = nextToken;
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const entry: CustomerEntry = {
      id: Date.now(),
      name: custName.trim().toUpperCase(),
      phone: custPhone.trim(),
      token: assignedToken,
      time: timeStr,
      torn,
    };

    // Update list: next token automatically advances
    setEntries((prev) => [entry, ...prev]);

    // If counter is at 0, automatically start serving token 1
    if (nowServing === 0) {
      setNowServing(1);
    }

    setLastAdded(entry);
    setName("");
    setPhone("");

    // Open WhatsApp notification
    const waUrl = createWhatsAppUrl(entry, selectedCoord);
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    enrollCustomer(name, phone);
  };

  // Quick 1-tap enroll for walk-ins without typing
  const handleQuickEnroll = () => {
    enrollCustomer(`WALK-IN #${entries.length + 1}`, "");
  };

  return (
    <section
      ref={ref}
      id="register"
      className="relative py-16 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #040008 0%, #000510 100%)" }}
    >
      {/* Top tear border */}
      <svg
        className="absolute top-0 inset-x-0 w-full"
        viewBox="0 0 375 20"
        preserveAspectRatio="none"
        aria-hidden
      >
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
          className="text-center mb-6"
        >
          <div className="text-xs tracking-[0.5em] text-[#E31E24] mb-2">
            🎟️ TICKET STUB & QUEUE
          </div>
          <h2
            className="font-['Bebas_Neue',Impact,sans-serif] text-4xl sm:text-5xl tracking-widest text-white"
            style={{ textShadow: "0 0 20px rgba(227,30,36,0.5)" }}
          >
            CUSTOMER <span style={{ color: "#E31E24" }}>DETAILS</span>
          </h2>
          <p className="mt-2 text-sm text-white/50 tracking-wider">
            Auto-enrolls next token & notifies Tanish.RD or Rachana Pandit on WhatsApp
          </p>
        </motion.div>

        {/* ═══════════════ TOKEN COUNTER HUD ═══════════════ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-6 p-4 rounded relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(227,30,36,0.12), rgba(0,102,204,0.12))",
            border: "1.5px solid rgba(227,30,36,0.5)",
            boxShadow:
              "0 0 25px rgba(227,30,36,0.2), inset 0 0 15px rgba(0,102,204,0.1)",
          }}
        >
          {/* Header row with Reset to 0 button */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E31E24] animate-ping" />
              <span className="text-[11px] font-['Bebas_Neue',Impact,sans-serif] tracking-[0.3em] text-[#E31E24]">
                LIVE TOKEN QUEUE
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={resetToZero}
                className="px-2 py-0.5 text-[10px] tracking-wider bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-300 rounded transition-colors"
                title="Reset all counters back to 0"
              >
                ↺ Reset to 0
              </button>
              <span className="text-[10px] tracking-widest text-white/40 font-mono">
                STALL 08
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            {/* Box 1: Now Serving */}
            <div
              className="p-3 bg-black/60 rounded border border-[#00AAFF]/40 flex flex-col items-center justify-center relative"
              style={{ boxShadow: "inset 0 0 15px rgba(0,170,255,0.15)" }}
            >
              <span className="text-[10px] tracking-[0.3em] text-[#00AAFF] font-bold mb-1">
                NOW SERVING
              </span>
              <span
                className="font-['Bebas_Neue',Impact,sans-serif] text-4xl sm:text-5xl tracking-widest"
                style={{
                  color: nowServing === 0 ? "#888899" : "#00AAFF",
                  textShadow:
                    nowServing === 0
                      ? "none"
                      : "0 0 20px rgba(0,170,255,0.8)",
                }}
              >
                {nowServingStr}
              </span>

              {/* Counter Operator Controls */}
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setNowServing((prev) => Math.max(0, prev - 1))}
                  className="px-2 py-0.5 text-xs bg-white/10 hover:bg-white/20 text-white rounded font-mono border border-white/20"
                  title="Previous token"
                >
                  ◀
                </button>
                <span className="text-[9px] text-white/40 tracking-wider">
                  {nowServing === 0 ? "ZERO" : `#${nowServing}`}
                </span>
                <button
                  type="button"
                  onClick={() => setNowServing((prev) => prev + 1)}
                  className="px-2 py-0.5 text-xs bg-[#00AAFF]/30 hover:bg-[#00AAFF]/50 text-[#00AAFF] rounded font-mono border border-[#00AAFF]/50 font-bold"
                  title="Next token"
                >
                  ▶
                </button>
              </div>
            </div>

            {/* Box 2: Total Registered & Next Token */}
            <div
              className="p-3 bg-black/60 rounded border border-[#E31E24]/40 flex flex-col items-center justify-center"
              style={{ boxShadow: "inset 0 0 15px rgba(227,30,36,0.15)" }}
            >
              <span className="text-[10px] tracking-[0.3em] text-[#E31E24] font-bold mb-1">
                NEXT TO ENROLL
              </span>
              <span
                className="font-['Bebas_Neue',Impact,sans-serif] text-4xl sm:text-5xl tracking-widest"
                style={{
                  color: "#E31E24",
                  textShadow: "0 0 20px rgba(227,30,36,0.8)",
                }}
              >
                {nextToken}
              </span>
              <div className="mt-2 text-[10px] text-white/60 tracking-wider">
                Total Enrolled:{" "}
                <span className="font-bold text-white text-xs">
                  {entries.length}
                </span>
              </div>
            </div>
          </div>

          {/* Quick 1-tap enroll button for stall crowd rush */}
          <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-[10px] tracking-wider text-white/40">
              Busy queue? One-tap enrollment:
            </span>
            <button
              type="button"
              onClick={handleQuickEnroll}
              className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-300 rounded text-xs font-semibold tracking-wider flex items-center gap-1"
            >
              ⚡ Quick Enroll ({nextToken})
            </button>
          </div>
        </motion.div>

        {/* ═══════════════ FORM CARD ═══════════════ */}
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
          {/* Perforated top edge */}
          <div
            className="h-4 w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, #040008 4px, #E31E24 4px, #E31E24 5px, transparent 5px)",
              backgroundSize: "18px 18px",
              backgroundPosition: "top center",
              borderBottom: "1px dashed rgba(227,30,36,0.4)",
            }}
          />

          {/* Stub header */}
          <div
            className="px-5 py-3 flex items-center justify-between"
            style={{
              borderBottom: "1px solid rgba(227,30,36,0.2)",
              background: "rgba(227,30,36,0.06)",
            }}
          >
            <div>
              <div className="font-['Bebas_Neue',Impact,sans-serif] text-lg tracking-widest text-white">
                THE CINE CAFÉ
              </div>
              <div className="text-[10px] tracking-[0.4em] text-[#E31E24]/70">
                STALL NO. 08 · TEAM DYNAMOS
              </div>
            </div>
            <div
              className="text-3xl"
              style={{ filter: "drop-shadow(0 0 8px rgba(227,30,36,0.6))" }}
            >
              🕷️
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {/* Customer Name */}
            <div>
              <label className="block text-[10px] tracking-[0.4em] text-[#E31E24]/80 mb-1.5 font-bold">
                CUSTOMER NAME *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter customer name"
                required
                className="w-full px-4 py-3 bg-black/50 text-white placeholder-white/20 tracking-wider text-sm outline-none font-['Rajdhani',sans-serif]"
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
              <label className="block text-[10px] tracking-[0.4em] text-[#0066CC]/90 mb-1.5 font-bold">
                PHONE NUMBER (OPTIONAL)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                className="w-full px-4 py-3 bg-black/50 text-white placeholder-white/20 tracking-wider text-sm outline-none font-['Rajdhani',sans-serif]"
                style={{
                  border: "1px solid rgba(0,102,204,0.4)",
                  boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#0066CC")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(0,102,204,0.4)")}
              />
            </div>

            {/* Coordinator Selector */}
            <div>
              <label className="block text-[10px] tracking-[0.4em] text-white/70 mb-1.5 font-semibold">
                NOTIFY COORDINATOR VIA WHATSAPP *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {COORDINATORS.map((coord) => {
                  const isSelected = selectedCoord === coord.raw;
                  return (
                    <button
                      key={coord.raw}
                      type="button"
                      onClick={() => setSelectedCoord(coord.raw)}
                      className={`p-2.5 text-left border rounded transition-all flex flex-col ${
                        isSelected
                          ? "border-[#25D366] bg-[#25D366]/15 text-white"
                          : "border-white/15 bg-black/40 text-white/50 hover:border-white/30"
                      }`}
                    >
                      <span className="font-['Bebas_Neue',Impact,sans-serif] text-base tracking-wider text-white">
                        {coord.name}
                      </span>
                      <span className="text-[10px] text-white/60 tracking-wider">
                        {coord.phone}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Torn confirmation */}
            <div
              className="flex items-center gap-3 cursor-pointer select-none py-1"
              onClick={() => setTorn((t) => !t)}
            >
              <div
                className="w-5 h-5 flex items-center justify-center border transition-colors"
                style={{
                  borderColor: torn ? "#E31E24" : "rgba(255,255,255,0.2)",
                  background: torn ? "rgba(227,30,36,0.25)" : "transparent",
                }}
              >
                {torn && <span className="text-[#E31E24] text-xs font-bold">✓</span>}
              </div>
              <span className="text-sm text-white/70 tracking-wider">
                Ticket has been torn & verified ✂️
              </span>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 30px rgba(37,211,102,0.5)",
              }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-4 font-['Bebas_Neue',Impact,sans-serif] text-xl tracking-[0.3em] text-white flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(135deg, #128C7E, #25D366)",
                border: "1px solid #25D366",
                boxShadow: "0 0 20px rgba(37,211,102,0.3)",
              }}
            >
              <span>
                💬 ENROLL {nextToken} & SEND TO {activeCoordinator.name.toUpperCase()}
              </span>
            </motion.button>

            <p className="text-[11px] text-center text-white/40 tracking-wider">
              Enrolls token <span className="text-white font-bold">{nextToken}</span> and refreshes form for the next customer
            </p>
          </form>
        </motion.div>

        {/* ═══════════════ SUCCESS BANNER ═══════════════ */}
        <AnimatePresence>
          {lastAdded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="mt-6 p-5 relative overflow-hidden rounded"
              style={{
                background:
                  "linear-gradient(135deg, rgba(37,211,102,0.15), rgba(7,94,84,0.9))",
                border: "1.5px solid #25D366",
                boxShadow: "0 0 30px rgba(37,211,102,0.3)",
              }}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">✅</div>
                <div className="flex-1">
                  <div className="text-[10px] tracking-[0.4em] text-[#25D366] font-bold mb-1">
                    ENROLLED! READY FOR NEXT CUSTOMER ({nextToken})
                  </div>
                  <div className="font-['Bebas_Neue',Impact,sans-serif] text-3xl text-white tracking-wider">
                    {lastAdded.name}
                  </div>
                  {lastAdded.phone && (
                    <div className="text-sm text-white/70">{lastAdded.phone}</div>
                  )}

                  <div className="mt-2 flex items-center gap-3">
                    <div
                      className="px-3 py-1 font-['Bebas_Neue',Impact,sans-serif] text-base tracking-widest text-[#E31E24]"
                      style={{
                        background: "rgba(227,30,36,0.2)",
                        border: "1px solid #E31E24",
                      }}
                    >
                      TOKEN: {lastAdded.token}
                    </div>
                    <div className="text-xs text-white/40">{lastAdded.time}</div>
                  </div>

                  {/* Fallback WhatsApp Buttons */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex flex-col gap-2">
                    <span className="text-[10px] tracking-wider text-white/60">
                      Send notification directly to:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={createWhatsAppUrl(lastAdded, COORDINATORS[0].raw)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] text-black font-semibold text-xs tracking-wider rounded"
                      >
                        💬 Tanish.RD ({COORDINATORS[0].phone})
                      </a>
                      <a
                        href={createWhatsAppUrl(lastAdded, COORDINATORS[1].raw)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#128C7E] text-white font-semibold text-xs tracking-wider rounded"
                      >
                        💬 Rachana Pandit ({COORDINATORS[1].phone})
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══════════════ CUSTOMER LOG ═══════════════ */}
        {entries.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] tracking-[0.5em] text-white/50 font-bold">
                ENROLLED LOG — {entries.length} REGISTERED
              </div>
              <button
                type="button"
                onClick={resetToZero}
                className="text-[10px] tracking-wider text-red-400/60 hover:text-red-400 underline"
              >
                Clear all (Reset to 0)
              </button>
            </div>

            <div
              className="space-y-2 max-h-64 overflow-y-auto pr-1"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#E31E24 transparent",
              }}
            >
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between px-4 py-2.5 rounded"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs font-mono font-bold"
                      style={{ color: "#E31E24" }}
                    >
                      {entry.token}
                    </span>
                    <span className="text-sm text-white font-['Rajdhani',sans-serif] font-semibold">
                      {entry.name}
                    </span>
                    {entry.phone && (
                      <span className="text-xs text-white/40">{entry.phone}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white/30">{entry.time}</span>
                    <a
                      href={createWhatsAppUrl(entry, selectedCoord)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Resend to WhatsApp"
                      className="text-xs px-2 py-1 bg-[#25D366]/20 border border-[#25D366]/50 text-[#25D366] rounded hover:bg-[#25D366]/40"
                    >
                      💬
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
