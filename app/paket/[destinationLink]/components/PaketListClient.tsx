"use client";

import { useState } from "react";
import { DestinationData } from "../../data/paket";
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
				filteredPackages.map((pkg) => (
					<PaketCard
						key={pkg.id}
						pkg={pkg}
						appliedAsal={kotaAsal}
						destinationName={destination.name}
						destinationDestLink={destination.destinationLink}
					/>
				))
			) : (
				<div className="alert alert-warning text-center py-4" role="alert">
					Tidak ada paket yang sesuai dengan pencarian &quot;{searchQuery}&quot;.
				</div>
			)}
		</main>
	);
}