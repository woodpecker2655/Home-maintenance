"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "../../lib/image.js";
import { fetchCategoriesByLocationAndType } from "../../lib/queries.js";
import { useSelection } from "../context/SelectionContext.jsx";

export default function HomeCategories({ locationSlug, typeSlug }) {
  const { selection } = useSelection();
  locationSlug = locationSlug || selection.locationSlug;
  typeSlug = typeSlug || selection.typeSlug;
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);

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

  useEffect(() => {
    let alive = true;
    async function build() {
      if (!categories.length) {
        setCards([]);
        return;
      }
      const out = await Promise.all(
        categories.map(async (c) => {
          const imgUrl = c.image ? await urlForImage(c.image) : "";
          return { ...c, imgUrl };
        })
      );
      if (alive) setCards(out);
    }
    build();
    return () => {
      alive = false;
    };
  }, [categories]);

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
        {cards.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/${locationSlug}/${typeSlug}/${c.slug}`}
              className="group block h-full bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-emerald-500 transition-all duration-300"
            >
              {c.imgUrl ? (
                <div className="relative mb-4 w-full h-40 overflow-hidden rounded-lg">
                  <Image src={c.imgUrl} alt={c.name} fill className="object-cover" />
                </div>
              ) : (
                <div className="mb-4 w-full h-40 rounded-lg bg-emerald-50" />
              )}
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 mb-2">{c.name}</h3>
              <p className="text-sm text-gray-500">Explore professional {c.name.toLowerCase()} services in your area.</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
