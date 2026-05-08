import { fetchCategoriesByLocationAndType, getTypeParams, fetchTypes } from "../../../lib/queries.js";
import styles from "./type.module.css";
import CategoryGrid from "./CategoryGrid";
import { PortableText } from "@portabletext/react";

export const dynamic = "force-static";

export async function generateStaticParams() {
  // Generate all location/type pairs
  return getTypeParams();
}

export default async function TypePage({ params }) {
  const { location, type } = await params;
  const [categories, allTypes] = await Promise.all([
    fetchCategoriesByLocationAndType(location, type),
    fetchTypes()
  ]);

  const currentTypeData = allTypes.find(t => t.slug === type);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {type} services in {location}
          </h1>
          <p className={styles.subtitle}>Browse through our professional service categories</p>
        </div>
        
        <CategoryGrid 
          categories={categories} 
          location={location} 
          type={type} 
        />

        {/* Detailed Description at Footer */}
        {currentTypeData?.description && (
          <div className="mt-20 pt-10 border-t border-gray-100 prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">About {currentTypeData.name} Services</h2>
            <div className="text-gray-600 leading-relaxed">
              <PortableText value={currentTypeData.description} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}