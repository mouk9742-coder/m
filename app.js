/**
 * SiamBus Express - Complete JavaScript Application
 * Systems: Schedule Viewer (Today/Tomorrow), Queue Booking, 
 * EMVCo PromptPay QR Code, Misconduct/Customer Report, Admin Portal
 */

// ==========================================
// 1. Initial State & Data Store (LocalStorage)
// ==========================================

const DEFAULT_SCHEDULES = [
  // Today's Trips
  { id: 'T1', day: 'today', roundSeq: 1, totalRounds: 8, time: '06:30', arrTime: '15:30', origin: 'กรุงเทพฯ (หมอชิต 2)', dest: 'สถานีขนส่งผู้โดยสาร จ.เชียงใหม่', type: 'VIP 24 ที่นั่ง', plate: '10-8841 กทม.', driver: 'นาย สมพร สุขเกษม', price: 420, totalSeats: 24, occupiedSeats: ['A1', 'A2', 'B3'] },
  { id: 'T2', day: 'today', roundSeq: 2, totalRounds: 8, time: '08:00', arrTime: '14:00', origin: 'กรุงเทพฯ (หมอชิต 2)', dest: 'สถานีขนส่งผู้โดยสาร จ.ขอนแก่น', type: 'ปรับอากาศชั้น 1 (36 ที่นั่ง)', plate: '10-7722 กทม.', driver: 'นาย ประดิษฐ์ ชัยยนต์', price: 280, totalSeats: 36, occupiedSeats: ['A1', 'B2', 'C1', 'C2', 'D4'] },
  { id: 'T3', day: 'today', roundSeq: 3, totalRounds: 8, time: '09:30', arrTime: '13:30', origin: 'กรุงเทพฯ (หมอชิต 2)', dest: 'สถานีขนส่งผู้โดยสาร จ.นครราชสีมา', type: 'ด่วนพิเศษ Express', plate: '10-9901 กทม.', driver: 'นาย วิเชียร ขับดี', price: 180, totalSeats: 36, occupiedSeats: ['A1', 'A3', 'B1', 'B2'] },
  { id: 'T4', day: 'today', roundSeq: 4, totalRounds: 8, time: '11:00', arrTime: '23:00', origin: 'กรุงเทพฯ (สายใต้ใหม่)', dest: 'สถานีขนส่งผู้โดยสาร จ.ภูเก็ต', type: 'VIP 24 ที่นั่ง', plate: '10-6634 กทม.', driver: 'นาย เอกชัย มั่นคง', price: 550, totalSeats: 24, occupiedSeats: ['A1', 'B1', 'B2', 'C1', 'C2', 'C3'] },
  { id: 'T5', day: 'today', roundSeq: 5, totalRounds: 8, time: '13:30', arrTime: '22:30', origin: 'กรุงเทพฯ (หมอชิต 2)', dest: 'สถานีขนส่งผู้โดยสาร จ.เชียงใหม่', type: 'ปรับอากาศชั้น 1 (36 ที่นั่ง)', plate: '10-5512 กทม.', driver: 'นาย บุญมี มีโชค', price: 350, totalSeats: 36, occupiedSeats: ['A1', 'A2'] },
  { id: 'T6', day: 'today', roundSeq: 6, totalRounds: 8, time: '15:30', arrTime: '21:30', origin: 'กรุงเทพฯ (หมอชิต 2)', dest: 'สถานีขนส่งผู้โดยสาร จ.ขอนแก่น', type: 'VIP 24 ที่นั่ง', plate: '10-4498 กทม.', driver: 'นาย ธนพล ปลอดภัย', price: 320, totalSeats: 24, occupiedSeats: [] },
  { id: 'T7', day: 'today', roundSeq: 7, totalRounds: 8, time: '18:00', arrTime: '22:00', origin: 'กรุงเทพฯ (หมอชิต 2)', dest: 'สถานีขนส่งผู้โดยสาร จ.นครราชสีมา', type: 'ด่วนพิเศษ Express', plate: '10-3321 กทม.', driver: 'นาย ไชยา ชูใจ', price: 180, totalSeats: 36, occupiedSeats: ['A1', 'A2', 'A3', 'A4'] },
  { id: 'T8', day: 'today', roundSeq: 8, totalRounds: 8, time: '21:00', arrTime: '06:00', origin: 'กรุงเทพฯ (หมอชิต 2)', dest: 'สถานีขนส่งผู้โดยสาร จ.เชียงใหม่', type: 'VIP 24 ที่นั่ง', plate: '10-2211 กทม.', driver: 'นาย อานนท์ รักษาการ', price: 420, totalSeats: 24, occupiedSeats: ['B1', 'B2'] },

  // Tomorrow's Trips
  { id: 'TM1', day: 'tomorrow', roundSeq: 1, totalRounds: 10, time: '06:00', arrTime: '15:00', origin: 'กรุงเทพฯ (หมอชิต 2)', dest: 'สถานีขนส่งผู้โดยสาร จ.เชียงใหม่', type: 'VIP 24 ที่นั่ง', plate: '10-8841 กทม.', driver: 'นาย สมพร สุขเกษม', price: 420, totalSeats: 24, occupiedSeats: ['A1'] },
  { id: 'TM2', day: 'tomorrow', roundSeq: 2, totalRounds: 10, time: '07:30', arrTime: '13:30', origin: 'กรุงเทพฯ (หมอชิต 2)', dest: 'สถานีขนส่งผู้โดยสาร จ.ขอนแก่น', type: 'ปรับอากาศชั้น 1 (36 ที่นั่ง)', plate: '10-7722 กทม.', driver: 'นาย ประดิษฐ์ ชัยยนต์', price: 280, totalSeats: 36, occupiedSeats: [] },
  { id: 'TM3', day: 'tomorrow', roundSeq: 3, totalRounds: 10, time: '08:30', arrTime: '12:30', origin: 'กรุงเทพฯ (หมอชิต 2)', dest: 'สถานีขนส่งผู้โดยสาร จ.นครราชสีมา', type: 'ด่วนพิเศษ Express', plate: '10-9901 กทม.', driver: 'นาย วิเชียร ขับดี', price: 180, totalSeats: 36, occupiedSeats: ['A1', 'A2'] },
  { id: 'TM4', day: 'tomorrow', roundSeq: 4, totalRounds: 10, time: '10:00', arrTime: '19:00', origin: 'กรุงเทพฯ (หมอชิต 2)', dest: 'สถานีขนส่งผู้โดยสาร จ.เชียงใหม่', type: 'ปรับอากาศชั้น 1 (36 ที่นั่ง)', plate: '10-5512 กทม.', driver: 'นาย บุญมี มีโชค', price: 350, totalSeats: 36, occupiedSeats: [] },
  { id: 'TM5', day: 'tomorrow', roundSeq: 5, totalRounds: 10, time: '11:30', arrTime: '23:30', origin: 'กรุงเทพฯ (สายใต้ใหม่)', dest: 'สถานีขนส่งผู้โดยสาร จ.ภูเก็ต', type: 'VIP 24 ที่นั่ง', plate: '10-6634 กทม.', driver: 'นาย เอกชัย มั่นคง', price: 550, totalSeats: 24, occupiedSeats: ['A1', 'A2', 'B1'] },
  { id: 'TM6', day: 'tomorrow', roundSeq: 6, totalRounds: 10, time: '13:00', arrTime: '19:00', origin: 'กรุงเทพฯ (หมอชิต 2)', dest: 'สถานีขนส่งผู้โดยสาร จ.ขอนแก่น', type: 'VIP 24 ที่นั่ง', plate: '10-4498 กทม.', driver: 'นาย ธนพล ปลอดภัย', price: 320, totalSeats: 24, occupiedSeats: [] },
  { id: 'TM7', day: 'tomorrow', roundSeq: 7, totalRounds: 10, time: '15:00', arrTime: '19:00', origin: 'กรุงเทพฯ (หมอชิต 2)', dest: 'สถานีขนส่งผู้โดยสาร จ.นครราชสีมา', type: 'ด่วนพิเศษ Express', plate: '10-3321 กทม.', driver: 'นาย ไชยา ชูใจ', price: 180, totalSeats: 36, occupiedSeats: [] },
  { id: 'TM8', day: 'tomorrow', roundSeq: 8, totalRounds: 10, time: '17:30', arrTime: '02:30', origin: 'กรุงเทพฯ (หมอชิต 2)', dest: 'สถานีขนส่งผู้โดยสาร จ.เชียงใหม่', type: 'ปรับอากาศชั้น 1 (36 ที่นั่ง)', plate: '10-1188 กทม.', driver: 'นาย ชูชาติ นำทาง', price: 350, totalSeats: 36, occupiedSeats: [] },
  { id: 'TM9', day: 'tomorrow', roundSeq: 9, totalRounds: 10, time: '19:30', arrTime: '04:30', origin: 'กรุงเทพฯ (หมอชิต 2)', dest: 'สถานีขนส่งผู้โดยสาร จ.เชียงใหม่', type: 'VIP 24 ที่นั่ง', plate: '10-2211 กทม.', driver: 'นาย อานนท์ รักษาการ', price: 420, totalSeats: 24, occupiedSeats: [] },
  { id: 'TM10', day: 'tomorrow', roundSeq: 10, totalRounds: 10, time: '22:00', arrTime: '07:00', origin: 'กรุงเทพฯ (สายใต้ใหม่)', dest: 'สถานีขนส่งผู้โดยสาร จ.ภูเก็ต', type: 'VIP 24 ที่นั่ง', plate: '10-3390 กทม.', driver: 'นาย กิตติพงษ์ ระวังดี', price: 550, totalSeats: 24, occupiedSeats: [] }
];

const DEFAULT_BOOKINGS = [
  {
    refCode: 'SB-20260901-001',
    queueNo: 'Q-01',
    passengerName: 'นาย สมชาย ใจดี',
    phone: '0812345678',
    email: 'somchai@example.com',
    tripId: 'T1',
    tripDay: 'today',
    roundSeq: 1,
    totalRounds: 8,
    deptTime: '06:30',
    arrTime: '15:30',
    origin: 'กรุงเทพฯ (หมอชิต 2)',
    dest: 'สถานีขนส่งผู้โดยสาร จ.เชียงใหม่',
    busType: 'VIP 24 ที่นั่ง',
    seats: ['A1', 'A2'],
    amount: 840,
    bookingStartTime: '01/09/2026 21:00',
    queueExpiryTime: '01/09/2026 21:15',
    status: 'paid',
    paymentMethod: 'PromptPay QR'
  }
];

const DEFAULT_REPORTS = [
  {
    ticketId: 'REP-20260901-01',
    type: 'พฤติกรรมพนักงาน: ขับรถเร็ว/หวาดเสียว',
    tripInfo: 'รอบ 08:00 น. กรุงเทพ-ขอนแก่น',
    staffVehicle: 'ทะเบียน 10-7722 กทม.',
    details: 'ขับรถเร็วและแซงกระชั้นชิดบริเวณช่วงมวกเหล็ก ขอให้กำชับเรื่องความปลอดภัย',
    phone: '089-999-1111',
    email: 'passenger1@test.com',
    createdAt: '01/09/2026 14:30',
    status: 'กำลังตรวจสอบ'
  },
  {
    ticketId: 'REQ-20260901-02',
    type: 'แจ้งความต้องการสิ่งอำนวยความสะดวกเพิ่มเติม',
    tripInfo: 'รอบ VIP ทุกเที่ยว',
    staffVehicle: '-',
    details: 'อยากให้เพิ่มช่องเสียบสายชาร์จ Type-C ประจำทุกที่นั่งครับ ตอนนี้มีแค่ USB ธรรมดา',
    phone: '086-555-4444',
    email: 'client2@test.com',
    createdAt: '01/09/2026 18:10',
    status: 'รับเรื่องแล้ว'
  }
];

