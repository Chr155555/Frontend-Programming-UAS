export type CabinClass = "Ekonomi" | "Premium Ekonomi" | "Bisnis";

export type AirlineType = "all" | "garuda" | "singapore" | "batik" | "citilink" | "airasia";

export type SortType = "recomended" | "cheapest" | "earliest" | "fastest";

export interface TicketFacility {
  name: string;
}

export interface Ticket {
  id: string;
  airline: "garuda" | "singapore" | "batik" | "citilink" | "airasia";
  airlineName: string;
  airlineCode: string;
  flightCode: string;
  aircraft: string;
  serviceType: string;
  date: string;
  origin: {
    code: string;
    city: string;
    airport: string;
    time: string;
    timezone: string;
  };
  destination: {
    code: string;
    city: string;
    airport: string;
    time: string;
    timezone: string;
  };
  duration: string;
  durationMinutes: number;
  flightType: string;
  passenger: string;
  seatNumber: string;
  cabinClass: CabinClass;
  baggage: string;
  facilities: string[];
  tag?: {
    text: string;
    type: "popular" | "best" | "promo";
  };
  seatsLeft: number;
  originalPrice?: number;
  price: number;
  note: string;
}

export interface DateOption {
  date: string;
  dayName: string;
  displayDate: string;
  priceFormatted: string;
  isCheapest?: boolean;
}

export interface CityOption {
  code: string;
  city: string;
  airport: string;
}
