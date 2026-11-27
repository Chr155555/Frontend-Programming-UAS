"use client";

import { useEffect, useState } from "react";
import { DestinationData, PackageOption } from "../../data/paket";
import styles from "../daftar_paket.module.css";
import SearchFilterBar from "./SearchFilterBar";
import PaketCard from "./PaketCard";

interface Props {
    destination: DestinationData;
}

export default function PaketListClient({ destination }: Props) {
    const [kotaAsal, setKotaAsal] = useState("Jakarta");
    const [tanggalPergi, setTanggalPergi] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [favoriteKeys, setFavoriteKeys] = useState<string[]>([]);

    useEffect(() => {
        fetch("/api/pakets/favorites")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setFavoriteKeys(
                        data.map((item: { packageKey: string }) => item.packageKey)
                    );
                }
            })
            .catch(() => {});
    }, []);

    const handleToggleFavorite = async (pkg: PackageOption) => {
        try {
            const res = await fetch("/api/pakets/favorites", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    destinationLink: destination.destinationLink,
                    packageId: pkg.id,
                    title: pkg.title,
                    destinationName: destination.name,
                    duration: pkg.duration,
                    coverImage: pkg.coverImage,
                    price: pkg.price,
                }),
            });
            if (res.ok) {
                const result = await res.json();
                const key = result.packageKey as string;
                setFavoriteKeys((prev) =>
                    result.favorited
                        ? prev.includes(key)
                            ? prev
                            : [...prev, key]
                        : prev.filter((item) => item !== key)
                );
            }
        } catch {}
    };

    const filteredPackages = destination.packages.filter((pkg) =>
        pkg.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className={`${styles.pageWrapper} container`}>
            <SearchFilterBar
                destinationName={destination.name}
                kotaAsal={kotaAsal}
                setKotaAsal={setKotaAsal}
                tanggalPergi={tanggalPergi}
                setTanggalPergi={setTanggalPergi}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            {filteredPackages.length > 0 ? (
                filteredPackages.map((pkg) => {
                    const key = `${destination.destinationLink}:${pkg.id}`;
                    return (
                        <PaketCard
                            key={pkg.id}
                            pkg={pkg}
                            appliedAsal={kotaAsal}
                            destinationName={destination.name}
                            destinationDestLink={destination.destinationLink}
                            isFavorited={favoriteKeys.includes(key)}
                            onToggleFavorite={handleToggleFavorite}
                        />
                    );
                })
            ) : (
                <div className="alert alert-warning text-center py-4" role="alert">
                    Tidak ada paket yang sesuai dengan pencarian &quot;{searchQuery}&quot;.
                </div>
            )}
        </main>
    );
}
