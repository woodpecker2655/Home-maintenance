"use client";
import React from "react";
import { motion } from "framer-motion";
import { CalendarCheck, ArrowRight } from "lucide-react";

import styles from "./booknow.module.css";

export default function BookNowCTA() {
  return (
    <section className={styles.ctaSection}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className={styles.ctaWrapper}
      >
        {/* Background Decorative Elements */}
        <div className={styles.decorTop} />
        <div className={styles.decorBottom} />

        <div className={styles.contentContainer}>
          <div className={styles.iconWrapper}>
            <CalendarCheck className="w-12 h-12 text-white" />
          </div>
          
          <h2 className={styles.title}>
            Ready to Experience <br />
            the Best Home Services?
          </h2>
          
          <p className={styles.description}>
            Don't wait for your home issues to get worse. Book a professional expert 
            today and enjoy a stress-free maintenance experience.
          </p>

          <div className={styles.buttonGroup}>
            <button className={styles.primaryButton}>
              Book Your Service Now
              <ArrowRight className="w-5 h-5 transition-transform" />
            </button>
            <button className={styles.secondaryButton}>
              Contact Support
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
