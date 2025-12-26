import Link from "next/link";
import { fetchCategoriesByLocationAndType, getTypeParams } from "../../../lib/queries.js";

export const dynamic = "force-static";

export async function generateStaticParams() {
  // Generate all location/type pairs
  return getTypeParams();
}

export default async function TypePage({ params }) {
  const { location, type } = params;
  const categories = await fetchCategoriesByLocationAndType(location, type);

  return (
    <main className="pt-28 max-w-4xl mx-auto px-4">
      <h1 className="text-2xl font-semibold mb-4">
        {type} services in {location}
      </h1>
      <p className="text-gray-600 mb-6">Browse categories:</p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {categories.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/${location}/${type}/${c.slug}`}
              className="block rounded border p-3 hover:bg-gray-50"
            >
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}