// pages/posts/[id].tsx
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';
import Link from 'next/link';
import { Post } from '@models/post';
import { fetchPosts, fetchPost } from '@services/api';
import FavoriteToggle from '@components/common/FavoriteToggle';
import SEO from '@components/common/SEO';

interface PostPageProps {
  post: Post;
}

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  // Use a consistent locale and options for date formatting.
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '16px' }}>
      <SEO
        title={post.title}
        description={post.body.substring(0, 150)}
        url={`https://yourdomain.com/posts/${post.id}`}
        image={`https://yourdomain.com/posts/${post.id}/og-image.jpg`} // Adjust as needed
      />

      <Link href="/">← Back to Blog</Link>
      <h1>{post.title}</h1>
      <p>
        <strong>Category:</strong> {post.category}
      </p>
      <p>
        <strong>Published on:</strong> {formattedDate}
      </p>
      <p>{post.body}</p>
      <FavoriteToggle postId={post.id} />
    </div>
  );
};

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchPosts();
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
}) => {
  const { id } = params!;
  const postId = parseInt(id as string, 10);
  const post = await fetchPost(postId);

  return {
    props: { post },
    revalidate: 60, // ISR: revalidate every 60 seconds
  };
};
