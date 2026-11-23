import { db } from "./index";
import { cities, tickets } from "./schema";

const CITIES_DATA = [
  { code: "CGK", city: "Jakarta", airport: "Soekarno-Hatta (T3)" },
  { code: "SUB", city: "Surabaya", airport: "Juanda (T1)" },
  { code: "DPS", city: "Bali / Denpasar", airport: "I Gusti Ngurah Rai (DPS)" },
  { code: "YIA", city: "Yogyakarta", airport: "Yogyakarta International (YIA)" },
  { code: "KNO", city: "Medan", airport: "Kualanamu (KNO)" },
  { code: "SIN", city: "Singapura", airport: "Changi Airport (T3)" },
  { code: "KUL", city: "Kuala Lumpur", airport: "KLIA (KUL)" },
];

const DATES_LIST = [
  { iso: "2026-09-27", formatted: "Minggu, 27 Sep 2026" },
  { iso: "2026-09-28", formatted: "Senin, 28 Sep 2026" },
  { iso: "2026-09-29", formatted: "Selasa, 29 Sep 2026" },
  { iso: "2026-09-30", formatted: "Rabu, 30 Sep 2026" },
  { iso: "2026-10-01", formatted: "Kamis, 01 Okt 2026" },
  { iso: "2026-10-02", formatted: "Jumat, 02 Okt 2026" },
  { iso: "2026-10-03", formatted: "Sabtu, 03 Okt 2026" },
];

const AIRLINES_DATA = [
  {
    airline: "garuda",
    airlineName: "Garuda Indonesia",
    airlineCode: "GA",
    flightPrefix: "GA-82",
    aircraft: "Boeing 737-800",
    basePrice: 1450000,
    times: [
      { dep: "08:00", arr: "10:50", dur: "1j 50m", mins: 110 },
      { dep: "15:30", arr: "18:20", dur: "1j 50m", mins: 110 },
    ],
  },
  {
    airline: "singapore",
    airlineName: "Singapore Airlines",
    airlineCode: "SQ",
    flightPrefix: "SQ-95",
    aircraft: "Airbus A350-900",
    basePrice: 2100000,
    times: [
      { dep: "11:15", arr: "14:00", dur: "1j 45m", mins: 105 },
      { dep: "17:40", arr: "20:25", dur: "1j 45m", mins: 105 },
    ],
  },
  {
    airline: "batik",
    airlineName: "Batik Air",
    airlineCode: "ID",
    flightPrefix: "ID-71",
    aircraft: "Boeing 737-800NG",
    basePrice: 980000,
    times: [
      { dep: "13:40", arr: "16:35", dur: "1j 55m", mins: 115 },
    ],
  },
  {
    airline: "citilink",
    airlineName: "Citilink",
    airlineCode: "QG",
    flightPrefix: "QG-52",
    aircraft: "Airbus A320neo",
    basePrice: 890000,
    times: [
      { dep: "09:30", arr: "12:15", dur: "1j 45m", mins: 105 },
      { dep: "16:20", arr: "19:10", dur: "1j 50m", mins: 110 },
    ],
  },
  {
    airline: "airasia",
    airlineName: "AirAsia",
    airlineCode: "QZ",
    flightPrefix: "QZ-50",
    aircraft: "Airbus A320",
    basePrice: 775000,
    times: [
      { dep: "06:15", arr: "09:00", dur: "1j 45m", mins: 105 },
      { dep: "19:30", arr: "22:15", dur: "1j 45m", mins: 105 },
    ],
  },
];

