 "use client";
 import { useEffect, useMemo, useState } from "react";
 import Image from "next/image";
 import { fetchLocations, fetchTypes } from "../../lib/queries.js";
 import { urlForImage } from "../../lib/image.js";
 import { useSelection } from "../context/SelectionContext.jsx";
 import { useRouter } from "next/navigation";
 
 export default function FilterBar() {
   const { selection, setSelection } = useSelection();
   const [locOptions, setLocOptions] = useState([]);
   const [typeOptions, setTypeOptions] = useState([]);
   const [openLoc, setOpenLoc] = useState(false);
   const [openType, setOpenType] = useState(false);
   const router = useRouter();
 
  useEffect(() => {
    // Auto-open dropdown(s) on first visit
    if (!selection.locationSlug && !selection.typeSlug) {
      setOpenLoc(true);
      setOpenType(true);
    } else if (selection.locationSlug && !selection.typeSlug) {
      setOpenLoc(false);
      setOpenType(true);
    } else {
      setOpenLoc(false);
      setOpenType(false);
    }
  }, [selection.locationSlug, selection.typeSlug]);

   useEffect(() => {
     let alive = true;
     async function load() {
       try {
         const [locs, tys] = await Promise.all([fetchLocations(), fetchTypes()]);
         const locOut = await Promise.all(
           (locs || []).map(async (l) => ({
             value: l.slug,
             label: l.name,
             imgUrl: l.image ? await urlForImage(l.image) : "",
           }))
         );
         const typeOut = (tys || []).map((t) => ({ value: t.slug, label: t.name }));
         if (alive) {
           setLocOptions(locOut);
           setTypeOptions(typeOut);
         }
       } catch {
         setLocOptions([]);
         setTypeOptions([]);
       }
     }
     load();
     return () => {
       alive = false;
     };
   }, []);
 
   const currentLoc = useMemo(
     () => locOptions.find((o) => o.value === selection.locationSlug),
     [locOptions, selection.locationSlug]
   );
   const currentType = useMemo(
     () => typeOptions.find((o) => o.value === selection.typeSlug),
     [typeOptions, selection.typeSlug]
   );
 
  const selectLoc = (value) => {
     const next = { locationSlug: value, typeSlug: selection.typeSlug };
     setSelection(next);
    // Stay on home; categories update from context
     setOpenLoc(false);
   };
  const selectType = (value) => {
     const next = { locationSlug: selection.locationSlug, typeSlug: value };
     setSelection(next);
    // Stay on home; categories update from context
     setOpenType(false);
   };
 
  const needsSelection = !selection.locationSlug || !selection.typeSlug;

   return (
    <div className="relative">
      {needsSelection && (
        <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
      )}
      <div className="relative z-40 max-w-[1280px] mx-auto px-8 sm:px-20 pt-8">
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
         <div className="relative">
           <label className="mb-2 block text-sm font-bold text-gray-900 uppercase tracking-wide">Select City</label>
           <button
             className="w-full rounded-xl border border-gray-300 bg-white p-3 text-left shadow-sm flex items-center gap-3"
             onClick={() => setOpenLoc((v) => !v)}
             aria-haspopup="listbox"
             aria-expanded={openLoc}
           >
             {currentLoc?.imgUrl ? (
               <Image src={currentLoc.imgUrl} alt={currentLoc.label} width={28} height={28} className="rounded" />
             ) : (
               <div className="w-7 h-7 rounded bg-gray-200" />
             )}
             <span className="text-gray-900">{currentLoc?.label || "Select City..."}</span>
             <span className="ml-auto text-gray-500">▾</span>
           </button>
           {openLoc && (
             <ul
               className="absolute z-50 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-lg max-h-72 overflow-auto"
               role="listbox"
             >
               {locOptions.map((o) => (
                 <li
                   key={o.value}
                   role="option"
                   aria-selected={o.value === selection.locationSlug}
                   className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                   onClick={() => selectLoc(o.value)}
                 >
                   {o.imgUrl ? (
                     <Image src={o.imgUrl} alt={o.label} width={28} height={28} className="rounded" />
                   ) : (
                     <div className="w-7 h-7 rounded bg-gray-200" />
                   )}
                   <span className="text-gray-900">{o.label}</span>
                 </li>
               ))}
             </ul>
           )}
         </div>
 
         <div className="relative">
           <label className="mb-2 block text-sm font-bold text-gray-900 uppercase tracking-wide">Service Type</label>
           <button
             className="w-full rounded-xl border border-gray-300 bg-white p-3 text-left shadow-sm flex items-center gap-3"
             onClick={() => setOpenType((v) => !v)}
             aria-haspopup="listbox"
             aria-expanded={openType}
           >
             <div className="w-7 h-7 rounded bg-emerald-100" />
             <span className="text-gray-900">{currentType?.label || "Select Service Type..."}</span>
             <span className="ml-auto text-gray-500">▾</span>
           </button>
           {openType && (
             <ul
               className="absolute z-50 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-lg max-h-72 overflow-auto"
               role="listbox"
             >
               {typeOptions.map((o) => (
                 <li
                   key={o.value}
                   role="option"
                   aria-selected={o.value === selection.typeSlug}
                   className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                   onClick={() => selectType(o.value)}
                 >
                   <div className="w-7 h-7 rounded bg-emerald-100" />
                   <span className="text-gray-900">{o.label}</span>
                 </li>
               ))}
             </ul>
           )}
         </div>
       </div>
     </div>
     </div>
   );
 }
