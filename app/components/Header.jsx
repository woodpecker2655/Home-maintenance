"use client";
import React, { useState, useEffect } from "react";
import styles from "./header.module.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { fetchCategoriesByLocationAndType, fetchServicesByLocationAndType, fetchTypes } from "../../lib/queries";
import { ChevronDown } from "lucide-react";

export default function Header() {
    const pathname = usePathname();
    const [dropdownData, setDropdownData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [dropdownTitle, setDropdownTitle] = useState("Services");

    // Extract params from pathname
    // Pattern: /[location]/[type]/[category]/[service]
    const pathParts = pathname.split('/').filter(Boolean);
    const location = pathParts[0];
    const type = pathParts[1];
    const category = pathParts[2];

    useEffect(() => {
        async function loadDropdownContent() {
            setIsLoading(true);
            try {
                if (category && type && location) {
                    // On Category or Service page -> Show Services of this category
                    const services = await fetchServicesByLocationAndType({ 
                        locationSlug: location, 
                        typeSlug: type, 
                        categorySlug: category 
                    });
                    setDropdownData(services.map(s => ({
                        label: s.title,
                        href: `/${location}/${type}/${category}/${s.slug}`
                    })));
                    setDropdownTitle("Services");
                } else if (type && location) {
                    // On Type page -> Show Categories of this type
                    const categories = await fetchCategoriesByLocationAndType(location, type);
                    setDropdownData(categories.map(c => ({
                        label: c.name,
                        href: `/${location}/${type}/${c.slug}`
                    })));
                    setDropdownTitle("Categories");
                } else if (location) {
                    // On Location page -> Show Service Types
                    const types = await fetchTypes();
                    setDropdownData(types.map(t => ({
                        label: t.name,
                        href: `/${location}/${t.slug}`
                    })));
                    setDropdownTitle("Service Types");
                } else {
                    // On Home or other pages -> Show Best Categories (General)
                    // For now, let's show all types as entry points
                    const types = await fetchTypes();
                    setDropdownData(types.map(t => ({
                        label: t.name,
                        href: `/karachi/${t.slug}` // Defaulting to Karachi if nothing selected
                    })));
                    setDropdownTitle("Our Services");
                }
            } catch (error) {
                console.error("Error loading dropdown data:", error);
                setDropdownData([]);
            } finally {
                setIsLoading(false);
            }
        }

        loadDropdownContent();
    }, [pathname, location, type, category]);

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <Link href="/" className={styles.brand}>
                    <Image src="/assets/logo-Home-maintenance.webp" alt="Home Maintenance Logo" width={200} height={46} priority />
                </Link>

                <nav className={styles.pill} aria-label="Main navigation">
                    <ul className={styles.navList}>
                        <li>
                            <Link href="/" className={`${styles.navLink} ${pathname === '/' ? styles.navLinkActive : ''}`}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className={`${styles.navLink} ${pathname === '/about' ? styles.navLinkActive : ''}`}>
                                About Us
                            </Link>
                        </li>
                        
                        <li className={styles.navItem}>
                            <div className={`${styles.navLink} ${styles.hasDropdown}`}>
                                {dropdownTitle} <ChevronDown size={14} />
                            </div>
                            <div className={styles.dropdown}>
                                {isLoading ? (
                                    <div className={styles.dropdownLoading}>Loading...</div>
                                ) : dropdownData.length > 0 ? (
                                    <ul className={styles.dropdownList}>
                                        {dropdownData.slice(0, 8).map((item, idx) => (
                                            <li key={idx} className={styles.dropdownItem}>
                                                <Link href={item.href} className={styles.dropdownLink}>
                                                    {item.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className={styles.dropdownEmpty}>No items found</div>
                                )}
                            </div>
                        </li>
                        <li>
                            <Link href="/blog" className={`${styles.navLink} ${pathname === '/blog' ? styles.navLinkActive : ''}`}>
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link href="/contacts" className={`${styles.navLink} ${pathname === '/contacts' ? styles.navLinkActive : ''}`}>
                                Contacts
                            </Link>
                        </li>
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
