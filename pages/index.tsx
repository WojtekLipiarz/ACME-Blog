'use client';

import React, { useMemo } from 'react';
// context
import { PostsProvider, usePosts } from '@context/PostsContext';
import { useFavorites } from '@context/FavoritesContext';
// hooks
import { useFilteredPosts } from '@hooks/useFilteredPosts';
// models
import { categoryMap } from '@models/category';
// containers
import { PostListContainer } from '@containers/postListContainer/PostListContainer';
import { CategorySelect } from '@containers/categorySelect/CategorySelect';
// components
import { ErrorBoundary } from '@components/common/ErrorBoundary';
import SEO from '@components/common/SEO';
import { Title } from '@components/common/text/Title';
import { ButtonText } from '@components/common/button/ButtonText';
import FavoriteFilter from '@components/common/favorite/FavoriteFilter';
import Select from '@components/common/select/Select';
import { styled } from 'styled-components';
import { SWIPER_BREAKPOINTS } from 'utils/constants';

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

  const categoryDataText = useMemo(
    () => (selectedCategory ? categoryMap[selectedCategory]?.text : null),
    [selectedCategory]
  );

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

      <Row1>
        <Row2>
          <Title variant="h2" text="Wpisy" />

          {categoryDataText && (
            <ButtonText
              text={categoryDataText}
              color="featured"
              iconName="icon_close"
              iconColor="black"
              isActive={true}
              onClick={() => setActiveCategory(null)}
            />
          )}
        </Row2>

        <Select
          label="pokaż od:"
          options={[
            { id: 'tmp', value: 'Najnowsze wpisy' },
            { id: 'tmp', value: 'Najnowsze wpisy' },
          ]}
          activeOption={sortOrder}
          onChange={(e: any) => setSortOrder(e)}
        />
      </Row1>

      <FavoriteFilter
        setShowFavorites={setShowFavorites}
        showFavorites={showFavorites}
      />

      <PostListContainer
        currentPagePosts={currentPagePosts}
        currentPage={currentPage}
        totalPages={totalPages}
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

export const Row1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3.8rem;

  @media (min-width: ${SWIPER_BREAKPOINTS.TWO_ITEMS}px) {
    align-items: center;
    margin-bottom: 0;
  }
`;

export const Row2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: ${SWIPER_BREAKPOINTS.TWO_ITEMS}px) {
    flex-direction: row;
  }
`;
