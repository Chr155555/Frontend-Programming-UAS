import { NextResponse } from "next/server";
import { db } from "@/db";
import { paketFavorites } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
    try {
        const rows = await db
            .select()
            .from(paketFavorites)
            .orderBy(desc(paketFavorites.createdAt), desc(paketFavorites.id));

        return NextResponse.json(rows);
    } catch {
        return NextResponse.json(
            { error: "Gagal mengambil daftar paket favorit" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const destinationLink = String(body?.destinationLink || "").trim();
        const packageId = String(body?.packageId || "").trim();
        const packageKey = `${destinationLink}:${packageId}`;

        if (!destinationLink || !packageId) {
            return NextResponse.json(
                { error: "Data paket tidak valid" },
                { status: 400 }
            );
        }

        const existing = await db
            .select()
            .from(paketFavorites)
            .where(eq(paketFavorites.packageKey, packageKey));

        if (existing.length > 0) {
            await db
                .delete(paketFavorites)
                .where(eq(paketFavorites.packageKey, packageKey));

            return NextResponse.json({ favorited: false, packageKey });
        }

        const title = String(body?.title || "").trim();
        const destinationName = String(body?.destinationName || "").trim();
        const duration = String(body?.duration || "").trim();
        const coverImage = String(body?.coverImage || "").trim();
        const price = String(body?.price || "").trim();

        if (!title || !coverImage) {
            return NextResponse.json(
                { error: "Data paket tidak lengkap" },
                { status: 400 }
            );
        }

        await db.insert(paketFavorites).values({
            packageKey,
            destinationLink,
            packageId,
            title,
            destinationName,
            duration,
            coverImage,
            price,
        });

        return NextResponse.json(
            { favorited: true, packageKey },
            { status: 201 }
        );
    } catch {
        return NextResponse.json(
            { error: "Gagal memperbarui paket favorit" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const packageKey = String(searchParams.get("packageKey") || "").trim();

        if (!packageKey) {
            return NextResponse.json(
                { error: "packageKey tidak valid" },
                { status: 400 }
            );
        }

        await db
            .delete(paketFavorites)
            .where(eq(paketFavorites.packageKey, packageKey));

        return NextResponse.json({ deleted: true, packageKey });
    } catch {
        return NextResponse.json(
            { error: "Gagal menghapus paket favorit" },
            { status: 500 }
        );
    }
}
