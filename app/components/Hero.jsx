"use client";
import React from "react";
import Image from "next/image";
import styles from "./hero.module.css";

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroWrapper}>
        {/* Background image */}
        <div className={styles.imageContainer}>
          <Image
            src="/images/hero1.jpg"
            alt="Expert Home Maintenance Services"
            fill
            className="object-cover"
            priority
          />
          <div className={styles.overlay} />
        </div>

        {/* Content */}
        <div className={styles.contentContainer}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>
              EXPERT HOME
              <br />
              <span className={styles.titleAccent}>MAINTENANCE SERVICES</span>
            </h1>
            <p className={styles.description}>
              Find the best professionals near you — Plumbers, Electricians, Carpenters & more.
              Quality work, trusted by thousands.
            </p>

            <div className={styles.buttonContainer}>
              <button
                onClick={() => document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' })}
                className={styles.ctaButton}
              >
                Find Services <span>›</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
