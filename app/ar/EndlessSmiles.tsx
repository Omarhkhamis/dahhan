"use client";

import { useState } from "react";

type Item = {
  textAr: string;
  textEn: string;
  before: string;
  after: string;
};

export default function EndlessSmiles({ items, lang }: { items: Item[]; lang: "ar" | "en" }) {
  const [index, setIndex] = useState(0);
  const current = items[index] || { textAr: "", textEn: "", before: "", after: "" };

  function next() {
    setIndex((i) => (i + 1) % items.length);
  }
  function prev() {
    setIndex((i) => (i - 1 + items.length) % items.length);
  }

  if (!items.length) return null;

  return (
    <div>
      <p className="section-text">{lang === "ar" ? current.textAr : current.textEn}</p>
      <div className="slider">
        <img src={current.before} alt="before" />
        <img src={current.after} alt="after" />
      </div>
      <div className="slider-controls">
        <button className="arrow-btn" onClick={prev} aria-label="previous">⟵</button>
        <button className="arrow-btn" onClick={next} aria-label="next">⟶</button>
      </div>
    </div>
  );
}
