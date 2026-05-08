"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User, MessageCircle } from "lucide-react";
import styles from "./blog.module.css";

const blogPosts = [
  {
    id: 1,
    title: "10 Essential Home Maintenance Tips for Every Homeowner",
    excerpt: "Maintaining your home doesn't have to be overwhelming. Here are 10 essential tips to keep your property in top shape year-round.",
    category: "Maintenance",
    date: "April 25, 2026",
    author: "Admin",
  },
  {
    id: 2,
    title: "Why You Should Hire a Professional Plumber for Leak Repairs",
    excerpt: "DIY plumbing might seem cost-effective, but professional expertise saves you money and stress in the long run. Here's why.",
    category: "Plumbing",
    date: "April 20, 2026",
    author: "Expert Team",
  },
  {
    id: 3,
    title: "How to Prepare Your AC for the Upcoming Summer Heat",
    excerpt: "Don't wait for the first heatwave to test your AC. Follow our guide to ensure your cooling system is ready for the peak summer months.",
    category: "AC Services",
    date: "April 15, 2026",
    author: "Technical Support",
  },
  {
    id: 4,
    title: "Modern Electrical Safety Tips for Your Smart Home",
    excerpt: "Smart homes require modern safety standards. Learn how to protect your devices and family from electrical hazards.",
    category: "Electrical",
    date: "April 10, 2026",
    author: "Safety Expert",
  },
  {
    id: 5,
    title: "Choosing the Right Colors for Your Home Interior",
    excerpt: "Painting your home? Discover the trending colors of 2026 and how to choose the perfect palette for your living spaces.",
    category: "Painting",
    date: "April 05, 2026",
    author: "Design Team",
  },
  {
    id: 6,
    title: "Common Signs Your Roof Needs Professional Inspection",
    excerpt: "A small leak can lead to major damage. Identify the warning signs that indicate your roof needs immediate professional attention.",
    category: "Roofing",
    date: "March 28, 2026",
    author: "Admin",
  },
];

export default function BlogPage() {
  return (
    <main className={styles.blogContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="max-w-[1280px] mx-auto px-8 sm:px-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.heroTitle}
          >
            Our Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={styles.heroSubtitle}
          >
            Insights, tips, and expert advice to help you maintain and improve your home with confidence.
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <div className={styles.contentWrapper}>
        <div className={styles.blogGrid}>
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={styles.blogCard}
            >
              <div className={styles.imagePlaceholder}>
                <MessageCircle size={48} />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.category}>{post.category}</span>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <p className={styles.postExcerpt}>{post.excerpt}</p>
                
                <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={14} />
                    <span>{post.author}</span>
                  </div>
                </div>

                <a href={`/blog/${post.id}`} className={styles.readMore}>
                  Read Full Article
                  <ArrowRight size={18} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <button className={`${styles.pageBtn} ${styles.pageBtnActive}`}>1</button>
          <button className={styles.pageBtn}>2</button>
          <button className={styles.pageBtn}>3</button>
          <button className={styles.pageBtn}>Next</button>
        </div>
      </div>
    </main>
  );
}
