"use client";
import React from "react";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.columns}>
          <div className={styles.col}>
            <h4>HELP</h4>
            <ul>
              <li>Shipping</li>
              <li>Help & FAQ's</li>
              <li>About Us</li>
              <li>Blog</li>
              <li>Contact Us</li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4>RESOURCES</h4>
            <ul>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Services Policy</li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4>SERVICES</h4>
            <ul>
              <li>Carpenter</li>
              <li>Electrical Services</li>
              <li>Plumbing</li>
              <li>False Ceiling Services</li>
              <li>Home Painting</li>
              <li>Flooring Solutions</li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4>PRODUCTS</h4>
            <ul>
              <li>Beds</li>
              <li>Wardrobe</li>
              <li>LCD unit</li>
              <li>Kitchen</li>
              <li>Office Furniture</li>
              <li>Doors</li>
              <li>Decor</li>
            </ul>
          </div>

          <div className={styles.subscribe}>
            <h4>SUBSCRIBE NOW</h4>
            <p>
              Get exclusive updates on our latest furniture designs, interior
              tips, and special offers. <strong>Subscribe now!</strong>
            </p>

            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault(); 
              }}
            >
              <input
                type="email"
                placeholder="Email Address"
                aria-label="Email address"
              />
              <button type="submit">SUBSCRIBE &gt;</button>
            </form>

            <div className={styles.helpBtn}>Need Help? Chat with us</div>
          </div>
        </div>

        <div className={styles.hr} />

        <div className={styles.bottom}>
          <div className={styles.copyright}>
            © Copyright 2025 Wood Peckey. All rights reserved
          </div>
          <div className={styles.social}>
            <span className={styles.icon}>f</span>
            <span className={styles.icon}>x</span>
            <span className={styles.icon}>ig</span>
            <span className={styles.icon}>in</span>
          </div>
        </div>
      </div>
    </footer>
  );
} 