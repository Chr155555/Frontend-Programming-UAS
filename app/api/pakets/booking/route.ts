import { NextResponse } from "next/server";
import { db } from "@/db";
import { paketBookings, packages, destinations } from "@/db/schema";
import { desc, eq, and } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
        orderId,
        destinationLink,
        packageId,
        packageTitle,
        destinationName,
        duration,
        hotelBrief,
        coverImage,
        guestName,
        paymentMethod,
        totalPrice,
    } = body;

    if (!orderId || !packageId) {
      return NextResponse.json(
        { error: "Data pesanan paket tidak lengkap" },
        { status: 400 }
      );
    }

    const existingOrder = await db
      .select()
      .from(paketBookings)
      .where(eq(paketBookings.orderId, orderId))
      .get();

    if (existingOrder) {
      return NextResponse.json([existingOrder], { status: 200 });
    }

    let resolvedTitle = packageTitle;
    let resolvedDestName = destinationName;
    let resolvedDuration = duration;
    let resolvedHotelBrief = hotelBrief;
    let resolvedCoverImage = coverImage;

    if (!resolvedCoverImage) {
        const pkg = await db.select().from(packages).where(eq(packages.id, packageId)).get();
        resolvedCoverImage = pkg?.coverImage || "/paket/destinasi/singapore.jpg";
    }

    if (!resolvedTitle || !resolvedDestName) {
      const dest = await db
        .select()
        .from(destinations)
        .where(eq(destinations.destinationLink, destinationLink))
        .get();

      if (dest) {
        resolvedDestName = dest.name;
        const pkg = await db
          .select()
          .from(packages)
          .where(and(eq(packages.destinationId, dest.id), eq(packages.id, packageId)))
          .get();

        if (pkg) {
          resolvedTitle = pkg.title;
          resolvedDuration = pkg.duration;
          resolvedHotelBrief = `${pkg.hotelName} (${pkg.roomType})`;
        }
      }
    }

    const newBooking = await db
      .insert(paketBookings)
      .values({
        orderId,
        destinationLink: destinationLink || "yogyakarta",
        packageId: packageId || "relax",
        packageTitle: resolvedTitle || "Paket Wisata",
        destinationName: resolvedDestName || "Yogyakarta",
        duration: resolvedDuration || "3 Hari 2 Malam",
        hotelBrief: resolvedHotelBrief || "Hotel & Akomodasi",
        coverImage: resolvedCoverImage,
        guestName: guestName || "Budi Santoso (Tuan)",
        paymentMethod: paymentMethod || "BCA Virtual Account",
        totalPrice: Number(totalPrice ?? 0),
        status: "diverifikasi",
      })
      .returning();

    return NextResponse.json(newBooking, { status: 201 });
  } catch (e) {
    console.error("Paket booking error:", e);
    return NextResponse.json(
      { error: "Gagal menyimpan pesanan paket" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const allBookings = await db
      .select()
      .from(paketBookings)
      .orderBy(desc(paketBookings.createdAt), desc(paketBookings.id));

    return NextResponse.json(allBookings);
  } catch {
    return NextResponse.json(
      { error: "Gagal mengambil daftar pesanan paket" },
      { status: 500 }
    );
  }
}