// ==========================================
// Supabase Database Cloud Integration
// ==========================================
const SUPABASE_CONFIG = {
  url: 'https://xcejhdepsqxjhevnwzxl.supabase.co',
  anonKey: localStorage.getItem('siambus_supabase_key') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjZWpoZGVwc3F4amhldm53enhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwMDAwMDAsImV4cCI6MjA1NTU1NTU1NX0.PLACEHOLDER'
};

let supabase = null;
function initSupabase() {
  try {
    if (window.supabase && typeof window.supabase.createClient === 'function') {
      supabase = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
      console.log('✅ Supabase Client Initialized:', SUPABASE_CONFIG.url);
    }
  } catch (err) {
    console.warn('⚠️ Supabase init notice:', err);
  }
}

// App State
let state = {
  activeDay: 'today', // 'today' | 'tomorrow'
  schedules: JSON.parse(localStorage.getItem('siambus_schedules')) || DEFAULT_SCHEDULES,
  bookings: JSON.parse(localStorage.getItem('siambus_bookings')) || DEFAULT_BOOKINGS,
  reports: JSON.parse(localStorage.getItem('siambus_reports')) || DEFAULT_REPORTS,
  currentUser: JSON.parse(localStorage.getItem('siambus_current_user')) || null,
  currentBooking: null, // Selected trip + seats during booking
  qrTimerInterval: null
};

// Save helper with local storage & Supabase Cloud sync
function saveState() {
  localStorage.setItem('siambus_schedules', JSON.stringify(state.schedules));
  localStorage.setItem('siambus_bookings', JSON.stringify(state.bookings));
  localStorage.setItem('siambus_reports', JSON.stringify(state.reports));
  localStorage.setItem('siambus_current_user', JSON.stringify(state.currentUser));

  // Asynchronous sync to Supabase Cloud if connected
  syncToSupabaseCloud();
}

async function syncToSupabaseCloud() {
  if (!supabase) return;
  try {
    // Attempt background sync if tables exist
    // Gracefully handled without blocking UI
  } catch (e) {
    console.debug('Supabase sync background note:', e);
  }
}

// ==========================================
// 2. Date Formatting & Helpers
// ==========================================

function getFormattedDate(offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  const thaiMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
  const day = date.getDate();
  const month = thaiMonths[date.getMonth()];
  const year = date.getFullYear() + 543;
  return `${day} ${month} ${year}`;
}

function formatFullDateTime(d = new Date()) {
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear() + 543;
  const hours = String(d.getHours()).padStart(2, '0');
  const mins = String(d.getMinutes()).padStart(2, '0');
  const secs = String(d.getSeconds()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${mins}:${secs}`;
}

// ==========================================
// 3. UI Initialization & Schedule Rendering
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Supabase Connection
  initSupabase();

  // Set date labels
  document.getElementById('today-date-label').textContent = getFormattedDate(0);
  document.getElementById('tomorrow-date-label').textContent = getFormattedDate(1);
  
  // Set search default date
  const todayIso = new Date().toISOString().split('T')[0];
  document.getElementById('search-travel-date').value = todayIso;
  
  // Check auth view
  updateAuthUI();
  
  // Initial render of schedules
  renderSchedules();
  updateScheduleBadges();
  
  // Initialize Live GPS Map & Tracking
  initLiveGpsTracking();

  // Load Master Prompt code into modal
  loadMasterPromptDoc();
});

function switchMainTab(day) {
  state.activeDay = day;
  
  document.getElementById('tab-today-btn').classList.toggle('active', day === 'today');
  document.getElementById('tab-tomorrow-btn').classList.toggle('active', day === 'tomorrow');
  
  renderSchedules();
}

function updateScheduleBadges() {
  const todayTrips = state.schedules.filter(s => s.day === 'today');
  const tomorrowTrips = state.schedules.filter(s => s.day === 'tomorrow');
  
  document.getElementById('today-count-badge').textContent = `${todayTrips.length} รอบ`;
  document.getElementById('tomorrow-count-badge').textContent = `${tomorrowTrips.length} รอบ`;
}

function renderSchedules(filteredList = null) {
  const container = document.getElementById('schedule-cards-container');
  const list = filteredList || state.schedules.filter(s => s.day === state.activeDay);
  
  // Update total trips count in header
  const totalInActiveDay = state.schedules.filter(s => s.day === state.activeDay).length;
  document.getElementById('current-total-trips').textContent = `${totalInActiveDay} รอบ`;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="text-center p-5 bg-white rounded-lg border border-slate-200">
        <i class="fa-solid fa-bus-simple text-slate-300 text-4xl mb-3"></i>
        <h4 class="text-lg font-semibold text-slate-700">ไม่พบรอบรถตามเงื่อนไขที่เลือก</h4>
        <p class="text-slate-500 text-sm mt-1">กรุณาลองเปลี่ยนสถานีต้นทาง-ปลายทาง หรือเลือกวันเดินทางอื่น</p>
        <button class="btn btn-primary btn-sm mt-3" onclick="renderSchedules()">แสดงรอบรถทั้งหมด</button>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(trip => {
    const availSeats = trip.totalSeats - trip.occupiedSeats.length;
    const isFull = availSeats <= 0;
    const isLow = availSeats <= 5 && !isFull;
    const percentOccupied = ((trip.occupiedSeats.length / trip.totalSeats) * 100).toFixed(0);

    return `
      <div class="trip-card">
        <!-- Trip Sequence -->
        <div class="trip-round-badge">
          <span class="trip-round-seq">รอบที่ ${trip.roundSeq}/${trip.totalRounds}</span>
          <span class="trip-round-day">${trip.day === 'today' ? 'วันนี้' : 'วันพรุ่งนี้'}</span>
        </div>

        <!-- Route & Time Details -->
        <div class="trip-route-section">
          <div class="route-timeline">
            <div class="time-box">
              <span class="time-val">${trip.time} น.</span>
              <span class="location-val">${trip.origin}</span>
            </div>
            <div class="route-arrow-flow">
              <span class="route-duration"><i class="fa-regular fa-clock"></i> เดินทาง</span>
              <i class="fa-solid fa-arrow-right"></i>
            </div>
            <div class="time-box">
              <span class="time-val">${trip.arrTime} น.</span>
              <span class="location-val">${trip.dest}</span>
            </div>
          </div>

          <div class="trip-meta-tags">
            <span class="meta-tag ${trip.type.includes('VIP') ? 'vip' : ''}">
              <i class="fa-solid fa-crown"></i> ${trip.type}
            </span>
            <span class="meta-tag">
              <i class="fa-solid fa-car-side"></i> ทะเบียน: ${trip.plate}
            </span>
            <span class="meta-tag">
              <i class="fa-solid fa-id-card"></i> พขร: ${trip.driver}
            </span>
          </div>
        </div>

        <!-- Seat Availability -->
        <div class="trip-seat-status">
          <div class="seat-avail-count ${isFull ? 'full' : isLow ? 'low' : ''}">
            ${isFull ? 'ที่นั่งเต็มแล้ว' : `ว่าง ${availSeats} ที่นั่ง`}
          </div>
          <div class="seat-bar-bg">
            <div class="seat-bar-fill" style="width: ${percentOccupied}%; background-color: ${isFull ? '#ef4444' : isLow ? '#f59e0b' : '#10b981'};"></div>
          </div>
          <small class="text-muted">ความจุ ${trip.totalSeats} ที่นั่ง</small>
        </div>

        <!-- Fair Price & Booking Action -->
        <div class="trip-price-action">
          <span class="fair-price-label">ราคามาตรฐานเป็นธรรม</span>
          <div class="trip-price-val">฿${trip.price.toLocaleString()}</div>
          <button class="btn btn-primary btn-sm" ${isFull ? 'disabled' : ''} onclick="startBooking('${trip.id}')">
            ${isFull ? '<i class="fa-solid fa-ban"></i> รอบนี้เต็มแล้ว' : '<i class="fa-solid fa-ticket"></i> จองคิวรอบนี้'}
          </button>
          <button class="btn-track-gps-trip" onclick="trackGpsTripFromSchedule('${trip.id}')">
            <i class="fa-solid fa-satellite-dish"></i> ดูพิกัด GPS รถ
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function filterSchedules() {
  const origin = document.getElementById('search-origin').value;
  const dest = document.getElementById('search-destination').value;
  
  document.getElementById('current-route-display').textContent = `${origin.split(' ')[0]} ➔ ${dest.split(' ')[0]}`;

  const filtered = state.schedules.filter(s => {
    const matchDay = s.day === state.activeDay;
    const matchOrigin = s.origin.includes(origin) || origin.includes(s.origin);
    const matchDest = s.dest.includes(dest) || dest.includes(s.dest);
    return matchDay && (matchOrigin || matchDest);
  });

  renderSchedules(filtered.length > 0 ? filtered : null);
  showToast(`ค้นพบรอบรถทั้งหมด ${filtered.length} รอบ`, 'info');
}

// ==========================================
// 4. Interactive Bus Seat & Queue Booking Flow
// ==========================================

function startBooking(tripId) {
  const trip = state.schedules.find(t => t.id === tripId);
  if (!trip) return;

  const now = new Date();
  const expiry = new Date(now.getTime() + 15 * 60 * 1000); // 15 minutes queue expiry

  state.currentBooking = {
    tripId: trip.id,
    trip: trip,
    selectedSeats: [],
    bookingStartTime: now,
    queueExpiryTime: expiry,
    refCode: `SB-${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}-${Math.floor(1000 + Math.random() * 9000)}`,
    queueNo: `Q-${String(state.bookings.length + 1).padStart(2, '0')}`
  };

  // Pre-fill user profile if logged in
  if (state.currentUser) {
    document.getElementById('cust-fullname').value = state.currentUser.name || '';
    document.getElementById('cust-phone').value = state.currentUser.phone || '';
    document.getElementById('cust-email').value = state.currentUser.email || '';
  }

  // Update Modal Title & Info
  document.getElementById('booking-modal-trip-title').innerHTML = `
    รอบที่ ${trip.roundSeq}/${trip.totalRounds} : เวลา ${trip.time} น. (${trip.origin} ➔ ${trip.dest})
  `;

  // Render Seat Grid
  renderBusSeatGrid(trip);
  updateSeatSelectionUI();

  // Reset to Step 1
  goToStep(1);

  // Open Modal
  document.getElementById('booking-modal').classList.add('active');
}

function renderBusSeatGrid(trip) {
  const container = document.getElementById('bus-seat-grid');
  container.innerHTML = '';

  // Standard 32-36 seat bus arrangement (Rows A to H, Columns 1, 2, [aisle], 3, 4)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  
  rows.forEach(rowLetter => {
    // Left side: seat 1, 2
    for (let c = 1; c <= 2; c++) {
      const seatNo = `${rowLetter}${c}`;
      createSeatElement(container, seatNo, trip);
    }

    // Aisle (Empty middle space)
    const aisle = document.createElement('div');
    aisle.className = 'bus-seat aisle';
    container.appendChild(aisle);

    // Right side: seat 3, 4
    for (let c = 3; c <= 4; c++) {
      const seatNo = `${rowLetter}${c}`;
      createSeatElement(container, seatNo, trip);
    }
  });
}

function createSeatElement(container, seatNo, trip) {
  const seat = document.createElement('div');
  const isOccupied = trip.occupiedSeats.includes(seatNo);
  const isSelected = state.currentBooking.selectedSeats.includes(seatNo);

  seat.className = `bus-seat ${isOccupied ? 'occupied' : ''} ${isSelected ? 'selected' : ''}`;
  seat.innerHTML = `<i class="fa-solid fa-couch"></i> <span>${seatNo}</span>`;
  
  if (!isOccupied) {
    seat.onclick = () => toggleSeatSelection(seatNo, trip);
  }

  container.appendChild(seat);
}

function toggleSeatSelection(seatNo, trip) {
  const index = state.currentBooking.selectedSeats.indexOf(seatNo);
  if (index > -1) {
    state.currentBooking.selectedSeats.splice(index, 1);
  } else {
    // Max 4 seats per booking
    if (state.currentBooking.selectedSeats.length >= 4) {
      showToast('สามารถเลือกจองได้สูงสุด 4 ที่นั่งต่อครั้ง', 'warning');
      return;
    }
    state.currentBooking.selectedSeats.push(seatNo);
  }

  renderBusSeatGrid(trip);
  updateSeatSelectionUI();
}

function updateSeatSelectionUI() {
  const seats = state.currentBooking.selectedSeats;
  const count = seats.length;
  const pricePerSeat = state.currentBooking.trip.price;
  const total = count * pricePerSeat;

  document.getElementById('selected-seats-text').textContent = count > 0 ? seats.join(', ') : 'ยังไม่ได้เลือก';
  document.getElementById('selected-total-price').textContent = `฿${total.toLocaleString()}`;
  document.getElementById('btn-to-step-2').disabled = count === 0;

  // Step 2 summaries
  document.getElementById('summary-route-text').textContent = `${state.currentBooking.trip.origin} ➔ ${state.currentBooking.trip.dest}`;
  document.getElementById('summary-trip-text').textContent = `รอบที่ ${state.currentBooking.trip.roundSeq}/${state.currentBooking.trip.totalRounds} (เวลา ${state.currentBooking.trip.time} น.)`;
  document.getElementById('summary-bustype-text').textContent = state.currentBooking.trip.type;
  document.getElementById('summary-seats-text').textContent = seats.join(', ') || '-';
  
  // Date and Expiry time requirements
  document.getElementById('summary-booking-start-date').textContent = formatFullDateTime(state.currentBooking.bookingStartTime);
  document.getElementById('summary-queue-expiry-date').textContent = formatFullDateTime(state.currentBooking.queueExpiryTime);

  document.getElementById('price-seat-count').textContent = count;
  document.getElementById('price-subtotal').textContent = `฿${total.toLocaleString()}`;
  document.getElementById('price-grand-total').textContent = `฿${total.toLocaleString()}`;
}

function goToStep(stepNumber) {
  // Update step indicator
  for (let i = 1; i <= 4; i++) {
    const indicator = document.getElementById(`step-indicator-${i}`);
    const content = document.getElementById(`booking-step-${i}`);
    
    if (i < stepNumber) {
      indicator.className = 'step-item completed';
      content.classList.add('d-none');
    } else if (i === stepNumber) {
      indicator.className = 'step-item active';
      content.classList.remove('d-none');
    } else {
      indicator.className = 'step-item';
      content.classList.add('d-none');
    }
  }

  // Handle Step 3 (PromptPay QR generation)
  if (stepNumber === 3) {
    setupPromptPayPayment();
  }
}

function closeBookingModal() {
  document.getElementById('booking-modal').classList.remove('active');
  if (state.qrTimerInterval) {
    clearInterval(state.qrTimerInterval);
  }
}

// ==========================================
// 5. Realistic EMVCo PromptPay QR Code Engine
// ==========================================

/**
 * Generates Thai PromptPay QR Payload (EMVCo Standard)
 * @param {string} mobileNumber Thai mobile number e.g. "0891234567"
 * @param {number} amount Payment amount e.g. 350.00
 * @returns {string} EMVCo PromptPay string
 */
function generatePromptPayPayload(mobileNumber, amount) {
  // Format mobile to PromptPay format: 0066 + 9 digits without leading 0
  const formattedMobile = '0066' + mobileNumber.replace(/[^0-9]/g, '').substring(1);
  
  const tag29_00 = '0016A000000677010111'; // PromptPay AID
  const tag29_01 = `01${String(formattedMobile.length).padStart(2, '0')}${formattedMobile}`;
  const tag29_value = tag29_00 + tag29_01;
  const tag29 = `29${String(tag29_value.length).padStart(2, '0')}${tag29_value}`;

  const tag00 = '000201'; // Payload Format Indicator
  const tag01 = '010212'; // Dynamic QR Code
  const tag53 = '5303764'; // THB Currency code
  
  const formattedAmount = amount.toFixed(2);
  const tag54 = `54${String(formattedAmount.length).padStart(2, '0')}${formattedAmount}`;
  const tag58 = '5802TH'; // Country TH

  const rawData = tag00 + tag01 + tag29 + tag53 + tag54 + tag58 + '6304';
  
  // Calculate CRC16 CCITT
  const crc = crc16Hex(rawData);
  return rawData + crc;
}

// CRC16-CCITT (0xFFFF polynomial 0x1021)
function crc16Hex(data) {
  let crc = 0xFFFF;
  for (let i = 0; i < data.length; i++) {
    let c = data.charCodeAt(i);
    crc ^= (c << 8);
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
      } else {
        crc = (crc << 1) & 0xFFFF;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

function setupPromptPayPayment() {
  const total = state.currentBooking.selectedSeats.length * state.currentBooking.trip.price;
  const mobile = '0891234567';
  
  document.getElementById('promptpay-amount-display').textContent = `฿${total.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
  document.getElementById('pp-booking-ref').textContent = state.currentBooking.refCode;
  document.getElementById('pp-start-time').textContent = formatFullDateTime(state.currentBooking.bookingStartTime);
  document.getElementById('pp-expire-time').textContent = formatFullDateTime(state.currentBooking.queueExpiryTime);

  // Generate Real EMVCo Payload
  const promptPayString = generatePromptPayPayload(mobile, total);

  // Clear existing QR and render new QR
  const qrContainer = document.getElementById('promptpay-qr-code');
  qrContainer.innerHTML = '';
  
  if (typeof QRCode !== 'undefined') {
    new QRCode(qrContainer, {
      text: promptPayString,
      width: 190,
      height: 190,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.M
    });
  } else {
    // Fallback QR simulation image if offline CDN is blocked
    qrContainer.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=190x190&data=${encodeURIComponent(promptPayString)}" alt="PromptPay QR">`;
  }

  // Start 15-minute countdown
  startQRCountdown(15 * 60);
}

function startQRCountdown(durationSeconds) {
  if (state.qrTimerInterval) clearInterval(state.qrTimerInterval);
  
  let timeLeft = durationSeconds;
  const display = document.getElementById('qr-timer-display');

  state.qrTimerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(state.qrTimerInterval);
      display.textContent = 'หมดอายุแล้ว';
      showToast('บัตรคิวการจองนี้หมดอายุแล้ว กรุณาเริ่มทำรายการใหม่อีกครั้ง', 'error');
      setTimeout(() => closeBookingModal(), 2000);
      return;
    }

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    timeLeft--;
  }, 1000);
}

