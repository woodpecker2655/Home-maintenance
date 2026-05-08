"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "../../lib/image.js";
import styles from "./location.module.css";

export default function LocationGrid({ locations, currentCity }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function build() {
      const out = await Promise.all(
        locations.map(async (l) => {
          const imgUrl = l.image ? await urlForImage(l.image) : "";
          return { ...l, imgUrl };
        })
      );
      setCards(out);
    }
    build();
  }, [locations]);

  return (
    <div className={styles.grid}>
      {cards.map((l) => (
        <Link
          key={l.slug}
          href={`/${l.slug}`}
          className={`${styles.card} ${l.slug === currentCity ? styles.cardActive : ""}`}
        >
          {l.imgUrl ? (
            <div className={styles.iconWrapper} style={{ backgroundColor: 'transparent', padding: 0, overflow: 'hidden' }}>
              <Image src={l.imgUrl} alt={l.name} width={64} height={64} className="object-cover" />
            </div>
          ) : (
            <div className={styles.iconWrapper}>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{l.name[0]}</span>
            </div>
          )}
          <h2 className={styles.cardTitle}>{l.name}</h2>
          <p className={styles.cardDesc}>Explore services available in {l.name}.</p>
        </Link>
      ))}
    </div>
  );
}
