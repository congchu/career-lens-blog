import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug, getAdjacentPosts } from "@/lib/posts";
import MDXContent from "@/components/MDXContent";
import TableOfContents from "@/components/TableOfContents";
import Link from "next/link";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-10">
        <Link
          href={`/series/${encodeURIComponent(post.series)}`}
          className="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-4 hover:bg-primary/20 transition-colors"
        >
          {post.series}
        </Link>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <time>{post.date}</time>
          <span>·</span>
          <div className="flex gap-1.5">
            {post.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
        </div>
      </header>

      {/* Content + TOC */}
      <div className="flex gap-10">
        <article className="flex-1 min-w-0">
          <MDXContent source={post.content} />
        </article>
        <aside className="w-56 flex-shrink-0">
          <TableOfContents content={post.content} />
        </aside>
      </div>

      {/* Prev / Next */}
      <nav className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prev ? (
          <Link
            href={`/posts/${prev.slug}`}
            className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-primary/20 transition-all"
          >
            <span className="text-xs text-gray-400">이전 글</span>
            <p className="text-sm font-semibold text-gray-700 group-hover:text-primary mt-1 line-clamp-1">
              {prev.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/posts/${next.slug}`}
            className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-primary/20 transition-all text-right"
          >
            <span className="text-xs text-gray-400">다음 글</span>
            <p className="text-sm font-semibold text-gray-700 group-hover:text-primary mt-1 line-clamp-1">
              {next.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}
