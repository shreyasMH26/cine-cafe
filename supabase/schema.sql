-- ============================================================
-- WEB BITES / THE CINE CAFÉ — SUPABASE DATABASE SCHEMA
-- STALL NO. 08 · TEAM DYNAMOS · 10 OCT 2026
-- ============================================================

-- Enable UUID extension if not already present
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SITE VISITS TABLE (Tracks visitor traffic & QR scans)
CREATE TABLE IF NOT EXISTS site_visits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  source TEXT DEFAULT 'direct', -- 'ticket_qr', 'banner', 'direct', etc.
  device_type TEXT DEFAULT 'mobile', -- 'mobile', 'tablet', 'desktop'
  page_path TEXT DEFAULT '/',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_site_visits_source ON site_visits(source);
CREATE INDEX IF NOT EXISTS idx_site_visits_created_at ON site_visits(created_at);
CREATE INDEX IF NOT EXISTS idx_site_visits_session ON site_visits(session_id);

-- 2. CUSTOMERS TABLE (Recorded upon ticket purchase)
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  college_class TEXT DEFAULT 'General',
  tickets_purchased INT NOT NULL DEFAULT 1,
  tickets_redeemed INT NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'UNREDEEMED', -- 'UNREDEEMED', 'PARTIALLY_REDEEMED', 'REDEEMED'
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone_number);
CREATE INDEX IF NOT EXISTS idx_customers_status ON customers(status);

-- 3. REDEMPTIONS TABLE (Recorded when physical ticket counterfoil is torn)
CREATE TABLE IF NOT EXISTS redemptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  tickets_redeemed_count INT NOT NULL DEFAULT 1,
  redeemed_at TIMESTAMPTZ DEFAULT NOW(),
  redeemed_by TEXT DEFAULT 'Organizer',
  counter_games_played JSONB DEFAULT '[]'::jsonb,
  notification_sent BOOLEAN DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_redemptions_customer_id ON redemptions(customer_id);
CREATE INDEX IF NOT EXISTS idx_redemptions_phone ON redemptions(phone_number);
CREATE INDEX IF NOT EXISTS idx_redemptions_redeemed_at ON redemptions(redeemed_at);

-- 4. NOTIFICATIONS TABLE (Audit trail of WhatsApp/SMS notifications)
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  redemption_id UUID REFERENCES redemptions(id) ON DELETE SET NULL,
  recipient_type TEXT NOT NULL, -- 'organizer' or 'customer'
  channel TEXT NOT NULL DEFAULT 'whatsapp',
  recipient_phone TEXT NOT NULL,
  message_payload TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'sent', -- 'sent', 'pending', 'failed'
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  error TEXT
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

ALTER TABLE site_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Allow anonymous visitors to log their visit (with rate/insert permission)
CREATE POLICY "Allow public insert to site_visits" ON site_visits
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read to site_visits count" ON site_visits
  FOR SELECT USING (true);

-- Allow organizers / public client to query and register customers
CREATE POLICY "Allow read and write to customers" ON customers
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow read and write to redemptions" ON redemptions
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow read and write to notifications" ON notifications
  FOR ALL USING (true) WITH CHECK (true);
