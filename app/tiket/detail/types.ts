export interface FlightEndpoint {
    code: string;
    city: string;
    airport: string;
    time: string;
    timezone: string;
    date: string;
}

export interface FlightTrip {
    id: string;
    tripType: "departure" | "return";
    tripTitle: string;
    tripSubtitle: string;
    airlineName: string;
    airlineCode: string;
    flightCode: string;
    date: string;
    origin: FlightEndpoint;
    destination: FlightEndpoint;
    duration: string;
    flightType: string;
    passenger: string;
    seatNumber: string;
    cabinClass: string;
    baggage: string;
    facilities: string[];
    price: number;
}

export interface PassengerInfo {
    name: string;
    email: string;
    phone: string;
    idNumber: string;
}

export interface AddonItem {
    id: string;
    title: string;
    description: string;
    price: number;
}

export interface PromoRule {
    code: string;
    discount: number;
    message: string;
}
