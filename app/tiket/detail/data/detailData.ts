import { FlightTrip, PassengerInfo, AddonItem, PromoRule } from "../types";

export const OUTBOUND_FLIGHT: FlightTrip = {
  id: "fl-dep-1",
  tripType: "departure",
  tripTitle: "Penerbangan Berangkat",
  tripSubtitle: "Senin, 28 September 2026 • Durasi 1j 50m (Langsung)",
  airlineName: "Garuda Indonesia",
  airlineCode: "GA",
  flightCode: "GA-820 • Boeing 737-800 • Full Service",
  date: "Senin, 28 Sep 2026",
  origin: {
    code: "CGK",
    city: "Jakarta",
    airport: "Soekarno-Hatta (T3)",
    time: "08:00",
    timezone: "WIB",
    date: "28 Sep 2026",
  },
  destination: {
    code: "SIN",
    city: "Singapura",
    airport: "Changi Airport (T3)",
    time: "10:50",
    timezone: "SGT",
    date: "28 Sep 2026",
  },
  duration: "1j 50m",
  flightType: "Langsung",
  passenger: "1 Dewasa",
  seatNumber: "14A (Window)",
  cabinClass: "Ekonomi Flexi",
  baggage: "20 Kg + Kabin 7 Kg",
  facilities: [
    "Bagasi 20 kg",
    "Makanan Termasuk",
    "Port USB & Hiburan",
    "Reschedule Fleksibel",
  ],
  price: 1485000,
};

export const RETURN_FLIGHT: FlightTrip = {
  id: "fl-ret-1",
  tripType: "return",
  tripTitle: "Penerbangan Pulang",
  tripSubtitle: "Kamis, 01 Oktober 2026 • Durasi 1j 50m (Langsung)",
  airlineName: "Garuda Indonesia",
  airlineCode: "GA",
  flightCode: "GA-821 • Boeing 737-800 • Full Service",
  date: "Kamis, 01 Okt 2026",
  origin: {
    code: "SIN",
    city: "Singapura",
    airport: "Changi Airport (T3)",
    time: "12:20",
    timezone: "SGT",
    date: "01 Okt 2026",
  },
  destination: {
    code: "CGK",
    city: "Jakarta",
    airport: "Soekarno-Hatta (T3)",
    time: "13:10",
    timezone: "WIB",
    date: "01 Okt 2026",
  },
  duration: "1j 50m",
  flightType: "Langsung",
  passenger: "1 Dewasa",
  seatNumber: "15F (Window)",
  cabinClass: "Ekonomi Flexi",
  baggage: "20 Kg + Kabin 7 Kg",
  facilities: [
    "Bagasi 20 kg",
    "Makanan Termasuk",
    "Port USB & Hiburan",
    "Reschedule Fleksibel",
  ],
  price: 1485000,
};

export const PASSENGER_DATA: PassengerInfo = {
  name: "Budi Santoso (Tuan)",
  email: "budi.santoso@email.com",
  phone: "+62 812-3456-7890",
  idNumber: "A12984920 (Paspor/KTP)",
};

export const AVAILABLE_ADDONS: AddonItem[] = [
  {
    id: "addon-insurance",
    title: "Asuransi Perjalanan Komprehensif",
    description:
      "Kompensasi pembatalan darurat, biaya medis luar negeri hingga Rp 100 jt, & bagasi hilang.",
    price: 45000,
  },
  {
    id: "addon-delay",
    title: "Jaminan Tepat Waktu (Delay Protection)",
    description:
      "Kompensasi langsung Rp 500.000 tunai jika penerbangan mengalami delay lebih dari 60 menit.",
    price: 25000,
  },
];

export const SYSTEM_FEE = 25000;

export const PROMO_RULES: Record<string, PromoRule> = {
  TIKETHEMAT: {
    code: "TIKETHEMAT",
    discount: 100000,
    message: "Kode promo TIKETHEMAT berhasil! Diskon Rp 100.000",
  },
  DISKON50: {
    code: "DISKON50",
    discount: 50000,
    message: "Kode promo DISKON50 berhasil! Diskon Rp 50.000",
  },
};
