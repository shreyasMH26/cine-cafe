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

const ORDER_ITEMS = [
  "Fried Rice",
  "Gobi",
  "Noodles",
  "American Sweet Corn",
  "Mocktail",
  "Carrot Halwa",
];

export default function CustomerForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCoord, setSelectedCoord] = useState(COORDINATORS[0].raw);

  // Stored customer entries (kept in storage for WhatsApp sequence and staff)
  const [entries, setEntries] = useState<CustomerEntry[]>(() => {
    try {
      const saved = localStorage.getItem("cine_cafe_customers_v3");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Now serving state
  const [nowServing, setNowServing] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("cine_cafe_now_serving_v3");
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  // Personal token confirmation shown ONLY to the person who just registered
  const [myOrder, setMyOrder] = useState<CustomerEntry | null>(null);

  // Hidden Staff / Coordinator Portal (Protected by simple Stall PIN: 08)
  const [staffMode, setStaffMode] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinError, setPinError] = useState(false);

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

  const nextTokenNum = String(entries.length + 1).padStart(3, "0");
  const nextToken = `CC-${nextTokenNum}`;
  const nowServingStr =
    nowServing === 0 ? "STANDBY" : `CC-${String(nowServing).padStart(3, "0")}`;

  // Formatted order receipt message sent to WhatsApp
  const createWhatsAppUrl = (entry: CustomerEntry, coordRaw: string) => {
    const coordObj =
      COORDINATORS.find((c) => c.raw === coordRaw) || COORDINATORS[0];
    const itemsList = ORDER_ITEMS.map((item, i) => `   ${i + 1}. ${item}`).join(
      "\n"
    );

    const text =
      `🕷️ *WEB BITES — NEW FOOD ORDER* 🎟️\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `🎫 *Order Token:* ${entry.token}\n` +
      `👤 *Customer Name:* ${entry.name}\n` +
      `📱 *Customer Phone:* ${entry.phone || "Not provided"}\n` +
      `🍽️ *Meal Package:* The Complete Web Bites Experience (₹199)\n` +
      `🍱 *Items Ordered:*\n${itemsList}\n` +
      `✂️ *Ticket Status:* Torn & Verified ✅\n` +
      `🎪 *Stall:* Stall No. 08 (Team Dynamos)\n` +
      `📞 *Coordinator Alert:* ${coordObj.name}\n` +
      `🕒 *Order Time:* ${entry.time}\n` +
      `📍 *Venue:* Bapuji Samudaya Bhavan, Davanagere\n` +
      `━━━━━━━━━━━━━━━━━━━━`;
    return `https://wa.me/${coordRaw}?text=${encodeURIComponent(text)}`;
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const assignedToken = nextToken;
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const entry: CustomerEntry = {
      id: Date.now(),
      name: name.trim().toUpperCase(),
      phone: phone.trim(),
      token: assignedToken,
      time: timeStr,
      torn: true,
    };

    setEntries((prev) => [entry, ...prev]);

    if (nowServing === 0) {
      setNowServing(1);
    }

    // Set the user's private digital order receipt
    setMyOrder(entry);
    setName("");
    setPhone("");

    // Open WhatsApp to notify coordinators with full order
    const waUrl = createWhatsAppUrl(entry, selectedCoord);
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  // Staff unlock verification (Stall PIN: 08)
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === "08" || pinInput.trim() === "008") {
      setStaffMode(true);
      setShowPinModal(false);
      setPinInput("");
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const resetAllToZero = () => {
    if (window.confirm("RESET QUEUE: Clear all orders and reset token counter back to 0?")) {
      setEntries([]);
      setNowServing(0);
      setMyOrder(null);
      localStorage.removeItem("cine_cafe_customers_v3");
      localStorage.removeItem("cine_cafe_now_serving_v3");
    }
  };

  return (
    <section
      ref={ref}
      id="order-ticket"
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
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <div className="text-xs tracking-[0.5em] text-[#E31E24] mb-2 font-semibold">
            🎟️ STALL NO. 08 · TICKET REGISTRATION
          </div>
          <h2
            className="font-['Bebas_Neue',Impact,sans-serif] text-4xl sm:text-5xl tracking-widest text-white"
            style={{ textShadow: "0 0 20px rgba(227,30,36,0.5)" }}
          >
            CONFIRM <span style={{ color: "#E31E24" }}>YOUR ORDER</span>
          </h2>
          <p className="mt-2 text-sm text-white/60 tracking-wider">
            Enter your details below — generates your Token & sends order to the kitchen
          </p>
        </motion.div>

        {/* ═══════════════ PUBLIC ORDER FORM (Clean & Private) ═══════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative overflow-hidden rounded"
          style={{
            background: "linear-gradient(135deg, #0D0015, #000A1A)",
            border: "1.5px solid #E31E24",
            boxShadow: "0 0 35px rgba(227,30,36,0.15)",
          }}
        >
          {/* Perforated torn ticket top */}
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

          {/* Ticket Header Banner */}
          <div
            className="px-5 py-3.5 flex items-center justify-between"
            style={{
              borderBottom: "1px solid rgba(227,30,36,0.2)",
              background: "rgba(227,30,36,0.06)",
            }}
          >
            <div>
              <div className="font-['Bebas_Neue',Impact,sans-serif] text-xl tracking-widest text-white">
                WEB BITES · MEAL PASS
              </div>
              <div className="text-[10px] tracking-[0.3em] text-[#E31E24]">
                1 TICKET · 1 ENTRY · ₹199 COMPLETE MEAL
              </div>
            </div>
            <div className="text-3xl" style={{ filter: "drop-shadow(0 0 8px rgba(227,30,36,0.6))" }}>
              🕷️
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleOrderSubmit} className="p-5 space-y-4">
            {/* Customer Name */}
            <div>
              <label className="block text-[10px] tracking-[0.4em] text-[#E31E24] mb-1.5 font-bold">
                YOUR NAME *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-3 bg-black/60 text-white placeholder-white/25 tracking-wider text-sm outline-none font-['Rajdhani',sans-serif] rounded"
                style={{
                  border: "1px solid rgba(227,30,36,0.4)",
                  boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)",
                }}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[10px] tracking-[0.4em] text-[#00AAFF] mb-1.5 font-bold">
                MOBILE NUMBER (FOR ORDER CONFIRMATION)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                className="w-full px-4 py-3 bg-black/60 text-white placeholder-white/25 tracking-wider text-sm outline-none font-['Rajdhani',sans-serif] rounded"
                style={{
                  border: "1px solid rgba(0,170,255,0.4)",
                  boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)",
                }}
              />
            </div>

            {/* Coordinator Selector */}
            <div>
              <label className="block text-[10px] tracking-[0.4em] text-white/60 mb-1.5 font-semibold">
                SEND ORDER TO STALL COORDINATOR *
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
                          ? "border-[#25D366] bg-[#25D366]/15 text-white shadow-[0_0_15px_rgba(37,211,102,0.2)]"
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

            {/* Order Items Included Preview */}
            <div className="p-3 bg-white/5 rounded border border-white/10 text-xs">
              <span className="text-[10px] tracking-[0.3em] text-[#E31E24] font-bold block mb-1">
                MEAL INCLUDES (ALL 6 ITEMS):
              </span>
              <p className="text-white/70 leading-relaxed font-mono text-[11px]">
                Fried Rice + Gobi + Noodles + American Sweet Corn + Mocktail + Carrot Halwa
              </p>
            </div>

            {/* Submit Order Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(37,211,102,0.5)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 font-['Bebas_Neue',Impact,sans-serif] text-xl tracking-[0.3em] text-white flex items-center justify-center gap-2 rounded"
              style={{
                background: "linear-gradient(135deg, #128C7E, #25D366)",
                border: "1px solid #25D366",
                boxShadow: "0 0 20px rgba(37,211,102,0.3)",
              }}
            >
              <span>💬 CONFIRM ORDER & SEND TO {activeCoordinator.name.toUpperCase()}</span>
            </motion.button>

            <p className="text-[11px] text-center text-white/40 tracking-wider">
              Generates your Token number and sends order receipt directly via WhatsApp
            </p>
          </form>
        </motion.div>

        {/* ═══════════════ USER'S PERSONAL ORDER RECEIPT (Shown only to the user) ═══════════════ */}
        <AnimatePresence>
          {myOrder && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="mt-6 p-5 relative overflow-hidden rounded"
              style={{
                background: "linear-gradient(135deg, rgba(37,211,102,0.15), rgba(7,94,84,0.95))",
                border: "2px solid #25D366",
                boxShadow: "0 0 35px rgba(37,211,102,0.4)",
              }}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">🎫</div>
                <div className="flex-1">
                  <div className="text-[10px] tracking-[0.4em] text-[#25D366] font-bold mb-1">
                    ORDER PLACED SUCCESSFULLY!
                  </div>
                  <div className="font-['Bebas_Neue',Impact,sans-serif] text-3xl text-white tracking-wider">
                    {myOrder.name}
                  </div>

                  <div className="mt-3 p-3 bg-black/60 rounded border border-[#25D366]/40 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] tracking-widest text-white/50 block">
                        YOUR TOKEN NUMBER
                      </span>
                      <span className="font-['Bebas_Neue',Impact,sans-serif] text-3xl text-[#E31E24] tracking-wider">
                        {myOrder.token}
                      </span>
                    </div>
                    <span className="text-xs text-white/50">{myOrder.time}</span>
                  </div>

                  <p className="mt-3 text-xs text-white/80 leading-relaxed">
                    ✨ Show this token <strong className="text-white">({myOrder.token})</strong> at{" "}
                    <strong>Stall No. 08</strong>, play our counter games (Mr. Bean, Coin Balance, Fill The Circle) & collect your meal!
                  </p>

                  {/* Fallback WhatsApp Buttons */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex flex-col gap-2">
                    <span className="text-[10px] tracking-wider text-white/60">
                      If WhatsApp did not open automatically, tap below:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={createWhatsAppUrl(myOrder, COORDINATORS[0].raw)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] text-black font-semibold text-xs tracking-wider rounded"
                      >
                        💬 Send to Tanish.RD ({COORDINATORS[0].phone})
                      </a>
                      <a
                        href={createWhatsAppUrl(myOrder, COORDINATORS[1].raw)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#128C7E] text-white font-semibold text-xs tracking-wider rounded"
                      >
                        💬 Send to Rachana Pandit ({COORDINATORS[1].phone})
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══════════════ STAFF / COORDINATOR PORTAL TOGGLE (Discreet) ═══════════════ */}
        <div className="mt-10 pt-4 border-t border-white/10 flex justify-center">
          {!staffMode ? (
            <button
              type="button"
              onClick={() => setShowPinModal(true)}
              className="text-[10px] tracking-[0.2em] text-white/30 hover:text-white/60 flex items-center gap-1.5 transition-colors"
            >
              <span>🔒 STALL 08 COORDINATOR ACCESS</span>
            </button>
          ) : (
            <div className="w-full">
              {/* Coordinator Dashboard (Visible only to Stall Leads) */}
              <div
                className="p-4 rounded border border-[#E31E24]/60 bg-black/80"
                style={{ boxShadow: "0 0 25px rgba(227,30,36,0.2)" }}
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-['Bebas_Neue',Impact,sans-serif] text-sm tracking-widest text-[#E31E24]">
                      COORDINATOR PORTAL (STAFF ONLY)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStaffMode(false)}
                    className="text-[10px] text-white/50 hover:text-white underline"
                  >
                    Lock Portal
                  </button>
                </div>

                {/* Queue Controls */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-center">
                  <div className="p-3 bg-white/5 rounded border border-[#00AAFF]/40">
                    <span className="text-[10px] text-[#00AAFF] font-bold block mb-1">
                      NOW SERVING
                    </span>
                    <span className="font-['Bebas_Neue',Impact,sans-serif] text-3xl text-white">
                      {nowServingStr}
                    </span>
                    <div className="mt-2 flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => setNowServing((prev) => Math.max(0, prev - 1))}
                        className="px-2 py-0.5 text-xs bg-white/10 text-white rounded border border-white/20"
                      >
                        ◀
                      </button>
                      <button
                        type="button"
                        onClick={() => setNowServing((prev) => prev + 1)}
                        className="px-2 py-0.5 text-xs bg-[#00AAFF]/30 text-[#00AAFF] rounded border border-[#00AAFF]/50 font-bold"
                      >
                        ▶
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-white/5 rounded border border-[#E31E24]/40">
                    <span className="text-[10px] text-[#E31E24] font-bold block mb-1">
                      TOTAL ENROLLED
                    </span>
                    <span className="font-['Bebas_Neue',Impact,sans-serif] text-3xl text-white">
                      {entries.length}
                    </span>
                    <div className="mt-2">
                      <button
                        type="button"
                        onClick={resetAllToZero}
                        className="px-2 py-0.5 text-[10px] bg-red-950 text-red-300 rounded border border-red-500/40"
                      >
                        ↺ Reset Queue to 0
                      </button>
                    </div>
                  </div>
                </div>

                {/* Private Orders Log */}
                {entries.length > 0 && (
                  <div>
                    <span className="text-[10px] tracking-widest text-white/50 block mb-2 font-bold">
                      CONFIRMED ORDERS ({entries.length}):
                    </span>
                    <div
                      className="space-y-2 max-h-48 overflow-y-auto pr-1"
                      style={{ scrollbarWidth: "thin" }}
                    >
                      {entries.map((entry) => (
                        <div
                          key={entry.id}
                          className="flex items-center justify-between px-3 py-2 bg-white/5 rounded border border-white/5 text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[#E31E24] font-bold">
                              {entry.token}
                            </span>
                            <span className="text-white font-semibold">
                              {entry.name}
                            </span>
                            {entry.phone && (
                              <span className="text-white/40">{entry.phone}</span>
                            )}
                          </div>
                          <span className="text-[10px] text-white/30">{entry.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Coordinator PIN Unlock Modal */}
        <AnimatePresence>
          {showPinModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
              onClick={() => setShowPinModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0A0A10] border-2 border-[#E31E24] p-6 max-w-xs w-full text-center rounded shadow-[0_0_30px_rgba(227,30,36,0.4)]"
              >
                <div className="text-3xl mb-2">🔒</div>
                <h4 className="font-['Bebas_Neue',Impact,sans-serif] text-2xl text-white tracking-widest">
                  COORDINATOR ACCESS
                </h4>
                <p className="text-xs text-white/50 mb-4 tracking-wider">
                  Enter Stall PIN to manage queue & customer logs
                </p>

                <form onSubmit={handlePinSubmit} className="space-y-3">
                  <input
                    type="password"
                    autoFocus
                    placeholder="Enter Stall PIN (08)"
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      setPinError(false);
                    }}
                    className="w-full px-3 py-2 bg-black border border-white/20 text-center text-white font-mono text-lg tracking-widest rounded outline-none focus:border-[#E31E24]"
                  />
                  {pinError && (
                    <span className="text-xs text-red-400 block font-semibold">
                      Incorrect PIN. Hint: Stall No. (08)
                    </span>
                  )}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowPinModal(false)}
                      className="flex-1 py-2 text-xs bg-white/10 text-white rounded font-mono"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 text-xs bg-[#E31E24] text-white font-bold rounded tracking-wider"
                    >
                      Unlock
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
