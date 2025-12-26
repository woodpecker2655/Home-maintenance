"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchCategoriesByLocationAndType } from "../../lib/queries.js";

export default function HomeCategories({ locationSlug, typeSlug }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadFromSanity() {
      if (!locationSlug || !typeSlug) {
        setCategories([]);
        return;
      }
      setLoading(true);
      try {
        const rows = await fetchCategoriesByLocationAndType(locationSlug, typeSlug);
        setCategories(rows || []);
      } catch (e) {
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }
    loadFromSanity();
  }, [locationSlug, typeSlug]);

  if (!locationSlug || !typeSlug) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome!</h2>
        <p className="text-gray-500">Please select your location and service type to see available categories.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600 mx-auto mb-4"></div>
        <p className="text-gray-500">Finding the best services for you...</p>
      </div>
    );
  }

  if (!categories.length && !loading && locationSlug && typeSlug) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-600 mb-2">No services found.</p>
        <p className="text-gray-500">We are currently not available in {locationSlug} for {typeSlug} services.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800 capitalize">
          {typeSlug} Services in {locationSlug}
        </h2>
        <p className="text-gray-500 mt-1">Select a category to explore services</p>
      </div>
      
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/${locationSlug}/${typeSlug}/${c.slug}`}
              className="group block h-full bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-emerald-500 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-emerald-600 group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 mb-2">{c.name}</h3>
              <p className="text-sm text-gray-500">Explore professional {c.name.toLowerCase()} services in your area.</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}