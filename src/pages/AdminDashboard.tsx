import { useState, useEffect } from 'react';
import { dbService } from '../services/dbService';
import type { DashboardStats, SiteVisit, Redemption } from '../types/admin';
import AdminNav from '../components/admin/AdminNav';

interface AdminDashboardProps {
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

export default function AdminDashboard({ onNavigate, onLogout }: AdminDashboardProps) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [visits, setVisits] = useState<SiteVisit[]>([]);
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [s, v, r] = await Promise.all([
        dbService.getDashboardStats(),
        dbService.getSiteVisits(),
        dbService.getRedemptions(),
      ]);
      setStats(s);
      setVisits(v);
      setRedemptions(r);
    } catch (err) {
      console.error('Failed to load dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[#07070C] text-white">
      <AdminNav currentPath="/admin" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono text-[#E31E24] tracking-[0.3em]">LIVE EVENT TELEMETRY</div>
            <h1 className="font-['Bebas_Neue',Impact,sans-serif] text-4xl sm:text-5xl tracking-wider text-white">
              EVENT <span className="text-[#E31E24]">DASHBOARD</span>
            </h1>
            <p className="text-xs text-white/50">Real-time attendance, QR scans, and ticket redemption tracking</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={loadData}
              className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs tracking-wider font-mono text-white flex items-center gap-1.5 transition-colors"
            >
              🔄 Refresh
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/admin/redeem')}
              className="px-4 py-2 bg-[#00AAFF] hover:bg-[#0099EE] text-black font-['Bebas_Neue',Impact,sans-serif] text-base tracking-widest rounded shadow-[0_0_15px_rgba(0,170,255,0.4)] transition-all"
            >
              ⚡ FAST REDEEM (<span className="font-bold">5s</span>)
            </button>
          </div>
        </div>

        {/* Primary Metrics Grid (7 Big Cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {/* Card 1: Total Visitors */}
          <div className="p-4 rounded bg-[#0D0D15] border border-white/10 relative overflow-hidden">
            <div className="text-[10px] tracking-widest text-white/40 font-mono mb-1">TOTAL WEBSITE VISITORS</div>
            <div className="font-['Bebas_Neue',Impact,sans-serif] text-4xl sm:text-5xl text-white">
              {loading ? '...' : stats?.totalVisitors || 0}
            </div>
            <div className="text-[10px] text-emerald-400 mt-1 font-mono">
              ↑ Today: +{stats?.visitorsToday || 0}
            </div>
          </div>

          {/* Card 2: Unique Visitors */}
          <div className="p-4 rounded bg-[#0D0D15] border border-white/10 relative overflow-hidden">
            <div className="text-[10px] tracking-widest text-white/40 font-mono mb-1">UNIQUE VISITORS</div>
            <div className="font-['Bebas_Neue',Impact,sans-serif] text-4xl sm:text-5xl text-[#00AAFF]">
              {loading ? '...' : stats?.uniqueVisitors || 0}
            </div>
            <div className="text-[10px] text-white/40 mt-1 font-mono">Unique Devices</div>
          </div>

          {/* Card 3: QR Visits */}
          <div className="p-4 rounded bg-[#0D0D15] border border-[#E31E24]/30 relative overflow-hidden shadow-[0_0_15px_rgba(227,30,36,0.1)]">
            <div className="text-[10px] tracking-widest text-[#E31E24] font-mono mb-1">QR SCANS (TICKET / STALL)</div>
            <div className="font-['Bebas_Neue',Impact,sans-serif] text-4xl sm:text-5xl text-[#E31E24]">
              {loading ? '...' : stats?.qrVisits || 0}
            </div>
            <div className="text-[10px] text-emerald-400 mt-1 font-mono">
              ↑ Today: +{stats?.qrScansToday || 0}
            </div>
          </div>

          {/* Card 4: Customers Recorded */}
          <div className="p-4 rounded bg-[#0D0D15] border border-white/10 relative overflow-hidden">
            <div className="text-[10px] tracking-widest text-white/40 font-mono mb-1">CUSTOMERS RECORDED</div>
            <div className="font-['Bebas_Neue',Impact,sans-serif] text-4xl sm:text-5xl text-amber-400">
              {loading ? '...' : stats?.customersRecorded || 0}
            </div>
            <div className="text-[10px] text-white/40 mt-1 font-mono">
              Total Passes: {stats?.ticketsPurchasedTotal || 0}
            </div>
          </div>

          {/* Card 5: Tickets Redeemed */}
          <div className="p-4 rounded bg-[#0D0D15] border border-emerald-500/30 relative overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <div className="text-[10px] tracking-widest text-emerald-400 font-mono mb-1">TICKETS REDEEMED</div>
            <div className="font-['Bebas_Neue',Impact,sans-serif] text-4xl sm:text-5xl text-emerald-400">
              {loading ? '...' : stats?.ticketsRedeemedTotal || 0}
            </div>
            <div className="text-[10px] text-emerald-300 mt-1 font-mono">
              Today: {stats?.redemptionsToday || 0} claimed
            </div>
          </div>

          {/* Card 6: Tickets Remaining */}
          <div className="p-4 rounded bg-[#0D0D15] border border-white/10 relative overflow-hidden">
            <div className="text-[10px] tracking-widest text-white/40 font-mono mb-1">TICKETS REMAINING</div>
            <div className="font-['Bebas_Neue',Impact,sans-serif] text-4xl sm:text-5xl text-white">
              {loading ? '...' : stats?.ticketsRemaining || 0}
            </div>
            <div className="text-[10px] text-white/40 mt-1 font-mono">Awaiting Meal</div>
          </div>

          {/* Card 7: Redemption Rate */}
          <div className="p-4 rounded bg-[#0D0D15] border border-white/10 relative overflow-hidden col-span-2">
            <div className="text-[10px] tracking-widest text-white/40 font-mono mb-1">REDEMPTION RATE</div>
            <div className="flex items-center gap-3">
              <div className="font-['Bebas_Neue',Impact,sans-serif] text-4xl sm:text-5xl text-white">
                {loading ? '...' : `${stats?.redemptionRate || 0}%`}
              </div>
              <div className="flex-1">
                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00AAFF] to-[#E31E24] transition-all duration-500"
                    style={{ width: `${Math.min(100, stats?.redemptionRate || 0)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Charts & Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Chart 1: Traffic Breakdown */}
          <div className="p-5 rounded bg-[#0D0D15] border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-['Bebas_Neue',Impact,sans-serif] text-xl tracking-wider text-white">
                📈 TRAFFIC & QR SCAN TRENDS
              </h3>
              <span className="text-[10px] font-mono text-white/40">VISITS: {visits.length}</span>
            </div>

            {/* Visual Bar representation */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1 text-white/70">
                  <span>QR Code Scans (?source=ticket_qr)</span>
                  <span className="text-[#E31E24] font-bold">{stats?.qrVisits || 0} scans</span>
                </div>
                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#E31E24]"
                    style={{
                      width: `${stats?.totalVisitors ? Math.round(((stats.qrVisits || 0) / stats.totalVisitors) * 100) : 60}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1 text-white/70">
                  <span>Direct Web Visits</span>
                  <span className="text-[#00AAFF] font-bold">
                    {Math.max(0, (stats?.totalVisitors || 0) - (stats?.qrVisits || 0))} visits
                  </span>
                </div>
                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00AAFF]"
                    style={{
                      width: `${stats?.totalVisitors ? Math.round((((stats.totalVisitors || 0) - (stats.qrVisits || 0)) / stats.totalVisitors) * 100) : 40}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Device breakdown */}
            <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 bg-white/5 rounded">
                <span className="text-white/40 block text-[9px] font-mono">MOBILE</span>
                <span className="text-base font-bold text-white">88%</span>
              </div>
              <div className="p-2 bg-white/5 rounded">
                <span className="text-white/40 block text-[9px] font-mono">DESKTOP</span>
                <span className="text-base font-bold text-white">10%</span>
              </div>
              <div className="p-2 bg-white/5 rounded">
                <span className="text-white/40 block text-[9px] font-mono">TABLET</span>
                <span className="text-base font-bold text-white">2%</span>
              </div>
            </div>
          </div>

          {/* Chart 2: Recent Redemptions Log */}
          <div className="p-5 rounded bg-[#0D0D15] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-['Bebas_Neue',Impact,sans-serif] text-xl tracking-wider text-white">
                  🎟️ RECENT REDEMPTIONS
                </h3>
                <span className="text-[10px] font-mono text-emerald-400">
                  TOTAL: {redemptions.length}
                </span>
              </div>

              {redemptions.length === 0 ? (
                <p className="text-xs text-white/40 italic py-6 text-center">
                  No redemptions recorded yet. Open Fast Redeem to scan or search phone.
                </p>
              ) : (
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {redemptions.slice(0, 5).map((r) => (
                    <div
                      key={r.id}
                      className="p-2.5 rounded bg-white/5 border border-white/5 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-semibold text-white">{r.customer_name}</div>
                        <div className="text-[10px] text-white/40 font-mono">
                          {r.phone_number} · Redeemed by {r.redeemed_by || 'Organizer'}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          +{r.tickets_redeemed_count} PASS
                        </span>
                        <div className="text-[9px] text-white/30 mt-0.5">
                          {new Date(r.redeemed_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => onNavigate('/admin/customers')}
                className="text-xs text-[#00AAFF] hover:underline flex items-center gap-1 font-mono"
              >
                View all registered customers →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
