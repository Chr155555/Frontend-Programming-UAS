"use client";

import React from "react";
import styles from "../tiket.module.css";
import { Ticket } from "../types";

interface TicketCardProps {
  ticket: Ticket;
  onSelectTicket?: (ticket: Ticket) => void;
}

export const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  onSelectTicket,
}) => {
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(ticket.price);

  const formattedOldPrice = ticket.originalPrice
    ? new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(ticket.originalPrice)
    : null;

  return (
    <article className={styles.cardTicket}>
      <div className={styles.contentTicket}>
        <div className={styles.airlineHeader}>
          <div className={styles.airlineInfo}>
            <div className={styles.airlineCodeBadge}>
              {ticket.airlineCode}
            </div>
            <div className={styles.airlineText}>
              <div className={styles.airlineName}>{ticket.airlineName}</div>
              <div className={styles.flightCode}>{ticket.flightCode}</div>
            </div>
          </div>

          <div className={styles.ticketDateBadge}>
            <span>
              Tanggal: <strong>{ticket.date}</strong>
            </span>
          </div>
        </div>

        <div className={styles.contentData}>
          <div className={styles.destination}>
            <div className={`${styles.dest} ${styles.destOrigin}`}>
              <div className={styles.hour}>
                {ticket.origin.time}{" "}
                <span className={styles.timezone}>{ticket.origin.timezone}</span>
              </div>
              <div className={styles.acronym}>{ticket.origin.code}</div>
              <div className={styles.country}>{ticket.origin.city}</div>
              <div className={styles.airportDetail}>{ticket.origin.airport}</div>
              <span className={styles.flightDateTag}>{ticket.date}</span>
            </div>

            <div className={styles.flightDurationCenter}>
              <span className={styles.durationText}>{ticket.duration}</span>
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
              <span className={styles.flightTypeBadge}>{ticket.flightType}</span>
            </div>

            <div className={`${styles.dest} ${styles.destPoint}`}>
              <div className={styles.hour}>
                {ticket.destination.time}{" "}
                <span className={styles.timezone}>
                  {ticket.destination.timezone}
                </span>
              </div>
              <div className={styles.acronym}>{ticket.destination.code}</div>
              <div className={styles.country}>{ticket.destination.city}</div>
              <div className={styles.airportDetail}>
                {ticket.destination.airport}
              </div>
              <span className={styles.flightDateTag}>{ticket.date}</span>
            </div>
          </div>

          <div className={styles.dataFlex}>
            <div className={styles.dataItem}>
              <div className={styles.dataTitle}>Penumpang</div>
              <div className={styles.dataSubtitle}>{ticket.passenger}</div>
            </div>
            <div className={styles.dataItem}>
              <div className={styles.dataTitle}>No. Kursi</div>
              <div className={styles.dataSubtitle}>{ticket.seatNumber}</div>
            </div>
            <div className={styles.dataItem}>
              <div className={styles.dataTitle}>Kelas</div>
              <div className={styles.dataSubtitle}>{ticket.cabinClass}</div>
            </div>
            <div className={styles.dataItem}>
              <div className={styles.dataTitle}>Bagasi</div>
              <div className={styles.dataSubtitle}>{ticket.baggage}</div>
            </div>
          </div>

          <div className={styles.facilitiesBadges}>
            {ticket.facilities.map((fac, idx) => (
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
        <div className={styles.stubTopTags}>
          {ticket.tag && (
            <span className={styles.stubTag}>
              {ticket.tag.text}
            </span>
          )}
          <div className={styles.seatQuota}>
            Tersisa {ticket.seatsLeft} kursi
          </div>
        </div>

        <div className={styles.priceContainer}>
          <div className={styles.priceLabel}>Tarif per orang</div>
          {formattedOldPrice && (
            <div className={styles.priceOld}>{formattedOldPrice}</div>
          )}
          <div className={styles.priceCurrent}>
            {formattedPrice} <span className={styles.priceUnit}>/org</span>
          </div>
          <div className={styles.priceTax}>Termasuk pajak & biaya bandara</div>
        </div>

        <button
          type="button"
          className={styles.btnBookTicket}
          onClick={() => onSelectTicket && onSelectTicket(ticket)}
        >
          <span>Pilih Tiket</span>
        </button>

        <div className={styles.ticketExtraNote}>{ticket.note}</div>
      </div>
    </article>
  );
};
