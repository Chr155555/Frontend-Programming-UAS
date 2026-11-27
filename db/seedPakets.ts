import { db } from "./index";
import { destinations, packages } from "./schema";
import { PAKET_DATA } from "../app/paket/data/paket";

async function seedPakets() {
    await db.delete(packages);
    await db.delete(destinations);

    let packageCount = 0;

    for (const dest of PAKET_DATA) {
        const insertedDest = db.insert(destinations).values({
            destinationLink: dest.destinationLink,
            name: dest.name,
            regionGroup: dest.regionGroup,
            coverImage: dest.coverImage,
        }).returning().run();

        const destId = insertedDest.lastInsertRowid as number;

        for (const pkg of dest.packages) {
            db.insert(packages).values({
                id: pkg.id,
                destinationId: destId,
                badge: pkg.badge,
                title: pkg.title,
                rating: pkg.rating,
                reviewsCount: pkg.reviewsCount,
                duration: pkg.duration,
                coverImage: pkg.coverImage,
                galleryImages: JSON.stringify(pkg.galleryImages),
                specs: JSON.stringify(pkg.specs),
                price: pkg.price,
                hotelName: pkg.hotelName,
                hotelStars: pkg.hotelStars,
                hotelRating: pkg.hotelRating,
                hotelReviews: pkg.hotelReviews,
                hotelImage: pkg.hotelImage,
                hotelFacilities: JSON.stringify(pkg.hotelFacilities),
                roomType: pkg.roomType,
                outboundFlight: JSON.stringify(pkg.outboundFlight),
                returnFlight: JSON.stringify(pkg.returnFlight),
                features: JSON.stringify(pkg.features),
                policies: JSON.stringify(pkg.policies),
            }).run();

            packageCount++;
        }
    }

    console.log(`Database seeded with ${PAKET_DATA.length} destinations and ${packageCount} packages.`);
}

seedPakets().catch((err) => {
    console.error("Package seeding error:", err);
    process.exit(1);
});