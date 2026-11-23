import Image from "next/image";
import Link from "next/link";
import { PackageOption } from "../../data/paket";
import styles from "../daftar_paket.module.css";

interface PaketCardProps {
  pkg: PackageOption;
  appliedAsal: string;
  destinationName: string;
  destinationDestLink: string;
}

export default function PaketCard({
  pkg,
  appliedAsal,
  destinationName,
  destinationDestLink,
}: PaketCardProps) {
  return (
    <div className={styles.paketCard}>
      <div className={styles.paketImage}>
        <Image src={pkg.coverImage} alt={pkg.title} width={500} height={300} />
        <span className={styles.paketBadge}>{pkg.badge}</span>
      </div>

      <div className={styles.paketInfo}>
        <div className={styles.paketHeading}>
          <div>
            <h3>{pkg.title}</h3>
          </div>
          <div className={styles.paketRating}>
            <p>{pkg.rating}</p>
          </div>
        </div>

        <div className={styles.paketDurasi}>
          <p>{pkg.duration}</p>
        </div>

        <div className={styles.paketSection}>
          <div className={styles.paketSectionTitle}>
            <h4>Penginapan</h4>
          </div>
          <div className={styles.paketSectionDetails}>
            <p>
              {pkg.hotelName} | {pkg.hotelStars} | {pkg.roomType} | Sarapan Termasuk
            </p>
          </div>
        </div>

        <div className={styles.paketSection}>
          <div className={styles.paketSectionTitle}>
            <h4>Penerbangan</h4>
          </div>
          <div className={styles.paketSectionDetails}>
            <p>
              {appliedAsal} → {destinationName} | {pkg.outboundFlight.cabinClass} | No Transit | Pulang Pergi
            </p>
          </div>
        </div>

        <div className={styles.paketSection}>
          <div className={styles.paketSectionTitle}>
            <h4>Fitur Tambahan</h4>
          </div>
          <div className={styles.paketSectionDetails}>
            <p>
              {pkg.features.map((f) => f.title).join(" | ")}
            </p>
          </div>
        </div>

        <div className={styles.paketBottom}>
          <div className={styles.paketHarga}>
            <h2>{pkg.price}</h2>
            <p>Termasuk Pajak</p>
          </div>
          <Link
            href={`/paket/${destinationDestLink}/${pkg.id}`}
            className={styles.paketButton}
          >
            Lihat Paket
          </Link>
        </div>
      </div>
    </div>
  );
}