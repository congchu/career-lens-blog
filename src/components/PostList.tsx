"use client";

import { useState } from "react";
import { PostMeta } from "@/lib/types";
import PostCard from "./PostCard";
import SeriesFilter from "./SeriesFilter";

export default function PostList({ posts }: { posts: PostMeta[] }) {
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);

  const filtered = selectedSeries
    ? posts.filter((p) => p.series === selectedSeries)
    : posts;

  return (
    <>
      <section id="series" className="mb-8">
        <SeriesFilter
          selected={selectedSeries}
          onSelect={setSelectedSeries}
        />
      </section>
      <section className="divide-y divide-gray-200">
        {filtered.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-12">
            해당 시리즈의 글이 아직 없습니다.
          </p>
        )}
      </section>
    </>
  );
}
