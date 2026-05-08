import Link from "next/link";
import { fetchTypes, fetchLocations } from "../../lib/queries.js";
import styles from "./location.module.css";
import LocationSelector from "./LocationSelector";
import LocationGrid from "./LocationGrid";
import { PortableText } from "@portabletext/react";
import { 
  Home, 
  Building2, 
  Factory,
  MapPin
} from "lucide-react";

export const dynamic = "force-static";

export async function generateStaticParams() {
  // Generate all location params
  const locs = await fetchLocations();
  return locs.map((l) => ({ location: l.slug }));
}

export default async function LocationPage({ params }) {
  const { location } = await params;
  const [types, locations] = await Promise.all([
    fetchTypes(),
    fetchLocations()
  ]);

  const currentLocData = locations.find(l => l.slug === location);

  const getIcon = (slug) => {
    if (slug === 'residential') return <Home size={32} />;
    if (slug === 'commercial') return <Building2 size={32} />;
    if (slug === 'industrial') return <Factory size={32} />;
    return <Home size={32} />;
  };

  const getDesc = (slug) => {
    if (slug === 'residential') return "Professional services for your home and personal living space.";
    if (slug === 'commercial') return "Tailored maintenance solutions for offices and business outlets.";
    if (slug === 'industrial') return "Heavy-duty maintenance for factories and warehouses.";
    return "Expert services for your specific needs.";
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Section 1: Service Type Selection */}
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <h1>Services in {location}</h1>
            <p>Choose the type of service you need</p>
          </div>
          <LocationSelector currentCity={location} locations={locations} />
        </div>

        <div className={styles.grid} style={{ marginBottom: '5rem' }}>
          {types.map((t) => (
            <Link
              key={t.slug}
              href={`/${location}/${t.slug}`}
              className={styles.card}
            >
              <div className={styles.iconWrapper}>
                {getIcon(t.slug)}
              </div>
              <h2 className={styles.cardTitle}>{t.name}</h2>
              <p className={styles.cardDesc}>{getDesc(t.slug)}</p>
            </Link>
          ))}
        </div>

        {/* Section 2: Location Selection Grid */}
        <div className={styles.header} style={{ borderTop: '1px solid var(--primary-green-light)', paddingTop: '4rem', borderBottom: 'none' }}>
          <div className={styles.titleSection}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <MapPin className="text-[#598c76]" size={32} />
              <h1 style={{ margin: 0 }}>Select Other Location</h1>
            </div>
            <p>Change your city to see services available in other areas</p>
          </div>
        </div>

        <LocationGrid locations={locations} currentCity={location} />

        {/* Section 3: Detailed Description at Footer */}
        {currentLocData?.description && (
          <div className="mt-20 pt-10 border-t border-gray-100 prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">About Our Services in {currentLocData.name}</h2>
            <div className="text-gray-600 leading-relaxed">
              <PortableText value={currentLocData.description} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}