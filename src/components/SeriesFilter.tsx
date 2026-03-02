"use client";

import { SERIES_LIST } from "@/lib/types";

interface SeriesFilterProps {
  selected: string | null;
  onSelect: (series: string | null) => void;
}

export default function SeriesFilter({
  selected,
  onSelect,
}: SeriesFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selected === null
            ? "bg-primary text-white"
            : "bg-white text-gray-600 border border-gray-200 hover:border-primary/30 hover:text-primary"
        }`}
      >
        전체
      </button>
      {SERIES_LIST.map((series) => (
        <button
          key={series}
          onClick={() => onSelect(series)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selected === series
              ? "bg-primary text-white"
              : "bg-white text-gray-600 border border-gray-200 hover:border-primary/30 hover:text-primary"
          }`}
        >
          {series}
        </button>
      ))}
    </div>
  );
}
