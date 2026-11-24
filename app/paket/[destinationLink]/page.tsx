import { notFound } from "next/navigation";
import { PAKET_DATA } from "../data/paket";
import PaketListClient from "./components/PaketListClient";

interface PageProps {
	params: Promise<{
	destinationLink: string;
	}>;
}

export default async function DestinationPaketPage({ params }: PageProps) {
	const { destinationLink } = await params;

	const destination = PAKET_DATA.find(
		(item) => item.destinationLink.toLowerCase() === destinationLink.toLowerCase()
	);

	if (!destination) {
		notFound();
	}

	return <PaketListClient destination={destination} />;
}