import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const cities = sqliteTable("cities", {
  code: text("code").primaryKey(),
  city: text("city").notNull(),
  airport: text("airport").notNull(),
});

export const tickets = sqliteTable("tickets", {
  id: text("id").primaryKey(),
  airline: text("airline").notNull(),
  airlineName: text("airline_name").notNull(),
  airlineCode: text("airline_code").notNull(),
  flightCode: text("flight_code").notNull(),
  aircraft: text("aircraft").notNull(),
  serviceType: text("service_type").notNull(),
  date: text("date").notNull(),
  dateFormatted: text("date_formatted").notNull(),
  originCode: text("origin_code").notNull(),
  originCity: text("origin_city").notNull(),
  originAirport: text("origin_airport").notNull(),
  originTime: text("origin_time").notNull(),
  originTimezone: text("origin_timezone").notNull(),
  destinationCode: text("destination_code").notNull(),
  destinationCity: text("destination_city").notNull(),
  destinationAirport: text("destination_airport").notNull(),
  destinationTime: text("destination_time").notNull(),
  destinationTimezone: text("destination_timezone").notNull(),
  duration: text("duration").notNull(),
  durationMinutes: integer("duration_minutes").notNull(),
  flightType: text("flight_type").notNull(),
  passenger: text("passenger").notNull(),
  seatNumber: text("seat_number").notNull(),
  cabinClass: text("cabin_class").notNull(),
  baggage: text("baggage").notNull(),
  facilities: text("facilities").notNull(),
  tagText: text("tag_text"),
  tagType: text("tag_type"),
  seatsLeft: integer("seats_left").notNull(),
  originalPrice: integer("original_price"),
  price: integer("price").notNull(),
  note: text("note").notNull(),
});

export const hotels = sqliteTable("hotels", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    badge: text("badge").notNull(),
    city: text("city").notNull(),
    location: text("location").notNull(),
    rating: text("rating").notNull(),
    reviewsCount: integer("reviews_count").notNull(),
    image: text("image").notNull(),
    subImages: text("sub_images").notNull(),
    specs: text("specs").notNull(),
    discount: text("discount"),
    oldPrice: text("old_price"),
    priceNum: integer("price_num").notNull(),
    priceFormatted: text("price_formatted").notNull(),
    pricePer: text("price_per").notNull(),
    facilities: text("facilities").notNull(),
    highlights: text("highlights").notNull(),
});

export const hotelBookings = sqliteTable("hotel_bookings", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    orderId: text("order_id").notNull().unique(),
    hotelId: integer("hotel_id").notNull(),
    hotelName: text("hotel_name").notNull(),
    hotelLocation: text("hotel_location").notNull(),
    roomBrief: text("room_brief").notNull(),
    guestName: text("guest_name").notNull(),
    hasBreakfast: integer("has_breakfast").notNull().default(0),
    paymentMethod: text("payment_method").notNull(),
    totalPrice: integer("total_price").notNull(),
    status: text("status").notNull().default("diverifikasi"),
    createdAt: text("created_at").$defaultFn(() => new Date().toISOString()),
});

export const users = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    nama: text("nama").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    createdAt: text("created_at").$defaultFn(() => new Date().toISOString()),
});


