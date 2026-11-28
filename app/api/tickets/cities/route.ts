import { NextResponse } from "next/server";
import { db } from "@/db";
import { cities } from "@/db/schema";

export async function GET() {
    try {
        const rows = await db.select().from(cities);
        return NextResponse.json({ success: true, data: rows });
    } catch {
        return NextResponse.json(
            { success: false, message: "Gagal mengambil data kota" },
            { status: 500 }
        );
    }
}
