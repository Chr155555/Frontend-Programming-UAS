import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email dan password wajib diisi." },
                { status: 400 }
            );
        }

        const normalizedEmail = String(email).trim().toLowerCase();

        const foundUsers = await db
            .select()
            .from(users)
            .where(eq(users.email, normalizedEmail));

        const user = foundUsers[0];

        if (!user || user.password !== String(password)) {
            return NextResponse.json(
                { error: "Email atau password salah." },
                { status: 401 }
            );
        }

        return NextResponse.json({
            message: "Login berhasil.",
            user: {
                id: user.id,
                nama: user.nama,
                email: user.email,
            },
        });
    } catch {
        return NextResponse.json(
            { error: "Terjadi kesalahan saat proses login." },
            { status: 500 }
        );
    }
}