const CABIN_CONFIGS = [
  {
    className: "Ekonomi",
    priceFactor: 1.0,
    baggage: "20 Kg + Kabin 7 Kg",
    seatSuffix: "B (Middle)",
    facilities: ["Bagasi 20 kg", "Kabin 7 kg", "Port USB", "Air Mineral"],
    serviceType: "Standar",
  },
  {
    className: "Premium Ekonomi",
    priceFactor: 1.6,
    baggage: "30 Kg + Kabin 7 Kg",
    seatSuffix: "A (Window)",
    facilities: ["Bagasi 30 kg", "Legroom Ekstra", "Makanan Pilihan", "Port USB & Wifi"],
    serviceType: "Layanan Ekstra",
  },
  {
    className: "Bisnis",
    priceFactor: 2.7,
    baggage: "40 Kg + Kabin 10 Kg",
    seatSuffix: "C (Aisle)",
    facilities: ["Bagasi 40 kg", "Lounge Akses", "Kursi Flatbed", "Gourmet Meal", "Prioritas Boarding"],
    serviceType: "Full Service Mewah",
  },
];

const ROUTES = [
  {
    originCode: "CGK",
    originCity: "Jakarta",
    originAirport: "Soekarno-Hatta (T3)",
    originTimezone: "WIB",
    destCode: "SIN",
    destCity: "Singapura",
    destAirport: "Changi Airport (T3)",
    destTimezone: "SGT",
  },
  {
    originCode: "SIN",
    originCity: "Singapura",
    originAirport: "Changi Airport (T3)",
    originTimezone: "SGT",
    destCode: "CGK",
    destCity: "Jakarta",
    destAirport: "Soekarno-Hatta (T3)",
    destTimezone: "WIB",
  },
  {
    originCode: "CGK",
    originCity: "Jakarta",
    originAirport: "Soekarno-Hatta (T3)",
    originTimezone: "WIB",
    destCode: "DPS",
    destCity: "Bali / Denpasar",
    destAirport: "I Gusti Ngurah Rai (DPS)",
    destTimezone: "WITA",
  },
  {
    originCode: "DPS",
    originCity: "Bali / Denpasar",
    originAirport: "I Gusti Ngurah Rai (DPS)",
    originTimezone: "WITA",
    destCode: "CGK",
    destCity: "Jakarta",
    destAirport: "Soekarno-Hatta (T3)",
    destTimezone: "WIB",
  },
];

