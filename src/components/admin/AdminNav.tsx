interface AdminNavProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onLogout?: () => void;
}

export default function AdminNav({ currentPath, onNavigate, onLogout }: AdminNavProps) {
  const navItems = [
    { label: '📊 DASHBOARD', path: '/admin' },
    { label: '📝 CUSTOMERS', path: '/admin/customers' },
    { label: '⚡ FAST REDEEM', path: '/admin/redeem', highlight: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0A0A0F]/95 border-b border-[#E31E24]/30 backdrop-blur-md px-4 py-3">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand identity */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('/admin')}>
          <div className="w-8 h-8 rounded-full bg-[#E31E24]/20 border border-[#E31E24] flex items-center justify-center text-sm shadow-[0_0_10px_rgba(227,30,36,0.5)]">
            🕷️
          </div>
          <div>
            <div className="font-['Bebas_Neue',Impact,sans-serif] text-xl tracking-wider text-white leading-none">
              WEB BITES <span className="text-[#E31E24]">ADMIN</span>
            </div>
            <div className="text-[9px] tracking-[0.2em] text-white/50">STALL NO. 08 · ORGANIZER PORTAL</div>
          </div>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => onNavigate(item.path)}
                className={`px-3 py-1.5 rounded font-['Bebas_Neue',Impact,sans-serif] text-sm tracking-wider transition-all ${
                  isActive
                    ? 'bg-[#E31E24] text-white shadow-[0_0_15px_rgba(227,30,36,0.5)]'
                    : item.highlight
                    ? 'bg-[#00AAFF]/20 text-[#00AAFF] border border-[#00AAFF]/50 hover:bg-[#00AAFF]/30'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {/* Return to public site */}
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="px-2.5 py-1.5 rounded text-xs text-white/50 hover:text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            title="Open Public Menu"
          >
            🕷️ Menu
          </button>

          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="px-2 py-1.5 rounded text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
              title="Lock Admin"
            >
              🔒
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
