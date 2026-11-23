"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TicketDetailRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/tiket/t-7");
  }, [router]);

  return (
    <div style={{ backgroundColor: "#f1f5f9", minHeight: "calc(100vh - 60px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: "#0284c7", fontWeight: 600 }}>
        Mengarahkan ke detail penerbangan...
      </div>
    </div>
  );
}
