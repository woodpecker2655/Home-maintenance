import Link from "next/link";
import { fetchServicesByLocationAndType, getCategoryParams, fetchCategoriesByLocationAndType } from "../../../../lib/queries.js";
import styles from "./category.module.css";
import { ChevronRight } from "lucide-react";
import { PortableText } from "@portabletext/react";

export const dynamic = "force-static";

export async function generateStaticParams() {
  // Generate all location/type/category triples
  return getCategoryParams();
}

export default async function CategoryPage({ params }) {
  const { location, type, category } = await params;
  const [services, allCategories] = await Promise.all([
    fetchServicesByLocationAndType({ locationSlug: location, typeSlug: type, categorySlug: category }),
    fetchCategoriesByLocationAndType(location, type)
  ]);

  const currentCategoryData = allCategories.find(c => c.slug === category);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {currentCategoryData?.name || category.replace(/-/g, ' ')}
          </h1>
          <p className={styles.subtitle}>
            Professional {type} maintenance in {location}
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/${location}/${type}/${category}/${s.slug}`}
              className={styles.card}
            >
              <span className={styles.cardTitle}>{s.title}</span>
              <ChevronRight className={styles.icon} size={20} />
            </Link>
          ))}
        </div>
        
        {services.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ color: '#999', fontSize: '1.25rem' }}>No services found in this category yet.</p>
          </div>
        )}

        {/* Detailed Description at Footer */}
        {currentCategoryData?.description && (
          <div className="mt-20 pt-10 border-t border-gray-100 prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Expert {currentCategoryData.name} in {location}</h2>
            <div className="text-gray-600 leading-relaxed">
              <PortableText value={currentCategoryData.description} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}