import React from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

// services
import { fetchPosts, fetchPost } from '@services/api';
// models
import { Post } from '@models/post';
// components
import SEO from '@components/common/SEO';
import FavoriteToggle from '@components/common/favorite/FavoriteToggle';
import { Icon } from '@components/common/icon/Icon';
import { Title } from '@components/common/text/Title';
import { ErrorBoundary } from '@components/common/error/ErrorBoundary';
import { ErrorFallback } from '@components/common/error/ErrorFallback';
// style
import {
  PostBackLinkContent,
  PostBody,
  PostContainer,
  PostEntryText,
  PostHeader,
  PostImage,
  PostSection,
  PostSectioTitle,
} from 'pagesStyles/post.style';

interface PostPageProps {
  post?: Post;
  error?: { message: string };
}

const PostPage: NextPage<PostPageProps> = ({ post, error }) => {
  if (error) {
    return <ErrorFallback error={error.message} />;
  }
  if (!post) {
    return <ErrorFallback error="'Nie znaleziono posta'" />;
  }

  return (
    <ErrorBoundary>
      <PostContainer>
        <SEO
          title={post.title}
          description={post.body.substring(0, 150)}
          url={`https://yourdomain.com/posts/${post.id}`}
          image={`https://yourdomain.com/posts/${post.id}/og-image.jpg`}
        />

        <PostHeader>
          <PostBackLinkContent href="/">
            <Icon iconName="arrow_left" color="black" size={32} />
            <span>Blog Edukacyjny</span>
          </PostBackLinkContent>

          <FavoriteToggle postId={post.id} />
        </PostHeader>

        <PostSection $withMargin={true}>
          <Title variant="h1" text={post.title} />

          {/* !!! TODO !!! */}
          {/* The endpoint needs to be updated */}
          <PostEntryText>
            Cras commodo, massa nec tempor posuere, sapien risus porttitor
            risus, vitae maximus dui felis sed mi. Maecenas rutrum malesuada
            urna, in luctus metus fringilla ac. Cras commodo, massa nec tempor
            posuere, sapien risus porttitor risus.
          </PostEntryText>
        </PostSection>

        <PostSection>
          {/* !!! TODO !!! */}
          {/* The endpoint needs to be updated */}{' '}
          <PostSectioTitle>Lorem ipsum</PostSectioTitle>
          <PostBody>{post.body}</PostBody>
          <PostImage
            src="https://picsum.photos/id/1/1208/680"
            alt="The Lorem Ipsum for photos."
            layout="responsive"
            width={1208}
            height={680}
            objectFit="contain"
          />
        </PostSection>
      </PostContainer>
    </ErrorBoundary>
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

  try {
    const post = await fetchPost(postId);
    return {
      props: { post },
      revalidate: 60, // ISR: revalidate every 60 seconds
    };
  } catch (error: any) {
    return {
      props: {
        error: {
          message: error.message || 'Wystąpił błąd przy pobieraniu posta',
        },
      },
      revalidate: 60,
    };
  }
};
