"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "../../lib/image.js";
import { fetchCategoriesByLocationAndType } from "../../lib/queries.js";
import { useSelection } from "../context/SelectionContext.jsx";

import styles from "./categories.module.css";

export default function HomeCategories({ locationSlug, typeSlug }) {
  const { selection } = useSelection();
  locationSlug = locationSlug || selection.locationSlug;
  typeSlug = typeSlug || selection.typeSlug;
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function loadFromSanity() {
      if (!locationSlug || !typeSlug) {
        setCategories([]);
        return;
      }
      setLoading(true);
      try {
        const rows = await fetchCategoriesByLocationAndType(locationSlug, typeSlug);
        setCategories(rows || []);
      } catch (e) {
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }
    loadFromSanity();
  }, [locationSlug, typeSlug]);

  useEffect(() => {
    let alive = true;
    async function build() {
      if (!categories.length) {
        setCards([]);
        return;
      }
      const out = await Promise.all(
        categories.map(async (c) => {
          const imgUrl = c.image ? await urlForImage(c.image) : "";
          return { ...c, imgUrl };
        })
      );
      if (alive) setCards(out);
    }
    build();
    return () => {
      alive = false;
    };
  }, [categories]);

  if (!locationSlug || !typeSlug) {
    return (
      <div className={styles.welcomeContainer}>
        <h2 className={styles.welcomeTitle}>Welcome!</h2>
        <p className={styles.welcomeText}>Please select your location and service type to see available categories.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.welcomeText}>Finding the best services for you...</p>
      </div>
    );
  }

  if (!categories.length && !loading && locationSlug && typeSlug) {
    return (
      <div className={styles.noServices}>
        <p className={styles.noServicesTitle}>No services found.</p>
        <p className={styles.noServicesText}>We are currently not available in {locationSlug} for {typeSlug} services.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>
          {typeSlug} Services in {locationSlug}
        </h2>
        <p className={styles.headerSubtitle}>Select a category to explore services</p>
      </div>
      
      <ul className={styles.grid}>
        {cards.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/${locationSlug}/${typeSlug}/${c.slug}`}
              className={styles.card}
            >
              {c.imgUrl ? (
                <div className={styles.imageWrapper}>
                  <Image src={c.imgUrl} alt={c.name} fill className="object-cover" />
                </div>
              ) : (
                <div className={styles.imagePlaceholder} />
              )}
              <h3 className={styles.cardTitle}>{c.name}</h3>
              <p className={styles.cardDescription}>Explore professional {c.name.toLowerCase()} services in your area.</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
