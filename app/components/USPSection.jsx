"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  DoorOpen, 
  UserCheck, 
  Wallet, 
  ShieldCheck, 
  ClipboardCheck, 
  Clock 
} from "lucide-react";

import styles from "./usp.module.css";

const uspItems = [
  {
    icon: <DoorOpen className="w-8 h-8" />,
    title: "Doorstep Services",
    x: -120,
    y: -100,
    delay: 0,
  },
  {
    icon: <UserCheck className="w-8 h-8" />,
    title: "Verified Experts",
    x: 80,
    y: -140,
    delay: 0.2,
  },
  {
    icon: <Wallet className="w-8 h-8" />,
    title: "Fair Services Charges",
    x: -200,
    y: 20,
    delay: 0.4,
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Guaranteed Results",
    x: 150,
    y: -20,
    delay: 0.6,
  },
  {
    icon: <ClipboardCheck className="w-8 h-8" />,
    title: "Adherence to SOPs",
    x: -100,
    y: 160,
    delay: 0.8,
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "60 mins Arrival Time",
    x: 100,
    y: 120,
    delay: 1.0,
  },
];

export default function USPSection() {
  return (
    <section className={styles.uspSection}>
      <div className={styles.container}>
        {/* Left Side: Animated Cards */}
        <div className={styles.animationSide}>
          {uspItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, x: 0, y: 0 }}
              whileInView={{ 
                opacity: 1, 
                scale: 1,
                x: item.x,
                y: item.y
              }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: item.delay,
                type: "spring",
                stiffness: 100,
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: item.delay,
                }
              }}
              animate={{
                y: [item.y, item.y + 10, item.y],
              }}
              className={styles.uspCard}
            >
              <div className={styles.iconWrapper}>
                {item.icon}
              </div>
              <span className={styles.cardTitle}>
                {item.title}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Right Side: Content */}
        <div className={styles.contentSide}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.title}
          >
            Our Unique Selling Points <br />
            Make Us the Most Reliable Choice
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={styles.description}
          >
            We understand your fears about letting a stranger come inside your home. 
            We know that you cannot trust just any Tom, Dick, Or Harry with your home 
            possessions and your family's safety. That is why we have come up with 
            services that cater to all your fears and concerns.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
