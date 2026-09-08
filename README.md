# 🚌 SiamBus Express - ระบบดูรอบและจองคิวรถบัสออนไลน์

เว็บแอปพลิเคชันสำหรับการตรวจสอบตารางรอบรถและจองคิวรถบัสออนไลน์ พร้อมระบบบัตรคิวนับเวลาถอยหลัง การชำระเงินผ่าน PromptPay QR เสมือนจริง (ตามมาตรฐาน EMVCo Thai QR Payment) ระบบรายงานพฤติกรรมพนักงาน/รับคำขอจากลูกค้า ระบบสมาชิก และแผงควบคุมสำหรับผู้ดูแลระบบ (Admin)

---

## 🌟 ฟีเจอร์หลัก (Key Features)

1. **ระบบดูรอบรถประจำวัน (Today) และ วันพรุ่งนี้ (Tomorrow)**
   - สลับดูรอบรถระหว่างรอบวันนี้และรอบวันพรุ่งนี้พร้อม Badge แสดงจำนวนรอบทั้งหมด
   - แสดงสถานะที่นั่งว่างแบบ Real-time พร้อมแถบความจุที่นั่ง
   - รายละเอียดเส้นทาง, ชานชาลา, ข้อมูลคนขับ, หมายเลขทะเบียน และสิ่งอำนวยความสะดวก
   - ปุ่มติดตามพิกัด GPS ของรถแต่ละคันได้ทันที

2. **ระบบติดตามตำแหน่งรถบัสสดผ่านแผนที่ Real-Time GPS (Live GPS Telematics Map)**
   - แสดงตำแหน่งพิกัด GPS เสมือนจริงของรถบัสแต่ละคันบนแผนที่ Leaflet & OpenStreetMap
   - ติดตามเส้นทางถนนหลวงสายหลัก 4 เส้นทาง (กรุงเทพฯ-เชียงใหม่, กรุงเทพฯ-ขอนแก่น, กรุงเทพฯ-โคราช, กรุงเทพฯ-ภูเก็ต)
   - แผงหน้าปัด Telemetry HUD: วัดความเร็วสด (กม./ชม.), ระยะทางที่เหลือ, เวลาคาดว่าจะถึง (ETA), อุณหภูมิห้องโดยสาร, จุดพักรถถัดไป และสถานะดาวเทียม
   - ปุ่มล็อกมุมกล้องติดตามรถ (Center Bus) และโหมดเร่งเวลาจำลอง (1x, 5x, 20x)
   - เชื่อมต่อจากหน้าจองตั๋ว, หน้าค้นหาตั๋ว และระบบ Admin Fleet GPS

3. **ระบบการจองคิว & เลือกที่นั่ง (Interactive Bus Seat Map)**
   - แผนผังรถบัสแบบ Interactive (VIP 24 ที่นั่ง / Standard 36 ที่นั่ง)
   - นับเวลาถอยหลังการหมดอายุบัตรคิว (15 นาที) ป้องกันการจองค้าง
   - คำนวณราคาสุทธิแบบ Real-time พร้อมแจกแจงค่าโดยสารอย่างโปร่งใส

4. **ระบบชำระเงิน PromptPay QR เสมือนจริง (Realistic Thai QR Payment)**
   - สร้าง QR Code ตามมาตรฐาน EMVCo Thai QR Payment Tag พร้อมคำนวณ CRC16-CCITT
   - ดีไซน์หน้าจอชำระเงินมาตรฐานธนาคาร
   - แนบสลิปโอนเงินจำลองและยืนยันการชำระเงิน

5. **ระบบออกบัตรคิวและตั๋วโดยสารดิจิทัล (Digital Boarding Pass)**
   - ออกบัตรคิวระบุเลข Queue No., Booking Ref Code, ข้อมูลที่นั่ง และ Barcode
   - ปุ่มกดติดตามพิกัด GPS รถของตนเองทันทีหลังจองสำเร็จ
   - รองรับการพิมพ์บัตรคิว (Print / Save PDF)