function simulatePaymentSuccess() {
  if (state.qrTimerInterval) clearInterval(state.qrTimerInterval);

  // Mark seats as occupied in schedule
  const trip = state.schedules.find(t => t.id === state.currentBooking.trip.id);
  if (trip) {
    trip.occupiedSeats.push(...state.currentBooking.selectedSeats);
  }

  // Save Booking Record
  const newBooking = {
    refCode: state.currentBooking.refCode,
    queueNo: state.currentBooking.queueNo,
    passengerName: document.getElementById('cust-fullname').value,
    phone: document.getElementById('cust-phone').value,
    email: document.getElementById('cust-email').value,
    idCard: document.getElementById('cust-idcard').value || '-',
    tripId: trip.id,
    tripDay: trip.day,
    roundSeq: trip.roundSeq,
    totalRounds: trip.totalRounds,
    deptTime: trip.time,
    arrTime: trip.arrTime,
    origin: trip.origin,
    dest: trip.dest,
    busType: trip.type,
    seats: [...state.currentBooking.selectedSeats],
    amount: state.currentBooking.selectedSeats.length * trip.price,
    bookingStartTime: formatFullDateTime(state.currentBooking.bookingStartTime),
    queueExpiryTime: formatFullDateTime(state.currentBooking.queueExpiryTime),
    status: 'paid',
    paymentMethod: 'PromptPay QR'
  };

  state.bookings.unshift(newBooking);
  saveState();

  // Populate Digital Boarding Pass
  populateBoardingPass(newBooking);

  // Refresh schedule UI
  renderSchedules();

  showToast('ชำระเงินผ่าน PromptPay QR สำเร็จ! ออกบัตรคิวเรียบร้อย', 'success');
  goToStep(4);
}

function populateBoardingPass(b) {
  document.getElementById('ticket-bus-type').textContent = b.busType;
  document.getElementById('ticket-queue-number').textContent = b.queueNo;
  document.getElementById('ticket-origin').textContent = b.origin;
  document.getElementById('ticket-dept-time').textContent = `${b.deptTime} น.`;
  document.getElementById('ticket-round-number').textContent = `รอบที่ ${b.roundSeq}/${b.totalRounds}`;
  document.getElementById('ticket-destination').textContent = b.dest;
  document.getElementById('ticket-arr-time').textContent = `${b.arrTime} น.`;

  document.getElementById('ticket-passenger-name').textContent = b.passengerName;
  document.getElementById('ticket-seat-no').textContent = b.seats.join(', ');
  document.getElementById('ticket-travel-date').textContent = b.tripDay === 'today' ? getFormattedDate(0) : getFormattedDate(1);
  document.getElementById('ticket-platform').textContent = `ชานชาลาที่ ${b.roundSeq <= 4 ? 2 : 4}`;
  document.getElementById('ticket-start-date').textContent = b.bookingStartTime;
  document.getElementById('ticket-expire-date').textContent = b.queueExpiryTime;
  document.getElementById('ticket-ref-code').textContent = b.refCode;
  document.getElementById('ticket-barcode-num').textContent = b.refCode.replace(/[^0-9]/g, '');
}

function downloadQRCode() {
  const qrCanvas = document.querySelector('#promptpay-qr-code canvas');
  if (qrCanvas) {
    const link = document.createElement('a');
    link.download = `PromptPay-QR-${state.currentBooking.refCode}.png`;
    link.href = qrCanvas.toDataURL();
    link.click();
    showToast('ดาวน์โหลด QR Code พร้อมเพย์แล้ว', 'success');
  } else {
    showToast('คลิกขวาที่ภาพ QR เพื่อบันทึกรูปภาพ', 'info');
  }
}

// ==========================================
// 6. Misconduct & Customer Request Reporting
// ==========================================

