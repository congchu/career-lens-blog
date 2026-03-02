import Link from "next/link";
import { PostMeta } from "@/lib/types";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
            {post.series}
          </span>
          <time className="text-xs text-gray-400">{post.date}</time>
        </div>
        <h2 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors mb-2 line-clamp-2">
          {post.title}
        </h2>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {post.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}
