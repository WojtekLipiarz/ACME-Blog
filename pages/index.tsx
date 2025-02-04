import React from 'react';
// context
import { PostsProvider } from '@context/PostsContext';
// containers
import { PostListContainer } from '@containers/PostListContainer/PostListContainer';
// components
import { ErrorBoundary } from '@components/common/ErrorBoundary';

export default function HomePage() {
  return (
    <ErrorBoundary>
      <PostsProvider>
        <PostListContainer />
      </PostsProvider>
    </ErrorBoundary>
  );
}
