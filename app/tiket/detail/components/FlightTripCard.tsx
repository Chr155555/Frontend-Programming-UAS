"use client";

import React from "react";
import styles from "../detail.module.css";
import { FlightTrip } from "../types";

interface FlightTripCardProps {
    flight: FlightTrip;
}

export const FlightTripCard: React.FC<FlightTripCardProps> = ({ flight }) => {
    const formattedPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(flight.price);

    return (
        <section className={styles.flightTripSection}>
            <div className={styles.tripSectionHeader}>
                <div className={styles.tripTitleWrapper}>
                    <div className={styles.tripIconBadge}>
                        {flight.tripType === "departure" ? (
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M2.5 19h19" />
                                <path d="M4.5 15.5l3.5-1.5 6 1.5 4.5-5 3 1-3 6.5-14-2.5z" />
                            </svg>
                        ) : (
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M2.5 19h19" />
                                <path d="M19.5 15.5l-3.5-1.5-6 1.5-4.5-5-3 1 3 6.5 14-2.5z" />
                            </svg>
                        )}
                    </div>
                    <div className={styles.tripHeaderText}>
                        <h2>{flight.tripTitle}</h2>
                        <p>{flight.tripSubtitle}</p>
                    </div>
                </div>
                <span className={styles.tripBadgePill}>
                    {flight.tripType === "departure" ? "Pergi" : "Pulang"}
                </span>
            </div>

            <article className={styles.cardTicket}>
                <div className={styles.contentTicket}>
                    <div className={styles.airlineHeader}>
                        <div className={styles.airlineInfo}>
                            <div className={styles.airlineCodeBadge}>{flight.airlineCode}</div>
                            <div className={styles.airlineText}>
                                <div className={styles.airlineName}>{flight.airlineName}</div>
                                <div className={styles.flightCode}>{flight.flightCode}</div>
                            </div>
                        </div>
                        <div className={styles.ticketDateBadge}>
                            <span>
                                Tanggal: <strong>{flight.date}</strong>
                            </span>
                        </div>
                    </div>

                    <div className={styles.contentData}>
                        <div className={styles.destination}>
                            <div className={`${styles.dest} ${styles.destOrigin}`}>
                                <div className={styles.hour}>
                                    {flight.origin.time}{" "}
                                    <span className={styles.timezone}>
                                        {flight.origin.timezone}
                                    </span>
                                </div>
                                <div className={styles.acronym}>{flight.origin.code}</div>
                                <div className={styles.country}>{flight.origin.city}</div>
                                <div className={styles.airportDetail}>
                                    {flight.origin.airport}
                                </div>
                                <span className={styles.flightDateTag}>{flight.origin.date}</span>
                            </div>

                            <div className={styles.flightDurationCenter}>
                                <span className={styles.durationText}>{flight.duration}</span>
                                <div className={styles.flightLineTrack}>
                                    <span
                                        className={`${styles.flightLineDot} ${styles.flightLineDotStart}`}
                                    ></span>
                                    <div className={styles.flightPlaneIcon}>
                                        <svg
                                            width="15"
                                            height="15"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                                        </svg>
                                    </div>
                                    <span
                                        className={`${styles.flightLineDot} ${styles.flightLineDotEnd}`}
                                    ></span>
                                </div>
                                <span className={styles.flightTypeBadge}>
                                    {flight.flightType}
                                </span>
                            </div>

                            <div className={`${styles.dest} ${styles.destPoint}`}>
                                <div className={styles.hour}>
                                    {flight.destination.time}{" "}
                                    <span className={styles.timezone}>
                                        {flight.destination.timezone}
                                    </span>
                                </div>
                                <div className={styles.acronym}>{flight.destination.code}</div>
                                <div className={styles.country}>{flight.destination.city}</div>
                                <div className={styles.airportDetail}>
                                    {flight.destination.airport}
                                </div>
                                <span className={styles.flightDateTag}>
                                    {flight.destination.date}
                                </span>
                            </div>
                        </div>

                        <div className={styles.dataFlex}>
                            <div className={styles.dataItem}>
                                <div className={styles.dataTitle}>Penumpang</div>
                                <div className={styles.dataSubtitle}>{flight.passenger}</div>
                            </div>
                            <div className={styles.dataItem}>
                                <div className={styles.dataTitle}>No. Kursi</div>
                                <div className={styles.dataSubtitle}>{flight.seatNumber}</div>
                            </div>
                            <div className={styles.dataItem}>
                                <div className={styles.dataTitle}>Kelas</div>
                                <div className={styles.dataSubtitle}>{flight.cabinClass}</div>
                            </div>
                            <div className={styles.dataItem}>
                                <div className={styles.dataTitle}>Bagasi</div>
                                <div className={styles.dataSubtitle}>{flight.baggage}</div>
                            </div>
                        </div>

                        <div className={styles.facilitiesBadges}>
                            {flight.facilities.map((fac, idx) => (
                                <span key={idx} className={styles.badgeItem}>
                                    {fac}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.separator}>
                    <div className={styles.spanLines}></div>
                </div>

                <div className={styles.ticketStub}>
                    <div className={styles.stubStatusPill}>
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Terpilih</span>
                    </div>

                    <div className={styles.stubPriceInfo}>
                        <div className={styles.stubPriceLabel}>Tarif Penerbangan</div>
                        <div className={styles.stubPriceValue}>{formattedPrice}</div>
                        <div className={styles.stubPriceTax}>
                            Termasuk pajak & bandara
                        </div>
                    </div>

                    <div className={styles.btnTicketPolicy}>
                        <span>Info Kebijakan Fleksibel</span>
                    </div>
                </div>
            </article>
        </section>
    );
};
