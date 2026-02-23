"use client";
import { useEffect, useMemo, useState } from "react";
import { fetchLocations, fetchTypes } from "../../lib/queries.js";
import { useSelection } from "../context/SelectionContext.jsx";
import { useRouter } from "next/navigation";

export default function FilterPopup({ onApply }) {
  const [open, setOpen] = useState(true);
  const [locationSlug, setLocationSlug] = useState("");
  const [typeSlug, setTypeSlug] = useState("");
  const { setSelection } = useSelection();
  const router = useRouter();

  // Auto-open on mount
  useEffect(() => {
    setOpen(true);
  }, []);

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadFromSanity() {
      setLoading(true);
      try {
        const [locs, tys] = await Promise.all([fetchLocations(), fetchTypes()]);
        // Normalize into rows-like objects to reuse memo logic
        const normalized = [];
        for (const l of locs) normalized.push({ location: l.name, slugs: { location: l.slug } });
        for (const t of tys) normalized.push({ type: t.name, slugs: { type: t.slug } });
        setRows(normalized);
      } catch (e) {
        setRows([]);
      } finally {
        setLoading(false);
      }
    }
    loadFromSanity();
  }, []);

  const locations = useMemo(() => {
    const uniq = new Map();
    for (const r of rows) {
      const key = r.slugs?.location;
      const label = r.location;
      if (key && label && !uniq.has(key)) uniq.set(key, label);
    }
    return Array.from(uniq, ([value, label]) => ({ value, label }));
  }, [rows]);

  const types = useMemo(() => {
    const uniq = new Map();
    for (const r of rows) {
      const key = r.slugs?.type;
      const label = r.type;
      if (key && label && !uniq.has(key)) uniq.set(key, label);
    }
    return Array.from(uniq, ([value, label]) => ({ value, label }));
  }, [rows]);

  const applyFilter = () => {
    if (!locationSlug || !typeSlug) {
      return;
    }
    setSelection({ locationSlug, typeSlug });
    if (typeof onApply === "function") onApply({ locationSlug, typeSlug });
    router.push(`/${locationSlug}/${typeSlug}`);
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl border border-gray-100">
            <div className="mb-6 flex items-center justify-between border-b pb-4">
              <h2 className="text-xl font-bold text-gray-900">Filter Services</h2>
            </div>

            <div className="space-y-5">
              {loading ? (
                <div className="flex items-center justify-center py-4 text-emerald-600">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
                  <span className="font-medium">Loading data…</span>
                </div>
              ) : null}
              <div>
                <label htmlFor="location" className="mb-2 block text-sm font-bold text-gray-900 uppercase tracking-wide">
                  Location
                </label>
                <select
                  id="location"
                  className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  value={locationSlug}
                  onChange={(e) => setLocationSlug(e.target.value)}
                >
                  <option value="" className="text-gray-500">Select a location…</option>
                  {locations.map((loc) => (
                    <option key={loc.value} value={loc.value} className="text-gray-900">
                      {loc.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="type" className="mb-2 block text-sm font-bold text-gray-900 uppercase tracking-wide">
                  Service Type
                </label>
                <select
                  id="type"
                  className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  value={typeSlug}
                  onChange={(e) => setTypeSlug(e.target.value)}
                >
                  <option value="" className="text-gray-500">Select a service type…</option>
                  {types.map((t) => (
                    <option key={t.value} value={t.value} className="text-gray-900">
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-8 flex items-center justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  onClick={() => {
                    setLocationSlug("");
                    setTypeSlug("");
                  }}
                >
                  Clear
                </button>
                <button
                  type="button"
                  className={`rounded-lg px-6 py-2.5 text-sm font-bold text-white shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                    locationSlug && typeSlug ? "bg-emerald-600 hover:bg-emerald-700" : "bg-gray-300 cursor-not-allowed"
                  }`}
                  onClick={applyFilter}
                  disabled={!locationSlug || !typeSlug}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
