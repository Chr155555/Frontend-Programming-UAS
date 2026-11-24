"use client";

import { useState } from "react";
import PaketAbout from "./components/PaketAbout";
import PaketList from "./components/DestinationList";
import styles from "./paket.module.css";

export default function PaketPage() {
	const [filterRegion] = useState<string>("Semua");

	return (
		<main className={styles.PaketContainer}>
			<PaketAbout />
			<div id="Paket-list-section">
				<PaketList filterRegion={filterRegion} />
			</div>
		</main>
	);
}
