export interface FlightLeg {
  title: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  flightCode: string;
  airline: string;
  airlineCode: string;
  aircraft: string;
  baggage: string;
  cabinClass: string;
}

export interface PackageOption {
  id: string;
  badge: string;
  title: string;
  rating: string;
  reviewsCount: number;
  duration: string;
  coverImage: string;
  galleryImages: string[];
  specs: string[];
  price: string;
  
  hotelName: string;
  hotelStars: string;
  hotelRating: string;
  hotelReviews: number;
  hotelImage: string;
  hotelFacilities: string[];
  roomType: string;

  outboundFlight: FlightLeg;
  returnFlight: FlightLeg;

  features: { title: string; desc: string }[];
  policies: { title: string; desc: string }[];
}

export interface DestinationData {
  id: number;
  destinationLink: string;
  name: string;
  regionGroup: "Indonesia" | "Asia" | "Lainnya";
  coverImage: string;
  packages: PackageOption[];
}

export const PAKET_DATA: DestinationData[] = [
  {
    id: 1,
    destinationLink: "yogyakarta",
    name: "Yogyakarta",
    regionGroup: "Indonesia",
    coverImage: "/paket/destinasi/gunungkidul.jpeg",
    packages: [
      {
        id: "relax-jogja",
        badge: "Recommended",
        title: "Relaxing Break to Yogyakarta",
        rating: "4.7 / 5",
        reviewsCount: 245,
        duration: "4 Hari 3 Malam",
        coverImage: "/paket/yogyakarta/amaranta.jpeg",
        galleryImages: [
          "/paket/yogyakarta/amaranta.jpeg",
          "/paket/destinasi/gunungkidul.jpeg",
        ],
        specs: ["4 Hari 3 Malam", "Penerbangan Pulang Pergi", "Hotel 4 Bintang", "Sarapan Termasuk"],
        price: "Rp. 5.499.000 / orang",
        
        hotelName: "Grand Yogyakarta Hotel and Resort",
        hotelStars: "Hotel Bintang 4",
        hotelRating: "4.9/5",
        hotelReviews: 877,
        hotelImage: "/paket/yogyakarta/amaranta.jpeg",
        hotelFacilities: ["WiFi Gratis", "Kolam Renang", "Restoran", "Spa"],
        roomType: "Deluxe Room",

        outboundFlight: {
          title: "Penerbangan Pergi",
          date: "30 November 2026",
          departureTime: "08:00",
          arrivalTime: "10:50",
          duration: "2j 50m",
          flightCode: "GA-412",
          airline: "Garuda Indonesia",
          airlineCode: "GA",
          aircraft: "Boeing 737-800",
          baggage: "Bagasi 20 Kg",
          cabinClass: "Premium Ekonomi",
        },
        returnFlight: {
          title: "Penerbangan Pulang",
          date: "3 Desember 2026",
          departureTime: "16:00",
          arrivalTime: "18:55",
          duration: "2j 55m",
          flightCode: "GA-413",
          airline: "Garuda Indonesia",
          airlineCode: "GA",
          aircraft: "Boeing 737-800",
          baggage: "Bagasi 20 Kg",
          cabinClass: "Premium Ekonomi",
        },

        features: [
          { title: "Tiket Pesawat", desc: "Pulang pergi tanpa transfer" },
          { title: "Hotel 4 Bintang", desc: "3 malam di Deluxe Room termasuk sarapan" },
          { title: "Spa Service", desc: "Fasilitas Spa 2x di Hotel per Orang" },
          { title: "Akses Pantai Gunungkidul", desc: "Tiket masuk pantai termasuk, 1 jam waktu tempuh dari hotel." },
        ],
        policies: [
          { title: "Pembatalan", desc: "Pembatalan gratis hingga 48 jam sebelum keberangkatan." },
          { title: "Bagasi", desc: "Bagasi tercatat maksimal 20 Kg per penumpang." },
          { title: "Check-in Hotel", desc: "Check-in mulai pukul 14:00 dan check-out pukul 12:00 (Waktu Lokal)." },
        ],
      },
      {
        id: "luxury-jogja",
        badge: "Best",
        title: "A Yogyakarta Luxury Trip",
        rating: "4.9 / 5",
        reviewsCount: 312,
        duration: "5 Hari 4 Malam",
        coverImage: "/paket/yogyakarta/lafayette.jpeg",
        galleryImages: [
          "/paket/yogyakarta/lafayette.jpeg",
          "/paket/yogyakarta/jeep.jpeg",
        ],
        specs: [
          "5 Hari 4 Malam",
          "Penerbangan Bisnis Pulang Pergi",
          "Hotel 5 Bintang",
          "Sarapan & Snack Termasuk"
        ],
        price: "Rp. 6.299.999 / orang",

        hotelName: "Premier Yogyakarta Heritage",
        hotelStars: "Hotel Bintang 5",
        hotelRating: "4.9/5",
        hotelReviews: 1240,
        hotelImage: "/paket/yogyakarta/lafayette.jpeg",
        hotelFacilities: [
          "WiFi Gratis",
          "Kolam Renang",
          "Fine Dining Restoran",
          "Spa & Sauna",
          "Fitness Center",
          "Executive Lounge"
        ],
        roomType: "Executive Suite",

        outboundFlight: {
          title: "Penerbangan Pergi",
          date: "30 November 2026",
          departureTime: "09:15",
          arrivalTime: "10:35",
          duration: "1j 20m",
          flightCode: "GA-204",
          airline: "Garuda Indonesia",
          airlineCode: "GA",
          aircraft: "Boeing 737-800",
          baggage: "Bagasi 30 Kg",
          cabinClass: "Bisnis",
        },
        returnFlight: {
          title: "Penerbangan Pulang",
          date: "4 Desember 2026",
          departureTime: "17:30",
          arrivalTime: "18:50",
          duration: "1j 20m",
          flightCode: "GA-215",
          airline: "Garuda Indonesia",
          airlineCode: "GA",
          aircraft: "Boeing 737-800",
          baggage: "Bagasi 30 Kg",
          cabinClass: "Bisnis",
        },

        features: [
          { title: "Tiket Pesawat Bisnis", desc: "Penerbangan langsung pulang pergi tanpa transit" },
          { title: "Hotel 5 Bintang", desc: "4 malam di Executive Suite termasuk sarapan & snack" },
          { title: "Private Tour & Driver", desc: "Mobil privat ber-AC beserta pemandu wisata selama trip" },
          { title: "Dinner Kraton", desc: "Jamuan makan malam eksklusif bernuansa kerajaan" },
          { title: "Jeep Merapi Lava Tour", desc: "Petualangan off-road menyusuri lereng Gunung Merapi" },
          { title: "Premium Room Service", desc: "Layanan kamar prioritas 24 jam" },
        ],
        policies: [
          { title: "Pembatalan & Reschedule", desc: "Gratis perubahan jadwal atau pembatalan hingga 72 jam sebelum keberangkatan." },
          { title: "Bagasi Kabin & Tercatat", desc: "Bagasi tercatat maksimal 30 Kg dan bagasi kabin 7 Kg per penumpang kelas Bisnis." },
          { title: "Check-in & Check-out", desc: "Check-in mulai pukul 14:00 dan late check-out gratis hingga pukul 14:00 (Waktu Lokal)." },
        ],
      },
    ],
  },
  {
    id: 2,
    destinationLink: "bali",
    name: "Bali",
    regionGroup: "Indonesia",
    coverImage: "/paket/destinasi/ulundanu.jpeg",
    packages: [
      {
        id: "hiking",
        badge: "Recommended",
        title: "Batur Hikers",
        rating: "4.7 / 5",
        reviewsCount: 184,
        duration: "4 Hari 3 Malam",
        coverImage: "/paket/bali/batur.jpeg",
        galleryImages: [
          "/paket/bali/batur.jpeg",
          "/paket/destinasi/ulundanu.jpeg",
        ],
        specs: [
          "4 Hari 3 Malam",
          "Penerbangan Ekonomi Pulang Pergi",
          "Hotel 4 Bintang",
          "Sarapan Termasuk"
        ],
        price: "Rp. 3.999.999 / orang",

        hotelName: "The Mount Batur Villa",
        hotelStars: "Hotel Bintang 4",
        hotelRating: "4.8/5",
        hotelReviews: 430,
        hotelImage: "/paket/bali/batur.jpeg",
        hotelFacilities: [
          "WiFi Gratis",
          "Kolam Renang Outdoor",
          "Restoran",
          "Layanan Antar-Jemput Bandara",
          "Rental Perlengkapan Mendaki"
        ],
        roomType: "Deluxe Room",

        outboundFlight: {
          title: "Penerbangan Pergi",
          date: "30 November 2026",
          departureTime: "07:30",
          arrivalTime: "10:25",
          duration: "1j 55m",
          flightCode: "QZ-754",
          airline: "Indonesia AirAsia",
          airlineCode: "QZ",
          aircraft: "Airbus A320",
          baggage: "Bagasi 20 Kg",
          cabinClass: "Ekonomi",
        },
        returnFlight: {
          title: "Penerbangan Pulang",
          date: "3 Desember 2026",
          departureTime: "15:20",
          arrivalTime: "18:15",
          duration: "1j 55m",
          flightCode: "QZ-755",
          airline: "Indonesia AirAsia",
          airlineCode: "QZ",
          aircraft: "Airbus A320",
          baggage: "Bagasi 20 Kg",
          cabinClass: "Ekonomi",
        },

        features: [
          { title: "Tiket Pesawat Ekonomi", desc: "Pulang pergi langsung tanpa transit ke Bali" },
          { title: "Hotel 4 Bintang", desc: "3 malam di Deluxe Room termasuk sarapan pagi" },
          { title: "Hiking Trail Guide", desc: "Pemandu profesional bersertifikat untuk pendakian Gunung Batur" },
          { title: "Tiket Wisata", desc: "Tiket masuk resmi ke Pura Ulun Danu Beratan" },
        ],
        policies: [
          { title: "Pembatalan", desc: "Pembatalan gratis hingga 48 jam sebelum jadwal keberangkatan." },
          { title: "Bagasi", desc: "Bagasi tercatat maksimal 20 Kg dan bagasi kabin 7 Kg per penumpang." },
          { title: "Check-in Hotel", desc: "Check-in mulai pukul 14:00 dan check-out pukul 12:00 (Waktu Lokal)." },
        ],
      },
      {
        id: "pantai",
        badge: "Populer",
        title: "Beach Addicts",
        rating: "4.9 / 5",
        reviewsCount: 412,
        duration: "5 Hari 4 Malam",
        coverImage: "/paket/bali/melasti.jpeg",
        galleryImages: [
          "/paket/bali/melasti.jpeg",
          "/paket/bali/lot.jpg",
        ],
        specs: [
          "5 Hari 4 Malam",
          "Penerbangan Ekonomi Pulang Pergi",
          "Hotel 5 Bintang",
          "Sarapan Termasuk"
        ],
        price: "Rp. 5.499.999 / orang",

        hotelName: "Seminyak Ocean Resort",
        hotelStars: "Hotel Bintang 5",
        hotelRating: "4.9/5",
        hotelReviews: 950,
        hotelImage: "/paket/bali/melasti.jpeg",
        hotelFacilities: [
          "WiFi Gratis",
          "Infinity Pool menghadap Laut",
          "Beach Club Akses Langsung",
          "Spa & Wellness",
          "Restoran Tepi Pantai"
        ],
        roomType: "Deluxe Ocean View Room",

        outboundFlight: {
          title: "Penerbangan Pergi",
          date: "30 November 2026",
          departureTime: "08:00",
          arrivalTime: "10:55",
          duration: "1j 55m",
          flightCode: "GA-404",
          airline: "Garuda Indonesia",
          airlineCode: "GA",
          aircraft: "Boeing 737-800",
          baggage: "Bagasi 20 Kg",
          cabinClass: "Ekonomi",
        },
        returnFlight: {
          title: "Penerbangan Pulang",
          date: "4 Desember 2026",
          departureTime: "16:30",
          arrivalTime: "17:25",
          duration: "1j 55m",
          flightCode: "GA-409",
          airline: "Garuda Indonesia",
          airlineCode: "GA",
          aircraft: "Boeing 737-800",
          baggage: "Bagasi 20 Kg",
          cabinClass: "Ekonomi",
        },

        features: [
          { title: "Tiket Pesawat Ekonomi", desc: "Penerbangan pulang pergi langsung tanpa transit ke Bali" },
          { title: "Hotel 5 Bintang", desc: "4 malam di Deluxe Ocean View Room termasuk sarapan pagi" },
          { title: "Watersport Aktivitas", desc: "Paket permainan air seru di pantai populer Bali" },
          { title: "Akses Beach Club", desc: "Tiket masuk eksklusif ke beach club ternama di Seminyak" },
          { title: "Fast Boat ke Nusa Penida", desc: "Tiket kapal cepat pulang pergi untuk jelajah pulau Nusa Penida" },
        ],
        policies: [
          { title: "Pembatalan", desc: "Pembatalan gratis hingga 48 jam sebelum jadwal keberangkatan." },
          { title: "Bagasi", desc: "Bagasi tercatat maksimal 20 Kg dan bagasi kabin 7 Kg per penumpang." },
          { title: "Check-in Hotel", desc: "Check-in mulai pukul 14:00 dan check-out pukul 12:00 (Waktu Lokal)." },
        ],
      },
    ],
  },
  {
    id: 3,
    destinationLink: "singapura",
    name: "Singapura",
    regionGroup: "Asia",
    coverImage: "/paket/destinasi/singapore.jpg",
    packages: [
{
        id: "thrill",
        badge: "Populer",
        title: "Super Thrill Pack",
        rating: "4.8 / 5",
        reviewsCount: 348,
        duration: "3 Hari 2 Malam",
        coverImage: "/paket/singapore/universal.jpg",
        galleryImages: [
          "/paket/singapore/universal.jpg",
          "/paket/singapore/sentosa.jpg",
        ],
        specs: [
          "3 Hari 2 Malam",
          "Penerbangan Ekonomi Pulang Pergi",
          "Hotel 4 Bintang",
          "Sarapan Termasuk"
        ],
        price: "Rp. 12.299.999 / orang",

        hotelName: "The Standard Hotel Singapore",
        hotelStars: "Hotel Bintang 4",
        hotelRating: "4.8/5",
        hotelReviews: 790,
        hotelImage: "/paket/singapore/sentosa.jpg",
        hotelFacilities: [
          "WiFi Gratis",
          "Kolam Renang Outdoor",
          "Restoran & Kafe",
          "Fitness Center",
          "Layanan Concierge 24 Jam"
        ],
        roomType: "Deluxe Room",

        outboundFlight: {
          title: "Penerbangan Pergi",
          date: "30 November 2026",
          departureTime: "08:30",
          arrivalTime: "11:15",
          duration: "1j 45m",
          flightCode: "SQ-953",
          airline: "Singapore Airlines",
          airlineCode: "SQ",
          aircraft: "Airbus A350-900",
          baggage: "Bagasi 25 Kg",
          cabinClass: "Ekonomi",
        },
        returnFlight: {
          title: "Penerbangan Pulang",
          date: "2 Desember 2026",
          departureTime: "17:20",
          arrivalTime: "18:05",
          duration: "1j 45m",
          flightCode: "SQ-964",
          airline: "Singapore Airlines",
          airlineCode: "SQ",
          aircraft: "Airbus A350-900",
          baggage: "Bagasi 25 Kg",
          cabinClass: "Ekonomi",
        },

        features: [
          { title: "Tiket Pesawat Ekonomi", desc: "Penerbangan pulang pergi langsung tanpa transit ke Singapura" },
          { title: "Hotel 4 Bintang", desc: "2 malam di Deluxe Room termasuk sarapan pagi" },
          { title: "Tiket Universal Studios", desc: "Akses masuk seharian penuh ke Universal Studios Singapore" },
          { title: "Tiket Sentosa Island", desc: "Akses masuk kawasan wisata Pulau Sentosa beserta Sentosa Express" },
        ],
        policies: [
          { title: "Pembatalan", desc: "Pembatalan gratis hingga 48 jam sebelum jadwal keberangkatan." },
          { title: "Bagasi", desc: "Bagasi tercatat maksimal 25 Kg dan bagasi kabin 7 Kg per penumpang." },
          { title: "Check-in Hotel", desc: "Check-in mulai pukul 15:00 dan check-out pukul 12:00 (Waktu Lokal)." },
        ],
      },
      {
        id: "marina-bay",
        badge: "Best",
        title: "Nights At The Bay",
        rating: "4.8 / 5",
        reviewsCount: 512,
        duration: "4 Hari 3 Malam | Minimal 2 Pax",
        coverImage: "/paket/singapore/marinabay.jpg",
        galleryImages: [
          "/paket/singapore/marinabay.jpg",
          "/paket/singapore/baysands.jpg"
        ],
        specs: [
          "3 Hari 2 Malam | Minimal 2 Pax",
          "Penerbangan Premium Ekonomi Pulang Pergi",
          "Hotel 5 Bintang",
          "Sarapan Termasuk"
        ],
        price: "Rp. 29.499.999 / orang",

        hotelName: "Marina Bay Sands",
        hotelStars: "Hotel Bintang 5",
        hotelRating: "4.9/5",
        hotelReviews: 3420,
        hotelImage: "/paket/singapore/baysands.jpg",
        hotelFacilities: [
          "WiFi Gratis",
          "Sands SkyPark Infinity Pool",
          "Fine Dining Restoran",
          "Banyan Tree Spa",
          "Akses Langsung The Shoppes"
        ],
        roomType: "Standard",

        outboundFlight: {
          title: "Penerbangan Pergi",
          date: "30 November 2026",
          departureTime: "09:10",
          arrivalTime: "11:55",
          duration: "1j 45m",
          flightCode: "SQ-955",
          airline: "Singapore Airlines",
          airlineCode: "SQ",
          aircraft: "Airbus A350-900",
          baggage: "Bagasi 30 Kg",
          cabinClass: "Premium Ekonomi",
        },
        returnFlight: {
          title: "Penerbangan Pulang",
          date: "3 Desember 2026",
          departureTime: "18:45",
          arrivalTime: "19:30",
          duration: "1j 45m",
          flightCode: "SQ-966",
          airline: "Singapore Airlines",
          airlineCode: "SQ",
          aircraft: "Airbus A350-900",
          baggage: "Bagasi 30 Kg",
          cabinClass: "Premium Ekonomi",
        },

        features: [
          { title: "Tiket Pesawat Premium Ekonomi", desc: "Penerbangan pulang pergi langsung tanpa transit ke Singapura" },
          { title: "Hotel 5 Bintang", desc: "3 malam di Marina Bay Sands termasuk sarapan pagi" },
          { title: "Tiket Gardens By The Bay", desc: "Akses masuk ke Flower Dome, Cloud Forest, dan OCBC Skyway" },
          { title: "Tiket Sentosa Island", desc: "Akses masuk kawasan wisata Pulau Sentosa beserta Sentosa Express" },
          { title: "MRT Ticket Pass", desc: "Kartu perjalanan MRT dan bus tanpa batas selama 3 hari di Singapura" },
        ],
        policies: [
          { title: "Ketentuan Pemesanan", desc: "Minimal pemesanan untuk 2 orang (2 Pax) dalam satu jadwal keberangkatan." },
          { title: "Pembatalan", desc: "Pembatalan gratis hingga 72 jam sebelum jadwal keberangkatan." },
          { title: "Bagasi", desc: "Bagasi tercatat maksimal 30 Kg dan bagasi kabin 7 Kg per penumpang." },
          { title: "Check-in Hotel", desc: "Check-in mulai pukul 15:00 dan check-out pukul 11:00 (Waktu Lokal)." },
        ],
      },
    ],
  },
  {
    id: 4,
    destinationLink: "jepang",
    name: "Jepang",
    regionGroup: "Asia",
    coverImage: "/paket/destinasi/jepang.jpg",
    packages: [
      {
        id: "relax-japan",
        badge: "Recommended",
        title: "Onsen Relaxation",
        rating: "4.8 / 5",
        reviewsCount: 318,
        duration: "5 Hari 4 Malam",
        coverImage: "/paket/japan/onsen.jpg",
        galleryImages: [
          "/paket/japan/onsen2.jpg",
          "/paket/japan/onsen.jpg"
        ],
        specs: [
          "5 Hari 4 Malam",
          "Penerbangan Premium Ekonomi Pulang Pergi",
          "Hotel 4 Bintang",
          "Sarapan Termasuk"
        ],
        price: "Rp. 15.499.999 / orang",

        hotelName: "Hakone Onsen Resort",
        hotelStars: "Hotel Bintang 4",
        hotelRating: "4.8/5",
        hotelReviews: 890,
        hotelImage: "/paket/japan/onsen2.jpg",
        hotelFacilities: [
          "WiFi Gratis",
          "Pemandian Air Panas Alami (Onsen)",
          "Restoran Kaiseki Tradisional",
          "Taman Zen",
          "Layanan Antar-Jemput Stasiun"
        ],
        roomType: "Tatami Deluxe Room",

        outboundFlight: {
          title: "Penerbangan Pergi",
          date: "30 November 2026",
          departureTime: "06:35",
          arrivalTime: "15:50",
          duration: "7j 15m",
          flightCode: "JL-720",
          airline: "Japan Airlines",
          airlineCode: "JL",
          aircraft: "Boeing 787-8",
          baggage: "Bagasi 2x23 Kg",
          cabinClass: "Premium Ekonomi",
        },
        returnFlight: {
          title: "Penerbangan Pulang",
          date: "4 Desember 2026",
          departureTime: "11:20",
          arrivalTime: "17:15",
          duration: "7j 55m",
          flightCode: "JL-725",
          airline: "Japan Airlines",
          airlineCode: "JL",
          aircraft: "Boeing 787-8",
          baggage: "Bagasi 2x23 Kg",
          cabinClass: "Premium Ekonomi",
        },

        features: [
          { title: "Tiket Pesawat Premium Ekonomi", desc: "Penerbangan langsung pulang pergi tanpa transit ke Tokyo" },
          { title: "Hotel 4 Bintang", desc: "4 malam di Tatami Deluxe Room bergaya tradisional Jepang termasuk sarapan" },
          { title: "Private Onsen Access", desc: "Akses pemandian air panas pribadi dengan pemandangan alam Hakone" },
          { title: "JR Pass 5 Hari", desc: "Kartu perjalanan kereta cepat Shinkansen dan jaringan JR selama 5 hari penuh" },
        ],
        policies: [
          { title: "Pembatalan", desc: "Pembatalan gratis hingga 72 jam sebelum jadwal keberangkatan." },
          { title: "Bagasi", desc: "Bagasi tercatat maksimal 2 potong (masing-masing 23 Kg) dan bagasi kabin 10 Kg per penumpang." },
          { title: "Check-in Hotel", desc: "Check-in mulai pukul 15:00 dan check-out pukul 10:00 (Waktu Lokal)." },
        ],
      },
      {
        id: "explorer-japan",
        badge: "Populer",
        title: "Tokyo Explorer",
        rating: "4.9 / 5",
        reviewsCount: 465,
        duration: "6 Hari 5 Malam",
        coverImage: "/paket/japan/fujitokyo.jpg",
        galleryImages: [
          "/paket/japan/tokyo.jpg",
          "/paket/japan/fujitokyo.jpg"
        ],
        specs: [
          "6 Hari 5 Malam",
          "Penerbangan Ekonomi Pulang Pergi (1 Transit)",
          "Hotel 4 Bintang",
          "Sarapan Termasuk"
        ],
        price: "Rp. 17.499.999 / orang",

        hotelName: "Shinjuku Central Hotel",
        hotelStars: "Hotel Bintang 4",
        hotelRating: "4.8/5",
        hotelReviews: 1580,
        hotelImage: "/paket/japan/tokyo.jpg",
        hotelFacilities: [
          "WiFi Gratis",
          "Restoran Jepang & Internasional",
          "Akses Dekat Stasiun Shinjuku",
          "Layanan Penukaran Mata Uang",
          "Penitipan Bagasi 24 Jam"
        ],
        roomType: "Twin Room",

        outboundFlight: {
          title: "Penerbangan Pergi",
          date: "30 November 2026",
          departureTime: "07:05",
          arrivalTime: "18:30",
          duration: "9j 25m (1 Transit)",
          flightCode: "CX-798",
          airline: "Cathay Pacific",
          airlineCode: "CX",
          aircraft: "Airbus A350-900",
          baggage: "Bagasi 23 Kg",
          cabinClass: "Ekonomi",
        },
        returnFlight: {
          title: "Penerbangan Pulang",
          date: "5 Desember 2026",
          departureTime: "10:15",
          arrivalTime: "18:10",
          duration: "9j 55m (1 Transit)",
          flightCode: "CX-509",
          airline: "Cathay Pacific",
          airlineCode: "CX",
          aircraft: "Airbus A350-900",
          baggage: "Bagasi 23 Kg",
          cabinClass: "Ekonomi",
        },

        features: [
          { title: "Tiket Pesawat Ekonomi", desc: "Penerbangan pulang pergi dengan 1 kali transit ke Tokyo" },
          { title: "Hotel 4 Bintang", desc: "5 malam di Twin Room strategis di kawasan Shinjuku termasuk sarapan" },
          { title: "Tur Gunung Fuji", desc: "Tiket perjalanan dan akses pendakian kawasan Gunung Fuji beserta pemandu" },
          { title: "Tiket Universal Studios Japan", desc: "Tiket masuk seharian penuh ke Universal Studios Japan termasuk transportasi kereta" },
        ],
        policies: [
          { title: "Pembatalan", desc: "Pembatalan gratis hingga 72 jam sebelum jadwal keberangkatan." },
          { title: "Bagasi", desc: "Bagasi tercatat maksimal 23 Kg dan bagasi kabin 7 Kg per penumpang." },
          { title: "Check-in Hotel", desc: "Check-in mulai pukul 15:00 dan check-out pukul 11:00 (Waktu Lokal)." },
        ],
      },
    ],
  },
  {
    id: 5,
    destinationLink: "australia-new-zealand",
    name: "Australia & New Zealand",
    regionGroup: "Lainnya",
    coverImage: "/paket/destinasi/aussie.jpg",
    packages: [
      {
        id: "melbourne",
        badge: "Recommended",
        title: "Melbourne City Tour",
        rating: "4.8 / 5",
        reviewsCount: 342,
        duration: "5 Hari 4 Malam",
        coverImage: "/paket/aus-nz/melbin.jpg",
        galleryImages: [
          "/paket/aus-nz/melbin.jpg",
          "/paket/aus-nz/melbin2.jpg"
        ],
        specs: [
          "5 Hari 4 Malam",
          "Penerbangan Ekonomi Pulang Pergi",
          "Hotel 5 Bintang",
          "Sarapan Termasuk"
        ],
        price: "Rp. 16.499.999 / orang",

        hotelName: "The Langham Melbourne",
        hotelStars: "Hotel Bintang 5",
        hotelRating: "4.9/5",
        hotelReviews: 2150,
        hotelImage: "/paket/aus-nz/melbin.jpg",
        hotelFacilities: [
          "WiFi Gratis",
          "Kolam Renang Indoor",
          "Chuan Spa & Wellness",
          "Fine Dining Restoran",
          "Fitness Center"
        ],
        roomType: "Superior River View Room",

        outboundFlight: {
          title: "Penerbangan Pergi",
          date: "30 November 2026",
          departureTime: "20:05",
          arrivalTime: "06:35 (+1 Hari)",
          duration: "6j 30m",
          flightCode: "QF-40",
          airline: "Qantas Airways",
          airlineCode: "QF",
          aircraft: "Airbus A330-200",
          baggage: "Bagasi 30 Kg",
          cabinClass: "Ekonomi",
        },
        returnFlight: {
          title: "Penerbangan Pulang",
          date: "4 Desember 2026",
          departureTime: "14:40",
          arrivalTime: "17:45",
          duration: "7j 05m",
          flightCode: "QF-39",
          airline: "Qantas Airways",
          airlineCode: "QF",
          aircraft: "Airbus A330-200",
          baggage: "Bagasi 30 Kg",
          cabinClass: "Ekonomi",
        },

        features: [
          { title: "Tiket Pesawat Ekonomi", desc: "Penerbangan langsung pulang pergi tanpa transit ke Melbourne" },
          { title: "Hotel 5 Bintang", desc: "4 malam di Superior River View Room menghadap Sungai Yarra termasuk sarapan" },
          { title: "Great Ocean Road Tour", desc: "Tur seharian penuh menyusuri pesisir pantai ikonik dan Twelve Apostles" },
          { title: "Tiket Puffing Billy Steam Train", desc: "Pengalaman naik kereta uap bersejarah melintasi hutan Dandenong Ranges" },
        ],
        policies: [
          { title: "Pembatalan", desc: "Pembatalan gratis hingga 72 jam sebelum jadwal keberangkatan." },
          { title: "Bagasi", desc: "Bagasi tercatat maksimal 30 Kg dan bagasi kabin 7 Kg per penumpang." },
          { title: "Check-in Hotel", desc: "Check-in mulai pukul 15:00 dan check-out pukul 11:00 (Waktu Lokal)." },
        ],
      },
      {
        id: "south-island",
        badge: "Best",
        title: "South Island Escape",
        rating: "4.9 / 5",
        reviewsCount: 389,
        duration: "7 Hari 6 Malam",
        coverImage: "/paket/aus-nz/nz.jpg",
        galleryImages: [
          "/paket/aus-nz/nz.jpg",
          "/paket/aus-nz/queenstown.jpg"
        ],
        specs: [
          "7 Hari 6 Malam",
          "Penerbangan Premium Ekonomi Pulang Pergi (1 Transit)",
          "Hotel 4 Bintang",
          "Sarapan Termasuk"
        ],
        price: "Rp. 24.999.999 / orang",

        hotelName: "Hermitage Hotel Mount Cook & Queenstown Resort",
        hotelStars: "Hotel Bintang 4",
        hotelRating: "4.9/5",
        hotelReviews: 1420,
        hotelImage: "/paket/aus-nz/queenstown.jpg",
        hotelFacilities: [
          "WiFi Gratis",
          "Restoran Panorama Pegunungan",
          "Observatorium Bintang",
          "Bar & Lounge",
          "Layanan Antar-Jemput Lokal"
        ],
        roomType: "Alpine View Room",

        outboundFlight: {
          title: "Penerbangan Pergi",
          date: "30 November 2026",
          departureTime: "19:30",
          arrivalTime: "13:15 (+1 Hari)",
          duration: "11j 45m (1 Transit)",
          flightCode: "NZ-281",
          airline: "Air New Zealand",
          airlineCode: "NZ",
          aircraft: "Boeing 787-9 Dreamliner",
          baggage: "Bagasi 2x23 Kg",
          cabinClass: "Premium Ekonomi",
        },
        returnFlight: {
          title: "Penerbangan Pulang",
          date: "6 Desember 2026",
          departureTime: "14:20",
          arrivalTime: "21:45",
          duration: "13j 25m (1 Transit)",
          flightCode: "NZ-282",
          airline: "Air New Zealand",
          airlineCode: "NZ",
          aircraft: "Boeing 787-9 Dreamliner",
          baggage: "Bagasi 2x23 Kg",
          cabinClass: "Premium Ekonomi",
        },

        features: [
          { title: "Tiket Pesawat Premium Ekonomi", desc: "Penerbangan pulang pergi dengan 1 kali transit menuju Queenstown" },
          { title: "Hotel 4 Bintang", desc: "6 malam di Alpine View Room dengan pemandangan pegunungan Alpen Selatan termasuk sarapan" },
          { title: "Tiket Cruise Milford Sound", desc: "Pelayaran menyusuri fjord megah Milford Sound lengkap dengan makan siang di kapal" },
          { title: "Tiket Skyline Gondola Queenstown", desc: "Tiket kereta gantung menuju puncak Bob's Peak dengan panorama Danau Wakatipu" },
        ],
        policies: [
          { title: "Pembatalan", desc: "Pembatalan gratis hingga 72 jam sebelum jadwal keberangkatan." },
          { title: "Bagasi", desc: "Bagasi tercatat maksimal 2 potong (masing-masing 23 Kg) dan bagasi kabin 7 Kg per penumpang." },
          { title: "Check-in Hotel", desc: "Check-in mulai pukul 15:00 dan check-out pukul 10:00 (Waktu Lokal)." },
        ],
      },
    ],
  },
  {
    id: 6,
    destinationLink: "eropa",
    name: "Eropa",
    regionGroup: "Lainnya",
    coverImage: "/paket/destinasi/swiss.jpeg",
    packages: [
      {
        id: "northern-lights",
        badge: "Best",
        title: "Nordic Northern Lights Expedition",
        rating: "4.9 / 5",
        reviewsCount: 420,
        duration: "8 Hari 7 Malam",
        coverImage: "/paket/eropa/aurora.jpg",
        galleryImages: [
          "/paket/eropa/aurora.jpg",    
          "/paket/eropa/aurora2.jpg"
        ],
        specs: [
          "8 Hari 7 Malam",
          "Penerbangan Premium Ekonomi Pulang Pergi (1 Transit)",
          "Glass Igloo & Hotel 4 Bintang",
          "Sarapan & Dinner Termasuk"
        ],
        price: "Rp. 38.999.999 / orang",

        hotelName: "Kakslauttanen Arctic Resort & Oslo Grand Hotel",
        hotelStars: "Glass Igloo & Hotel Bintang 4",
        hotelRating: "4.9/5",
        hotelReviews: 1250,
        hotelImage: "/paket/eropa/aurora.jpg",
        hotelFacilities: [
          "WiFi Gratis",
          "Kabin Kaca Aurora (Glass Igloo)",
          "Sauna Tradisional Finlandia",
          "Restoran Arktik",
          "Layanan Pemandu Aurora"
        ],
        roomType: "Kusamo Glass Igloo & Superior Room",

        outboundFlight: {
          title: "Penerbangan Pergi",
          date: "30 November 2026",
          departureTime: "18:20",
          arrivalTime: "07:15 (+1 Hari)",
          duration: "14j 55m (1 Transit)",
          flightCode: "AY-026",
          airline: "Finnair",
          airlineCode: "AY",
          aircraft: "Airbus A350-900",
          baggage: "Bagasi 2x23 Kg",
          cabinClass: "Premium Ekonomi",
        },
        returnFlight: {
          title: "Penerbangan Pulang",
          date: "7 Desember 2026",
          departureTime: "13:45",
          arrivalTime: "10:15 (+1 Hari)",
          duration: "15j 30m (1 Transit)",
          flightCode: "AY-025",
          airline: "Finnair",
          airlineCode: "AY",
          aircraft: "Airbus A350-900",
          baggage: "Bagasi 2x23 Kg",
          cabinClass: "Premium Ekonomi",
        },

        features: [
          { title: "Tiket Pesawat Premium Ekonomi", desc: "Penerbangan pulang pergi dengan 1 kali transit menuju Skandinavia" },
          { title: "Glass Igloo & Hotel 4 Bintang", desc: "7 malam menginap di igloo kaca unik dan hotel kota termasuk sarapan & makan malam" },
          { title: "Aurora Borealis Hunting", desc: "Ekspedisi malam hari berburu cahaya utara dipandu oleh fotografer profesional" },
          { title: "Husky Safari & Reindeer Sleigh", desc: "Petualangan seru menaiki kereta luncur salju bersama anjing Husky dan rusa kutub" },
        ],
        policies: [
          { title: "Pembatalan", desc: "Pembatalan gratis hingga 72 jam sebelum jadwal keberangkatan." },
          { title: "Bagasi", desc: "Bagasi tercatat maksimal 2 potong (masing-masing 23 Kg) dan bagasi kabin 7 Kg per penumpang." },
          { title: "Check-in Hotel", desc: "Check-in mulai pukul 15:00 dan check-out pukul 11:00 (Waktu Lokal)." },
        ],
      },
      {
        id: "mediterranean",
        badge: "Recommended",
        title: "Greek Mediterranean Relax Package",
        rating: "4.8 / 5",
        reviewsCount: 356,
        duration: "7 Hari 6 Malam",
        coverImage: "/paket/eropa/amorgos.jpg",
        galleryImages: [
          "/paket/eropa/amorgos.jpg",
          "/paket/eropa/amorgos2.jpg"
        ],
        specs: [
          "7 Hari 6 Malam",
          "Penerbangan Ekonomi Pulang Pergi (1 Transit)",
          "Boutique Resort",
          "Sarapan Termasuk"
        ],
        price: "Rp. 29.499.999 / orang",

        hotelName: "Canaves Oia Suites Santorini & Mykonos Blu",
        hotelStars: "Boutique Resort Bintang 5",
        hotelRating: "4.9/5",
        hotelReviews: 1680,
        hotelImage: "/paket/eropa/amorgos.jpg",
        hotelFacilities: [
          "WiFi Gratis",
          "Infinity Pool menghadap Kaldera",
          "Restoran Mediterania",
          "Spa & Pijat Relaksasi",
          "Akses Pantai Pribadi"
        ],
        roomType: "Caldera View Suite",

        outboundFlight: {
          title: "Penerbangan Pergi",
          date: "30 November 2026",
          departureTime: "18:45",
          arrivalTime: "08:30 (+1 Hari)",
          duration: "18j 45m (1 Transit)",
          flightCode: "QR-957",
          airline: "Qatar Airways",
          airlineCode: "QR",
          aircraft: "Boeing 777-300ER",
          baggage: "Bagasi 30 Kg",
          cabinClass: "Ekonomi",
        },
        returnFlight: {
          title: "Penerbangan Pulang",
          date: "6 Desember 2026",
          departureTime: "13:20",
          arrivalTime: "15:10 (+1 Hari)",
          duration: "19j 50m (1 Transit)",
          flightCode: "QR-204",
          airline: "Qatar Airways",
          airlineCode: "QR",
          aircraft: "Boeing 777-300ER",
          baggage: "Bagasi 30 Kg",
          cabinClass: "Ekonomi",
        },

        features: [
          { title: "Tiket Pesawat Ekonomi", desc: "Penerbangan pulang pergi dengan 1 kali transit menuju Athena" },
          { title: "Boutique Resort", desc: "6 malam di Caldera View Suite dengan pemandangan Laut Aegea termasuk sarapan" },
          { title: "Sunset Cruise Santorini", desc: "Pelayaran santai menikmati matahari terbenam di kaldera Santorini lengkap dengan makan malam" },
          { title: "High-Speed Ferry", desc: "Tiket kapal cepat kelas bisnis untuk perpindahan antarpulau Athena, Mykonos, dan Santorini" },
          { title: "Guided Tour Acropolis", desc: "Tur berpemandu menjelajahi situs bersejarah Acropolis dan Parthenon di Athena" },
        ],
        policies: [
          { title: "Pembatalan", desc: "Pembatalan gratis hingga 72 jam sebelum jadwal keberangkatan." },
          { title: "Bagasi", desc: "Bagasi tercatat maksimal 30 Kg dan bagasi kabin 7 Kg per penumpang." },
          { title: "Check-in Hotel", desc: "Check-in mulai pukul 15:00 dan check-out pukul 11:00 (Waktu Lokal)." },
        ],
      },
    ],  
  },
];