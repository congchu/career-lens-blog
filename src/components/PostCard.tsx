import Link from "next/link";
import { PostMeta } from "@/lib/types";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/posts/${post.slug}`} className="group block py-6">
      <article>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
            {post.series}
          </span>
          <time className="text-xs text-gray-400">{post.date}</time>
        </div>
        <h2 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors mb-1.5">
          {post.title}
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-1">
          {post.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs text-gray-400"
            >
              #{tag}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}
