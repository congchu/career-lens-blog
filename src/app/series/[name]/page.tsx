import { getAllSeries, getPostsBySeries } from "@/lib/posts";
import { SERIES_LIST } from "@/lib/types";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ name: string }>;
}

export async function generateStaticParams() {
  const activeSeries = getAllSeries();
  const allNames = Array.from(new Set([...SERIES_LIST, ...activeSeries]));
  return allNames.map((name) => ({ name }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { name } = await params;
  const decoded = decodeURIComponent(name);
  return {
    title: `${decoded} 시리즈`,
    description: `커리어렌즈의 "${decoded}" 시리즈 글을 모아봅니다.`,
  };
}

export default async function SeriesPage({ params }: PageProps) {
  const { name } = await params;
  const decoded = decodeURIComponent(name);
  const posts = getPostsBySeries(decoded);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <header className="mb-10">
        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-primary transition-colors"
        >
          ← 홈으로
        </Link>
        <h1 className="text-3xl font-extrabold text-gray-900 mt-3">
          {decoded}
        </h1>
        <p className="text-gray-500 mt-1">시리즈 모아보기 · {posts.length}편</p>
      </header>

      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="group flex items-start gap-4 bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center">
                {index + 1}
              </span>
              <div className="min-w-0">
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {post.description}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <time className="text-xs text-gray-400">{post.date}</time>
                  <div className="flex gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-400">이 시리즈의 글이 아직 없습니다.</p>
          <Link
            href="/"
            className="inline-block mt-4 text-sm text-primary hover:underline"
          >
            홈으로 돌아가기
          </Link>
        </div>
      )}
    </div>
  );
}
