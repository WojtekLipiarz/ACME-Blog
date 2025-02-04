// containers/PostListContainer/PostListContainer.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePosts } from '@context/PostsContext';
import { Post } from '@models/post';
import { useFavorites } from '@context/FavoritesContext';
import { useFilteredPosts } from '@hooks/useFilteredPosts';
import {
  Container,
  FilterBar,
  CategorySelect,
  SortSelect,
  FavoritesToggleLabel,
  PostsWrapper,
  PaginationControls,
  PageButton,
  PostCard,
} from './PostListContainer.styles';
import { CATEGORIES } from '@models/category';

export const PostListContainer: React.FC = () => {
  const { posts, loading, error } = usePosts();
  const { favoriteIds, toggleFavorite } = useFavorites();

  // Use the custom hook to manage filtering, sorting, and pagination.
  const {
    currentPagePosts,
    currentPage,
    totalPages,
    selectedCategory,
    sortOrder,
    showFavorites,
    setSelectedCategory,
    setSortOrder,
    setShowFavorites,
    goToNextPage,
    goToPrevPage,
  } = useFilteredPosts({ posts, favoriteIds, postsPerPage: 12 });

  if (loading) {
    return <Container>Loading posts...</Container>;
  }
  if (error) {
    return <Container>{error}</Container>;
  }

  return (
    <Container>
      <h1>Blog Posts</h1>

      {/* Filter and Sort Bar */}
      <FilterBar>
        <div>
          <label htmlFor="categorySelect">Category: </label>
          <CategorySelect
            id="categorySelect"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </CategorySelect>
        </div>
        <div style={{ marginLeft: '16px' }}>
          <label htmlFor="sortSelect">Sort by: </label>
          <SortSelect
            id="sortSelect"
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as 'newest' | 'oldest')
            }
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </SortSelect>
        </div>
        <div style={{ marginLeft: '16px' }}>
          <FavoritesToggleLabel>
            <input
              type="checkbox"
              checked={showFavorites}
              onChange={(e) => setShowFavorites(e.target.checked)}
            />
            Show only Favorites
          </FavoritesToggleLabel>
        </div>
      </FilterBar>

      {/* Posts Grid */}
      <PostsWrapper>
        {currentPagePosts.map((post: Post) => (
          <PostCard key={post.id}>
            <h2>{post.title}</h2>
            <p>Category: {post.category}</p>
            <p>ID: {post.id}</p>
            <p>
              {post.body.substring(0, 100)}...
              <br />
              <small>{new Date(post.createdAt).toLocaleDateString()}</small>
            </p>
            <button onClick={() => toggleFavorite(post.id)}>
              {favoriteIds.includes(post.id)
                ? 'Remove from Favorites'
                : 'Add to Favorites'}
            </button>
            <Link href={`/posts/${post.id}`}>Show more</Link>
          </PostCard>
        ))}
      </PostsWrapper>

      {totalPages > 1 && (
        <PaginationControls>
          <PageButton onClick={goToPrevPage} disabled={currentPage === 1}>
            Prev
          </PageButton>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <PageButton
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </PageButton>
        </PaginationControls>
      )}
    </Container>
  );
};
