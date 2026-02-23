 "use client";
 import { createContext, useContext, useEffect, useMemo, useState } from "react";
 
 const SelectionContext = createContext({
   selection: { locationSlug: "", typeSlug: "" },
   setSelection: () => {},
 });
 
 export function SelectionProvider({ children }) {
   const [selection, setSelectionState] = useState({ locationSlug: "", typeSlug: "" });
 
   useEffect(() => {
     try {
       const raw = window.localStorage.getItem("hm_selection");
       if (raw) {
         const parsed = JSON.parse(raw);
         if (parsed && typeof parsed === "object") {
           setSelectionState({
             locationSlug: parsed.locationSlug || "",
             typeSlug: parsed.typeSlug || "",
           });
         }
       }
     } catch {}
   }, []);
 
   const setSelection = (sel) => {
     const next = {
       locationSlug: sel?.locationSlug || "",
       typeSlug: sel?.typeSlug || "",
     };
     setSelectionState(next);
     try {
       window.localStorage.setItem("hm_selection", JSON.stringify(next));
     } catch {}
   };
 
   const value = useMemo(() => ({ selection, setSelection }), [selection]);
   return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
 }
 
 export function useSelection() {
   return useContext(SelectionContext);
 }
