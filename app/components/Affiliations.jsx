"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";

import styles from "./affiliations.module.css";

const affiliations = [
  { name: "Partner 1", logo: "https://via.placeholder.com/200x100?text=Partner+1" },
  { name: "Partner 2", logo: "https://via.placeholder.com/200x100?text=Partner+2" },
  { name: "Partner 3", logo: "https://via.placeholder.com/200x100?text=Partner+3" },
  { name: "Partner 4", logo: "https://via.placeholder.com/200x100?text=Partner+4" },
  { name: "Partner 5", logo: "https://via.placeholder.com/200x100?text=Partner+5" },
  { name: "Partner 6", logo: "https://via.placeholder.com/200x100?text=Partner+6" },
];

export default function Affiliations() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Our Affiliations
        </h2>
        
        <Swiper
          modules={[Autoplay]}
          spaceBetween={50}
          slidesPerView={2}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          className={styles.swiperWrapper}
        >
          {affiliations.map((item, index) => (
            <SwiperSlide key={index}>
              <div className={styles.logoItem}>
                <img
                  src={item.logo}
                  alt={item.name}
                  className={styles.logoImage}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
