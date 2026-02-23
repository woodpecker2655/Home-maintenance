"use client";
import { useState } from "react";
import FilterBar from "./FilterBar";
import HomeCategories from "./HomeCategories";

export default function HomePageClient() {
  const [selection, setSelection] = useState({ locationSlug: "", typeSlug: "" });

  return (
    <main className="min-h-screen bg-gray-50">
      <FilterBar />

      <div id="categories-section" className="pt-20 max-w-[1280px] mx-auto px-8 sm:px-20 pb-20">
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

