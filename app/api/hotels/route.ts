import { NextResponse } from "next/server";
import { db } from "@/db";
import { hotels } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const city = searchParams.get("city");

        let result;
        if (city && city.toLowerCase() !== "semua") {
            result = await db.select().from(hotels).where(eq(hotels.city, city));
        } else {
            result = await db.select().from(hotels);
        }

        const parsedHotels = result.map((h) => ({
            ...h,
            rating: parseFloat(h.rating),
            subImages: JSON.parse(h.subImages),
            specs: JSON.parse(h.specs),
            facilities: JSON.parse(h.facilities),
            highlights: JSON.parse(h.highlights),
        }));

        return NextResponse.json(parsedHotels);
    } catch {
        return NextResponse.json({ error: "Failed to fetch hotels" }, { status: 500 });
    }
}
