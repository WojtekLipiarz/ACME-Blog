'use client';

import React from 'react';
// context
import { PostsProvider, usePosts } from '@context/PostsContext';
import { useFavorites } from '@context/FavoritesContext';
// hooks
import { useFilteredPosts } from '@hooks/useFilteredPosts';
// containers
import { PostListContainer } from '@containers/postListContainer/PostListContainer';
// components
import { ErrorBoundary } from '@components/common/ErrorBoundary';
import SEO from '@components/common/SEO';
import { CategorySelect } from '@containers/categorySelect/CategorySelect';
import { Title } from '@components/common/text/Title';

function HomePageContent() {
  const { posts, loading, error } = usePosts();
  const { favoriteIds } = useFavorites();

  // Use the custom hook to manage filtering, sorting, and pagination.
  const {
    currentPagePosts,
    currentPage,
    totalPages,
    selectedCategory,
    sortOrder,
    showFavorites,
    setActiveCategory,
    setSortOrder,
    setShowFavorites,
    goToNextPage,
    goToPrevPage,
  } = useFilteredPosts({ posts, favoriteIds, postsPerPage: 12 });

  if (loading) {
    return <div>Loading posts...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <SEO
        title="ACME Blog - Home"
        description="Welcome to the ACME Blog, featuring articles on knowledge, inspirations, interpretations, and available topics."
        url="https://yourdomain.com"
        image="https://yourdomain.com/home-og-image.jpg"
      />

      <Title variant="h1" text="Blog Edukacyjny" />

      <CategorySelect
        selectedCategory={selectedCategory}
        onChange={setActiveCategory}
      />

      <PostListContainer
        currentPagePosts={currentPagePosts}
        currentPage={currentPage}
        totalPages={totalPages}
        sortOrder={sortOrder}
        showFavorites={showFavorites}
        setSortOrder={setSortOrder}
        setShowFavorites={setShowFavorites}
        goToNextPage={goToNextPage}
        goToPrevPage={goToPrevPage}
      />
    </>
  );
}
export default function HomePage() {
  return (
    <ErrorBoundary>
      <PostsProvider>
        <HomePageContent />
      </PostsProvider>
    </ErrorBoundary>
  );
}
