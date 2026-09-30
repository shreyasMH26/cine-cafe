import { useState, useEffect } from 'react';
import { dbService } from '../services/dbService';
import type { Customer } from '../types/admin';
import AdminNav from '../components/admin/AdminNav';

interface CustomerRegistrationProps {
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

export default function CustomerRegistration({ onNavigate, onLogout }: CustomerRegistrationProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [collegeClass, setCollegeClass] = useState('');
  const [ticketsPurchased, setTicketsPurchased] = useState(1);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const data = await dbService.getCustomers();
      setCustomers(data);
    } catch (err) {
      console.error('Failed to load customers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phoneNumber.trim()) return;

    setSubmitting(true);
    try {
      const newCustomer = await dbService.createCustomer({
        customer_name: customerName,
        phone_number: phoneNumber,
        college_class: collegeClass,
        tickets_purchased: ticketsPurchased,
        notes,
      });

      setCustomers((prev) => [newCustomer, ...prev]);
      setSuccessMessage(`✓ Registered ${newCustomer.customer_name} (${newCustomer.tickets_purchased} ticket(s))`);
      
      // Reset form
      setCustomerName('');
      setPhoneNumber('');
      setCollegeClass('');
      setTicketsPurchased(1);
      setNotes('');

      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err) {
      console.error('Error saving customer:', err);
      alert('Failed to register customer. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = customers.filter((c) => {
    const matchesSearch =
      c.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone_number.includes(searchTerm) ||
      c.college_class.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterStatus === 'ALL') return matchesSearch;
    return matchesSearch && c.status === filterStatus;
  });

  return (
    <div className="min-h-screen bg-[#07070C] text-white">
      <AdminNav currentPath="/admin/customers" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-mono text-[#E31E24] tracking-[0.3em]">TICKET SALES LEDGER</div>
            <h1 className="font-['Bebas_Neue',Impact,sans-serif] text-4xl sm:text-5xl tracking-wider text-white">
              CUSTOMER <span className="text-[#E31E24]">REGISTRATION</span>
            </h1>
            <p className="text-xs text-white/50">Record physical ticket sales with customer name, phone & class</p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/admin/redeem')}
            className="px-4 py-2 bg-[#00AAFF] hover:bg-[#0099EE] text-black font-['Bebas_Neue',Impact,sans-serif] text-base tracking-widest rounded shadow-[0_0_15px_rgba(0,170,255,0.3)]"
          >
            ⚡ GO TO REDEMPTION
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Registration Form */}
          <div className="lg:col-span-1">
            <div className="p-6 rounded bg-[#0D0D15] border border-[#E31E24]/40 relative overflow-hidden shadow-[0_0_25px_rgba(227,30,36,0.15)]">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                <span className="text-lg">🎟️</span>
                <h2 className="font-['Bebas_Neue',Impact,sans-serif] text-2xl tracking-wider text-white">
                  RECORD TICKET SALE
                </h2>
              </div>

              {successMessage && (
                <div className="mb-4 p-3 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                  <span>✅</span>
                  <span>{successMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-[#E31E24] mb-1 font-bold">
                    CUSTOMER NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Shreyas MH"
                    className="w-full px-3 py-2.5 bg-black/60 border border-white/15 rounded text-white text-sm outline-none focus:border-[#E31E24]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-[#00AAFF] mb-1 font-bold">
                    PHONE NUMBER *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full px-3 py-2.5 bg-black/60 border border-white/15 rounded text-white text-sm outline-none focus:border-[#00AAFF] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-white/50 mb-1">
                    COLLEGE / CLASS
                  </label>
                  <input
                    type="text"
                    value={collegeClass}
                    onChange={(e) => setCollegeClass(e.target.value)}
                    placeholder="e.g. CSE / B.Com 2nd Year"
                    className="w-full px-3 py-2.5 bg-black/60 border border-white/15 rounded text-white text-sm outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-amber-400 mb-1 font-bold">
                    NUMBER OF TICKETS (₹199 EACH)
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setTicketsPurchased((n) => Math.max(1, n - 1))}
                      className="w-9 h-9 bg-white/10 hover:bg-white/20 text-white rounded font-bold"
                    >
                      -
                    </button>
                    <span className="font-['Bebas_Neue',Impact,sans-serif] text-3xl text-white w-10 text-center">
                      {ticketsPurchased}
                    </span>
                    <button
                      type="button"
                      onClick={() => setTicketsPurchased((n) => n + 1)}
                      className="w-9 h-9 bg-white/10 hover:bg-white/20 text-white rounded font-bold"
                    >
                      +
                    </button>
                    <span className="text-xs text-white/40 font-mono ml-auto">
                      Total: ₹{ticketsPurchased * 199}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-white/40 mb-1">
                    NOTES (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Early bird, friend of volunteer"
                    className="w-full px-3 py-2 bg-black/60 border border-white/10 rounded text-white text-xs outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-[#E31E24] hover:bg-[#CC181E] disabled:opacity-50 text-white font-['Bebas_Neue',Impact,sans-serif] text-xl tracking-[0.2em] rounded shadow-[0_0_20px_rgba(227,30,36,0.4)] transition-all"
                >
                  {submitting ? 'RECORDING...' : '✓ RECORD TICKET SALE'}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Customer List */}
          <div className="lg:col-span-2">
            <div className="p-6 rounded bg-[#0D0D15] border border-white/10">
              {/* Search & Filter Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex-1 min-w-[200px]">
                  <input
                    type="text"
                    placeholder="🔍 Search name, phone, or class..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded text-white text-xs outline-none font-mono"
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  {['ALL', 'UNREDEEMED', 'REDEEMED'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setFilterStatus(st)}
                      className={`px-2.5 py-1 rounded text-[10px] font-mono tracking-wider transition-colors ${
                        filterStatus === st
                          ? 'bg-[#E31E24] text-white'
                          : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table / List */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-white/10 text-white/40 text-[10px] uppercase">
                      <th className="py-2.5 px-3">Customer</th>
                      <th className="py-2.5 px-3">Phone</th>
                      <th className="py-2.5 px-3">College/Class</th>
                      <th className="py-2.5 px-3 text-center">Tickets</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-white/40">
                          Loading customer directory...
                        </td>
                      </tr>
                    ) : filtered.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-white/40 italic">
                          No matching customer records found.
                        </td>
                      </tr>
                    ) : (
                      filtered.map((c) => {
                        const remaining = c.tickets_purchased - c.tickets_redeemed;
                        return (
                          <tr key={c.id} className="hover:bg-white/[0.02]">
                            <td className="py-3 px-3">
                              <div className="font-semibold text-white">{c.customer_name}</div>
                              {c.notes && <div className="text-[10px] text-white/30 italic">{c.notes}</div>}
                            </td>
                            <td className="py-3 px-3 text-white/80 font-mono">{c.phone_number}</td>
                            <td className="py-3 px-3 text-white/60">{c.college_class}</td>
                            <td className="py-3 px-3 text-center">
                              <span className="text-white font-bold">{c.tickets_redeemed}</span>
                              <span className="text-white/40"> / {c.tickets_purchased}</span>
                            </td>
                            <td className="py-3 px-3">
                              <span
                                className={`px-2 py-0.5 rounded text-[9px] tracking-wider font-bold ${
                                  c.status === 'REDEEMED'
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                    : c.status === 'PARTIALLY_REDEEMED'
                                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                                    : 'bg-[#00AAFF]/20 text-[#00AAFF] border border-[#00AAFF]/40'
                                }`}
                              >
                                {c.status}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-right">
                              {remaining > 0 ? (
                                <button
                                  type="button"
                                  onClick={() => onNavigate(`/admin/redeem?phone=${c.phone_number}`)}
                                  className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 rounded text-[10px] tracking-wider font-bold transition-all"
                                >
                                  Redeem ({remaining})
                                </button>
                              ) : (
                                <span className="text-[10px] text-white/20 font-mono">Claimed</span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
