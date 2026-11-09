"use client";

import React, { useState, useMemo } from "react";
import styles from "./tiket.module.css";
import { RouteSearch } from "./components/RouteSearch";
import { DateStrip } from "./components/DateStrip";
import { FilterToolbar } from "./components/FilterToolbar";
import { TicketCard } from "./components/TicketCard";
import { InfoBanner } from "./components/InfoBanner";
import { INITIAL_TICKETS, DATES, CITIES } from "./data/tickets";
import { AirlineType, SortType, CabinClass, Ticket } from "./types";

export default function TicketDashboardPage() {
  const [origin, setOrigin] = useState<string>("CGK");
  const [destination, setDestination] = useState<string>("SIN");
  const [flightDate, setFlightDate] = useState<string>("2026-09-28");
  const [cabinClass, setCabinClass] = useState<CabinClass>("Ekonomi");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedAirline, setSelectedAirline] = useState<AirlineType>("all");
  const [sortBy, setSortBy] = useState<SortType>("recomended");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  // Swap origin and destination
  const handleSwapRoutes = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  // Filter and sort tickets
  const filteredTickets = useMemo(() => {
    let result = [...INITIAL_TICKETS];

    // Filter by airline
    if (selectedAirline !== "all") {
      result = result.filter((t) => t.airline === selectedAirline);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.airlineName.toLowerCase().includes(q) ||
          t.flightCode.toLowerCase().includes(q) ||
          t.origin.city.toLowerCase().includes(q) ||
          t.destination.city.toLowerCase().includes(q) ||
          t.origin.time.includes(q)
      );
    }

    // Sort tickets
    switch (sortBy) {
      case "cheapest":
        result.sort((a, b) => a.price - b.price);
        break;
      case "earliest":
        result.sort((a, b) => a.origin.time.localeCompare(b.origin.time));
        break;
      case "fastest":
        result.sort((a, b) => a.durationMinutes - b.durationMinutes);
        break;
      case "recomended":
      default:
        // Default order
        break;
    }

    return result;
  }, [selectedAirline, searchQuery, sortBy]);

  // Reset filter when empty
  const handleResetFilters = () => {
    setSelectedAirline("all");
    setSearchQuery("");
    setSortBy("recomended");
  };

  return (
    <div style={{ backgroundColor: "#f1f5f9", minHeight: "calc(100vh - 60px)" }}>
      <main className={styles.pageWrapper}>
        {/* Search & Route Section */}
        <RouteSearch
          origin={origin}
          destination={destination}
          cities={CITIES}
          onOriginChange={setOrigin}
          onDestinationChange={setDestination}
          onSwapRoutes={handleSwapRoutes}
          flightDate={flightDate}
          onFlightDateChange={setFlightDate}
          cabinClass={cabinClass}
          onCabinClassChange={setCabinClass}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={() => setSearchQuery("")}
          totalTickets={filteredTickets.length}
        />

        {/* Date Selector Carousel */}
        <DateStrip
          dates={DATES}
          selectedDate={flightDate}
          onSelectDate={setFlightDate}
        />

        {/* Filters and Sorting Toolbar */}
        <FilterToolbar
          selectedAirline={selectedAirline}
          onAirlineSelect={setSelectedAirline}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Ticket List */}
        <div className={styles.containerCardsTicket}>
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onSelectTicket={(t) => {
                  setSelectedTicket(t);
                  alert(
                    `Anda memilih tiket ${t.airlineName} (${t.flightCode}) - Rp ${t.price.toLocaleString("id-ID")}`
                  );
                }}
              />
            ))
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <h3 className={styles.emptyTitle}>Tiket Tidak Ditemukan</h3>
              <p className={styles.emptyDesc}>
                Tidak ada tiket yang sesuai dengan filter atau kata kunci
                pencarian Anda. Coba ganti filter maskapai atau kata kunci.
              </p>
              <button
                type="button"
                className={styles.btnResetFilter}
                onClick={handleResetFilters}
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>

        {/* Travel Information Banner */}
        <InfoBanner />
      </main>
    </div>
  );
}
