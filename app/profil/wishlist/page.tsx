import Link from "next/link";
import styles from "../profil.module.css";

const wishlistCities = [
    { name: "Jakarta", count: 1 },
    { name: "Bali", count: 0 },
    { name: "Yogyakarta", count: 0 },
    { name: "Bandung", count: 0 },
];

export default function WishlistPage() {
    return (
        <section className={styles.contentCard}>
            <h1 className={styles.cardTitle}>Daftar Wishlist Anda:</h1>

            <div className={styles.wishlistGrid}>
                {wishlistCities.map((city) => (
                    <Link
                        key={city.name}
                        href={`/favorite?kota=${encodeURIComponent(city.name)}`}
                        className={styles.wishlistItem}
                    >
                        <h3>{city.name}</h3>
                        <span>{city.count} disimpan</span>
                    </Link>
                ))}
            </div>
        </section>
    );
}