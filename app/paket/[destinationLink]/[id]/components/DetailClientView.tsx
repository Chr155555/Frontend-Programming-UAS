"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PackageOption, DestinationData } from "../../../data/paket";
import CheckoutModal from "./CheckoutModal";
import styles from "../detail_paket.module.css";

interface Props {
  destination: DestinationData;
  pkg: PackageOption;
}

export default function DetailClientView({ destination, pkg }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className={styles["page-wrapper"]}>
        <div className={styles.backButtonWrapper}>
            <Link 
            href={`/paket/${destination.destinationLink}`} 
            className={styles.btnBackDestination}>
            Kembali
            </Link>
        </div>
        
        <section className={styles["gallery-container"]}>
            <div className={styles["gallery-main"]}>
            <Image src={pkg.galleryImages[0] || pkg.coverImage} alt={pkg.title} width={800} height={440} priority />
            </div>
            <div className={styles["gallery-side"]}>
            <div className={styles["gallery-item"]}>
                <Image src={pkg.galleryImages[1] || destination.coverImage} alt="Gallery 2" width={400} height={440} />
            </div>
            </div>
        </section>

        <section className={styles["paket-main-header"]}>
            <div className={styles["paket-headline-left"]}>
            <h1 className={styles["paket-headline-title"]}>{pkg.title}</h1>
            <div className={styles["paket-headline-rating"]}>
                <span className={styles["rating-score"]}>{pkg.rating}</span>
                <span>({pkg.reviewsCount} ulasan)</span>
            </div>
            <div className={styles["paket-specs-strip"]}>
                {pkg.specs.map((spec, index) => (
                <span key={index} className={styles["spec-pill"]}>{spec}</span>
                ))}
            </div>
            </div>
            <aside className={styles["paket-price-card"]}>
            <div className={styles["price-calculation"]}>
                <div className={styles["main-price-val"]}>
                <span>{pkg.price}</span>
                </div>
                <span className={styles["price-tax-note"]}>Termasuk pajak & seluruh biaya layanan</span>
            </div>
            <button 
                type="button" 
                className={styles["btn-select-paket"]} 
                onClick={() => setIsModalOpen(true)}
            >
                Pesan Sekarang
            </button>
            </aside>
        </section>

        <section className={styles["paket-section"]}>
            <div className={styles["section-title-wrapper"]}>
            <div>
                <h2>Penerbangan (Semua waktu yang tertera adalah waktu lokal di tempat)</h2>
            </div>
            </div>
            <article className={styles["flight-paket-card"]}>
            <div className={styles["flight-paket-header"]}>
                <div className={styles["airline-info"]}>
                <div className={styles["airline-code-badge"]}>{pkg.outboundFlight.airlineCode}</div>
                <div className={styles["airline-text"]}>
                    <span className={styles["airline-name"]}>{pkg.outboundFlight.airline}</span>
                    <span className={styles["flight-code"]}>{pkg.outboundFlight.aircraft}</span>
                </div>
                </div>
            </div>

            <div className={styles["flight-leg"]}>
                <div className={styles["flight-leg-title"]}>
                <span>{pkg.outboundFlight.title}</span>
                <span>{pkg.outboundFlight.date}</span>
                </div>
                <div className={styles.destination}>
                <div className={`${styles.dest} ${styles.origin}`}>
                    <div className={styles.hour}>{pkg.outboundFlight.departureTime}</div>
                    <div>Jakarta</div>
                </div>
                <div className={styles["flight-duration-center"]}>
                    <span className={styles["duration-text"]}>{pkg.outboundFlight.duration}</span>
                    <div className={styles["flight-line-track"]}>
                    <span className={`${styles["flight-line-dot"]} ${styles.start}`}></span>
                    <span className={`${styles["flight-line-dot"]} ${styles.end}`}></span>
                    </div>
                    <span className={styles["flight-type-badge"]}>Langsung</span>
                </div>
                <div className={`${styles.dest} ${styles["destination-point"]}`}>
                    <div className={styles.hour}>{pkg.outboundFlight.arrivalTime}</div>
                    <div>{destination.name}</div>
                </div>
                </div>
                <div className={styles["flight-meta"]}>
                <span>{pkg.outboundFlight.flightCode}</span>
                <span>{pkg.outboundFlight.baggage}</span>
                <span>{pkg.outboundFlight.cabinClass}</span>
                </div>
            </div>

            <div className={styles["flight-divider"]}></div>

            <div className={styles["flight-leg"]}>
                <div className={styles["flight-leg-title"]}>
                <span>{pkg.returnFlight.title}</span>
                <span>{pkg.returnFlight.date}</span>
                </div>
                <div className={styles.destination}>
                <div className={`${styles.dest} ${styles.origin}`}>
                    <div className={styles.hour}>{pkg.returnFlight.departureTime}</div>
                    <div>{destination.name}</div>
                </div>
                <div className={styles["flight-duration-center"]}>
                    <span className={styles["duration-text"]}>{pkg.returnFlight.duration}</span>
                    <div className={styles["flight-line-track"]}>
                    <span className={`${styles["flight-line-dot"]} ${styles.start}`}></span>
                    <span className={`${styles["flight-line-dot"]} ${styles.end}`}></span>
                    </div>
                    <span className={styles["flight-type-badge"]}>Langsung</span>
                </div>
                <div className={`${styles.dest} ${styles["destination-point"]}`}>
                    <div className={styles.hour}>{pkg.returnFlight.arrivalTime}</div>
                    <div>Jakarta</div>
                </div>
                </div>
                <div className={styles["flight-meta"]}>
                <span>{pkg.returnFlight.flightCode}</span>
                <span>{pkg.returnFlight.baggage}</span>
                <span>{pkg.returnFlight.cabinClass}</span>
                </div>
            </div>
            </article>
        </section>

        <section className={styles["paket-section"]}>
            <div className={styles["section-title-wrapper"]}>
            <div>
                <h2>Akomodasi</h2>
            </div>
            </div>
            <article className={styles["hotel-paket-card"]}>
            <Image className={styles["hotel-paket-image"]} src={pkg.hotelImage} alt={pkg.hotelName} width={230} height={170} />
            <div className={styles["hotel-paket-info"]}>
                <span className={styles["hotel-type"]}>{pkg.hotelStars}</span>
                <div className={styles["hotel-title"]}>
                <h3>{pkg.hotelName}</h3>
                </div>
                <div className={styles["hotel-rating"]}>
                <strong>{pkg.hotelRating}</strong>
                <span>({pkg.hotelReviews} ulasan)</span>
                </div>
                <div className={styles.facilities}>
                {pkg.hotelFacilities.map((fac, idx) => (
                    <span key={idx}>{fac}</span>
                ))}
                </div>
            </div>
            <div className={styles["hotel-stay"]}>
                <span className={styles["stay-label"]}>Kamar</span>
                <strong>{pkg.roomType}</strong>
                <span>3 malam</span>
            </div>
            </article>
        </section>

        <section className={styles["paket-section"]}>
            <div className={styles["section-title-wrapper"]}>
            <div>
                <h2>Fasilitas dan Layanan</h2>
            </div>
            </div>
            <div className={styles["included-grid"]}>
            {pkg.features.map((feat, idx) => (
                <div key={idx} className={styles["included-card"]}>
                <div>
                    <strong>{feat.title}</strong>
                    <p>{feat.desc}</p>
                </div>
                </div>
            ))}
            </div>
        </section>

        <section className={styles["paket-section"]}>
            <div className={styles["section-title-wrapper"]}>
            <div>
                <h2>Kebijakan Paket</h2>
            </div>
            </div>
            <div className={styles["policy-grid"]}>
            {pkg.policies.map((pol, idx) => (
                <div key={idx} className={styles["policy-card"]}>
                <h4>{pol.title}</h4>
                <p>{pol.desc}</p>
                </div>
            ))}
            </div>
        </section>

        <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pkgTitle={pkg.title}
        hotelName={pkg.hotelName}
        price={pkg.price}
        destinationName={destination.name}
        outboundDate={pkg.outboundFlight.date}
        returnDate={pkg.returnFlight.date}
        airline={pkg.outboundFlight.airline}
        />
    </main>
  );
}