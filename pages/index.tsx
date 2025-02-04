import React from 'react';
// context
import { PostsProvider } from '@context/PostsContext';
// containers
import { PostListContainer } from '@containers/PostListContainer/PostListContainer';
// components
import { ErrorBoundary } from '@components/common/ErrorBoundary';
import SEO from '@components/common/SEO';

export default function HomePage() {
  return (
    <ErrorBoundary>
      <PostsProvider>
        <SEO
          title="ACME Blog - Home"
          description="Welcome to the ACME Blog, featuring articles on knowledge, inspirations, interpretations, and available topics."
          url="https://yourdomain.com"
          image="https://yourdomain.com/home-og-image.jpg"
        />

        <PostListContainer />
      </PostsProvider>
    </ErrorBoundary>
  );
}