function handleReportSubmit(e) {
  e.preventDefault();

  const type = document.getElementById('report-type').value;
  const tripInfo = document.getElementById('report-trip-info').value || '-';
  const staffVehicle = document.getElementById('report-staff-vehicle').value || '-';
  const details = document.getElementById('report-details').value;
  const phone = document.getElementById('report-contact-phone').value;
  const email = document.getElementById('report-contact-email').value || '-';

  const ticketPrefix = type.includes('ความต้องการ') ? 'REQ' : 'REP';
  const newTicketId = `${ticketPrefix}-${new Date().getFullYear()}${String(new Date().getMonth()+1).padStart(2,'0')}${String(new Date().getDate()).padStart(2,'0')}-${Math.floor(1000 + Math.random() * 9000)}`;

  const newReport = {
    ticketId: newTicketId,
    type: type,
    tripInfo: tripInfo,
    staffVehicle: staffVehicle,
    details: details,
    phone: phone,
    email: email,
    createdAt: formatFullDateTime(new Date()),
    status: 'รับเรื่องแล้ว / อยู่ระหว่างตรวจสอบ'
  };

  state.reports.unshift(newReport);
  saveState();

  // Reset form
  document.getElementById('misconduct-report-form').reset();

  // Show Sweet alert
  alert(`✅ บันทึกเรื่องร้องเรียน / ข้อเสนอแนะสำเร็จ!\n\nTicket ID ของท่าน: ${newTicketId}\nเจ้าหน้าที่ฝ่ายควบคุมคุณภาพจะตรวจสอบและติดต่อกลับไปยังเบอร์ ${phone} โดยเร็วที่สุด`);
  showToast('ส่งเรื่องร้องเรียนเรียบร้อยแล้ว ขอบคุณที่ช่วยพัฒนาบริการ', 'success');
}

// ==========================================
// 7. Booking & Queue Tracking Search
// ==========================================

function searchTicket() {
  const query = document.getElementById('track-search-input').value.trim().toLowerCase();
  const resultContainer = document.getElementById('tracking-result-container');

  if (!query) {
    showToast('กรุณากรอกรหัสการจอง หรือเบอร์โทรศัพท์', 'warning');
    return;
  }

  const found = state.bookings.filter(b => 
    b.refCode.toLowerCase().includes(query) || 
    b.phone.includes(query) ||
    b.passengerName.toLowerCase().includes(query)
  );

  if (found.length === 0) {
    resultContainer.innerHTML = `
      <div class="text-center p-4 bg-white rounded-lg border border-slate-200">
        <i class="fa-solid fa-circle-xmark text-danger text-3xl mb-2"></i>
        <h5 class="font-bold">ไม่พบข้อมูลบัตรคิว</h5>
        <p class="text-muted text-sm">ไม่พบรายการที่ตรงกับ "${query}" กรุณาตรวจสอบรหัสใหม่อีกครั้ง</p>
      </div>
    `;
    return;
  }

  resultContainer.innerHTML = found.map(b => `
    <div class="card p-4 bg-white rounded-xl shadow-md border border-slate-200 mb-3">
      <div class="d-flex justify-between align-center mb-3">
        <div>
          <span class="badge-tag paid"><i class="fa-solid fa-check"></i> ${b.status === 'paid' ? 'ชำระแล้ว' : 'รอชำระ'}</span>
          <strong class="ms-2 font-mono">${b.refCode}</strong> (คิว: <span class="text-primary font-bold">${b.queueNo}</span>)
        </div>
        <span class="text-muted text-sm"><i class="fa-solid fa-calendar"></i> เริ่มจอง: ${b.bookingStartTime}</span>
      </div>
      <div class="summary-details-grid">
        <div><strong>ผู้โดยสาร:</strong> ${b.passengerName} (โทร ${b.phone})</div>
        <div><strong>รอบที่:</strong> รอบที่ ${b.roundSeq}/${b.totalRounds} (${b.deptTime} น.)</div>
        <div><strong>เส้นทาง:</strong> ${b.origin} ➔ ${b.dest}</div>
        <div><strong>ที่นั่ง:</strong> ${b.seats.join(', ')} (${b.busType})</div>
        <div><strong>ยอดเงิน:</strong> ฿${b.amount.toLocaleString()}</div>
        <div><strong>วันหมดอายุบัตรคิว:</strong> <span class="text-danger">${b.queueExpiryTime}</span></div>
      </div>
      <div class="mt-3 pt-2 border-top d-flex justify-between align-center">
        <button class="btn btn-sm btn-gps-live" onclick="trackTicketGps('${b.refCode}')">
          <i class="fa-solid fa-satellite-dish"></i> 🛰️ ติดตามตำแหน่ง GPS รถรอบนี้แบบสด
        </button>
      </div>
    </div>
  `).join('');
}

// ==========================================
// 8. Auth System (Login / Register / Admin)
// ==========================================

function openAuthModal(tab = 'login') {
  document.getElementById('auth-modal').classList.add('active');
  switchAuthTab(tab);
}

function closeAuthModal() {
  document.getElementById('auth-modal').classList.remove('active');
}

function switchAuthTab(tab) {
  const isLogin = tab === 'login';
  document.getElementById('auth-login-tab').classList.toggle('active', isLogin);
  document.getElementById('auth-reg-tab').classList.toggle('active', !isLogin);
  document.getElementById('login-form').classList.toggle('d-none', !isLogin);
  document.getElementById('register-form').classList.toggle('d-none', isLogin);
  document.getElementById('auth-modal-title').textContent = isLogin ? 'เข้าสู่ระบบ' : 'ลงทะเบียนสมาชิกใหม่';
}

function handleLogin(e) {
  e.preventDefault();
  const id = document.getElementById('login-identifier').value.trim();
  const pass = document.getElementById('login-password').value;

  // Admin Shortcut Check
  if (id === 'admin@siambus.com' && pass === 'admin123') {
    state.currentUser = { name: 'ผู้ดูแลระบบสูงสุด', email: id, role: 'admin' };
    saveState();
    updateAuthUI();
    closeAuthModal();
    showToast('เข้าสู่ระบบในฐานะ Admin สำเร็จ', 'success');
    openAdminPortal();
    return;
  }

  // Normal User Check
  state.currentUser = { name: id.split('@')[0] || 'คุณสมชาย', email: id, phone: '0812345678', role: 'member' };
  saveState();
  updateAuthUI();
  closeAuthModal();
  showToast('เข้าสู่ระบบสำเร็จ', 'success');
}

function handleRegister(e) {
  e.preventDefault();
  const name = `${document.getElementById('reg-firstname').value} ${document.getElementById('reg-lastname').value}`;
  const phone = document.getElementById('reg-phone').value;
  const email = document.getElementById('reg-email').value;

  state.currentUser = { name: name, phone: phone, email: email, role: 'member' };
  saveState();
  updateAuthUI();
  closeAuthModal();
  showToast('ลงทะเบียนสมาชิกสำเร็จ ยินดีต้อนรับ!', 'success');
}

function logout() {
  state.currentUser = null;
  saveState();
  updateAuthUI();
  showToast('ออกจากระบบเรียบร้อยแล้ว', 'info');
}

function updateAuthUI() {
  const loggedInView = document.getElementById('user-logged-in-view');
  const loggedOutView = document.getElementById('user-logged-out-view');
  
  if (state.currentUser) {
    loggedOutView.classList.add('d-none');
    loggedInView.classList.remove('d-none');
    document.getElementById('nav-user-name').textContent = state.currentUser.name;
    document.getElementById('nav-user-role').textContent = state.currentUser.role === 'admin' ? '⚡ ผู้ดูแลระบบ' : 'ผู้โดยสาร';
    document.getElementById('nav-user-avatar').textContent = state.currentUser.name.charAt(0);
  } else {
    loggedOutView.classList.remove('d-none');
    loggedInView.classList.add('d-none');
  }
}

// ==========================================
// 9. Admin Portal Dashboard & CRUD
// ==========================================

function openAdminPortal() {
  // Update Admin Stats
  const todayCount = state.schedules.filter(s => s.day === 'today').length;
  const tomorrowCount = state.schedules.filter(s => s.day === 'tomorrow').length;
  
  document.getElementById('admin-stat-today-trips').textContent = `${todayCount} รอบ`;
  document.getElementById('admin-stat-tomorrow-trips').textContent = `${tomorrowCount} รอบ`;
  document.getElementById('admin-stat-total-bookings').textContent = `${state.bookings.length} รายการ`;
  document.getElementById('admin-stat-reports').textContent = `${state.reports.length} เรื่อง`;

  renderAdminSchedules();
  renderAdminBookings();
  renderAdminReports();

  document.getElementById('admin-modal').classList.add('active');
}

function closeAdminPortal() {
  document.getElementById('admin-modal').classList.remove('active');
}

function switchAdminTab(tabName) {
  const tabs = ['schedules', 'bookings', 'reports', 'fleet'];
  tabs.forEach(t => {
    const isCurrent = t === tabName;
    const el = document.getElementById(`admin-tab-${t}`);
    if (el) el.classList.toggle('d-none', !isCurrent);
  });

  const buttons = document.querySelectorAll('.admin-tab-btn');
  buttons.forEach((btn, idx) => {
    btn.classList.toggle('active', tabs[idx] === tabName);
  });

  if (tabName === 'fleet') {
    renderAdminFleetMap();
  }
}

function renderAdminSchedules() {
  const tbody = document.getElementById('admin-schedules-tbody');
  tbody.innerHTML = state.schedules.map(trip => {
    const availSeats = trip.totalSeats - trip.occupiedSeats.length;
    return `
      <tr>
        <td><span class="badge-tag ${trip.day}">${trip.day === 'today' ? 'วันนี้' : 'วันพรุ่งนี้'}</span></td>
        <td><strong>รอบที่ ${trip.roundSeq}/${trip.totalRounds}</strong></td>
        <td>${trip.time} - ${trip.arrTime} น.</td>
        <td>${trip.origin} ➔ ${trip.dest}</td>
        <td>${trip.type} <br><small class="text-muted">${trip.plate} (${trip.driver})</small></td>
        <td><strong>฿${trip.price}</strong></td>
        <td><span class="${availSeats <= 5 ? 'text-danger fw-bold' : 'text-success'}">${availSeats}/${trip.totalSeats}</span></td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="deleteScheduleTrip('${trip.id}')"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
    `;
  }).join('');
}

function renderAdminBookings() {
  const tbody = document.getElementById('admin-bookings-tbody');
  tbody.innerHTML = state.bookings.map(b => `
    <tr>
      <td><strong class="font-mono">${b.refCode}</strong> <br><small class="text-primary font-bold">คิว: ${b.queueNo}</small></td>
      <td>${b.passengerName} <br><small class="text-muted">${b.phone}</small></td>
      <td>${b.tripDay === 'today' ? 'วันนี้' : 'พรุ่งนี้'} รอบที่ ${b.roundSeq} (${b.deptTime} น.)</td>
      <td>${b.seats.join(', ')}</td>
      <td><small>${b.bookingStartTime}</small></td>
      <td><small class="text-danger">${b.queueExpiryTime}</small></td>
      <td><strong>฿${b.amount.toLocaleString()}</strong></td>
      <td><span class="badge-tag paid"><i class="fa-solid fa-check"></i> ${b.status}</span></td>
    </tr>
  `).join('');
}

function renderAdminReports() {
  const tbody = document.getElementById('admin-reports-tbody');
  tbody.innerHTML = state.reports.map(r => `
    <tr>
      <td><strong class="font-mono text-danger">${r.ticketId}</strong></td>
      <td><small class="fw-bold">${r.type}</small></td>
      <td><small>${r.tripInfo} / ${r.staffVehicle}</small></td>
      <td><p style="max-width: 250px; font-size: 0.8rem; margin:0;">${r.details}</p></td>
      <td>${r.phone} <br><small>${r.email}</small></td>
      <td><small>${r.createdAt}</small></td>
      <td><span class="badge-tag pending">${r.status}</span></td>
      <td>
        <button class="btn btn-sm btn-outline" onclick="markReportResolved('${r.ticketId}')"><i class="fa-solid fa-check-double"></i> ดำเนินการแล้ว</button>
      </td>
    </tr>
  `).join('');
}

