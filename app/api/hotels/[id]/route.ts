import { NextResponse } from "next/server";
import { db } from "@/db";
import { hotels } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const hotelId = parseInt(id, 10);

        const result = await db.select().from(hotels).where(eq(hotels.id, hotelId)).get();

        if (!result) {
            return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
        }

        const parsedHotel = {
            ...result,
            rating: parseFloat(result.rating),
            subImages: JSON.parse(result.subImages),
            specs: JSON.parse(result.specs),
            facilities: JSON.parse(result.facilities),
            highlights: JSON.parse(result.highlights),
        };

        return NextResponse.json(parsedHotel);
    } catch {
        return NextResponse.json({ error: "Failed to fetch hotel" }, { status: 500 });
    }
}
