try { process.loadEnvFile(); } catch {}
import { db } from "./index";
import { cities, tickets, hotels } from "./schema";
import { HOTELS_LIST } from "../app/hotel/data/hotels";

const CITIES_DATA = [
  { code: "CGK", city: "Jakarta", airport: "Soekarno-Hatta (T3)" },
  { code: "SUB", city: "Surabaya", airport: "Juanda (T1)" },
  { code: "DPS", city: "Bali / Denpasar", airport: "I Gusti Ngurah Rai (DPS)" },
  { code: "YIA", city: "Yogyakarta", airport: "Yogyakarta International (YIA)" },
  { code: "KNO", city: "Medan", airport: "Kualanamu (KNO)" },
  { code: "SIN", city: "Singapura", airport: "Changi Airport (T3)" },
  { code: "KUL", city: "Kuala Lumpur", airport: "KLIA (KUL)" },
];

const DATE_CONFIGS = [
  { iso: "2026-09-27", formatted: "Minggu, 27 Sep 2026", mult: 1.35 },
  { iso: "2026-09-28", formatted: "Senin, 28 Sep 2026", mult: 1.0 },
  { iso: "2026-09-29", formatted: "Selasa, 29 Sep 2026", mult: 1.15 },
  { iso: "2026-09-30", formatted: "Rabu, 30 Sep 2026", mult: 1.25 },
  { iso: "2026-10-01", formatted: "Kamis, 01 Okt 2026", mult: 1.35 },
  { iso: "2026-10-02", formatted: "Jumat, 02 Okt 2026", mult: 1.70 },
  { iso: "2026-10-03", formatted: "Sabtu, 03 Okt 2026", mult: 1.95 },
];

const ROUTE_DESTINATIONS = [
  { code: "YIA", city: "Yogyakarta", airport: "Yogyakarta International (YIA)", tz: "WIB", dur: "1j 15m", mins: 75, basePrice: 650000 },
  { code: "DPS", city: "Bali / Denpasar", airport: "I Gusti Ngurah Rai (DPS)", tz: "WITA", dur: "1j 50m", mins: 110, basePrice: 850000 },
  { code: "SUB", city: "Surabaya", airport: "Juanda (T1)", tz: "WIB", dur: "1j 30m", mins: 90, basePrice: 720000 },
  { code: "KNO", city: "Medan", airport: "Kualanamu (KNO)", tz: "WIB", dur: "2j 15m", mins: 135, basePrice: 1100000 },
  { code: "SIN", city: "Singapura", airport: "Changi Airport (T3)", tz: "SGT", dur: "1j 50m", mins: 110, basePrice: 775000 },
  { code: "KUL", city: "Kuala Lumpur", airport: "KLIA (KUL)", tz: "MYT", dur: "2j 05m", mins: 125, basePrice: 820000 },
];

const AIRLINES = [
  { key: "garuda", name: "Garuda Indonesia", code: "GA", flightNum: 204, aircraft: "Boeing 737-800", priceFactor: 1.45, times: [{ dep: "08:00", arr: "09:15" }, { dep: "15:30", arr: "16:45" }] },
  { key: "citilink", name: "Citilink", code: "QG", flightNum: 132, aircraft: "Airbus A320", priceFactor: 1.0, times: [{ dep: "09:30", arr: "10:45" }, { dep: "18:20", arr: "19:35" }] },
  { key: "batik", name: "Batik Air", code: "ID", flightNum: 6372, aircraft: "Boeing 737-800NG", priceFactor: 1.15, times: [{ dep: "11:40", arr: "12:55" }, { dep: "16:50", arr: "18:05" }] },
  { key: "airasia", name: "AirAsia", code: "QZ", flightNum: 504, aircraft: "Airbus A320", priceFactor: 0.95, times: [{ dep: "06:15", arr: "07:30" }, { dep: "19:30", arr: "20:45" }] },
  { key: "singapore", name: "Singapore Airlines", code: "SQ", flightNum: 951, aircraft: "Airbus A350-900", priceFactor: 1.85, times: [{ dep: "11:15", arr: "12:30" }, { dep: "17:40", arr: "18:55" }] },
];

const CABIN_CLASSES = [
  { name: "Ekonomi", mult: 1.0, baggage: "20 Kg + Kabin 7 Kg", seatRow: "14", facilities: ["Bagasi 20 kg", "Kabin 7 kg", "Port USB", "Air Mineral"], serviceType: "Standar" },
  { name: "Premium Ekonomi", mult: 1.55, baggage: "30 Kg + Kabin 7 Kg", seatRow: "08", facilities: ["Bagasi 30 kg", "Legroom Ekstra", "Makanan Pilihan", "Port USB & Wifi"], serviceType: "Layanan Ekstra" },
  { name: "Bisnis", mult: 2.6, baggage: "40 Kg + Kabin 10 Kg", seatRow: "02", facilities: ["Bagasi 40 kg", "Lounge Akses", "Kursi Flatbed", "Gourmet Meal", "Prioritas Boarding"], serviceType: "Full Service Mewah" },
];

