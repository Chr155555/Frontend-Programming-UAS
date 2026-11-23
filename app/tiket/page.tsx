"use client";

import React, { useState, useMemo, useEffect } from "react";
import styles from "./tiket.module.css";
import { RouteSearch } from "./components/RouteSearch";
import { DateStrip } from "./components/DateStrip";
import { FilterToolbar } from "./components/FilterToolbar";
import { TicketCard } from "./components/TicketCard";
import { InfoBanner } from "./components/InfoBanner";
import { INITIAL_TICKETS, DATES, CITIES } from "./data/tickets";
import { AirlineType, SortType, CabinClass, Ticket, DateOption, CityOption } from "./types";

export default function TicketDashboardPage() {
  const [ticketList, setTicketList] = useState<Ticket[]>(INITIAL_TICKETS);
  const [dateList, setDateList] = useState<DateOption[]>(DATES);
  const [citiesList, setCitiesList] = useState<CityOption[]>(CITIES);
  const [origin, setOrigin] = useState<string>("CGK");
  const [destination, setDestination] = useState<string>("SIN");
  const [flightDate, setFlightDate] = useState<string>("2026-09-28");
  const [cabinClass, setCabinClass] = useState<CabinClass>("Ekonomi");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedAirline, setSelectedAirline] = useState<AirlineType>("all");
  const [sortBy, setSortBy] = useState<SortType>("recomended");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    fetch("/api/tickets")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setTicketList(res.data);
        }
      })
      .catch(() => {});

    fetch("/api/tickets/cities")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setCitiesList(res.data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch(`/api/tickets/dates?origin=${origin}&destination=${destination}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setDateList(res.data);
        }
      })
      .catch(() => {});
  }, [origin, destination]);

  const handleSwapRoutes = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const airlineCounts = useMemo(() => {
    const counts: Record<string, number> = { all: 0 };
    for (const t of ticketList) {
      if (
        (!origin || t.origin.code === origin) &&
        (!destination || t.destination.code === destination) &&
        (!cabinClass || t.cabinClass === cabinClass) &&
        (!flightDate || t.rawDate === flightDate || t.date.includes(flightDate))
      ) {
        counts.all = (counts.all || 0) + 1;
        counts[t.airline] = (counts[t.airline] || 0) + 1;
      }
    }
    return counts;
  }, [ticketList, origin, destination, cabinClass, flightDate]);

  const filteredTickets = useMemo(() => {
    let result = [...ticketList];

    if (origin) {
      result = result.filter((t) => t.origin.code === origin);
    }

    if (destination) {
      result = result.filter((t) => t.destination.code === destination);
    }

    if (cabinClass) {
      result = result.filter((t) => t.cabinClass === cabinClass);
    }

    if (flightDate) {
      result = result.filter(
        (t) => t.rawDate === flightDate || t.date.includes(flightDate)
      );
    }

    if (selectedAirline !== "all") {
      result = result.filter((t) => t.airline === selectedAirline);
    }

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
        break;
    }

    return result;
  }, [ticketList, origin, destination, cabinClass, flightDate, selectedAirline, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setOrigin("CGK");
    setDestination("SIN");
    setCabinClass("Ekonomi");
    setSelectedAirline("all");
    setSearchQuery("");
    setSortBy("recomended");
    setFlightDate("2026-09-28");
  };

  return (
    <div style={{ backgroundColor: "#f1f5f9", minHeight: "calc(100vh - 60px)" }}>
      <main className={styles.pageWrapper}>
        <RouteSearch
          origin={origin}
          destination={destination}
          cities={citiesList}
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

        <DateStrip
          dates={dateList}
          selectedDate={flightDate}
          onSelectDate={setFlightDate}
        />

        <FilterToolbar
          selectedAirline={selectedAirline}
          onAirlineSelect={setSelectedAirline}
          sortBy={sortBy}
          onSortChange={setSortBy}
          airlineCounts={airlineCounts}
        />

        <div className={styles.containerCardsTicket}>
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onSelectTicket={(t) => setSelectedTicket(t)}
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

        <InfoBanner />
      </main>
    </div>
  );
}