6. **ศูนย์รับเรื่องร้องเรียน & ข้อเสนอแนะ (Misconduct Report & Feedback)**
   - แจ้งเรื่องร้องเรียนพฤติกรรมคนขับ / การบริการ / สภาพรถ / ข้อเสนอแนะ
   - ออกรหัส Ticket ID สำหรับติดตามสถานะ

7. **ระบบสมาชิก & แผงควบคุมผู้ดูแลระบบ (Admin Dashboard & Fleet Telematics)**
   - ระบบสะสมแต้มสมาชิก SiamBus Rewards
   - Admin Dashboard จัดการรอบรถ, ตรวจสอบรายการจอง, และจัดการเรื่องร้องเรียน
   - ระบบมอนิเตอร์พิกัดและความเร็วกองรถบัสทุกคันบนแผนที่ GPS แบบรวมศูนย์ (Fleet Telematics)

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- **Frontend:** HTML5, Modern Vanilla CSS (Glassmorphism & Micro-animations), JavaScript (ES6+)
- **Cloud Backend & Database:** Supabase (`https://xcejhdepsqxjhevnwzxl.supabase.co`) & `@supabase/supabase-js`
- **Map & GPS Engine:** Leaflet.js, OpenStreetMap, Real-Time Telematics & Waypoints Interpolation
- **Local Fallback Storage:** LocalStorage สำหรับบันทึกข้อมูลรอบรถ, การจอง, ประวัติ และตั๋วแบบ Offline/Hybrid
- **Standards & Libraries:** EMVCo Thai QR Standard, QRCode.js, Font Awesome, Google Fonts (Prompt & Sarabun)

---

## ☁️ การเชื่อมต่อฐานข้อมูล Supabase (Cloud Backend)

- **Supabase Project URL:** `https://xcejhdepsqxjhevnwzxl.supabase.co`
- **ไฟล์สร้างตารางฐานข้อมูล:** [`supabase_schema.sql`](supabase_schema.sql)
- **ตารางข้อมูลในระบบ:**
  1. `schedules` - จัดเก็บตารางรอบรถประจำวัน (Today/Tomorrow)
  2. `bookings` - จัดเก็บข้อมูลการจองและบัตรคิวดิจิทัล
  3. `reports` - จัดเก็บเรื่องร้องเรียนพฤติกรรมพนักงานและข้อเสนอแนะ
  4. `reviews` - จัดเก็บรีวิวและคะแนนความพึงพอใจ

### วิธีนำ SQL Schema ไปติดตั้งใน Supabase:
1. เปิดหน้าแดชบอร์ดของ Supabase: [https://supabase.com/dashboard/project/xcejhdepsqxjhevnwzxl](https://supabase.com/dashboard/project/xcejhdepsqxjhevnwzxl)
2. ไปที่เมนู **SQL Editor**
3. คัดลอกคำสั่งทั้งหมดในไฟล์ [`supabase_schema.sql`](supabase_schema.sql) ไปวางแล้วกด **Run**
4. หน้าเว็บ SiamBus Express จะสามารถซิงค์และบันทึกข้อมูลแบบ Real-Time ทันที

---

## 🚀 วิธีการเปิดใช้งาน (Getting Started)

1. เข้าใช้งานผ่านลิงก์ Live Demo: **[https://mouk9742-coder.github.io/m/](https://mouk9742-coder.github.io/m/)**
2. หรือ Clone Repository นี้: `git clone https://github.com/mouk9742-coder/m.git`
3. เปิดไฟล์ `index.html` ด้วยเว็บเบราว์เซอร์ (Chrome, Edge, Safari, Firefox)
4. ใช้งานระบบได้ทันทีทั้งแบบ Offline LocalStorage และเชื่อมต่อ Supabase Cloud

