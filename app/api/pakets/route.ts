import { NextResponse } from "next/server";
import { db } from "@/db";
import { destinations, packages } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const destinationLink = searchParams.get("destinationLink");

        let destResult;
        if (destinationLink && destinationLink.toLowerCase() !== "semua") {
            destResult = await db.select().from(destinations).where(eq(destinations.destinationLink, destinationLink));
        } else {
            destResult = await db.select().from(destinations);
        }

        const fullData = [];
        for (const dest of destResult) {
            const pkgs = await db.select().from(packages).where(eq(packages.destinationId, dest.id));
            const parsedPkgs = pkgs.map((p) => ({
                ...p,
                galleryImages: JSON.parse(p.galleryImages),
                specs: JSON.parse(p.specs),
                hotelFacilities: JSON.parse(p.hotelFacilities),
                outboundFlight: JSON.parse(p.outboundFlight),
                returnFlight: JSON.parse(p.returnFlight),
                features: JSON.parse(p.features),
                policies: JSON.parse(p.policies),
            }));

            fullData.push({
                ...dest,
                packages: parsedPkgs,
            });
        }

        return NextResponse.json(fullData);
    } catch {
        return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 });
    }
}