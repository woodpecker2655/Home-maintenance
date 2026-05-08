import Image from "next/image";
import { fetchServiceBySlugs, getServiceParams } from "../../../../../lib/queries.js";
import { urlForImage } from "../../../../../lib/image.js";
import styles from "../../../../service.module.css";
import { Star, Search, Plus, TrendingUp, CheckCircle2, DollarSign, PackageOpen } from "lucide-react";
import { PortableText } from "@portabletext/react";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return getServiceParams();
}

export default async function ServicePage({ params }) {
  const { location, type, category, service } = await params;
  const data = await fetchServiceBySlugs({ locationSlug: location, typeSlug: type, categorySlug: category, serviceSlug: service });

  const mainImgUrl = data?.image ? await urlForImage(data.image) : "";

  // Prepare variants with image URLs
  const variantsWithImages = data?.variants ? await Promise.all(
    data.variants.map(async (v) => ({
      ...v,
      imgUrl: v.image ? await urlForImage(v.image) : ""
    }))
  ) : [];

  return (
    <main className={styles.main}>
      {/* 1. Premium Blue Banner */}
      <section className={styles.heroBanner}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>{data?.title || service.replace(/-/g, ' ')}</h1>
          <p className={styles.heroSubtitle}>
            Professional {data?.title} & Restoration Services — Don't Replace, Restore it!
          </p>

          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              <Star className={styles.statIcon} size={24} fill="currentColor" />
              <div>
                <div className={styles.statLabel}>Average Rating</div>
                <div className={styles.statValue}>{data?.stats?.rating || "4.5/5"}</div>
              </div>
            </div>
            <div className={styles.statCard}>
              <TrendingUp className={styles.statIcon} size={24} />
              <div>
                <div className={styles.statLabel}>Start From</div>
                <div className={styles.statValue}>Rs. {data?.stats?.startFrom || data?.price || "300"}</div>
              </div>
            </div>
            <div className={styles.statCard}>
              <CheckCircle2 className={styles.statIcon} size={24} />
              <div>
                <div className={styles.statLabel}>Done Orders</div>
                <div className={styles.statValue}>{data?.stats?.doneOrders || "40,000+"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Sub Services / Variants Section */}
      <section className={styles.variantsSection}>
        <div className={styles.container}>
          <div className={styles.variantsCard}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{data?.title} Services</h2>
              <div className={styles.searchBox}>
                <Search className={styles.searchIcon} size={18} />
                <input type="text" placeholder="Search for sub-services..." />
              </div>
            </div>

            <div className={styles.variantsGrid}>
              {variantsWithImages.map((variant, idx) => (
                <div key={idx} className={styles.variantCard}>
                  <div className={styles.variantImage}>
                    {variant.imgUrl ? (
                      <Image src={variant.imgUrl} alt={variant.title} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#f8faf9] flex items-center justify-center text-[#598c76]">
                        <TrendingUp size={40} />
                      </div>
                    )}
                  </div>
                  <div className={styles.variantInfo}>
                    <h3 className={styles.variantTitle}>{variant.title}</h3>
                    <p className={styles.variantDesc}>{variant.description}</p>
                    <div className={styles.priceRow}>
                      <span className={styles.discountedPrice}>Rs. {variant.discountedPrice}</span>
                      <span className={styles.originalPrice}>Rs. {variant.originalPrice}</span>
                    </div>
                    <div className={styles.variantRating}>
                      <Star size={12} fill="currentColor" />
                      <span>{variant.rating || "4.8"}</span>
                    </div>
                  </div>
                  <div style={{ alignSelf: 'flex-end', marginTop: '1.5rem', width: '100%' }}>
                    <button className={styles.addButton}>
                      Book Now <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {variantsWithImages.length === 0 && (
              <div className={styles.emptyState}>
                <PackageOpen size={80} className={styles.emptyIcon} />
                <h3 className={styles.emptyTitle}>No Sub-Services Found</h3>
                <p className={styles.emptyText}>
                  We are currently updating our service list for {data?.title}. Please check back later or contact us for custom requirements.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Detailed Description Section */}
      <section className={styles.descriptionSection}>
        <div className={styles.container}>
          <div className={styles.richTextContent}>
            {data?.description ? (
              <PortableText value={data.description} />
            ) : (
              <div className="py-20 text-center text-gray-400">
                Detailed information for {data?.title} will be available soon.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}