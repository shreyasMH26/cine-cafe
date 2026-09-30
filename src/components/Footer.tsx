interface FooterProps {
  onNavigate?: (path: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer
      className="relative py-12 text-center overflow-hidden"
      style={{ background: "#040408" }}
    >
      {/* Top gradient line */}
      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-[#E31E24] via-[#0066CC] to-[#E31E24]" />

      {/* Film strip */}
      <div className="film-strip h-5 mb-6 opacity-20" />

      <div className="px-4 space-y-2 max-w-xl mx-auto">
        <div className="font-['Bebas_Neue',Impact,sans-serif] text-3xl tracking-[0.3em] text-[#E31E24]">
          🕷️ WEB BITES
        </div>
        <p className="text-xs tracking-[0.35em] text-white/50 uppercase">SMALL BITES &bull; BIG BLOCKBUSTER</p>
        <p className="text-xs text-white/30 font-mono">
          TEAM DYNAMOS &bull; STALL NO. 08 &bull; 10 OCTOBER 2026 &bull; 1:00 PM – 5:00 PM
        </p>
        <p className="text-xs text-white/30 font-mono">
          BAPUJI SAMUDAYA BHAVAN, MCC B BLOCK, DAVANAGERE
        </p>
        <p className="text-xs text-white/40 pt-2 font-mono">
          Coordinators: Tanish.RD (+91 95386 65959) &bull; Rachana Pandit (+91 91085 40017)
        </p>
      </div>

      {/* Spider icon divider */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <div className="w-12 h-px bg-[#E31E24]/30" />
        <div className="text-[#E31E24] text-sm">🕷️</div>
        <div className="w-12 h-px bg-[#0066CC]/30" />
      </div>

      {/* Creative Team attribution */}
      <div className="mt-4 flex flex-col items-center justify-center gap-2">
        <a
          href="https://xtich.onrender.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[11px] text-white/60 hover:text-white tracking-widest uppercase transition-colors group"
        >
          <span>CREATIVE TEAM:</span>
          <img
            src="/assets/xtich-white-transp.png"
            alt="xtich."
            className="h-4 object-contain inline-block group-hover:scale-105 transition-transform"
          />
          <span className="text-[10px] text-[#00AAFF] font-mono lowercase">(xtich.onrender.com)</span>
        </a>
        <p className="text-[10px] text-white/20 tracking-wider">
          © 2026 TEAM DYNAMOS &bull; ALL RIGHTS RESERVED
        </p>
      </div>

      {/* Staff / Organizer Portal link */}
      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-center gap-4 text-xs">
        <button
          type="button"
          onClick={() => onNavigate ? onNavigate('/admin/redeem') : (window.location.href = '/admin/redeem')}
          className="px-3 py-1 bg-red-950/40 border border-red-500/30 text-red-400 hover:text-red-300 hover:border-red-500 rounded text-[11px] tracking-wider transition"
        >
          ⚡ Fast Ticket Redemption
        </button>
        <button
          type="button"
          onClick={() => onNavigate ? onNavigate('/admin') : (window.location.href = '/admin')}
          className="px-3 py-1 bg-white/5 border border-white/10 text-gray-400 hover:text-white rounded text-[11px] tracking-wider transition"
        >
          🔒 Organizer Dashboard
        </button>
      </div>

      {/* Film strip bottom */}
      <div className="film-strip h-5 mt-6 opacity-20" />
    </footer>
  );
}
