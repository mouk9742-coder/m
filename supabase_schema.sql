-- =====================================================================
-- SiamBus Express - Supabase Database Schema
-- Project URL: https://xcejhdepsqxjhevnwzxl.supabase.co
-- =====================================================================

-- 1. Create Schedules Table (ตารางรอบรถประจำวัน)
CREATE TABLE IF NOT EXISTS public.schedules (
    id VARCHAR(50) PRIMARY KEY,
    day VARCHAR(20) NOT NULL DEFAULT 'today', -- 'today' | 'tomorrow'
    round_seq INT NOT NULL,
    total_rounds INT NOT NULL,
    time VARCHAR(10) NOT NULL,
    arr_time VARCHAR(10) NOT NULL,
    origin VARCHAR(255) NOT NULL,
    dest VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    plate VARCHAR(50) NOT NULL,
    driver VARCHAR(150) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    total_seats INT NOT NULL DEFAULT 36,
    occupied_seats JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Bookings Table (ตารางการจองและบัตรคิว)
CREATE TABLE IF NOT EXISTS public.bookings (
    ref_code VARCHAR(100) PRIMARY KEY,
    queue_no VARCHAR(50) NOT NULL,
    passenger_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    trip_id VARCHAR(50) REFERENCES public.schedules(id) ON DELETE SET NULL,
    trip_day VARCHAR(20) NOT NULL,
    round_seq INT,
    total_rounds INT,
    dept_time VARCHAR(10),
    arr_time VARCHAR(10),
    origin VARCHAR(255),
    dest VARCHAR(255),
    bus_type VARCHAR(100),
    seats JSONB NOT NULL DEFAULT '[]'::jsonb,
    amount NUMERIC(10, 2) NOT NULL,
    booking_start_time VARCHAR(50),
    queue_expiry_time VARCHAR(50),
    status VARCHAR(50) DEFAULT 'paid', -- 'pending', 'paid', 'expired', 'cancelled'
    payment_method VARCHAR(100) DEFAULT 'PromptPay QR',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Reports Table (ตารางรายงานพฤติกรรมพนักงานและข้อเสนอแนะ)
CREATE TABLE IF NOT EXISTS public.reports (
    ticket_id VARCHAR(100) PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    trip_info VARCHAR(255),
    staff_vehicle VARCHAR(255),
    details TEXT NOT NULL,
    phone VARCHAR(50),
    email VARCHAR(255),
    status VARCHAR(50) DEFAULT 'กำลังตรวจสอบ',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Reviews Table (ตารางรีวิวและคะแนนความพึงพอใจ)
CREATE TABLE IF NOT EXISTS public.reviews (
    id BIGSERIAL PRIMARY KEY,
    passenger_name VARCHAR(255) NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    route VARCHAR(255) NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Enable Row Level Security (RLS) & Allow Public Read/Write for Demo
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read schedules" ON public.schedules FOR SELECT USING (true);
CREATE POLICY "Allow public insert schedules" ON public.schedules FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update schedules" ON public.schedules FOR UPDATE USING (true);

CREATE POLICY "Allow public read bookings" ON public.bookings FOR SELECT USING (true);
CREATE POLICY "Allow public insert bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update bookings" ON public.bookings FOR UPDATE USING (true);

CREATE POLICY "Allow public read reports" ON public.reports FOR SELECT USING (true);
CREATE POLICY "Allow public insert reports" ON public.reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update reports" ON public.reports FOR UPDATE USING (true);

CREATE POLICY "Allow public read reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Allow public insert reviews" ON public.reviews FOR INSERT WITH CHECK (true);

-- 6. Insert Default Seed Data (ข้อมูลเริ่มต้น)
INSERT INTO public.schedules (id, day, round_seq, total_rounds, time, arr_time, origin, dest, type, plate, driver, price, total_seats, occupied_seats)
VALUES
  ('T1', 'today', 1, 8, '06:30', '15:30', 'กรุงเทพฯ (หมอชิต 2)', 'สถานีขนส่งผู้โดยสาร จ.เชียงใหม่', 'VIP 24 ที่นั่ง', '10-8841 กทม.', 'นาย สมพร สุขเกษม', 420, 24, '["A1", "A2", "B3"]'::jsonb),
  ('T2', 'today', 2, 8, '08:00', '14:00', 'กรุงเทพฯ (หมอชิต 2)', 'สถานีขนส่งผู้โดยสาร จ.ขอนแก่น', 'ปรับอากาศชั้น 1 (36 ที่นั่ง)', '10-7722 กทม.', 'นาย ประดิษฐ์ ชัยยนต์', 280, 36, '["A1", "B2", "C1", "C2", "D4"]'::jsonb),
  ('T3', 'today', 3, 8, '09:30', '13:30', 'กรุงเทพฯ (หมอชิต 2)', 'สถานีขนส่งผู้โดยสาร จ.นครราชสีมา', 'ด่วนพิเศษ Express', '10-9901 กทม.', 'นาย วิเชียร ขับดี', 180, 36, '["A1", "A3", "B1", "B2"]'::jsonb),
  ('T4', 'today', 4, 8, '11:00', '23:00', 'กรุงเทพฯ (สายใต้ใหม่)', 'สถานีขนส่งผู้โดยสาร จ.ภูเก็ต', 'VIP 24 ที่นั่ง', '10-6634 กทม.', 'นาย เอกชัย มั่นคง', 550, 24, '["A1", "B1", "B2", "C1", "C2", "C3"]'::jsonb),
  ('TM1', 'tomorrow', 1, 10, '06:00', '15:00', 'กรุงเทพฯ (หมอชิต 2)', 'สถานีขนส่งผู้โดยสาร จ.เชียงใหม่', 'VIP 24 ที่นั่ง', '10-8841 กทม.', 'นาย สมพร สุขเกษม', 420, 24, '["A1"]'::jsonb),
  ('TM2', 'tomorrow', 2, 10, '07:30', '13:30', 'กรุงเทพฯ (หมอชิต 2)', 'สถานีขนส่งผู้โดยสาร จ.ขอนแก่น', 'ปรับอากาศชั้น 1 (36 ที่นั่ง)', '10-7722 กทม.', 'นาย ประดิษฐ์ ชัยยนต์', 280, 36, '[]'::jsonb)
ON CONFLICT (id) DO NOTHING;