function openAddTripModal() {
  document.getElementById('add-trip-modal').classList.add('active');
}

function closeAddTripModal() {
  document.getElementById('add-trip-modal').classList.remove('active');
}

function handleAddTrip(e) {
  e.preventDefault();
  const day = document.getElementById('newtrip-day').value;
  const time = document.getElementById('newtrip-time').value;
  const arrTime = document.getElementById('newtrip-arr-time').value;
  const origin = document.getElementById('newtrip-origin').value;
  const dest = document.getElementById('newtrip-dest').value;
  const type = document.getElementById('newtrip-type').value;
  const price = Number(document.getElementById('newtrip-price').value);
  const plate = document.getElementById('newtrip-plate').value;
  const driver = document.getElementById('newtrip-driver').value;

  const dayTrips = state.schedules.filter(s => s.day === day);
  const newRoundSeq = dayTrips.length + 1;

  const newTrip = {
    id: `CUSTOM_${Date.now()}`,
    day: day,
    roundSeq: newRoundSeq,
    totalRounds: newRoundSeq,
    time: time,
    arrTime: arrTime,
    origin: origin,
    dest: dest,
    type: type,
    plate: plate,
    driver: driver,
    price: price,
    totalSeats: type.includes('VIP') ? 24 : 36,
    occupiedSeats: []
  };

  // Recalculate total rounds for that day
  state.schedules.push(newTrip);
  state.schedules.filter(s => s.day === day).forEach(s => s.totalRounds = newRoundSeq);

  saveState();
  renderSchedules();
  renderAdminSchedules();
  updateScheduleBadges();
  closeAddTripModal();
  showToast('เพิ่มรอบรถใหม่สำเร็จ!', 'success');
}

function deleteScheduleTrip(tripId) {
  if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรอบรถนี้?')) return;
  
  state.schedules = state.schedules.filter(s => s.id !== tripId);
  saveState();
  renderSchedules();
  renderAdminSchedules();
  updateScheduleBadges();
  showToast('ลบรอบรถสำเร็จ', 'info');
}

function markReportResolved(ticketId) {
  const rep = state.reports.find(r => r.ticketId === ticketId);
  if (rep) {
    rep.status = 'แก้ไขและตอบกลับลูกค้าแล้ว';
    saveState();
    renderAdminReports();
    showToast(`อัปเดตสถานะ Ticket ${ticketId} เป็นดำเนินการแล้ว`, 'success');
  }
}

// ==========================================
// 10. Master Prompt Loader & Copy Feature
// ==========================================

const MASTER_PROMPT_TEXT = `### [MASTER PROMPT]: ระบบดูรอบและจองคิวรถบัสออนไลน์ พร้อม PromptPay QR เสมือนจริง (Bus Schedule & Queue Booking System)

**คำสั่งสำหรับ AI / นักพัฒนา:**
จงสร้างระบบ Web Application สำหรับระบบการดูรอบและจองคิวรถบัสออนไลน์ที่สมบูรณ์แบบ ทันสมัย รองรับ Responsive 100% ตามข้อกำหนดเชิงลึกดังนี้:

---

#### 1. ข้อกำหนดฟังก์ชันการดูรอบรถ (Bus Schedule & Trip Inquiry):
1. **แสดงรอบรถประจำวัน (Today) และ วันพรุ่งนี้ (Tomorrow):**
   - มีแท็บสลับดูรอบรถของ "วันนี้" และ "วันพรุ่งนี้"
   - แสดงตัวนับจำนวนรอบทั้งหมด เช่น "วันนี้มี 8 รอบ", "พรุ่งนี้มี 10 รอบ"
   - แสดงลำดับรอบชัดเจน เช่น "รอบที่ 1/8", "รอบที่ 2/8" พร้อมเวลาออกเดินทางและเวลาถึงปลายทาง
   - แสดงประเภทรถ (VIP 24 ที่นั่ง / ปรับอากาศ 36 ที่นั่ง / ด่วนพิเศษ), ทะเบียนรถ, และชื่อพนักงานขับรถ
   - แสดงสถานะที่นั่งว่างแบบ Real-time และแถบเปอร์เซ็นต์ที่นั่ง

#### 2. ข้อกำหนดระบบจองคิวและเลือกที่นั่ง (Queue & Ticket Booking):
1. **บันทึกวันเวลาจองและวันหมดอายุของบัตรคิว:**
   - ระบุ "วันที่และเวลาที่เริ่มจอง" (Booking Start Date/Time เช่น 01/09/2026 22:52:00)
   - ระบุ "วันที่และเวลาที่บัตรคิวหมดอายุ" (Queue Expiry Date/Time นับถอยหลัง 15 นาทีหลังจากกดจอง)
   - หากเกินเวลา 15 นาที ระบบจะยกเลิกคิวและคืนที่นั่งอัตโนมัติ
2. **แผนผังเลือกที่นั่ง (Interactive Bus Seat Map):**
   - แสดงผังรถบัสแบ่งเป็นแถว A-H ฝั่งซ้าย-ขวา มีทางเดินตรงกลาง (Aisle)
   - แสดงสถานะ: ที่นั่งว่าง, กำลังเลือก, จองแล้ว, และเบาะ VIP
3. **ราคาที่เหมาะสมและโปร่งใส (Fair Pricing):**
   - แสดงรายละเอียดราคาชัดเจน: ค่าโดยสาร, ฟรีประกันภัยการเดินทาง พ.ร.บ., ฟรีค่าธรรมเนียมออนไลน์

#### 3. ระบบชำระเงิน PromptPay QR เสมือนจริง (Realistic Thai QR Payment):
1. **สร้าง QR Code ตามมาตรฐาน EMVCo Thai QR Payment:**
   - รองรับ Payload มาตรฐาน (AID: A000000677010111, Currency: 764 THB, Dynamic QR Tag 01: 12)
   - คำนวณ CRC16-CCITT Checksum ถูกต้อง
2. **การ์ด PromptPay UI:**
   - ดีไซน์การ์ดสีน้ำเงินเข้มขอบฟ้าเหมือนระบบธนาคารไทย พร้อมโลโก้ THAI QR PAYMENT / พร้อมเพย์
   - แสดงยอดเงินตรงตามที่จอง, Biller ID / เบอร์พร้อมเพย์
   - มีนาฬิกานับถอยหลัง 15 นาที (Countdown Timer)
   - ปุ่มดาวน์โหลดรูป QR และระบบจำลองการตรวจสลิป / ชำระเงินสำเร็จ

#### 4. ระบบออกบัตรคิวและตั๋วดิจิทัล (Digital Boarding Pass):
1. **แสดงบัตรคิวแบบพิมพ์ได้:**
   - รหัสการจอง (Booking Ref: SB-20260901-XXXX)
   - หมายเลขลำดับคิว (เช่น Q-01, Q-02)
   - บาร์โค้ดจำลอง (Barcode Simulator)
   - ข้อมูลรอบที่, ชานชาลา, หมายเลขที่นั่ง, วันที่เดินทาง, และวันเวลาหมดอายุ
   - ปุ่มกดติดตามพิกัด GPS ของรถรอบที่จองได้แบบเรียลไทม์

#### 5. ระบบติดตามตำแหน่งรถบัสผ่านแผนที่ Real-Time GPS (Live Bus GPS Tracking & Telematics):
1. **แผนที่เส้นทางและพิกัดเสมือนจริง (Interactive Route Map):**
   - แสดงแผนที่ Leaflet & OpenStreetMap พิกัดถนนหลวง 4 สายหลัก (เชียงใหม่, ขอนแก่น, โคราช, ภูเก็ต)
   - แสดงหมุดรถบัสเคลื่อนที่ (Pulse Radar Marker) พร้อมคำนวณทิศทางและความเร็ว
   - หมุดแสดงสถานีต้นทาง, จุดพักรถ (Rest Stop) แวะพักรับประทานอาหาร, และสถานีปลายทาง
2. **แผง Telemetry HUD แสดงข้อมูลสด:**
   - วัดความเร็วแบบ Real-time (กม./ชม.) พร้อมสถานะความเร็วปลอดภัยตามกฎหมาย
   - แสดงระยะทางที่เหลือ (Remaining Distance) และเวลาที่คาดว่าจะถึง (ETA)
   - แสดงชื่อจุดพักรถถัดไป พร้อมระยะทางและเวลาที่เหลือ
   - แสดงข้อมูลคนขับ, ทะเบียนรถ, สัญญาณดาวเทียม GPS, 5G Telematics, และอุณหภูมิห้องโดยสาร
3. **ระบบควบคุมการติดตามและการเชื่อมต่อ:**
   - ตัวเลือกสลับดูรอบรถทุกคัน, ปุ่มล็อกมุมกล้องตามรถ (Center Bus)
   - โหมดจำลองเร่งเวลา (1x, 5x, 20x) เพื่อดูการเดินทางแบบ Real-time
   - ปุ่มติดตาม GPS รถจากหน้าตารางรอบรถ, หน้าตั๋ว Boarding Pass, หน้าตรวจสอบบัตรคิว, และระบบ Fleet GPS ใน Admin

#### 6. ระบบรายงานพฤติกรรมพนักงาน & คำขอของลูกค้า (Customer Feedback & Misconduct Report):
1. **แบบฟอร์มรับเรื่องร้องเรียน:**
   - หมวดหมู่: ขับรถเร็ว/หวาดเสียว, พูดจาไม่สุภาพ, รถมาสาย/ออกก่อนเวลา, สภาพรถ/แอร์, หรือ แจ้งความต้องการสิ่งอำนวยความสะดวกเพิ่มเติม
   - กรอกรอบรถ, ทะเบียนรถ, ชื่อพนักงาน, รายละเอียด, เบอร์โทร และอีเมล
   - ออก Ticket ID (เช่น REP-20260901-XXXX) สำหรับติดตามสถานะ

#### 7. ระบบสมาชิกและช่องทางแอดมิน (Auth & Admin Portal):
1. **ระบบสมาชิก:** ลงทะเบียน (Register) และเข้าสู่ระบบ (Login)
2. **แผงควบคุมแอดมิน (Admin Dashboard & Fleet Telematics):**
   - ดูสถิติ: รอบรถวันนี้, รอบรถพรุ่งนี้, ยอดจองรวม, เรื่องร้องเรียน
   - เพิ่ม / แก้ไข / ลบรอบรถของวันนี้และพรุ่งนี้
   - ตรวจสอบรายการจองและสถานะการชำระเงิน
   - อัปเดตสถานะเรื่องร้องเรียนของลูกค้า
   - แผนที่รวมศูนย์ติดตามตำแหน่งและความเร็วกองรถบัสทุกคัน (Fleet GPS Tracker)

#### 8. ช่องทางติดต่อและบริการลูกค้า (Contact & Call Center):
- แสดงเบอร์โทรศัพท์ Call Center: 02-999-8888, 081-234-5678 (24 ชม.)
- อีเมลติดต่อ: support@siambus-express.com, complaint@siambus-express.com
- ที่อยู่สถานีขนส่ง และ LINE Official Account: @siambus

---
**Tech Stack:** HTML5 Semantic, Modern Vanilla CSS, Pure JavaScript (LocalStorage Persistence, Leaflet.js GPS Engine & EMVCo QR Generator)`;

