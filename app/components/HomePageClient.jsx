"use client";
import FilterBar from "./FilterBar";
import HomeCategories from "./HomeCategories";
import Affiliations from "./Affiliations";
import USPSection from "./USPSection";
import Testimonials from "./Testimonials";
import BookNowCTA from "./BookNowCTA";

import styles from "./home.module.css";
import { useSelection } from "../context/SelectionContext";

export default function HomePageClient() {
  const { selection } = useSelection();

  return (
    <main className={styles.main}>
      <div className={styles.topSection}>
        <FilterBar />
      </div>

      <div id="categories-section" className={styles.categoriesSection}>
        <div className={styles.categoriesCard}>
          <HomeCategories
            locationSlug={selection.locationSlug}
            typeSlug={selection.typeSlug}
          />
        </div>
      </div>

      <USPSection />
      <Testimonials />
      <BookNowCTA />
      <Affiliations />
    </main>
  );
}
