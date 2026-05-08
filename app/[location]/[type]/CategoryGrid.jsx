"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "../../../lib/image.js";
import { ChevronRight, LayoutGrid } from "lucide-react";
import styles from "./type.module.css";

export default function CategoryGrid({ categories, location, type }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function build() {
      const out = await Promise.all(
        categories.map(async (c) => {
          const imgUrl = c.image ? await urlForImage(c.image) : "";
          return { ...c, imgUrl };
        })
      );
      setCards(out);
    }
    build();
  }, [categories]);

  return (
    <div className={styles.grid}>
      {cards.map((c) => (
        <Link
          key={c.slug}
          href={`/${location}/${type}/${c.slug}`}
          className={styles.card}
        >
          <div className={styles.imageWrapper}>
            {c.imgUrl ? (
              <Image 
                src={c.imgUrl} 
                alt={c.name} 
                fill 
                className="object-cover"
              />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--primary-green-dark)' }}>
                <LayoutGrid size={48} />
              </div>
            )}
          </div>
          <div className={styles.cardContent}>
            <h2 className={styles.cardTitle}>{c.name}</h2>
            <div className={styles.cardFooter}>
              View Services <span><ChevronRight size={18} /></span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