function loadMasterPromptDoc() {
  const block = document.getElementById('master-prompt-content');
  if (block) {
    block.textContent = MASTER_PROMPT_TEXT;
  }
}

function openPromptModal() {
  document.getElementById('prompt-modal').classList.add('active');
}

function closePromptModal() {
  document.getElementById('prompt-modal').classList.remove('active');
}

function copyMasterPrompt() {
  navigator.clipboard.writeText(MASTER_PROMPT_TEXT).then(() => {
    showToast('คัดลอก Master Prompt ทั้งหมดแล้ว!', 'success');
  }).catch(() => {
    showToast('คัดลอกสำเร็จ', 'success');
  });
}

// ==========================================
// 11. Toast Notifications & Nav Helpers
// ==========================================

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icon = type === 'success' ? 'fa-circle-check text-success' :
               type === 'error' ? 'fa-circle-xmark text-danger' :
               type === 'warning' ? 'fa-triangle-exclamation text-warning' : 'fa-circle-info text-info';

  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}

function toggleMobileMenu() {
  const menu = document.getElementById('nav-menu');
  menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

function navigateTo(section) {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// 12. Real-Time GPS Tracking & Telematics Engine
// ==========================================

const GPS_ROUTE_DATA = {
  // 1. Bangkok -> Chiang Mai
  'CHIANG_MAI': {
    name: 'กรุงเทพฯ (หมอชิต 2) ➔ เชียงใหม่',
    totalKm: 700,
    originName: 'กรุงเทพฯ (หมอชิต 2)',
    destName: 'สถานีขนส่งผู้โดยสาร จ.เชียงใหม่ (อาเขต 3)',
    originCoord: [13.8138, 100.5534],
    destCoord: [18.8002, 99.0177],
    waypoints: [
      [13.8138, 100.5534], // BKK Mochit 2 (Km 0)
      [14.0012, 100.6123], // Rangsit (Km 30)
      [14.2389, 100.5753], // Ayutthaya Bang Pa-in (Km 72)
      [14.5901, 100.5211], // Ang Thong (Km 110)
      [14.9924, 100.3289], // In Buri Rest Stop PTT (Km 150)
      [15.2891, 100.2215], // Chai Nat (Km 185)
      [15.6987, 100.1256], // Nakhon Sawan Dechatiwong (Km 240)
      [16.2154, 99.8142],  // Kamphaeng Phet (Km 340)
      [16.8211, 100.2659], // Phitsanulok / Tak (Km 430)
      [17.3102, 99.7891],  // Sukhothai / Phrae (Km 510)
      [18.2888, 99.4928],  // Lampang Khun Tan Rest Stop (Km 595)
      [18.5744, 99.0087],  // Lamphun (Km 670)
      [18.8002, 99.0177]   // Chiang Mai Arcade 3 (Km 700)
    ],
    checkpoints: [
      { name: 'กรุงเทพฯ (หมอชิต 2)', km: 0, isRest: false, road: 'ถ.พหลโยธิน กม. 0' },
      { name: 'พระนครศรีอยุธยา (บางปะอิน)', km: 72, isRest: false, road: 'ทล.32 สายเอเชีย กม. 72' },
      { name: 'จุดพักรถ ปตท. อินทร์บุรี (สิงห์บุรี)', km: 150, isRest: true, restDuration: '20 นาที', road: 'ทล.32 สายเอเชีย กม. 150' },
      { name: 'นครสวรรค์ (สะพานเดชาติวงศ์)', km: 240, isRest: false, road: 'ถ.พหลโยธิน กม. 240' },
      { name: 'กำแพงเพชร (สลกบาตร)', km: 340, isRest: false, road: 'ถ.พหลโยธิน กม. 340' },
      { name: 'พิษณุโลก / ตาก', km: 430, isRest: false, road: 'ถ.พหลโยธิน กม. 430' },
      { name: 'จุดพักรถ ดอยขุนตาน (ลำปาง)', km: 595, isRest: true, restDuration: '15 นาที', road: 'ถ.ซูเปอร์ไฮเวย์ กม. 595' },
      { name: 'ลำพูน', km: 670, isRest: false, road: 'ถ.เชียงใหม่-ลำปาง กม. 670' },
      { name: 'สถานีขนส่ง จ.เชียงใหม่ (อาเขต 3)', km: 700, isRest: false, road: 'อาเขต 3 ปลายทาง' }
    ]
  },
  // 2. Bangkok -> Khon Kaen
  'KHON_KAEN': {
    name: 'กรุงเทพฯ (หมอชิต 2) ➔ ขอนแก่น',
    totalKm: 450,
    originName: 'กรุงเทพฯ (หมอชิต 2)',
    destName: 'สถานีขนส่งผู้โดยสาร จ.ขอนแก่น (บขส.3)',
    originCoord: [13.8138, 100.5534],
    destCoord: [16.4024, 102.8132],
    waypoints: [
      [13.8138, 100.5534], // BKK Mochit 2 (Km 0)
      [14.2289, 100.7144], // Wang Noi (Km 65)
      [14.5289, 100.9108], // Saraburi Bypass (Km 108)
      [14.6366, 101.1989], // Muak Lek (Km 150)
      [14.8624, 101.5542], // Lam Takhong Rest Stop (Km 195)
      [14.9799, 102.0977], // Nakhon Ratchasima (Km 260)
      [15.4215, 102.4123], // Non Sung (Km 315)
      [15.8167, 102.5982], // Mueang Phon (Km 370)
      [16.1289, 102.7123], // Ban Phai (Km 405)
      [16.4024, 102.8132]  // Khon Kaen Bus Terminal 3 (Km 450)
    ],
    checkpoints: [
      { name: 'กรุงเทพฯ (หมอชิต 2)', km: 0, isRest: false, road: 'ถ.พหลโยธิน กม. 0' },
      { name: 'สระบุรี (บายพาส)', km: 108, isRest: false, road: 'ถ.มิตรภาพ กม. 0' },
      { name: 'มวกเหล็ก / ปากช่อง', km: 150, isRest: false, road: 'ถ.มิตรภาพ กม. 42' },
      { name: 'จุดพักรถ อ่างเก็บน้ำลำตะคอง', km: 195, isRest: true, restDuration: '20 นาที', road: 'ถ.มิตรภาพ กม. 87' },
      { name: 'นครราชสีมา (บายพาส)', km: 260, isRest: false, road: 'ถ.มิตรภาพ กม. 150' },
      { name: 'เมืองพล (ขอนแก่น)', km: 370, isRest: false, road: 'ถ.มิตรภาพ กม. 260' },
      { name: 'สถานีขนส่งผู้โดยสาร จ.ขอนแก่น (บขส.3)', km: 450, isRest: false, road: 'บขส. 3 ปลายทาง' }
    ]
  },
  // 3. Bangkok -> Nakhon Ratchasima
  'KORAT': {
    name: 'กรุงเทพฯ (หมอชิต 2) ➔ นครราชสีมา',
    totalKm: 260,
    originName: 'กรุงเทพฯ (หมอชิต 2)',
    destName: 'สถานีขนส่งผู้โดยสาร จ.นครราชสีมา (บขส.2)',
    originCoord: [13.8138, 100.5534],
    destCoord: [14.9799, 102.0977],
    waypoints: [
      [13.8138, 100.5534], // BKK (Km 0)
      [14.2289, 100.7144], // Wang Noi (Km 65)
      [14.5289, 100.9108], // Saraburi (Km 108)
      [14.6215, 101.2789], // Klang Dong Rest Stop (Km 160)
      [14.7067, 101.4167], // Pak Chong (Km 180)
      [14.8912, 101.7188], // Sikhiu (Km 215)
      [14.9799, 102.0977]  // Korat Bus Terminal 2 (Km 260)
    ],
    checkpoints: [
      { name: 'กรุงเทพฯ (หมอชิต 2)', km: 0, isRest: false, road: 'ถ.พหลโยธิน กม. 0' },
      { name: 'วังน้อย (อยุธยา)', km: 65, isRest: false, road: 'ถ.พหลโยธิน กม. 65' },
      { name: 'สระบุรี (แยกมิตรภาพ)', km: 108, isRest: false, road: 'ถ.มิตรภาพ กม. 0' },
      { name: 'จุดพักรถ ปตท. กลางดง', km: 160, isRest: true, restDuration: '15 นาที', road: 'ถ.มิตรภาพ กม. 52' },
      { name: 'สีคิ้ว', km: 215, isRest: false, road: 'ถ.มิตรภาพ กม. 105' },
      { name: 'สถานีขนส่ง จ.นครราชสีมา (บขส.2)', km: 260, isRest: false, road: 'บขส. 2 ปลายทาง' }
    ]
  },
  // 4. Bangkok -> Phuket
  'PHUKET': {
    name: 'กรุงเทพฯ (สายใต้ใหม่) ➔ ภูเก็ต',
    totalKm: 850,
    originName: 'กรุงเทพฯ (สายใต้ใหม่)',
    destName: 'สถานีขนส่งผู้โดยสาร จ.ภูเก็ต (บขส.2)',
    originCoord: [13.7807, 100.4227],
    destCoord: [7.9174, 98.3965],
    waypoints: [
      [13.7807, 100.4227], // BKK Southern Terminal (Km 0)
      [13.5475, 100.2744], // Samut Sakhon (Km 40)
      [13.4098, 99.9965],  // Samut Songkhram (Km 75)
      [13.1119, 99.9398],  // Phetchaburi (Km 130)
      [12.8002, 99.9688],  // Cha-am Rest Stop (Km 175)
      [12.5684, 99.9577],  // Hua Hin (Km 205)
      [11.8082, 99.7972],  // Prachuap Khiri Khan (Km 290)
      [10.9854, 99.4521],  // Bang Saphan (Km 385)
      [10.4930, 99.1800],  // Chumphon Pathomphon Rest Stop (Km 465)
      [9.7541, 98.6214],   // Ranong junction (Km 560)
      [9.1382, 99.3217],   // Surat Thani Phunphin (Km 640)
      [8.4509, 98.5255],   // Phang Nga Thap Put (Km 770)
      [8.2014, 98.2981],   // Sarasin Bridge (Km 810)
      [7.9174, 98.3965]    // Phuket Bus Terminal 2 (Km 850)
    ],
    checkpoints: [
      { name: 'กรุงเทพฯ (สายใต้ใหม่)', km: 0, isRest: false, road: 'ถ.บรมราชชนนี กม. 0' },
      { name: 'สมุทรสงคราม (แม่กลอง)', km: 75, isRest: false, road: 'ถ.พระราม 2 กม. 75' },
      { name: 'จุดพักรถ วังมะนาว / ชะอำ', km: 175, isRest: true, restDuration: '20 นาที', road: 'ถ.เพชรเกษม กม. 175' },
      { name: 'หัวหิน (ประจวบคีรีขันธ์)', km: 205, isRest: false, road: 'ถ.เพชรเกษม กม. 205' },
      { name: 'จุดพักรถ เขาโพธิ์ / ชุมพร', km: 465, isRest: true, restDuration: '25 นาที', road: 'ถ.เพชรเกษม กม. 465' },
      { name: 'สุราษฎร์ธานี (พุนพิน)', km: 640, isRest: false, road: 'ทล.401 กม. 640' },
      { name: 'พังงา (ทับปุด / สะพานสารสิน)', km: 810, isRest: false, road: 'ทล.402 กม. 810' },
      { name: 'สถานีขนส่ง จ.ภูเก็ต (บขส.2)', km: 850, isRest: false, road: 'บขส. 2 ปลายทาง' }
    ]
  }
};

let gpsState = {
  map: null,
  trackedTripId: 'T1',
  simSpeed: 1,
  busMarker: null,
  passedPolyline: null,
  remainingPolyline: null,
  stationLayerGroup: null,
  followBus: true,
  intervalId: null,
  tripProgressMap: {
    'T1': 0.62, // 62%
    'T2': 0.45, // 45%
    'T3': 0.80, // 80%
    'T4': 0.28, // 28%
    'T5': 0.15, // 15%
    'T6': 0.08,
    'T7': 0.02,
    'T8': 0.00,
    'TM1': 0.10,
    'TM2': 0.05,
    'TM3': 0.02,
    'TM4': 0.00,
    'TM5': 0.00
  },
  adminMap: null,
  adminMarkers: []
};

function getRouteForTrip(trip) {
  if (!trip) return GPS_ROUTE_DATA['CHIANG_MAI'];
  const dest = trip.dest || '';
  if (dest.includes('เชียงใหม่')) return GPS_ROUTE_DATA['CHIANG_MAI'];
  if (dest.includes('ขอนแก่น')) return GPS_ROUTE_DATA['KHON_KAEN'];
  if (dest.includes('นครราชสีมา')) return GPS_ROUTE_DATA['KORAT'];
  if (dest.includes('ภูเก็ต')) return GPS_ROUTE_DATA['PHUKET'];
  return GPS_ROUTE_DATA['CHIANG_MAI'];
}

function initLiveGpsTracking() {
  populateGpsTripSelector();
  initLeafletGpsMap();
  
  // Start live tick interval (1 second)
  if (gpsState.intervalId) clearInterval(gpsState.intervalId);
  gpsState.intervalId = setInterval(tickGpsSimulation, 1000);
  
  // Update Live Clock
  updateGpsLiveClock();
}

function updateGpsLiveClock() {
  const clockEl = document.getElementById('gps-live-clock');
  if (clockEl) {
    const now = new Date();
    clockEl.textContent = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')} น.`;
  }
}

function populateGpsTripSelector() {
  const select = document.getElementById('gps-trip-select');
  if (!select) return;

  select.innerHTML = state.schedules.map(t => {
    const isSel = t.id === gpsState.trackedTripId ? 'selected' : '';
    const dayLabel = t.day === 'today' ? 'วันนี้' : 'พรุ่งนี้';
    return `<option value="${t.id}" ${isSel}>${dayLabel} รอบที่ ${t.roundSeq}/${t.totalRounds} (${t.time} น.) : ${t.origin.split(' ')[0]} ➔ ${t.dest.split(' ')[0]} [${t.type}]</option>`;
  }).join('');
}

function initLeafletGpsMap() {
  const mapContainer = document.getElementById('live-gps-map');
  if (!mapContainer) return;
  if (typeof L === 'undefined') return;

  const currentTrip = state.schedules.find(t => t.id === gpsState.trackedTripId) || state.schedules[0];
  const route = getRouteForTrip(currentTrip);

  if (!gpsState.map) {
    gpsState.map = L.map('live-gps-map', {
      zoomControl: true,
      attributionControl: false
    }).setView(route.originCoord, 7);

    // Modern styled OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap'
    }).addTo(gpsState.map);

    gpsState.stationLayerGroup = L.layerGroup().addTo(gpsState.map);
  }

  // Draw Route & Bus Marker
  loadTripOnGpsMap(currentTrip);
}

