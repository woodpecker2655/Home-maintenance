"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./location.module.css";

export default function LocationSelector({ currentCity, locations }) {
  const router = useRouter();

  const handleChange = (e) => {
    const newLoc = e.target.value;
    if (newLoc) {
      router.push(`/${newLoc}`);
    }
  };

  return (
    <div className={styles.changeLocation}>
      <label className={styles.locationLabel}>Change Location</label>
      <select 
        className={styles.locationSelect} 
        onChange={handleChange}
        value={currentCity}
      >
        {locations.map((loc) => (
          <option key={loc.slug} value={loc.slug}>
            {loc.name}
          </option>
        ))}
      </select>
    </div>
  );
}
