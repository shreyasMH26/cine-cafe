export default function Footer() {
  return (
    <footer
      className="relative py-10 text-center overflow-hidden"
      style={{ background: "#030308" }}
    >
      {/* Top gradient line */}
      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-[#E31E24] via-[#0066CC] to-[#E31E24]" />

      {/* Film strip */}
      <div className="film-strip h-5 mb-6 opacity-20" />

      <div className="px-4 space-y-2">
        <div
          className="font-['Bebas_Neue',Impact,sans-serif] text-2xl tracking-[0.4em] text-white/60"
        >
          🕷️ THE CINE CAFÉ
        </div>
        <p className="text-xs tracking-[0.4em] text-white/30">SMALL BITES · BIG BLOCKBUSTER</p>
        <p className="text-xs text-white/20">
          TEAM DYNAMOS · STALL NO. 08 · 10 OCTOBER 2026
        </p>
        <p className="text-xs text-white/20">
          BAPUJI SAMUDAYA BHAVAN, DAVANAGERE
        </p>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <div className="w-12 h-px bg-[#E31E24]/30" />
        <div className="text-white/20 text-sm">🕸️</div>
        <div className="w-12 h-px bg-[#0066CC]/30" />
      </div>

      <p className="mt-4 text-[10px] text-white/15 tracking-widest">
        POWERED BY XTICH · © 2026 TEAM DYNAMOS
      </p>

      {/* Film strip bottom */}
      <div className="film-strip h-5 mt-6 opacity-20" />
    </footer>
  );
}
