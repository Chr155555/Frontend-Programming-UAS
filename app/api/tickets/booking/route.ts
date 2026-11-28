import { NextResponse } from "next/server";
import { db } from "@/db";
import { ticketBookings, tickets } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            orderId,
            ticketId,
            airline,
            airlineName,
            airlineCode,
            flightCode,
            originCode,
            originCity,
            originTime,
            destinationCode,
            destinationCity,
            destinationTime,
            dateFormatted,
            passenger,
            cabinClass,
            passengerName,
            paymentMethod,
            totalPrice,
        } = body;

        if (!orderId || !ticketId) {
            return NextResponse.json(
                { error: "Data pesanan tiket tidak lengkap" },
                { status: 400 }
            );
        }

        const existingOrder = db
            .select()
            .from(ticketBookings)
            .where(eq(ticketBookings.orderId, orderId))
            .get();

        if (existingOrder) {
            return NextResponse.json([existingOrder], { status: 200 });
        }

        const dbTicket = db
            .select()
            .from(tickets)
            .where(eq(tickets.id, ticketId))
            .get();

        const newBooking = await db
            .insert(ticketBookings)
            .values({
                orderId,
                ticketId,
                airline: airline || dbTicket?.airline || "garuda",
                airlineName: airlineName || dbTicket?.airlineName || "Garuda Indonesia",
                airlineCode: airlineCode || dbTicket?.airlineCode || "GA",
                flightCode: flightCode || dbTicket?.flightCode || "GA-820",
                originCode: originCode || dbTicket?.originCode || "CGK",
                originCity: originCity || dbTicket?.originCity || "Jakarta",
                originTime: originTime || dbTicket?.originTime || "08:00",
                destinationCode: destinationCode || dbTicket?.destinationCode || "SIN",
                destinationCity: destinationCity || dbTicket?.destinationCity || "Singapura",
                destinationTime: destinationTime || dbTicket?.destinationTime || "10:50",
                dateFormatted: dateFormatted || dbTicket?.dateFormatted || "Senin, 28 Sep 2026",
                passenger: passenger || dbTicket?.passenger || "1 Dewasa",
                cabinClass: cabinClass || dbTicket?.cabinClass || "Ekonomi",
                passengerName: passengerName || "Budi Santoso (Tuan)",
                paymentMethod: paymentMethod || "BCA Virtual Account",
                totalPrice: Number(totalPrice ?? dbTicket?.price ?? 0),
                status: "diverifikasi",
            })
            .returning();

        return NextResponse.json(newBooking, { status: 201 });
    } catch {
        return NextResponse.json(
            { error: "Gagal menyimpan pesanan tiket" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const allBookings = await db
            .select()
            .from(ticketBookings)
            .orderBy(desc(ticketBookings.createdAt), desc(ticketBookings.id));

        return NextResponse.json(allBookings);
    } catch {
        return NextResponse.json(
            { error: "Gagal mengambil daftar pesanan tiket" },
            { status: 500 }
        );
    }
}
