import { NextResponse } from "next/server";
import { db } from "@/db";
import { hotelFavorites, hotels } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
    try {
        const rows = await db
            .select({
                favoriteId: hotelFavorites.id,
                hotelId: hotels.id,
                name: hotels.name,
                city: hotels.city,
                location: hotels.location,
                rating: hotels.rating,
                reviewsCount: hotels.reviewsCount,
                image: hotels.image,
                priceNum: hotels.priceNum,
                priceFormatted: hotels.priceFormatted,
                facilities: hotels.facilities,
                createdAt: hotelFavorites.createdAt,
            })
            .from(hotelFavorites)
            .innerJoin(hotels, eq(hotelFavorites.hotelId, hotels.id))
            .orderBy(desc(hotelFavorites.createdAt), desc(hotelFavorites.id));

        const parsed = rows.map((row) => ({
            ...row,
            facilities: JSON.parse(row.facilities) as string[],
        }));

        return NextResponse.json(parsed);
    } catch {
        return NextResponse.json(
            { error: "Gagal mengambil daftar hotel favorit" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const hotelId = Number(body?.hotelId);

        if (!hotelId || Number.isNaN(hotelId)) {
            return NextResponse.json(
                { error: "hotelId tidak valid" },
                { status: 400 }
            );
        }

        const existing = await db
            .select()
            .from(hotelFavorites)
            .where(eq(hotelFavorites.hotelId, hotelId));

        if (existing.length > 0) {
            await db
                .delete(hotelFavorites)
                .where(eq(hotelFavorites.hotelId, hotelId));

            return NextResponse.json({ favorited: false, hotelId });
        }

        await db.insert(hotelFavorites).values({ hotelId });
        return NextResponse.json({ favorited: true, hotelId }, { status: 201 });
    } catch {
        return NextResponse.json(
            { error: "Gagal memperbarui hotel favorit" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const hotelId = Number(searchParams.get("hotelId"));

        if (!hotelId || Number.isNaN(hotelId)) {
            return NextResponse.json(
                { error: "hotelId tidak valid" },
                { status: 400 }
            );
        }

        await db
            .delete(hotelFavorites)
            .where(eq(hotelFavorites.hotelId, hotelId));

        return NextResponse.json({ deleted: true, hotelId });
    } catch {
        return NextResponse.json(
            { error: "Gagal menghapus hotel favorit" },
            { status: 500 }
        );
    }
}
