import { NextResponse } from "next/server";
import { db } from "@/db";
import { tickets } from "@/db/schema";
import { DATES } from "@/app/tiket/data/tickets";
import { DateOption } from "@/app/tiket/types";

export async function GET() {
  try {
    const rows = await db
      .select({
        date: tickets.date,
        price: tickets.price,
      })
      .from(tickets);

    const priceMap: Record<string, number> = {};
    for (const r of rows) {
      if (!priceMap[r.date] || r.price < priceMap[r.date]) {
        priceMap[r.date] = r.price;
      }
    }

    let minOverall = Infinity;
    for (const p of Object.values(priceMap)) {
      if (p < minOverall) minOverall = p;
    }

    const formatPrice = (val: number) => {
      return "Rp " + val.toLocaleString("id-ID");
    };

    const result: DateOption[] = DATES.map((item) => {
      const dbMin = priceMap[item.date];
      if (dbMin !== undefined) {
        return {
          ...item,
          priceFormatted: formatPrice(dbMin),
          isCheapest: dbMin === minOverall,
        };
      }
      return item;
    });

    return NextResponse.json({ success: true, data: result });
  } catch {
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data tanggal" },
      { status: 500 }
    );
  }
}
