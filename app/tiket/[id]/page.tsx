"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import styles from "../detail/detail.module.css";
import { BookingStepper } from "../detail/components/BookingStepper";
import { FlightSummaryBanner } from "../detail/components/FlightSummaryBanner";
import { FlightTripCard } from "../detail/components/FlightTripCard";
import { PassengerInfoCard } from "../detail/components/PassengerInfoCard";
import { AddonsCard } from "../detail/components/AddonsCard";
import { PriceSidebar } from "../detail/components/PriceSidebar";
import { CheckoutModal } from "../detail/components/CheckoutModal";
import { InfoBanner } from "../components/InfoBanner";
import { Ticket } from "../types";
import { FlightTrip } from "../detail/types";
import {
  PASSENGER_DATA,
  AVAILABLE_ADDONS,
  SYSTEM_FEE,
  PROMO_RULES,
} from "../detail/data/detailData";

function ticketToFlightTrip(ticket: Ticket): FlightTrip {
  return {
    id: ticket.id,
    tripType: "departure",
    tripTitle: "Penerbangan Berangkat",
    tripSubtitle: `${ticket.date} • Durasi ${ticket.duration} (${ticket.flightType})`,
    airlineName: ticket.airlineName,
    airlineCode: ticket.airlineCode,
    flightCode: ticket.flightCode,
    date: ticket.date,
    origin: {
      code: ticket.origin.code,
      city: ticket.origin.city,
      airport: ticket.origin.airport,
      time: ticket.origin.time,
      timezone: ticket.origin.timezone,
      date: ticket.date,
    },
    destination: {
      code: ticket.destination.code,
      city: ticket.destination.city,
      airport: ticket.destination.airport,
      time: ticket.destination.time,
      timezone: ticket.destination.timezone,
      date: ticket.date,
    },
    duration: ticket.duration,
    flightType: ticket.flightType,
    passenger: ticket.passenger,
    seatNumber: ticket.seatNumber,
    cabinClass: ticket.cabinClass,
    baggage: ticket.baggage,
    facilities: ticket.facilities,
    price: ticket.price,
  };
}

export default function TicketDetailDynamicPage() {
  const params = useParams();
  const ticketId = params?.id as string;

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [promoInput, setPromoInput] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!ticketId) return;

    fetch(`/api/tickets/${ticketId}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setTicket(res.data);
          setError(null);
        } else {
          setError(res.message || "Tiket tidak ditemukan");
        }
      })
      .catch(() => {
        setError("Gagal memuat detail tiket");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [ticketId]);

  const handleToggleAddon = (id: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) {
      setDiscount(0);
      setPromoMessage("");
      return;
    }

    const matched = PROMO_RULES[code];
    if (matched) {
      setDiscount(matched.discount);
      setPromoMessage(matched.message);
    } else {
      setDiscount(0);
      setPromoMessage("Kode promo tidak valid atau sudah kadaluwarsa.");
    }
  };

  const addonsTotal = useMemo(() => {
    return AVAILABLE_ADDONS.filter((a) =>
      selectedAddonIds.includes(a.id)
    ).reduce((sum, item) => sum + item.price, 0);
  }, [selectedAddonIds]);

  const totalPrice = useMemo(() => {
    if (!ticket) return 0;
    const subtotal = ticket.price + SYSTEM_FEE + addonsTotal;
    return Math.max(0, subtotal - discount);
  }, [ticket, addonsTotal, discount]);

  if (loading) {
    return (
      <div style={{ backgroundColor: "#f1f5f9", minHeight: "calc(100vh - 60px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "40px" }}>
          <div style={{ fontSize: "16px", fontWeight: 600, color: "#0284c7" }}>
            Memuat detail tiket penerbangan...
          </div>
        </div>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div style={{ backgroundColor: "#f1f5f9", minHeight: "calc(100vh - 60px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "#ffffff", padding: "32px 48px", borderRadius: "12px", textAlign: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
            Tiket Tidak Ditemukan
          </h2>
          <p style={{ color: "#64748b", marginBottom: "24px" }}>
            {error || "Data penerbangan untuk ID ini tidak tersedia."}
          </p>
          <Link
            href="/tiket"
            style={{
              background: "#0284c7",
              color: "#ffffff",
              padding: "10px 20px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Kembali ke Pencarian Tiket
          </Link>
        </div>
      </div>
    );
  }

  const flightTrip = ticketToFlightTrip(ticket);
  const routeSummary = `${ticket.origin.city} (${ticket.origin.code}) → ${ticket.destination.city} (${ticket.destination.code})`;

  return (
    <div style={{ backgroundColor: "#f1f5f9", minHeight: "calc(100vh - 60px)" }}>
      <main className={styles.pageWrapper}>
        <BookingStepper />

        <FlightSummaryBanner
          originCode={ticket.origin.code}
          originCity={ticket.origin.city}
          destCode={ticket.destination.code}
          destCity={ticket.destination.city}
          dateRangeText={ticket.date}
          passengerInfoText={`1 Penumpang • Kelas ${ticket.cabinClass}`}
          tripTypeText="Sekali Jalan"
        />

        <div className={styles.detailLayoutGrid}>
          <div className={styles.detailMainContent}>
            <FlightTripCard flight={flightTrip} />
            <PassengerInfoCard passenger={PASSENGER_DATA} />
            <AddonsCard
              addons={AVAILABLE_ADDONS}
              selectedAddons={selectedAddonIds}
              onToggleAddon={handleToggleAddon}
            />
            <InfoBanner />
          </div>

          <PriceSidebar
            departurePrice={ticket.price}
            systemFee={SYSTEM_FEE}
            addons={AVAILABLE_ADDONS}
            selectedAddonIds={selectedAddonIds}
            promoInput={promoInput}
            onPromoInputChange={setPromoInput}
            onApplyPromo={handleApplyPromo}
            promoMessage={promoMessage}
            discount={discount}
            totalPrice={totalPrice}
            onProceedPayment={() => setIsModalOpen(true)}
            flightCode={ticket.airlineCode}
            routeText={`${ticket.origin.code} → ${ticket.destination.code} (Sekali Jalan)`}
          />
        </div>

        <CheckoutModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          routeText={`${routeSummary} (Sekali Jalan)`}
          passengerName={PASSENGER_DATA.name}
          totalPrice={totalPrice}
          paymentUrl={`/tiket/pembayaran?id=${ticket.id}&total=${totalPrice}&addons=${addonsTotal}&discount=${discount}`}
        />
      </main>
    </div>
  );
}
