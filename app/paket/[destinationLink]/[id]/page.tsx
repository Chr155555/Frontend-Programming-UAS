import { notFound } from "next/navigation";
import { PAKET_DATA } from "../../data/paket";
import DetailClientView from "./components/DetailClientView";

interface PageProps {
  params: Promise<{
    destinationLink: string;
    id: string;
  }>;
}

export default async function PaketDetailPage({ params }: PageProps) {
  const { destinationLink, id } = await params;

  const destination = PAKET_DATA.find(
    (item) => item.destinationLink.toLowerCase() === destinationLink.toLowerCase()
  );

  if (!destination) {
    notFound();
  }

  const pkg = destination.packages.find(
    (p) => p.id.toLowerCase() === id.toLowerCase()
  );

  if (!pkg) {
    notFound();
  }

  return <DetailClientView destination={destination} pkg={pkg} />;
}