import { NextResponse } from "next/server";
import { db } from "@/db";
import { paketBookings } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            orderId,
            destinationLink,
            packageId,
            packageTitle,
            guestName,
            paymentMethod,
            totalPrice,
        } = body;

        if (!orderId || !packageId || !packageTitle) {
            return NextResponse.json({ error: "Data pesanan paket tidak lengkap" }, { status: 400 });
        }

        const newBooking = await db.insert(paketBookings).values({
            orderId,
            destinationLink: destinationLink || "",
            packageId: packageId || "",
            packageTitle,
            guestName: guestName || "Budi Santoso (Tuan)",
            paymentMethod: paymentMethod || "BCA",
            totalPrice: Number(totalPrice),
            status: "diverifikasi",
        }).returning();

        return NextResponse.json(newBooking, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Gagal menyimpan pesanan paket" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const allBookings = await db
            .select()
            .from(paketBookings)
            .orderBy(desc(paketBookings.createdAt));

        return NextResponse.json(allBookings);
    } catch {
        return NextResponse.json({ error: "Gagal mengambil daftar pesanan paket" }, { status: 500 });
    }
}