import { IPost } from "@/interfaces/api/post.interface";
import Link from "next/link";

export default function Blog({ posts }: { posts: IPost[] }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          [{[post.id]}]: <Link href={`/posts/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://dummyjson.com/posts");
  const { posts } = await res.json();

  return {
    props: {
      posts,
    },
  };
}
