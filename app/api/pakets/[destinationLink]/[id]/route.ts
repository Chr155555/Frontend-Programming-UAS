import { NextResponse } from "next/server";
import { db } from "@/db";
import { destinations, packages } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(
    _: Request,
    { params }: { params: Promise<{ destinationLink: string; id: string }> }
) {
    try {
        const { destinationLink, id } = await params;

        const destination = await db
            .select()
            .from(destinations)
            .where(eq(destinations.destinationLink, destinationLink))
            .get();

        if (!destination) {
            return NextResponse.json({ error: "Destination not found" }, { status: 404 });
        }

        const pkg = await db
            .select()
            .from(packages)
            .where(and(eq(packages.destinationId, destination.id), eq(packages.id, id)))
            .get();

        if (!pkg) {
            return NextResponse.json({ error: "Package not found" }, { status: 404 });
        }

        const parsedPackage = {
            ...pkg,
            galleryImages: JSON.parse(pkg.galleryImages),
            specs: JSON.parse(pkg.specs),
            hotelFacilities: JSON.parse(pkg.hotelFacilities),
            outboundFlight: JSON.parse(pkg.outboundFlight),
            returnFlight: JSON.parse(pkg.returnFlight),
            features: JSON.parse(pkg.features),
            policies: JSON.parse(pkg.policies),
        };

        return NextResponse.json({ destination, package: parsedPackage });
    } catch {
        return NextResponse.json({ error: "Failed to fetch package details" }, { status: 500 });
    }
}