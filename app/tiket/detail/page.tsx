"use client";

import React, { useState, useMemo } from "react";
import styles from "./detail.module.css";
import { BookingStepper } from "./components/BookingStepper";
import { FlightSummaryBanner } from "./components/FlightSummaryBanner";
import { FlightTripCard } from "./components/FlightTripCard";
import { PassengerInfoCard } from "./components/PassengerInfoCard";
import { AddonsCard } from "./components/AddonsCard";
import { PriceSidebar } from "./components/PriceSidebar";
import { CheckoutModal } from "./components/CheckoutModal";
import { InfoBanner } from "../components/InfoBanner";
import {
  OUTBOUND_FLIGHT,
  RETURN_FLIGHT,
  PASSENGER_DATA,
  AVAILABLE_ADDONS,
  SYSTEM_FEE,
  PROMO_RULES,
} from "./data/detailData";

export default function TicketDetailPage() {
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [promoInput, setPromoInput] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
    return AVAILABLE_ADDONS.filter((a) => selectedAddonIds.includes(a.id)).reduce(
      (sum, item) => sum + item.price,
      0
    );
  }, [selectedAddonIds]);

  const totalPrice = useMemo(() => {
    const subtotal =
      OUTBOUND_FLIGHT.price + RETURN_FLIGHT.price + SYSTEM_FEE + addonsTotal;
    return Math.max(0, subtotal - discount);
  }, [addonsTotal, discount]);

  return (
    <div style={{ backgroundColor: "#f1f5f9", minHeight: "calc(100vh - 60px)" }}>
      <main className={styles.pageWrapper}>
        <BookingStepper />

        <FlightSummaryBanner
          originCode={OUTBOUND_FLIGHT.origin.code}
          originCity={OUTBOUND_FLIGHT.origin.city}
          destCode={OUTBOUND_FLIGHT.destination.code}
          destCity={OUTBOUND_FLIGHT.destination.city}
          dateRangeText="Sen, 28 Sep 2026 - Kam, 01 Okt 2026"
          passengerInfoText="1 Penumpang • Kelas Ekonomi Flexi"
        />

        <div className={styles.detailLayoutGrid}>
          <div className={styles.detailMainContent}>
            <FlightTripCard flight={OUTBOUND_FLIGHT} />
            <FlightTripCard flight={RETURN_FLIGHT} />
            <PassengerInfoCard passenger={PASSENGER_DATA} />
            <AddonsCard
              addons={AVAILABLE_ADDONS}
              selectedAddons={selectedAddonIds}
              onToggleAddon={handleToggleAddon}
            />
            <InfoBanner />
          </div>

          <PriceSidebar
            departurePrice={OUTBOUND_FLIGHT.price}
            returnPrice={RETURN_FLIGHT.price}
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
          />
        </div>

        <CheckoutModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          routeText={`${OUTBOUND_FLIGHT.origin.code} ⇄ ${OUTBOUND_FLIGHT.destination.code} (PP)`}
          passengerName={PASSENGER_DATA.name}
          totalPrice={totalPrice}
        />
      </main>
    </div>
  );
}