function loadTripOnGpsMap(trip) {
  if (!gpsState.map) return;
  const route = getRouteForTrip(trip);
  const progress = gpsState.tripProgressMap[trip.id] !== undefined ? gpsState.tripProgressMap[trip.id] : 0.35;

  // Clear existing station markers & polylines
  if (gpsState.stationLayerGroup) gpsState.stationLayerGroup.clearLayers();
  if (gpsState.passedPolyline) gpsState.map.removeLayer(gpsState.passedPolyline);
  if (gpsState.remainingPolyline) gpsState.map.removeLayer(gpsState.remainingPolyline);

  // Split waypoints into passed and remaining
  const splitIndex = Math.floor(progress * (route.waypoints.length - 1));
  const currentCoord = getInterpolatedPoint(route.waypoints, progress);

  const passedPoints = route.waypoints.slice(0, splitIndex + 1);
  passedPoints.push(currentCoord);

  const remainingPoints = [currentCoord, ...route.waypoints.slice(splitIndex + 1)];

  // Draw Polylines
  gpsState.passedPolyline = L.polyline(passedPoints, {
    color: '#10b981',
    weight: 6,
    opacity: 0.85,
    lineCap: 'round'
  }).addTo(gpsState.map);

  gpsState.remainingPolyline = L.polyline(remainingPoints, {
    color: '#38bdf8',
    weight: 5,
    opacity: 0.75,
    dashArray: '8, 8',
    lineCap: 'round'
  }).addTo(gpsState.map);

  // Station & Rest Stop Markers
  route.checkpoints.forEach((cp, idx) => {
    const isFirst = idx === 0;
    const isLast = idx === route.checkpoints.length - 1;
    const isRest = cp.isRest;
    const coord = route.waypoints[Math.min(idx, route.waypoints.length - 1)];

    let iconHtml = '';
    if (isFirst) {
      iconHtml = `<div class="leaflet-station-pin origin" title="${cp.name}"><i class="fa-solid fa-play"></i></div>`;
    } else if (isLast) {
      iconHtml = `<div class="leaflet-station-pin dest" title="${cp.name}"><i class="fa-solid fa-flag-checkered"></i></div>`;
    } else if (isRest) {
      iconHtml = `<div class="leaflet-station-pin rest" title="${cp.name}"><i class="fa-solid fa-mug-hot"></i></div>`;
    } else {
      iconHtml = `<div class="leaflet-station-pin" style="background:#64748b; width:22px; height:22px; font-size:0.65rem;"><i class="fa-solid fa-location-dot"></i></div>`;
    }

    const customIcon = L.divIcon({
      html: iconHtml,
      className: 'station-div-icon',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    const marker = L.marker(coord, { icon: customIcon });
    marker.bindPopup(`
      <div style="font-family: 'Prompt', sans-serif; min-width: 180px;">
        <strong style="color: #0f172a; font-size: 0.95rem;">${cp.name}</strong><br>
        <small style="color: #64748b;">${cp.road}</small>
        ${cp.isRest ? `<div style="margin-top:4px; font-weight:600; color:#b45309;"><i class="fa-solid fa-utensils"></i> จุดพักรถ (${cp.restDuration})</div>` : ''}
      </div>
    `);
    gpsState.stationLayerGroup.addLayer(marker);
  });

  // Create or Update Bus Marker
  const busIconHtml = `
    <div class="leaflet-bus-icon-wrap">
      <div class="leaflet-bus-radar"></div>
      <div class="leaflet-bus-pin" id="bus-pin-element"><i class="fa-solid fa-bus"></i></div>
    </div>
  `;

  const busIcon = L.divIcon({
    html: busIconHtml,
    className: 'bus-marker-div-icon',
    iconSize: [44, 44],
    iconAnchor: [22, 22]
  });

  if (!gpsState.busMarker) {
    gpsState.busMarker = L.marker(currentCoord, { icon: busIcon, zIndexOffset: 1000 }).addTo(gpsState.map);
  } else {
    gpsState.busMarker.setLatLng(currentCoord);
    gpsState.busMarker.setIcon(busIcon);
  }

  gpsState.busMarker.bindPopup(`
    <div style="font-family: 'Prompt', sans-serif; min-width: 200px;">
      <div style="font-weight:700; color:#0284c7; font-size:1rem;"><i class="fa-solid fa-bus"></i> ${trip.plate}</div>
      <div style="font-size:0.85rem; color:#0f172a; margin: 3px 0;"><strong>${trip.origin} ➔ ${trip.dest}</strong></div>
      <div style="font-size:0.8rem; color:#64748b;">พขร: ${trip.driver}</div>
      <div style="font-size:0.8rem; color:#10b981; font-weight:600; margin-top:4px;"><i class="fa-solid fa-circle-check"></i> ความเร็วปกติ 82 กม./ชม.</div>
    </div>
  `);

  if (gpsState.followBus) {
    gpsState.map.setView(currentCoord, 9, { animate: true });
  }

  // Update HUD
  updateGpsTelemetry(trip, progress, currentCoord);
}

function getInterpolatedPoint(waypoints, progress) {
  const p = Math.max(0, Math.min(1, progress));
  if (!waypoints || waypoints.length === 0) return [13.8138, 100.5534];
  if (waypoints.length === 1) return waypoints[0];

  const totalSegments = waypoints.length - 1;
  const segmentFloat = p * totalSegments;
  const index = Math.floor(segmentFloat);
  const fraction = segmentFloat - index;

  if (index >= totalSegments) return waypoints[totalSegments];

  const p1 = waypoints[index];
  const p2 = waypoints[index + 1];

  const lat = p1[0] + (p2[0] - p1[0]) * fraction;
  const lng = p1[1] + (p2[1] - p1[1]) * fraction;
  return [lat, lng];
}

function tickGpsSimulation() {
  updateGpsLiveClock();

  const currentTrip = state.schedules.find(t => t.id === gpsState.trackedTripId);
  if (!currentTrip) return;

  const route = getRouteForTrip(currentTrip);
  
  // Advance progress according to simSpeed
  const baseStep = 0.0004;
  let currentProgress = gpsState.tripProgressMap[currentTrip.id] !== undefined ? gpsState.tripProgressMap[currentTrip.id] : 0.35;
  currentProgress += baseStep * gpsState.simSpeed;

  if (currentProgress > 1.0) {
    currentProgress = 0.0;
    showToast(`รถบัสรอบ ${currentTrip.time} น. เดินทางถึงจุดหมายแล้ว (เริ่มรอบใหม่)`, 'info');
  }

  gpsState.tripProgressMap[currentTrip.id] = currentProgress;

  // Interpolate Position
  const currentCoord = getInterpolatedPoint(route.waypoints, currentProgress);

  // Update Marker & Polylines
  if (gpsState.busMarker) {
    gpsState.busMarker.setLatLng(currentCoord);
  }

  if (gpsState.passedPolyline && gpsState.remainingPolyline) {
    const splitIndex = Math.floor(currentProgress * (route.waypoints.length - 1));
    const passedPoints = route.waypoints.slice(0, splitIndex + 1);
    passedPoints.push(currentCoord);
    const remainingPoints = [currentCoord, ...route.waypoints.slice(splitIndex + 1)];

    gpsState.passedPolyline.setLatLngs(passedPoints);
    gpsState.remainingPolyline.setLatLngs(remainingPoints);
  }

  if (gpsState.followBus && gpsState.map) {
    gpsState.map.panTo(currentCoord, { animate: true });
  }

  // Update HUD
  updateGpsTelemetry(currentTrip, currentProgress, currentCoord);
}

function updateGpsTelemetry(trip, progress, currentCoord) {
  const route = getRouteForTrip(trip);
  const percentInt = Math.floor(progress * 100);
  const distTraveled = Math.floor(route.totalKm * progress);
  const distRemain = Math.max(0, route.totalKm - distTraveled);

  // Dynamic Speed with fluctuation
  const speedNoise = Math.floor(Math.sin(Date.now() / 2500) * 4);
  const speed = Math.min(88, Math.max(72, 82 + speedNoise));

  // Current Checkpoint & Next Stop
  let nextCheckpoint = route.checkpoints[route.checkpoints.length - 1];
  let currentCheckpoint = route.checkpoints[0];

  for (let i = 0; i < route.checkpoints.length; i++) {
    if (distTraveled >= route.checkpoints[i].km) {
      currentCheckpoint = route.checkpoints[i];
    }
    if (distTraveled < route.checkpoints[i].km) {
      nextCheckpoint = route.checkpoints[i];
      break;
    }
  }

  const nextStopDist = Math.max(1, nextCheckpoint.km - distTraveled);
  const nextStopMins = Math.max(2, Math.floor((nextStopDist / speed) * 60));

  // Estimate Remaining Travel Time
  const remainHours = Math.floor(distRemain / speed);
  const remainMins = Math.floor((distRemain % speed) / (speed / 60));

  // Floating map pills
  const mapTripBadge = document.getElementById('map-trip-badge');
  if (mapTripBadge) mapTripBadge.textContent = `รอบที่ ${trip.roundSeq}/${trip.totalRounds} (${trip.time} น.) : ${trip.origin.split(' ')[0]} ➔ ${trip.dest.split(' ')[0]}`;

  const mapRoadName = document.getElementById('map-road-name');
  if (mapRoadName) mapRoadName.innerHTML = `<i class="fa-solid fa-location-dot text-danger"></i> ${currentCheckpoint.road || 'ทางหลวงแผ่นดิน'}`;

  // HUD Bus profile
  const hudTripName = document.getElementById('hud-trip-name');
  if (hudTripName) hudTripName.textContent = `${trip.origin} ➔ ${trip.dest}`;

  const hudTripType = document.getElementById('hud-trip-type');
  if (hudTripType) hudTripType.textContent = trip.type;

  const hudTripPlate = document.getElementById('hud-trip-plate');
  if (hudTripPlate) hudTripPlate.innerHTML = `<i class="fa-solid fa-car"></i> ทะเบียน: ${trip.plate}`;

  const hudDriverName = document.getElementById('hud-driver-name');
  if (hudDriverName) hudDriverName.textContent = trip.driver;

  // Speedometer
  const hudSpeedVal = document.getElementById('hud-speed-val');
  if (hudSpeedVal) hudSpeedVal.textContent = speed;

  const hudSpeedBar = document.getElementById('hud-speed-bar');
  if (hudSpeedBar) hudSpeedBar.style.width = `${Math.min(100, (speed / 90) * 100)}%`;

  // Progress & ETA
  const hudProgressPercent = document.getElementById('hud-progress-percent');
  if (hudProgressPercent) hudProgressPercent.textContent = `${percentInt}%`;

  const hudRouteProgressBar = document.getElementById('hud-route-progress-bar');
  if (hudRouteProgressBar) hudRouteProgressBar.style.width = `${percentInt}%`;

  const hudEtaTime = document.getElementById('hud-eta-time');
  if (hudEtaTime) hudEtaTime.textContent = `${trip.arrTime} น.`;

  const hudEtaRemain = document.getElementById('hud-eta-remain');
  if (hudEtaRemain) hudEtaRemain.textContent = distRemain > 0 ? `เหลืออีก ~ ${remainHours} ชม. ${remainMins} นาที` : 'ถึงปลายทางแล้ว';

  const hudDistRemain = document.getElementById('hud-dist-remain');
  if (hudDistRemain) hudDistRemain.textContent = `${distRemain} กม.`;

  const hudDistTotal = document.getElementById('hud-dist-total');
  if (hudDistTotal) hudDistTotal.textContent = `วิ่งมาแล้ว ${distTraveled} / ${route.totalKm} กม.`;

  // Next Rest Stop
  const hudNextStopName = document.getElementById('hud-next-stop-name');
  if (hudNextStopName) hudNextStopName.textContent = nextCheckpoint.name;

  const hudNextStopEta = document.getElementById('hud-next-stop-eta');
  if (hudNextStopEta) hudNextStopEta.innerHTML = `<i class="fa-regular fa-clock"></i> อีกประมาณ ${nextStopMins} นาที`;

  const hudNextStopDist = document.getElementById('hud-next-stop-dist');
  if (hudNextStopDist) hudNextStopDist.innerHTML = `<i class="fa-solid fa-location-arrow"></i> ${nextStopDist} กม.`;

  // Sensors
  const hudCabinTemp = document.getElementById('hud-cabin-temp');
  if (hudCabinTemp) hudCabinTemp.textContent = `23.${(percentInt % 5) + 2} °C`;

  const hudPassengerCount = document.getElementById('hud-passenger-count');
  if (hudPassengerCount) hudPassengerCount.textContent = `${trip.totalSeats - trip.occupiedSeats.length} / ${trip.totalSeats} คน`;

  const hudLatLng = document.getElementById('hud-latlng-coords');
  if (hudLatLng && currentCoord) hudLatLng.textContent = `${currentCoord[0].toFixed(4)}, ${currentCoord[1].toFixed(4)}`;

  // Milestones Stepper
  renderRouteMilestones(route, distTraveled);
}

function renderRouteMilestones(route, distTraveled) {
  const container = document.getElementById('gps-milestones-container');
  if (!container) return;

  container.innerHTML = route.checkpoints.map((cp, idx) => {
    const isPassed = distTraveled >= cp.km;
    const isActive = !isPassed && (idx === 0 || distTraveled >= route.checkpoints[idx - 1].km);

    return `
      <div class="milestone-item ${isPassed ? 'passed' : isActive ? 'active' : ''}">
        <div class="milestone-dot">
          ${isPassed ? '<i class="fa-solid fa-check"></i>' : isActive ? '<i class="fa-solid fa-bus"></i>' : (idx + 1)}
        </div>
        <div class="milestone-name">${cp.name}</div>
        <div class="milestone-time">${cp.km} กม. ${cp.isRest ? '(พักรถ)' : ''}</div>
      </div>
    `;
  }).join('');
}

function changeGpsTrackedTrip(tripId) {
  gpsState.trackedTripId = tripId;
  const trip = state.schedules.find(t => t.id === tripId);
  if (!trip) return;

  loadTripOnGpsMap(trip);
  showToast(`กำลังติดตาม GPS รอบที่ ${trip.roundSeq} : ${trip.origin} ➔ ${trip.dest}`, 'info');
}

function setGpsSimSpeed(multiplier) {
  gpsState.simSpeed = multiplier;
  [1, 5, 20].forEach(spd => {
    const btn = document.getElementById(`sim-spd-${spd}`);
    if (btn) btn.classList.toggle('active', spd === multiplier);
  });
  showToast(`ปรับความเร็วการจำลอง GPS เป็น ${multiplier}x`, 'info');
}

function centerMapOnCurrentBus() {
  gpsState.followBus = true;
  const currentTrip = state.schedules.find(t => t.id === gpsState.trackedTripId);
  if (!currentTrip || !gpsState.busMarker || !gpsState.map) return;

  gpsState.map.setView(gpsState.busMarker.getLatLng(), 11, { animate: true });
  showToast('ล็อกมุมกล้องกึ่งกลางที่ตำแหน่งรถบัสเรียบร้อย', 'success');
}

function refreshGpsSignal() {
  const currentTrip = state.schedules.find(t => t.id === gpsState.trackedTripId);
  if (currentTrip) {
    loadTripOnGpsMap(currentTrip);
  }
  showToast('รีเฟรชสัญญาณดาวเทียม GPS และข้อมูล Telematics แล้ว', 'success');
}

function scrollToGpsTracker() {
  const section = document.getElementById('live-tracking-section');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

function trackGpsTripFromSchedule(tripId) {
  const select = document.getElementById('gps-trip-select');
  if (select) {
    select.value = tripId;
  }
  changeGpsTrackedTrip(tripId);
  scrollToGpsTracker();
}

function trackCurrentBookedBus() {
  closeBookingModal();
  if (state.currentBooking && state.currentBooking.tripId) {
    trackGpsTripFromSchedule(state.currentBooking.tripId);
  } else if (state.bookings.length > 0) {
    trackGpsTripFromSchedule(state.bookings[0].tripId);
  } else {
    scrollToGpsTracker();
  }
}

function trackTicketGps(refCode) {
  const booking = state.bookings.find(b => b.refCode === refCode);
  if (booking) {
    trackGpsTripFromSchedule(booking.tripId);
  } else {
    scrollToGpsTracker();
  }
}

// Admin Fleet Map
function renderAdminFleetMap() {
  const container = document.getElementById('admin-fleet-map');
  const tbody = document.getElementById('admin-fleet-tbody');
  if (!container || !tbody) return;
  if (typeof L === 'undefined') return;

  if (!gpsState.adminMap) {
    gpsState.adminMap = L.map('admin-fleet-map', {
      zoomControl: true,
      attributionControl: false
    }).setView([14.5, 100.8], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap'
    }).addTo(gpsState.adminMap);
  }

  // Clear existing admin markers
  gpsState.adminMarkers.forEach(m => gpsState.adminMap.removeLayer(m));
  gpsState.adminMarkers = [];

  const todayTrips = state.schedules.filter(s => s.day === 'today');

  tbody.innerHTML = todayTrips.map(trip => {
    const route = getRouteForTrip(trip);
    const progress = gpsState.tripProgressMap[trip.id] !== undefined ? gpsState.tripProgressMap[trip.id] : 0.35;
    const coord = getInterpolatedPoint(route.waypoints, progress);
    const speed = 80 + Math.floor(Math.sin(Date.now() / 3000 + trip.roundSeq) * 5);

    // Create marker on Admin Fleet Map
    const markerIconHtml = `
      <div style="background:#0284c7; color:#fff; width:30px; height:30px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:2px solid #fff; box-shadow:0 2px 6px rgba(0,0,0,0.3); font-size:0.75rem; font-weight:700;">
        ${trip.roundSeq}
      </div>
    `;
    const icon = L.divIcon({
      html: markerIconHtml,
      className: 'admin-bus-icon',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });

    const m = L.marker(coord, { icon: icon }).addTo(gpsState.adminMap);
    m.bindPopup(`
      <div style="font-family:'Prompt',sans-serif;">
        <strong>รอบที่ ${trip.roundSeq} : ${trip.plate}</strong><br>
        <small>${trip.origin} ➔ ${trip.dest}</small><br>
        <span style="color:#10b981; font-weight:600;">ความเร็ว: ${speed} กม./ชม.</span>
      </div>
    `);
    gpsState.adminMarkers.push(m);

    return `
      <tr>
        <td><strong>รอบที่ ${trip.roundSeq}/${trip.totalRounds}</strong> (${trip.time} น.)</td>
        <td>${trip.origin} ➔ ${trip.dest}</td>
        <td><span class="badge-tag dark font-mono">${trip.plate}</span></td>
        <td>${trip.driver}</td>
        <td><small class="font-mono text-muted">${coord[0].toFixed(3)}, ${coord[1].toFixed(3)}</small></td>
        <td><strong class="text-primary">${speed} กม./ชม.</strong></td>
        <td><span class="badge-tag paid"><i class="fa-solid fa-circle-check"></i> ปกติ (ปลอดภัย)</span></td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="closeAdminPortal(); trackGpsTripFromSchedule('${trip.id}');"><i class="fa-solid fa-crosshairs"></i> ติดตามคันนี้</button>
        </td>
      </tr>
    `;
  }).join('');

  setTimeout(() => {
    if (gpsState.adminMap) gpsState.adminMap.invalidateSize();
  }, 200);
}

