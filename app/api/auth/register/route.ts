import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { nama, email, password } = body;

        if (!nama || !email || !password) {
            return NextResponse.json(
                { error: "Nama, email, dan password wajib diisi." },
                { status: 400 }
            );
        }

        const normalizedEmail = String(email).trim().toLowerCase();

        const existingUser = await db
            .select()
            .from(users)
            .where(eq(users.email, normalizedEmail));

        if (existingUser.length > 0) {
            return NextResponse.json(
                { error: "Email sudah terdaftar. Silakan langsung login." },
                { status: 409 }
            );
        }

        const [newUser] = await db
            .insert(users)
            .values({
                nama: String(nama).trim(),
                email: normalizedEmail,
                password: String(password),
            })
            .returning({
                id: users.id,
                nama: users.nama,
                email: users.email,
            });

        return NextResponse.json(
            {
                message: "Registrasi berhasil.",
                user: newUser,
            },
            { status: 201 }
        );
    } catch {
        return NextResponse.json(
            { error: "Terjadi kesalahan saat mendaftarkan akun." },
            { status: 500 }
        );
    }
}
