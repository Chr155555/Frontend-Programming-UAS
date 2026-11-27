import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, newPassword } = body;

        if (!email || !newPassword) {
            return NextResponse.json(
                { error: "Email dan password baru wajib diisi." },
                { status: 400 }
            );
        }

        if (String(newPassword).length < 6) {
            return NextResponse.json(
                { error: "Password baru minimal 6 karakter." },
                { status: 400 }
            );
        }

        const normalizedEmail = String(email).trim().toLowerCase();

        const foundUsers = await db
            .select()
            .from(users)
            .where(eq(users.email, normalizedEmail));

        if (foundUsers.length === 0) {
            return NextResponse.json(
                { error: "Email tidak ditemukan. Pastikan email sudah terdaftar." },
                { status: 404 }
            );
        }

        await db
            .update(users)
            .set({ password: String(newPassword) })
            .where(eq(users.email, normalizedEmail));

        return NextResponse.json({
            message: "Password berhasil diperbarui. Silakan masuk dengan password baru Anda.",
        });
    } catch {
        return NextResponse.json(
            { error: "Terjadi kesalahan saat mengatur ulang password." },
            { status: 500 }
        );
    }
}
