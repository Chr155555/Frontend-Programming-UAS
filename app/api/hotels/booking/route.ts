import { NextResponse } from "next/server";
import { db } from "@/db";
import { hotelBookings } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            orderId,
            hotelId,
            hotelName,
            hotelLocation,
            roomBrief,
            guestName,
            hasBreakfast,
            paymentMethod,
            totalPrice,
        } = body;

        if (!orderId || !hotelId || !hotelName) {
            return NextResponse.json({ error: "Data pesanan tidak lengkap" }, { status: 400 });
        }

        const newBooking = await db.insert(hotelBookings).values({
            orderId,
            hotelId: Number(hotelId),
            hotelName,
            hotelLocation: hotelLocation || "",
            roomBrief: roomBrief || "",
            guestName: guestName || "Budi Santoso (Tuan)",
            hasBreakfast: hasBreakfast ? 1 : 0,
            paymentMethod: paymentMethod || "BCA",
            totalPrice: Number(totalPrice),
            status: "diverifikasi",
        }).returning();

        return NextResponse.json(newBooking, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Gagal menyimpan pesanan" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const allBookings = await db
            .select()
            .from(hotelBookings)
            .orderBy(desc(hotelBookings.createdAt));

        return NextResponse.json(allBookings);
    } catch {
        return NextResponse.json({ error: "Gagal mengambil daftar pesanan" }, { status: 500 });
    }
}
