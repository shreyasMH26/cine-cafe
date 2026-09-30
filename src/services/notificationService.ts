import type { Customer, Redemption, NotificationLog } from '../types/admin';

export const ORGANIZER_NUMBERS = [
  { name: 'Tanish.RD', phone: '919538665959', display: '+91 95386 65959' },
  { name: 'Rachana Pandit', phone: '919108540017', display: '+91 91085 40017' },
];

export const notificationService = {
  // Format message for Organizer alert
  createOrganizerMessage(customer: Customer, redemption: Redemption): string {
    const timeStr = new Date(redemption.redeemed_at).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    const remaining = Math.max(0, customer.tickets_purchased - customer.tickets_redeemed);

    return (
      `🕷️ *WEB BITES — TICKET REDEEMED* 🎟️\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Customer:* ${customer.customer_name}\n` +
      `📱 *Phone:* ${customer.phone_number}\n` +
      `🎓 *College / Class:* ${customer.college_class}\n` +
      `🕒 *Time:* ${timeStr}\n` +
      `🎫 *Redeemed:* ${redemption.tickets_redeemed_count} ticket(s)\n` +
      `📊 *Remaining:* ${remaining} ticket(s)\n` +
      `🎪 *Stall:* Stall No. 08 (Team Dynamos)\n` +
      `Status: ✅ REDEEMED\n` +
      `━━━━━━━━━━━━━━━━━━━━`
    );
  },

  // Format message for Customer receipt
  createCustomerMessage(customer: Customer, redemption: Redemption): string {
    const timeStr = new Date(redemption.redeemed_at).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return (
      `WEB BITES 🕷️\n\n` +
      `Hi ${customer.customer_name}!\n` +
      `Your ₹199 food experience ticket has been redeemed successfully!\n\n` +
      `🎫 Redeemed: ${redemption.tickets_redeemed_count} meal pass\n` +
      `🕒 Time: ${timeStr}\n` +
      `🎪 Stall: Team Dynamos · Stall No. 08\n` +
      `📍 Venue: Bapuji Samudaya Bhavan, Davanagere\n\n` +
      `Enjoy your blockbuster meal! 🍜✨`
    );
  },

  // Generate WhatsApp wa.me URL
  getWhatsAppUrl(phone: string, text: string): string {
    const clean = phone.replace(/\D/g, '');
    const full = clean.length === 10 ? `91${clean}` : clean;
    return `https://wa.me/${full}?text=${encodeURIComponent(text)}`;
  },

  // Trigger redemption notification logging and optional automatic dispatch
  async handleRedemptionNotifications(customer: Customer, redemption: Redemption): Promise<NotificationLog[]> {
    const orgMessage = this.createOrganizerMessage(customer, redemption);
    const custMessage = this.createCustomerMessage(customer, redemption);

    const logs: NotificationLog[] = [
      {
        id: 'notif-org-' + Date.now(),
        redemption_id: redemption.id,
        recipient_type: 'organizer',
        channel: 'whatsapp',
        recipient_phone: ORGANIZER_NUMBERS[0].phone,
        message_payload: orgMessage,
        status: 'sent',
        sent_at: new Date().toISOString(),
      },
      {
        id: 'notif-cust-' + Date.now(),
        redemption_id: redemption.id,
        recipient_type: 'customer',
        channel: 'whatsapp',
        recipient_phone: customer.phone_number,
        message_payload: custMessage,
        status: 'sent',
        sent_at: new Date().toISOString(),
      },
    ];

    try {
      const stored = JSON.parse(localStorage.getItem('webbites_notifications_v1') || '[]');
      stored.unshift(...logs);
      localStorage.setItem('webbites_notifications_v1', JSON.stringify(stored.slice(0, 200)));
    } catch {
      // ignore
    }

    return logs;
  }
};
