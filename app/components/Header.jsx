import React from "react";
import styles from "./header.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <Link href="/" className={styles.brand}>
                    <Image src="/assets/logo-Home-maintenance.webp" alt="Home Maintenance Logo" width={250} height={58} priority />
                </Link>

                <nav className={styles.pill} aria-label="Main navigation">
                    <ul className={styles.navList}>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">About Us</Link></li>
                        <li><Link href="/services">Services</Link></li>
                        <li><Link href="/products">Products</Link></li>
                        <li><Link href="/blog">Blog</Link></li>
                        <li><Link href="/contacts">Contacts</Link></li>
                    </ul>
                </nav>

                <div className={styles.actions}>
                    <button className={styles.iconBtn} aria-label="Wishlist">❤</button>
                    <button className={styles.iconBtn} aria-label="Cart">🛒</button>
                </div>
            </div>
        </header>
    );
}
