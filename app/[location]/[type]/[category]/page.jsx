import Link from "next/link";
import { fetchServicesByLocationAndType, getCategoryParams } from "../../../../lib/queries.js";

export const dynamic = "force-static";

export async function generateStaticParams() {
  // Generate all location/type/category triples
  return getCategoryParams();
}

export default async function CategoryPage({ params }) {
  const { location, type, category } = await params;
  const services = await fetchServicesByLocationAndType({ locationSlug: location, typeSlug: type, categorySlug: category });

  return (
    <main className="pt-28 max-w-4xl mx-auto px-4">
      <h1 className="text-2xl font-semibold mb-4">
        {category} services — {type} in {location}
      </h1>
      <p className="text-gray-600 mb-6">Select a service:</p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {services.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/${location}/${type}/${category}/${s.slug}`}
              className="block rounded border p-3 hover:bg-gray-50"
            >
              {s.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}