async function seed() {
  await db.delete(cities);
  await db.delete(tickets);

  await db.insert(cities).values(CITIES_DATA);

  const ticketRows: (typeof tickets.$inferInsert)[] = [];
  let counter = 1;

  for (const dateItem of DATES_LIST) {
    for (const airline of AIRLINES_DATA) {
      for (const cabin of CABIN_CONFIGS) {
        if (
          (airline.airline === "airasia" || airline.airline === "citilink") &&
          cabin.className === "Bisnis"
        ) {
          continue;
        }

        const route = ROUTES[0];
        const timeSlot = airline.times[(counter % airline.times.length)];
        const priceCalc = Math.round((airline.basePrice * cabin.priceFactor) / 5000) * 5000;
        const originalPrice = Math.round((priceCalc * 1.15) / 5000) * 5000;
        const seatRow = cabin.className === "Bisnis" ? "02" : cabin.className === "Premium Ekonomi" ? "08" : "15";

        let tagText = undefined;
        let tagType = undefined;
        if (cabin.className === "Bisnis") {
          tagText = "Kelas Premium";
          tagType = "best";
        } else if (airline.airline === "airasia" && cabin.className === "Ekonomi") {
          tagText = "Harga Termurah";
          tagType = "promo";
        } else if (airline.airline === "garuda") {
          tagText = "Pilihan Favorit";
          tagType = "popular";
        }

        ticketRows.push({
          id: `t-${counter}`,
          airline: airline.airline,
          airlineName: airline.airlineName,
          airlineCode: airline.airlineCode,
          flightCode: `${airline.flightPrefix}${counter % 90 + 10} - ${airline.aircraft} - ${cabin.serviceType}`,
          aircraft: airline.aircraft,
          serviceType: cabin.serviceType,
          date: dateItem.iso,
          dateFormatted: dateItem.formatted,
          originCode: route.originCode,
          originCity: route.originCity,
          originAirport: route.originAirport,
          originTime: timeSlot.dep,
          originTimezone: route.originTimezone,
          destinationCode: route.destCode,
          destinationCity: route.destCity,
          destinationAirport: route.destAirport,
          destinationTime: timeSlot.arr,
          destinationTimezone: route.destTimezone,
          duration: timeSlot.dur,
          durationMinutes: timeSlot.mins,
          flightType: "Langsung",
          passenger: "1 Dewasa",
          seatNumber: `${seatRow}${cabin.seatSuffix}`,
          cabinClass: cabin.className,
          baggage: cabin.baggage,
          facilities: JSON.stringify(cabin.facilities),
          tagText,
          tagType,
          seatsLeft: (counter % 7) + 2,
          originalPrice,
          price: priceCalc,
          note: cabin.className === "Bisnis" ? "Layanan prioritas penuh" : "Konfirmasi instan",
        });

        counter++;
      }
    }

    const returnRoute = ROUTES[1];
    const baliRoute = ROUTES[2];

    ticketRows.push({
      id: `t-${counter++}`,
      airline: "garuda",
      airlineName: "Garuda Indonesia",
      airlineCode: "GA",
      flightCode: `GA-831 - Boeing 737-800 - Full Service`,
      aircraft: "Boeing 737-800",
      serviceType: "Full Service",
      date: dateItem.iso,
      dateFormatted: dateItem.formatted,
      originCode: returnRoute.originCode,
      originCity: returnRoute.originCity,
      originAirport: returnRoute.originAirport,
      originTime: "12:20",
      originTimezone: returnRoute.originTimezone,
      destinationCode: returnRoute.destCode,
      destinationCity: returnRoute.destCity,
      destinationAirport: returnRoute.destAirport,
      destinationTime: "13:10",
      destinationTimezone: returnRoute.destTimezone,
      duration: "1j 50m",
      durationMinutes: 110,
      flightType: "Langsung",
      passenger: "1 Dewasa",
      seatNumber: "14B (Middle)",
      cabinClass: "Ekonomi",
      baggage: "20 Kg + Kabin 7 Kg",
      facilities: JSON.stringify(["Bagasi 20 kg", "Makanan Termasuk", "Port USB"]),
      tagText: "Pilihan Favorit",
      tagType: "popular",
      seatsLeft: 5,
      originalPrice: 1750000,
      price: 1485000,
      note: "E-tiket langsung terbit",
    });

    ticketRows.push({
      id: `t-${counter++}`,
      airline: "garuda",
      airlineName: "Garuda Indonesia",
      airlineCode: "GA",
      flightCode: `GA-402 - Boeing 737-800 - Domestik`,
      aircraft: "Boeing 737-800",
      serviceType: "Full Service",
      date: dateItem.iso,
      dateFormatted: dateItem.formatted,
      originCode: baliRoute.originCode,
      originCity: baliRoute.originCity,
      originAirport: baliRoute.originAirport,
      originTime: "07:30",
      originTimezone: baliRoute.originTimezone,
      destinationCode: baliRoute.destCode,
      destinationCity: baliRoute.destCity,
      destinationAirport: baliRoute.destAirport,
      destinationTime: "10:20",
      destinationTimezone: baliRoute.destTimezone,
      duration: "1j 50m",
      durationMinutes: 110,
      flightType: "Langsung",
      passenger: "1 Dewasa",
      seatNumber: "16A (Window)",
      cabinClass: "Ekonomi",
      baggage: "20 Kg + Kabin 7 Kg",
      facilities: JSON.stringify(["Bagasi 20 kg", "Makanan Termasuk", "Port USB"]),
      tagText: "Pilihan Favorit",
      tagType: "popular",
      seatsLeft: 4,
      originalPrice: 1550000,
      price: 1350000,
      note: "Penerbangan pagi",
    });
  }

  await db.insert(tickets).values(ticketRows);
  console.log(`Database seeded with ${ticketRows.length} tickets across multiple dates, cabin classes, and routes.`);
}

seed().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
