import { useRouter } from "next/router";
import { IPost } from "@/interfaces/api/post.interface";

export default function PostById({ post }: { post: IPost }) {
  const router = useRouter();

  return (
    <div>
      <h2>
        #{post.id} {post.title}
      </h2>
      <main>
        <p>{post.body}</p>
      </main>
      <div>
        <button onClick={router.back}>&lt;- Back</button>
      </div>
    </div>
  );
}

// SSR - Run on build time - can't be in combination with getServerSideProps
// export async function getStaticPaths() {
//   const res = await fetch("https://dummyjson.com/posts");
//   const { posts } = await res.json();

//   const paths = posts.map((post: IPost) => ({
//     params: { id: post.id.toString() },
//   }));

//   return { paths, fallback: false };
// }

// SSR - Run on build time - can't be in combination with getServerSideProps
// export async function getStaticProps({ params }: { params: { id: string } }) {
//   const res = await fetch(`https://dummyjson.com/posts/${params.id}`);
//   const post = await res.json();

//   return {
//     props: {
//       post,
//     },
//   };
// }

// SSR - Run on every request
export async function getServerSideProps({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(`https://dummyjson.com/posts/${params.id}`);
  const post = await res.json();

  return {
    props: {
      post,
    },
  };
}
