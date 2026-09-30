export type CustomerStatus = 'UNREDEEMED' | 'PARTIALLY_REDEEMED' | 'REDEEMED';

export interface Customer {
  id: string;
  customer_name: string;
  phone_number: string;
  college_class: string;
  tickets_purchased: number;
  tickets_redeemed: number;
  status: CustomerStatus;
  created_at: string;
  updated_at: string;
  notes?: string;
}

export interface Redemption {
  id: string;
  customer_id: string;
  customer_name: string;
  phone_number: string;
  tickets_redeemed_count: number;
  redeemed_at: string;
  redeemed_by?: string;
  counter_games_played?: string[];
  notification_sent: boolean;
}

export interface SiteVisit {
  id: string;
  session_id: string;
  source: string; // 'ticket_qr' | 'direct' | 'banner' | etc.
  device_type: 'mobile' | 'tablet' | 'desktop';
  page_path: string;
  created_at: string;
}

export interface NotificationLog {
  id: string;
  redemption_id?: string;
  recipient_type: 'organizer' | 'customer';
  channel: 'whatsapp' | 'sms' | 'webhook';
  recipient_phone: string;
  message_payload: string;
  status: 'sent' | 'pending' | 'failed';
  sent_at?: string;
  error?: string;
}

export interface DashboardStats {
  totalVisitors: number;
  uniqueVisitors: number;
  qrVisits: number;
  customersRecorded: number;
  ticketsPurchasedTotal: number;
  ticketsRedeemedTotal: number;
  ticketsRemaining: number;
  redemptionRate: number;
  visitorsToday: number;
  qrScansToday: number;
  redemptionsToday: number;
}
