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
  "채용시장 데이터룸",
  "렌코치의 취준 가이드",
  "기술 트렌드 리포트",
  "렌코치의 한마디",
] as const;

export type SeriesName = (typeof SERIES_LIST)[number];
