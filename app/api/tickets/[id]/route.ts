import { NextResponse } from "next/server";
import { db } from "@/db";
import { tickets } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Ticket } from "@/app/tiket/types";

function mapDbTicket(t: typeof tickets.$inferSelect): Ticket {
    return {
        id: t.id,
        airline: t.airline as Ticket["airline"],
        airlineName: t.airlineName,
        airlineCode: t.airlineCode,
        flightCode: t.flightCode,
        aircraft: t.aircraft,
        serviceType: t.serviceType,
        date: t.dateFormatted,
        rawDate: t.date,
        origin: {
            code: t.originCode,
            city: t.originCity,
            airport: t.originAirport,
            time: t.originTime,
            timezone: t.originTimezone,
        },
        destination: {
            code: t.destinationCode,
            city: t.destinationCity,
            airport: t.destinationAirport,
            time: t.destinationTime,
            timezone: t.destinationTimezone,
        },
        duration: t.duration,
        durationMinutes: t.durationMinutes,
        flightType: t.flightType,
        passenger: t.passenger,
        seatNumber: t.seatNumber,
        cabinClass: t.cabinClass as Ticket["cabinClass"],
        baggage: t.baggage,
        facilities: JSON.parse(t.facilities),
        tag: t.tagText && t.tagType ? { text: t.tagText, type: t.tagType as NonNullable<Ticket["tag"]>["type"] } : undefined,
        seatsLeft: t.seatsLeft,
        originalPrice: t.originalPrice ?? undefined,
        price: t.price,
        note: t.note,
    };
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const row = await db.select().from(tickets).where(eq(tickets.id, id)).get();
    if (!row) {
      return NextResponse.json(
        { success: false, message: "Tiket tidak ditemukan" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: mapDbTicket(row) });
  } catch {
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data tiket" },
      { status: 500 }
    );
  }
}
