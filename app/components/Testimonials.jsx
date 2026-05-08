"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

import styles from "./testimonials.module.css";

const testimonials = [
  {
    name: "Aisha Khan",
    role: "Home Owner",
    content: "The plumber arrived within 45 minutes and fixed the leak perfectly. Very professional and polite. Highly recommended!",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=aisha",
  },
  {
    name: "Zubair Ahmed",
    role: "Apartment Manager",
    content: "We use their electrical services for the entire building. They are always on time and follow all safety protocols.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=zubair",
  },
  {
    name: "Maria Jones",
    role: "Working Professional",
    content: "Excellent AC maintenance service. The team was very thorough and my unit is working better than ever. Worth every penny.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=maria",
  },
];

export default function Testimonials() {
  return (
    <section className={styles.testimonialSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.title}
          >
            What Our Customers Say
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={styles.subtitle}
          >
            Join thousands of satisfied customers who trust us for their home maintenance needs.
          </motion.p>
        </div>

        <div className={styles.grid}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={styles.card}
            >
              <div className={styles.quoteIcon}>
                <Quote size={48} />
              </div>
              
              <div className={styles.stars}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className={styles.starIcon} />
                ))}
              </div>

              <p className={styles.content}>
                "{testimonial.content}"
              </p>

              <div className={styles.author}>
                <div className={styles.avatarWrapper}>
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className={styles.authorInfo}>
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
