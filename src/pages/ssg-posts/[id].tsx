import { IPost } from "@/interfaces/api/post.interface";
import Post from "../posts/[id]";

export default Post;

// SSR - Run on build time - can't be in combination with getServerSideProps
export async function getStaticPaths() {
  const res = await fetch("https://dummyjson.com/posts");
  const { posts } = await res.json();

  const paths = posts.map((post: IPost) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: false };
}

// SSR - Run on build time - can't be in combination with getServerSideProps
export async function getStaticProps({ params }: { params: { id: string } }) {
  const res = await fetch(`https://dummyjson.com/posts/${params.id}`);
  const post = await res.json();

  return {
    props: {
      post,
    },
  };
}
