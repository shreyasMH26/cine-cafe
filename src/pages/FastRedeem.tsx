import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import AdminNav from '../components/admin/AdminNav';
import { dbService, normalizePhone } from '../services/dbService';
import { notificationService, ORGANIZER_NUMBERS } from '../services/notificationService';
import type { Customer, Redemption } from '../types/admin';

interface FastRedeemProps {
  onNavigate: (path: string) => void;
}

const COUNTER_GAMES = [
  { id: 'mr-bean', label: 'Mr Bean Challenge', emoji: '🥸' },
  { id: 'coin-balance', label: 'Coin Balance', emoji: '🪙' },
  { id: 'fill-circle', label: 'Fill The Circle', emoji: '⭕' },
];

export default function FastRedeem({ onNavigate }: FastRedeemProps) {
  const [phoneQuery, setPhoneQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [lastRedemption, setLastRedemption] = useState<Redemption | null>(null);

  // Staff and counter options
  const [staffName, setStaffName] = useState<string>('Tanish.RD');
  const [redeemQty, setRedeemQty] = useState<number>(1);
  const [selectedGames, setSelectedGames] = useState<string[]>([]);

  // Action status
  const [isProcessing, setIsProcessing] = useState(false);
  const [redeemSuccess, setRedeemSuccess] = useState<{ customer: Customer; redemption: Redemption } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus phone input immediately on page load
    searchInputRef.current?.focus();
  }, []);

  const handleSearch = async (overridePhone?: string) => {
    const raw = overridePhone ?? phoneQuery;
    const clean = normalizePhone(raw);
    setErrorMsg(null);
    setRedeemSuccess(null);

    if (!clean || clean.length < 4) {
      setErrorMsg('Please enter at least 4 digits of the customer phone number.');
      setCustomer(null);
      setSearched(true);
      return;
    }

    setIsSearching(true);
    try {
      const found = await dbService.findCustomerByPhone(clean);
      setCustomer(found);
      setSearched(true);
      if (found) {
        setRedeemQty(1);
        // Find if they had a previous redemption
        const redemptions = await dbService.getRedemptions();
        const lastRed = redemptions.find(r => r.customer_id === found.id);
        setLastRedemption(lastRed || null);
      } else {
        setLastRedemption(null);
      }
    } catch (e: any) {
      setErrorMsg(e.message || 'Error searching for customer.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const toggleGame = (gameLabel: string) => {
    setSelectedGames(prev =>
      prev.includes(gameLabel) ? prev.filter(g => g !== gameLabel) : [...prev, gameLabel]
    );
  };

  const handleRedeem = async () => {
    if (!customer) return;
    const remaining = customer.tickets_purchased - customer.tickets_redeemed;

    if (remaining <= 0) {
      setErrorMsg('Cannot redeem: Customer has 0 tickets remaining.');
      return;
    }

    setIsProcessing(true);
    setErrorMsg(null);

    try {
      const result = await dbService.redeemTicket(
        customer.id,
        redeemQty,
        staffName,
        selectedGames
      );

      // Trigger Confetti Celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E31E24', '#0066CC', '#FFD700', '#FFFFFF'],
      });

      // Send/Log notifications
      await notificationService.handleRedemptionNotifications(result.customer, result.redemption);

      setCustomer(result.customer);
      setRedeemSuccess(result);
    } catch (e: any) {
      if (e.message === 'ALREADY_REDEEMED') {
        setErrorMsg('ALERT: This ticket has ALREADY been redeemed! Duplicate redemption blocked.');
      } else {
        setErrorMsg(e.message || 'Failed to complete redemption.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetForNext = () => {
    setPhoneQuery('');
    setCustomer(null);
    setSearched(false);
    setRedeemSuccess(null);
    setErrorMsg(null);
    setLastRedemption(null);
    setSelectedGames([]);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 50);
  };

  const remainingTickets = customer ? Math.max(0, customer.tickets_purchased - customer.tickets_redeemed) : 0;
  const isFullyRedeemed = customer ? remainingTickets === 0 : false;

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white flex flex-col font-sans">
      <AdminNav currentPath="/admin/redeem" onNavigate={onNavigate} />

      <main className="flex-1 max-w-xl w-full mx-auto px-4 py-6">
        {/* Header Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E31E24]/20 border border-[#E31E24] text-[#E31E24] rounded-full text-xs font-bold tracking-widest uppercase mb-2">
            ⚡ 5-Second Fast Counter Redemption
          </div>
          <h1 className="font-['Bebas_Neue',Impact,sans-serif] text-4xl sm:text-5xl tracking-wider text-white">
            TICKET <span className="text-[#E31E24]">REDEMPTION</span>
          </h1>
          <p className="text-gray-400 text-xs tracking-wider">
            Search customer phone number to verify and punch their food pass.
          </p>
        </div>

        {/* Staff Selector */}
        <div className="mb-4 bg-[#12121A] border border-white/10 rounded-lg p-3 flex items-center justify-between">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Counter Staff:</span>
          <div className="flex gap-2">
            {ORGANIZER_NUMBERS.map(org => (
              <button
                key={org.name}
                type="button"
                onClick={() => setStaffName(org.name)}
                className={`px-3 py-1 rounded text-xs font-bold tracking-wider transition ${
                  staffName === org.name
                    ? 'bg-[#E31E24] text-white shadow-[0_0_10px_rgba(227,30,36,0.5)]'
                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                {org.name}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Phone Search Card */}
        <div className="bg-[#12121A] border-2 border-[#E31E24]/40 rounded-xl p-5 shadow-[0_0_30px_rgba(227,30,36,0.15)] mb-6">
          <label htmlFor="phone-search" className="block text-xs font-bold uppercase tracking-widest text-[#E31E24] mb-2">
            Customer Phone Number
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 font-mono text-sm">
                +91
              </span>
              <input
                id="phone-search"
                ref={searchInputRef}
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Enter 10-digit number"
                value={phoneQuery}
                onChange={e => setPhoneQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-12 pr-10 py-3.5 bg-black/60 border border-white/20 rounded-lg text-lg sm:text-xl font-mono tracking-wider text-white placeholder-gray-600 focus:outline-none focus:border-[#E31E24] focus:ring-1 focus:ring-[#E31E24]"
              />
              {phoneQuery && (
                <button
                  type="button"
                  onClick={() => setPhoneQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-lg"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => handleSearch()}
              disabled={isSearching}
              className="px-5 py-3.5 bg-[#E31E24] hover:bg-[#c9181e] text-white font-['Bebas_Neue',Impact,sans-serif] text-xl tracking-wider rounded-lg flex items-center gap-2 transition disabled:opacity-50"
            >
              {isSearching ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'LOOKUP'
              )}
            </button>
          </div>

          {/* Quick Demo Pre-fills */}
          <div className="mt-3 flex items-center gap-2 text-xs text-gray-400 overflow-x-auto pb-1">
            <span className="text-[10px] uppercase text-gray-500 font-bold whitespace-nowrap">Quick Test:</span>
            <button
              type="button"
              onClick={() => { setPhoneQuery('9876543210'); handleSearch('9876543210'); }}
              className="underline text-blue-400 hover:text-blue-300 whitespace-nowrap"
            >
              9876543210 (2 Unredeemed)
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => { setPhoneQuery('9538665959'); handleSearch('9538665959'); }}
              className="underline text-amber-400 hover:text-amber-300 whitespace-nowrap"
            >
              9538665959 (Already Redeemed)
            </button>
          </div>
        </div>

        {/* Error / Alert Message */}
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-950/80 border-2 border-red-500 rounded-lg text-red-200 text-sm flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div className="flex-1 font-medium">{errorMsg}</div>
          </div>
        )}

        {/* Search Results / Customer Details */}
        {searched && !customer && !isSearching && (
          <div className="bg-[#12121A] border border-white/10 rounded-xl p-8 text-center mb-6">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="font-['Bebas_Neue',Impact,sans-serif] text-2xl tracking-wide text-white mb-2">
              NO CUSTOMER FOUND
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              No registered ticket found matching <span className="font-mono text-white">"{phoneQuery}"</span>.
            </p>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate?.('/admin/customers')}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-bold uppercase tracking-wider"
              >
                + Register New Customer
              </button>
              <button
                type="button"
                onClick={handleResetForNext}
                className="px-4 py-2 border border-white/20 text-gray-300 hover:text-white rounded text-xs font-bold uppercase tracking-wider"
              >
                Clear & Retry
              </button>
            </div>
          </div>
        )}

        {customer && (
          <div className="bg-[#12121A] border border-white/10 rounded-xl overflow-hidden mb-6 shadow-xl">
            {/* Top Status Header */}
            <div
              className={`p-4 text-center font-['Bebas_Neue',Impact,sans-serif] text-xl tracking-widest ${
                isFullyRedeemed
                  ? 'bg-red-600/30 text-red-400 border-b border-red-500/50'
                  : 'bg-emerald-600/20 text-emerald-400 border-b border-emerald-500/50'
              }`}
            >
              {isFullyRedeemed ? '⚠️ TICKET FULLY REDEEMED' : '✓ VALID TICKET READY FOR REDEMPTION'}
            </div>

            <div className="p-5">
              {/* Customer Info Card */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="font-['Bebas_Neue',Impact,sans-serif] text-3xl tracking-wide text-white leading-tight">
                    {customer.customer_name}
                  </h2>
                  <div className="text-gray-400 text-sm font-mono mt-0.5">
                    📱 +91 {customer.phone_number}
                  </div>
                  <div className="inline-block mt-1 px-2.5 py-0.5 bg-white/5 border border-white/10 rounded text-[11px] font-semibold text-gray-300">
                    🎓 {customer.college_class}
                  </div>
                </div>

                {/* Ticket Counter Badge */}
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">
                    Available Tickets
                  </div>
                  <div
                    className={`font-['Bebas_Neue',Impact,sans-serif] text-4xl leading-none ${
                      isFullyRedeemed ? 'text-red-500' : 'text-emerald-400'
                    }`}
                  >
                    {remainingTickets}{' '}
                    <span className="text-sm font-sans text-gray-500">
                      / {customer.tickets_purchased}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar of Redemption */}
              <div className="w-full bg-black/50 h-2.5 rounded-full overflow-hidden mb-5 border border-white/10">
                <div
                  className={`h-full transition-all duration-500 ${
                    isFullyRedeemed ? 'bg-red-500' : 'bg-emerald-500'
                  }`}
                  style={{
                    width: `${Math.min(100, (customer.tickets_redeemed / customer.tickets_purchased) * 100)}%`,
                  }}
                />
              </div>

              {/* ⚠️ ALREADY REDEEMED WARNING BANNER */}
              {isFullyRedeemed && (
                <div className="mb-5 p-4 bg-red-950/60 border-2 border-red-500 rounded-lg">
                  <div className="flex items-center gap-2 text-red-400 font-['Bebas_Neue',Impact,sans-serif] text-2xl tracking-wider mb-1">
                    <span>⛔</span> ALREADY REDEEMED
                  </div>
                  <p className="text-red-200 text-xs mb-2">
                    This customer has already redeemed all <strong>{customer.tickets_purchased}</strong> purchased ticket(s).
                  </p>
                  {lastRedemption && (
                    <div className="text-[11px] font-mono text-red-300 bg-red-900/30 p-2 rounded border border-red-700/40">
                      <div>🕒 Redeemed at: {new Date(lastRedemption.redeemed_at).toLocaleString('en-IN')}</div>
                      <div>👤 Verified by: {lastRedemption.redeemed_by}</div>
                      {Boolean(lastRedemption.counter_games_played && lastRedemption.counter_games_played.length > 0) && (
                        <div>🎮 Games: {lastRedemption.counter_games_played!.join(', ')}</div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ACTIVE REDEMPTION FORM (When tickets available) */}
              {!isFullyRedeemed && (
                <div className="space-y-4">
                  {/* Quantity selector if multiple remaining */}
                  {remainingTickets > 1 && (
                    <div className="bg-black/40 p-3 rounded-lg border border-white/10 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
                        Tickets To Redeem Now:
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setRedeemQty(Math.max(1, redeemQty - 1))}
                          disabled={redeemQty <= 1}
                          className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white font-bold text-lg"
                        >
                          -
                        </button>
                        <span className="font-['Bebas_Neue',Impact,sans-serif] text-2xl text-white w-6 text-center">
                          {redeemQty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setRedeemQty(Math.min(remainingTickets, redeemQty + 1))}
                          disabled={redeemQty >= remainingTickets}
                          className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white font-bold text-lg"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Counter Games Checklist */}
                  <div className="bg-black/40 p-3 rounded-lg border border-white/10">
                    <span className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                      Counter Games Played:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {COUNTER_GAMES.map(game => {
                        const checked = selectedGames.includes(game.label);
                        return (
                          <button
                            key={game.id}
                            type="button"
                            onClick={() => toggleGame(game.label)}
                            className={`p-2 rounded text-xs font-medium flex items-center gap-1.5 transition text-left border ${
                              checked
                                ? 'bg-[#0066CC]/30 border-[#0066CC] text-white'
                                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                            }`}
                          >
                            <span>{game.emoji}</span>
                            <span className="truncate">{game.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Big Redeem Button */}
                  <button
                    type="button"
                    onClick={handleRedeem}
                    disabled={isProcessing}
                    className="w-full py-4 bg-[#E31E24] hover:bg-[#c9181e] disabled:opacity-50 text-white font-['Bebas_Neue',Impact,sans-serif] text-2xl sm:text-3xl tracking-[0.2em] rounded-xl shadow-[0_0_25px_rgba(227,30,36,0.6)] flex items-center justify-center gap-3 transition transform active:scale-98"
                  >
                    {isProcessing ? (
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>✓</span> REDEEM {redeemQty} TICKET{redeemQty > 1 ? 'S' : ''}
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* SUCCESS STATE & NOTIFICATIONS */}
              {redeemSuccess && (
                <div className="mt-5 p-4 bg-emerald-950/70 border-2 border-emerald-500 rounded-xl">
                  <div className="text-center mb-3">
                    <div className="text-4xl mb-1">🎉</div>
                    <h3 className="font-['Bebas_Neue',Impact,sans-serif] text-2xl text-emerald-400 tracking-wider">
                      REDEMPTION CONFIRMED!
                    </h3>
                    <p className="text-xs text-gray-300">
                      Successfully punched {redeemSuccess.redemption.tickets_redeemed_count} ticket(s) for{' '}
                      <strong>{redeemSuccess.customer.customer_name}</strong>.
                    </p>
                  </div>

                  {/* WhatsApp Quick Actions */}
                  <div className="space-y-2 pt-2 border-t border-emerald-500/30">
                    <a
                      href={notificationService.getWhatsAppUrl(
                        redeemSuccess.customer.phone_number,
                        notificationService.createCustomerMessage(
                          redeemSuccess.customer,
                          redeemSuccess.redemption
                        )
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      <span>💬</span> WhatsApp Receipt to Customer
                    </a>

                    <a
                      href={notificationService.getWhatsAppUrl(
                        ORGANIZER_NUMBERS[0].phone,
                        notificationService.createOrganizerMessage(
                          redeemSuccess.customer,
                          redeemSuccess.redemption
                        )
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 bg-white/10 hover:bg-white/20 text-gray-200 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      <span>📱</span> WhatsApp Alert to Tanish.RD
                    </a>
                  </div>

                  {/* Reset Button */}
                  <button
                    type="button"
                    onClick={handleResetForNext}
                    className="mt-3 w-full py-3 bg-white text-black font-['Bebas_Neue',Impact,sans-serif] text-xl tracking-wider rounded-lg hover:bg-gray-200 transition"
                  >
                    SCAN NEXT CUSTOMER →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Helpful instructions footer */}
        <div className="text-center text-gray-500 text-xs space-y-1">
          <p>⚡ All tickets verified against physical counterfoils and official database.</p>
          <p>Organizers: Tanish.RD (+91 95386 65959) &bull; Rachana Pandit (+91 91085 40017)</p>
        </div>
      </main>
    </div>
  );
}
