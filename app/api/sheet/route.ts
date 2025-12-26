import { NextResponse } from "next/server";

// Configure your Google Sheet
const SHEET_ID = "1J8RFovPT8xodCf9MaCDWKtCyJjUR1g0-yht3BePnMdM"; // from provided link
const GID = "0"; // first sheet tab
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;

function slugify(input: string) {
  return (input || "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function parseCsv(text: string): Record<string, string>[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (!lines.length) return [];
  const headers = lines[0]
    .split(",")
    .map((h) => h.trim().toLowerCase().replace(/\s+/g, "_"));
  const rows: Record<string, string>[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",");
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => {
      row[h] = (cols[idx] || "").trim();
    });
    rows.push(row);
  }
  return rows;
}

export async function GET() {
  try {
    const res = await fetch(CSV_URL, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: `Sheet fetch failed: ${res.status}` }, { status: 500 });
    }
    const csv = await res.text();
    const rows = parseCsv(csv);

    // Normalize common keys if present
    const normalized = rows.map((r) => {
      const location = r.location || r.city || r.area || r["location_name"] || "";
      const type = r.type || r.service_type || "";
      const category = r.category || r.cat || "";
      const service = r.service || r.sub_service || r.title || "";
      const description = r.description || r.details || "";
      const price = r.price || r.cost || "";
      return {
        raw: r,
        location,
        type,
        category,
        service,
        description,
        price,
        slugs: {
          location: slugify(location),
          type: slugify(type),
          category: slugify(category),
          service: slugify(service),
        },
      };
    });

    return NextResponse.json({ ok: true, rows: normalized });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}

