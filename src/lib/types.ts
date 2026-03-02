export interface PostMeta {
  title: string;
  date: string;
  series: string;
  tags: string[];
  description: string;
  slug: string;
}

export interface Post extends PostMeta {
  content: string;
}

export const SERIES_LIST = [
  "숫자로보는채용시장",
  "채용공고번역기",
  "신입공략가이드",
  "2026프론트엔드지도",
  "AI시대생존법",
  "취업현실탐구",
] as const;

export type SeriesName = (typeof SERIES_LIST)[number];
