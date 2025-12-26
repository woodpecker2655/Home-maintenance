import Link from "next/link";
import { fetchTypes, fetchLocations } from "../../lib/queries.js";

export const dynamic = "force-static";

export async function generateStaticParams() {
  // Generate all location params
  const locs = await fetchLocations();
  return locs.map((l) => ({ location: l.slug }));
}

export default async function LocationPage({ params }) {
  const { location } = params;
  const types = await fetchTypes();

  return (
    <main className="pt-28 max-w-4xl mx-auto px-4">
      <h1 className="text-2xl font-semibold mb-4">Services in {location}</h1>
      <p className="text-gray-600 mb-6">Choose a service type:</p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {types.map((t) => (
          <li key={t.slug}>
            <Link
              href={`/${location}/${t.slug}`}
              className="block rounded border p-3 hover:bg-gray-50"
            >
              {t.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}