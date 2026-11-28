import { NextResponse } from "next/server";
import { db } from "@/db";
import { tickets } from "@/db/schema";
import { DATES } from "@/app/tiket/data/tickets";
import { DateOption } from "@/app/tiket/types";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const origin = searchParams.get("origin");
        const destination = searchParams.get("destination");

        const rows = await db
            .select({
                date: tickets.date,
                price: tickets.price,
                originCode: tickets.originCode,
                destinationCode: tickets.destinationCode,
            })
            .from(tickets);

        const filteredRows = rows.filter(
            (r) =>
                (!origin || r.originCode === origin) &&
                (!destination || r.destinationCode === destination)
        );

        const targetRows = filteredRows.length > 0 ? filteredRows : rows;

        const priceMap: Record<string, number> = {};
        for (const r of targetRows) {
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

        let cheapestFound = false;

        const result: DateOption[] = DATES.map((item) => {
            const dbMin = priceMap[item.date];
            if (dbMin !== undefined) {
                const isMin = dbMin === minOverall && !cheapestFound;
                if (isMin) cheapestFound = true;
                return {
                    ...item,
                    priceFormatted: formatPrice(dbMin),
                    isCheapest: isMin,
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