async function seed() {
  await db.delete(cities);
  await db.delete(tickets);
  await db.delete(hotels);

  await db.insert(cities).values(CITIES_DATA);

  const ticketRows: (typeof tickets.$inferInsert)[] = [];
  let idCounter = 1;

  for (const dateItem of DATE_CONFIGS) {
    for (const dest of ROUTE_DESTINATIONS) {
      const isInternational = dest.code === "SIN" || dest.code === "KUL";
      const availableAirlines = isInternational
        ? AIRLINES
        : AIRLINES.filter((a) => a.key !== "singapore");

      for (const airline of availableAirlines) {
        for (const cabin of CABIN_CLASSES) {
          if (
            (airline.key === "airasia" || airline.key === "citilink") &&
            cabin.name === "Bisnis"
          ) {
            continue;
          }

          const timeSlot = airline.times[idCounter % airline.times.length];
          const rawPrice = Math.round((dest.basePrice * airline.priceFactor * cabin.mult * dateItem.mult) / 5000) * 5000;
          const origPrice = Math.round((rawPrice * 1.15) / 5000) * 5000;

          let tagText = undefined;
          let tagType = undefined;
          if (cabin.name === "Bisnis") {
            tagText = "Kelas Premium";
            tagType = "best";
          } else if (dateItem.iso === "2026-09-28" && airline.key === "airasia" && cabin.name === "Ekonomi") {
            tagText = "Harga Termurah";
            tagType = "promo";
          } else if (airline.key === "garuda") {
            tagText = "Pilihan Favorit";
            tagType = "popular";
          }

          ticketRows.push({
            id: `t-${idCounter}`,
            airline: airline.key,
            airlineName: airline.name,
            airlineCode: airline.code,
            flightCode: `${airline.code}-${airline.flightNum + (idCounter % 50)} - ${airline.aircraft} - ${cabin.serviceType}`,
            aircraft: airline.aircraft,
            serviceType: cabin.serviceType,
            date: dateItem.iso,
            dateFormatted: dateItem.formatted,
            originCode: "CGK",
            originCity: "Jakarta",
            originAirport: "Soekarno-Hatta (T3)",
            originTime: timeSlot.dep,
            originTimezone: "WIB",
            destinationCode: dest.code,
            destinationCity: dest.city,
            destinationAirport: dest.airport,
            destinationTime: timeSlot.arr,
            destinationTimezone: dest.tz,
            duration: dest.dur,
            durationMinutes: dest.mins,
            flightType: "Langsung",
            passenger: "1 Dewasa",
            seatNumber: `${cabin.seatRow}${idCounter % 2 === 0 ? "A (Window)" : "C (Aisle)"}`,
            cabinClass: cabin.name,
            baggage: cabin.baggage,
            facilities: JSON.stringify(cabin.facilities),
            tagText,
            tagType,
            seatsLeft: (idCounter % 6) + 2,
            originalPrice: origPrice,
            price: rawPrice,
            note: cabin.name === "Bisnis" ? "Layanan prioritas" : "Konfirmasi instan",
          });

          idCounter++;

          ticketRows.push({
            id: `t-${idCounter}`,
            airline: airline.key,
            airlineName: airline.name,
            airlineCode: airline.code,
            flightCode: `${airline.code}-${airline.flightNum + 1 + (idCounter % 50)} - ${airline.aircraft} - ${cabin.serviceType}`,
            aircraft: airline.aircraft,
            serviceType: cabin.serviceType,
            date: dateItem.iso,
            dateFormatted: dateItem.formatted,
            originCode: dest.code,
            originCity: dest.city,
            originAirport: dest.airport,
            originTime: timeSlot.dep,
            originTimezone: dest.tz,
            destinationCode: "CGK",
            destinationCity: "Jakarta",
            destinationAirport: "Soekarno-Hatta (T3)",
            destinationTime: timeSlot.arr,
            destinationTimezone: "WIB",
            duration: dest.dur,
            durationMinutes: dest.mins,
            flightType: "Langsung",
            passenger: "1 Dewasa",
            seatNumber: `${cabin.seatRow}${idCounter % 2 === 0 ? "B (Middle)" : "D (Aisle)"}`,
            cabinClass: cabin.name,
            baggage: cabin.baggage,
            facilities: JSON.stringify(cabin.facilities),
            tagText,
            tagType,
            seatsLeft: (idCounter % 5) + 3,
            originalPrice: origPrice,
            price: rawPrice,
            note: "Penerbangan balik",
          });

          idCounter++;
        }
      }
    }
  }

  await db.insert(tickets).values(ticketRows);

  const hotelRows = HOTELS_LIST.map((h) => ({
    id: h.id,
    name: h.name,
    badge: h.badge,
    city: h.city,
    location: h.location,
    rating: h.rating.toString(),
    reviewsCount: h.reviewsCount,
    image: h.image,
    subImages: JSON.stringify(h.subImages),
    specs: JSON.stringify(h.specs),
    discount: h.discount,
    oldPrice: h.oldPrice,
    priceNum: h.priceNum,
    priceFormatted: h.priceFormatted,
    pricePer: h.pricePer,
    facilities: JSON.stringify(h.facilities),
    highlights: JSON.stringify(h.highlights),
  }));

  await db.insert(hotels).values(hotelRows);
  console.log(`Database seeded with ${ticketRows.length} tickets and ${hotelRows.length} hotels.`);
}

seed().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
