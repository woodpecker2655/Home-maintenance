"use client";
import { useState } from "react";
import FilterPopup from "./FilterPopup";
import Hero from "./Hero";
import HomeCategories from "./HomeCategories";

export default function HomePageClient() {
  const [selection, setSelection] = useState({ locationSlug: "", typeSlug: "" });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Popup auto-opens on load; no button */}
      <FilterPopup onApply={(sel) => setSelection(sel)} />

      {/* Hero Section at the top */}
      <div className="pt-28 pb-10">
        <Hero />
      </div>

      {/* Categories area based on selection */}
      <div id="categories-section" className="max-w-[1280px] mx-auto px-8 sm:px-20 pb-20">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <HomeCategories
            locationSlug={selection.locationSlug}
            typeSlug={selection.typeSlug}
          />
        </div>
      </div>
    </main>
  );
}

