export interface HotelDetail {
    id: number;
    name: string;
    badge: string;
    city: string;
    location: string;
    rating: number;
    reviewsCount: number;
    image: string;
    subImages: string[];
    specs: string[];
    discount: string;
    oldPrice: string;
    priceNum: number;
    priceFormatted: string;
    pricePer: string;
    highlights: { title: string; desc: string }[];
    facilities: string[];
}

export const HOTELS_LIST: HotelDetail[] = [
    {
        id: 1,
        name: "Grand Sahid Jaya Jakarta",
        badge: "Hotel Bintang 5",
        city: "Jakarta",
        location: "Tanah Abang, Jakarta Pusat, DKI Jakarta",
        rating: 4.4,
        reviewsCount: 173,
        image: "/hotel/1/1.png",
        subImages: [
            "/hotel/1/sahid-room.jpg",
            "/hotel/1/sahid-pool.jpg",
            "/hotel/1/sahid-resto.jpg",
            "/hotel/1/sahid-lobby.jpg",
        ],
        specs: [
            "1 Kamar King",
            "2 Tamu",
            "45.0 m²",
            "WiFi Gratis",
            "AC Dingin",
            "Kolam Renang",
            "Restoran",
        ],
        discount: "Diskon 50%",
        oldPrice: "Mulai dari Rp 1.999.999",
        priceNum: 1111961,
        priceFormatted: "Rp 1.111.961",
        pricePer: "/kamar/malam",
        facilities: ["Kolam renang", "WiFi gratis", "Restoran"],
        highlights: [
            {
                title: "Kolam Renang Luas",
                desc: "Kolam renang outdoor air nya bersih banget",
            },
            {
                title: "Wifi kencang",
                desc: "Koneksi internet stabil dan kencang gratis",
            },
            {
                title: "Restoran",
                desc: "Banyak Pilihan makanan yang enak",
            },
        ],
    },
    {
        id: 2,
        name: "Jambuluwuk Mansion Pakubuwono",
        badge: "Hotel Bintang 4",
        city: "Jakarta",
        location: "Gelora, Jakarta Pusat, DKI Jakarta",
        rating: 4.7,
        reviewsCount: 67,
        image: "/hotel/2/2.png",
        subImages: [
            "/hotel/2/jambuluwuk-room.jpg",
            "/hotel/2/jambuluwuk-pool.png",
            "/hotel/2/jambuluwuk-interior.jpg",
            "/hotel/2/jambuluwuk-resto.jpg",
        ],
        specs: [
            "1 Kamar Queen",
            "2 Tamu",
            "32.0 m²",
            "WiFi Gratis",
            "AC Dingin",
            "Restoran",
        ],
        discount: "Diskon 36%",
        oldPrice: "Mulai dari IDR 350.000",
        priceNum: 222250,
        priceFormatted: "IDR 222.250",
        pricePer: "/kamar/malam",
        facilities: ["WiFi gratis", "Restoran"],
        highlights: [
            {
                title: "Suasana Tenang",
                desc: "Lingkungan tenang dan privat di kawasan elit Pakubuwono",
            },
            {
                title: "Wifi kencang",
                desc: "Koneksi internet tanpa batas gratis untuk streaming",
            },
            {
                title: "Restoran & Kafe",
                desc: "Sajian menu kuliner nusantara favorit yang enak",
            },
        ],
    },
    {
        id: 3,
        name: "Eminence Golf & Resort Lembang Bandung",
        badge: "Hotel Bintang 5",
        city: "Bandung",
        location: "Lembang, Bandung, Jawa Barat",
        rating: 4.3,
        reviewsCount: 999,
        image: "/hotel/3/3.png",
        subImages: [
            "/hotel/3/eminence-room.jpg",
            "/hotel/3/eminence-pool.png",
            "/hotel/3/eminence-resto.png",
            "/hotel/3/eminence-building.jpg",
        ],
        specs: [
            "1 Kamar Executive",
            "2 - 4 Tamu",
            "52.0 m²",
            "Kolam Renang Infinity",
            "WiFi Gratis",
            "Pemandangan Gunung",
            "Restoran",
        ],
        discount: "Diskon 28%",
        oldPrice: "Mulai dari IDR 2.100.000",
        priceNum: 1500500,
        priceFormatted: "IDR 1.500.500",
        pricePer: "/kamar/malam",
        facilities: ["WiFi gratis", "Restoran", "Kolam Renang", "Gym"],
        highlights: [
            {
                title: "Lapangan Golf & Hills",
                desc: "Padang golf hijau dengan pemandangan perbukitan asri",
            },
            {
                title: "Kolam Renang Infinity",
                desc: "Berenang santai sambil menikmati udara sejuk Lembang",
            },
            {
                title: "Restoran Kuliner Lokal",
                desc: "Sajian santapan khas Sunda dan barat bintang lima yang lezat",
            },
        ],
    },
    {
        id: 4,
        name: "Villa Bumi Ayah",
        badge: "Villa Eksklusif Bintang 5",
        city: "Bogor",
        location: "Cisarua, Bogor, Jawa Barat",
        rating: 4.9,
        reviewsCount: 50,
        image: "/hotel/4/4.png",
        subImages: [
            "/hotel/4/villa-room.png",
            "/hotel/4/villa-living.png",
            "/hotel/4/villa-billiard.jpg",
            "/hotel/4/villa-garden.png",
        ],
        specs: [
            "1 Villa Privat",
            "4 - 8 Tamu",
            "80.0 m²",
            "Kolam Renang Privat",
            "WiFi Cepat",
            "Area BBQ",
            "Dapur Lengkap",
        ],
        discount: "Diskon 19%",
        oldPrice: "Mulai dari IDR 1.850.000",
        priceNum: 1500500,
        priceFormatted: "IDR 1.500.500",
        pricePer: "/villa/malam",
        facilities: ["WiFi gratis", "Restoran", "Kolam Renang", "Gym"],
        highlights: [
            {
                title: "Kolam Renang Privat",
                desc: "Kolam renang pribadi hanya untuk kamu dan keluarga",
            },
            {
                title: "Fasilitas BBQ Outdoor",
                desc: "Peralatan barbekyu lengkap cocok untuk pesta bakar-bakar",
            },
            {
                title: "Udara Pegunungan Puncak",
                desc: "Hawa sejuk dan pemandangan perbukitan teh Cisarua",
            },
        ],
    },
    {
        id: 5,
        name: "Sheraton Surabaya Hotel and Towers",
        badge: "Hotel Bintang 5 Luxury",
        city: "Surabaya",
        location: "Tegalsari, Surabaya, Jawa Timur",
        rating: 4.7,
        reviewsCount: 952,
        image: "/hotel/5/5.png",
        subImages: [
            "/hotel/5/sheraton-room.jpg",
            "/hotel/5/sheraton-pool.jpg",
            "/hotel/5/sheraton-lobby.jpg",
            "/hotel/5/sheraton-resto.jpg",
        ],
        specs: [
            "1 Deluxe Tower Room",
            "2 Tamu",
            "42.0 m²",
            "Kolam Renang Resort",
            "WiFi Kencang",
            "Akses Mall TP",
            "Restoran Mewah",
        ],
        discount: "Diskon 28%",
        oldPrice: "Mulai dari IDR 2.100.000",
        priceNum: 1517658,
        priceFormatted: "IDR 1.517.658",
        pricePer: "/kamar/malam",
        facilities: ["WiFi gratis", "Restoran", "Kolam Renang"],
        highlights: [
            {
                title: "Akses Langsung Tunjungan Plaza",
                desc: "Terhubung langsung dengan mall terbesar di Surabaya",
            },
            {
                title: "Kolam Renang Tropis",
                desc: "Kolam renang bergaya lagoon dengan suasana asri",
            },
            {
                title: "Restoran Mewah",
                desc: "Pilihan kuliner internasional terbaik bintang lima",
            },
        ],
    },
    {
        id: 6,
        name: "Uluwatu Sunset Ocean Resort",
        badge: "Resort Bintang 5 Luxury",
        city: "Bali",
        location: "Pecatu, Kuta Selatan, Bali",
        rating: 4.9,
        reviewsCount: 428,
        image: "/hotel/6/uluwatu.jpeg",
        subImages: [
            "/hotel/6/uluwatu-sunset-pool.jpg",
            "/hotel/6/uluwatu-sunset-beach.jpg",
            "/hotel/6/uluwatu-floating-breakfast.jpg",
            "/hotel/6/uluwatu-room.jpg",
        ],
        specs: [
            "1 Ocean Villa",
            "2 Tamu",
            "65.0 m²",
            "Cliff Infinity Pool",
            "Ocean View",
            "Private Beach",
            "Sunset Resto",
        ],
        discount: "Diskon 33%",
        oldPrice: "Mulai dari IDR 3.200.000",
        priceNum: 2150000,
        priceFormatted: "IDR 2.150.000",
        pricePer: "/villa/malam",
        facilities: ["Kolam renang", "WiFi gratis", "Restoran", "Ocean View"],
        highlights: [
            {
                title: "Cliff Infinity Pool",
                desc: "Kolam tebing menghadap langsung Samudra Hindia",
            },
            {
                title: "Private Beach Access",
                desc: "Akses eksklusif ke pantai pasir putih privat",
            },
            {
                title: "Sunset Lounge & Resto",
                desc: "Pemandangan matahari terbenam terbaik di Bali",
            },
        ],
    },
];