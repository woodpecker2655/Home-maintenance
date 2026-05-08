 "use client";
 import { useEffect, useMemo, useState } from "react";
 import Image from "next/image";
 import { fetchLocations, fetchTypes } from "../../lib/queries.js";
 import { urlForImage } from "../../lib/image.js";
 import { useSelection } from "../context/SelectionContext.jsx";
 import { useRouter } from "next/navigation";
 
 import styles from "./filterbar.module.css";

export default function FilterBar() {
  const { selection, setSelection } = useSelection();
  const [locOptions, setLocOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [openLoc, setOpenLoc] = useState(false);
  const [openType, setOpenType] = useState(false);
  const router = useRouter();

 useEffect(() => {
   // Auto-open only one dropdown at a time to avoid overlap mess
   if (!selection.locationSlug) {
     setOpenLoc(true);
     setOpenType(false);
   } else if (!selection.typeSlug) {
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
    setOpenLoc(false);
    if (!selection.typeSlug) setOpenType(true);
  };
 const selectType = (value) => {
    const next = { locationSlug: selection.locationSlug, typeSlug: value };
    setSelection(next);
    setOpenType(false);
  };

 const needsSelection = !selection.locationSlug || !selection.typeSlug;

  return (
   <div className={styles.wrapper}>
     {needsSelection && (
       <div className={styles.overlay} aria-hidden="true" onClick={() => {
         setOpenLoc(false);
         setOpenType(false);
       }} />
     )}
     <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.filterGroup}>
          <label className={styles.label}>Select City</label>
          <button
            className={styles.button}
            onClick={() => {
              setOpenLoc((v) => !v);
              setOpenType(false);
            }}
            aria-haspopup="listbox"
            aria-expanded={openLoc}
          >
            {currentLoc?.imgUrl ? (
              <Image src={currentLoc.imgUrl} alt={currentLoc.label} width={28} height={28} className="rounded" />
            ) : (
              <div className={styles.iconPlaceholder} />
            )}
            <span className={styles.buttonLabel}>{currentLoc?.label || "Select City..."}</span>
            <span className={styles.arrow}>▼</span>
          </button>
          {openLoc && (
            <ul className={styles.dropdown} role="listbox">
              {locOptions.map((o) => (
                <li
                  key={o.value}
                  role="option"
                  aria-selected={o.value === selection.locationSlug}
                  className={`${styles.dropdownItem} ${o.value === selection.locationSlug ? styles.dropdownItemActive : ""}`}
                  onClick={() => selectLoc(o.value)}
                >
                  {o.imgUrl ? (
                    <Image src={o.imgUrl} alt={o.label} width={32} height={32} className="rounded-lg" />
                  ) : (
                    <div className={styles.iconPlaceholder} />
                  )}
                  <span className={styles.buttonLabel}>{o.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.label}>Service Type</label>
          <button
            className={styles.button}
            onClick={() => {
              setOpenType((v) => !v);
              setOpenLoc(false);
            }}
            aria-haspopup="listbox"
            aria-expanded={openType}
          >
            <div className={styles.typeIcon} />
            <span className={styles.buttonLabel}>{currentType?.label || "Select Type..."}</span>
            <span className={styles.arrow}>▼</span>
          </button>
          {openType && (
            <ul className={styles.dropdown} role="listbox">
              {typeOptions.map((o) => (
                <li
                  key={o.value}
                  role="option"
                  aria-selected={o.value === selection.typeSlug}
                  className={`${styles.dropdownItem} ${o.value === selection.typeSlug ? styles.dropdownItemActive : ""}`}
                  onClick={() => selectType(o.value)}
                >
                  <div className={styles.typeIcon} />
                  <span className={styles.buttonLabel}>{o.label}</span>
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
