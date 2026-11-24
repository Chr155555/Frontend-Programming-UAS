import { db } from "./index";
import { hotels } from "./schema";
import { HOTELS_LIST } from "../app/hotel/data/hotels";

async function seedHotels() {
    await db.delete(hotels);

    const rows = HOTELS_LIST.map((h) => ({
        id: h.id,
        name: h.name,
        badge: h.badge,
        city: h.city,
        location: h.location,
        rating: h.rating.toString(),
        reviewsCount: h.reviewsCount,
        image: h.image,
        subImages: JSON.stringify(h.subImages),
        specs: JSON.stringify(h.specs),
        discount: h.discount,
        oldPrice: h.oldPrice,
        priceNum: h.priceNum,
        priceFormatted: h.priceFormatted,
        pricePer: h.pricePer,
        facilities: JSON.stringify(h.facilities),
        highlights: JSON.stringify(h.highlights),
    }));

    await db.insert(hotels).values(rows);
    console.log(`Database seeded with ${rows.length} hotels.`);
}

seedHotels().catch((err) => {
    console.error("Hotel seeding error:", err);
    process.exit(1);
});
