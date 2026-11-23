export interface PackageOption {
  id: string;
  badge: string;
  title: string;
  rating: string;
  duration: string;
  image: string;
  hotel: string;
  flightClass: string;
  features: string;
  price: string;
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
        id: "relax",
        badge: "Recommended",
        title: "Relaxing Break To Yogyakarta",
        rating: "4.7 / 5",
        duration: "4 Hari 3 Malam",
        image: "/paket/yogyakarta/amaranta.jpeg",
        hotel: "Grand Yogyakarta Hotel and Villa | Hotel 4 Bintang | Deluxe Room | Sarapan Termasuk",
        flightClass: "Premium Ekonomi | No Transit | Pulang Pergi",
        features: "Spa Service Gratis | Tiket Candi Ratu Boko & Prambanan | Tiket Masuk Pantai Gunungkidul",
        price: "Rp. 3.499.999 / org",
      },
      {
        id: "luxury",
        badge: "Best",
        title: "A Yogyakarta Luxury Trip",
        rating: "4.9 / 5",
        duration: "5 Hari 4 Malam",
        image: "/paket/yogyakarta/lafayette.jpeg",
        hotel: "Premier Yogyakarta Heritage | Hotel 5 Bintang | Executive Suite | Sarapan & Snack Termasuk",
        flightClass: "Bisnis | No Transit | Pulang Pergi",
        features: "Private Tour Guide & Driver | Dinner Kraton | Premium Room Service | Jeep Merapi Lava Tour",
        price: "Rp. 6.299.999 / org",
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
        duration: "4 Hari 3 Malam",
        image: "/paket/bali/batur.jpeg",
        hotel: "The Mount Batur Villa | Hotel 4 Bintang | Deluxe | Sarapan Termasuk",
        flightClass: "Ekonomi | No Transit | Pulang Pergi",
        features: "Hiking Trail Guide Gunung Batur | Tiket Masuk Ulun Danu Beratan",
        price: "Rp. 3.999.999 / org",
      },
      {
        id: "pantai",
        badge: "Populer",
        title: "Beach Addicts",
        rating: "4.9 / 5",
        duration: "5 Hari 4 Malam",
        image: "/paket/bali/melasti.jpeg",
        hotel: "Seminyak Ocean Resort | Hotel 5 Bintang | Deluxe | Sarapan Termasuk",
        flightClass: "Ekonomi | No Transit | Pulang Pergi",
        features: "Watersport | Tiket Beach Club | Fast Boat Ke Nusa Penida",
        price: "Rp. 5.499.999 / org",
      },
    ],
  },
  {
    id: 3,
    destinationLink: "nusa-tenggara-timur",
    name: "Nusa Tenggara Timur",
    regionGroup: "Indonesia",
    coverImage: "/paket/destinasi/ntt.jpg",
    packages: [
      {
        id: "komodo",
        badge: "Recommended",
        title: "Dragon's Journey",
        rating: "4.8 / 5",
        duration: "6 Hari 5 Malam",
        image: "/paket/ntt/pinkbeach.jpg",
        hotel: "The Labuan Bajo Villa | Hotel 5 Bintang | Deluxe | Sarapan Termasuk",
        flightClass: "Ekonomi | No Transit | Pulang Pergi",
        features: "Yacht Termasuk | Tiket Masuk Pulau Komodo | Snorkeling dan Diving",
        price: "Rp. 9.499.999 / org",
      },
    ],
  },
  {
    id: 4,
    destinationLink: "papua",
    name: "Papua",
    regionGroup: "Indonesia",
    coverImage: "/paket/destinasi/papua.jpg",
    packages: [
      {
        id: "raja-ampat",
        badge: "Recommended",
        title: "Legendary Raja Ampat",
        rating: "4.8 / 5",
        duration: "4 Hari 3 Malam",
        image: "/home/hero-bg.jpg",
        hotel: "Four Kings Villa | Hotel 5 Bintang | Deluxe | Sarapan Termasuk",
        flightClass: "Ekonomi | No Transit | Pulang Pergi",
        features: "Snorkeling & Diving di Raja Ampat | Wisata Budaya Papua | Trekking Pulau",
        price: "Rp. 11.499.999 / org",
      },
    ],
  },
  {
    id: 5,
    destinationLink: "singapura",
    name: "Singapura",
    regionGroup: "Asia",
    coverImage: "/paket/destinasi/singapore.jpg",
    packages: [
      {
        id: "thrill",
        badge: "Recommended",
        title: "Super Thrill Pack",
        rating: "4.8 / 5",
        duration: "3 Hari 2 Malam",
        image: "/paket/singapore/universal.jpg",
        hotel: "The Standard Hotel Singapore | Hotel 4 Bintang | Deluxe | Sarapan Termasuk",
        flightClass: "Ekonomi | No Transit | Pulang Pergi",
        features: "Tiket Universal Studios | Tiket Sentosa Island",
        price: "Rp. 12.299.999 / org",
      },
      {
        id: "marina-bay",
        badge: "Recommended",
        title: "Nights At The Bay",
        rating: "4.8 / 5",
        duration: "4 Hari 3 Malam | Minimal 2 Pax",
        image: "/paket/singapore/marinabay.jpg",
        hotel: "Marina Bay Sands | Hotel 5 Bintang | Suite | Sarapan Termasuk",
        flightClass: "Premium Ekonomi | No Transit | Pulang Pergi",
        features: "Tiket Gardens By The Bay | Tiket Sentosa Island | MRT Ticket Pass Termasuk",
        price: "Rp. 37.499.999 / org",
      },
    ],
  },
  {
    id: 6,
    destinationLink: "malaysia",
    name: "Malaysia",
    regionGroup: "Asia",
    coverImage: "/paket/destinasi/kl.jpg",
    packages: [
      {
        id: "genting",
        badge: "Recommended",
        title: "Genting Explorer",
        rating: "4.8 / 5",
        duration: "3 Hari 2 Malam",
        image: "/paket/malaysia/genting2.jpg",
        hotel: "The Genting Resort | Hotel 5 Bintang | Deluxe | Sarapan Termasuk",
        flightClass: "Ekonomi | No Transit | Pulang Pergi",
        features: "Kuala Lumpur City Tour | Tiket Masuk Wisata Genting",
        price: "Rp. 15.999.999 / org",
      },
    ],
  },
  {
    id: 7,
    destinationLink: "jepang",
    name: "Jepang",
    regionGroup: "Asia",
    coverImage: "/paket/destinasi/jepang.jpg",
    packages: [
      {
        id: "relax",
        badge: "Recommended",
        title: "Relaxing Break To Japan",
        rating: "4.8 / 5",
        duration: "5 Hari 4 Malam",
        image: "/paket/japan/onsen.jpg",
        hotel: "Hakone Onsen Resort | Hotel 4 Bintang | Tatami Deluxe | Sarapan Termasuk",
        flightClass: "Premium Ekonomi | No Transit | Pulang Pergi",
        features: "Private Onsen Access | JR Pass 5 Hari",
        price: "Rp. 15.499.999 / org",
      },
      {
        id: "explorer",
        badge: "Populer",
        title: "Tokyo Explorer",
        rating: "4.9 / 5",
        duration: "6 Hari 5 Malam",
        image: "/paket/japan/fujitokyo.jpg",
        hotel: "Shinjuku Central Hotel | Hotel 4 Bintang | Twin Room | Sarapan Termasuk",
        flightClass: "Ekonomi | 1 Transit | Pulang Pergi",
        features: "Tiket Hiking Gunung Fuji | Tiket Universal Studios Japan",
        price: "Rp. 17.499.999 / org",
      },
    ],
  },
  {
    id: 8,
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
        duration: "5 Hari 4 Malam",
        image: "/paket/aus-nz/melbin.jpg",
        hotel: "The Langham Melbourne | Hotel 5 Bintang | Superior River View | Sarapan Termasuk",
        flightClass: "Ekonomi | No Transit | Pulang Pergi",
        features: "Great Ocean Road Tour | Tiket Puffing Billy Steam Train",
        price: "Rp. 16.499.999 / org",
      },
      {
        id: "south-island",
        badge: "Populer",
        title: "South Island Escape",
        rating: "4.9 / 5",
        duration: "7 Hari 6 Malam",
        image: "/paket/aus-nz/nz.jpg",
        hotel: "Hermitage Hotel Mount Cook & Queenstown Resort | Hotel 4 Bintang | Alpine View | Sarapan Termasuk",
        flightClass: "Premium Ekonomi | 1 Transit | Pulang Pergi",
        features: "Tiket Cruise Milford Sound | Tiket Skyline Gondola Queenstown",
        price: "Rp. 24.999.999 / org",
      },
    ],
  },
  {
    id: 9,
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
        duration: "8 Hari 7 Malam",
        image: "/paket/eropa/aurora.jpg",
        hotel: "Kakslauttanen Arctic Resort & Oslo Grand Hotel | Glass Igloo & Hotel 4 Bintang | Sarapan & Dinner",
        flightClass: "Premium Ekonomi | 1 Transit | Pulang Pergi",
        features: "Aurora Borealis Hunting | Husky Safari & Reindeer Sleigh Ride",
        price: "Rp. 38.999.999 / org",
      },
      {
        id: "mediterranean",
        badge: "Recommended",
        title: "Greek Mediterranean Relax Package",
        rating: "4.8 / 5",
        duration: "7 Hari 6 Malam",
        image: "/paket/eropa/amorgos.jpg",
        hotel: "Canaves Oia Suites Santorini & Mykonos Blu | Boutique Resort | Caldera View | Sarapan Termasuk",
        flightClass: "Ekonomi | 1 Transit | Pulang Pergi",
        features: "Sunset Cruise | High-Speed Ferry | Guided Tour Acropolis",
        price: "Rp. 29.499.999 / org",
      },
    ],  
  },
];