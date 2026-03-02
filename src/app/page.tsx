import { getAllPosts } from "@/lib/posts";
import { PostMeta } from "@/lib/types";
import PostList from "@/components/PostList";

export default function HomePage() {
  const posts = getAllPosts();
  const postMetas: PostMeta[] = posts.map(
    ({ title, date, series, tags, description, slug }) => ({
      title,
      date,
      series,
      tags,
      description,
      slug,
    })
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <section className="mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          커리어렌즈
        </h1>
        <p className="text-gray-500">
          데이터로 읽는 채용 시장, 커리어 인사이트를 전합니다.
        </p>
      </section>
      <PostList posts={postMetas} />
    </div>
  );
}
