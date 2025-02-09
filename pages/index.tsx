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
import SEO from '@components/common/SEO';
import { ErrorBoundary } from '@components/common/error/ErrorBoundary';
import { Title } from '@components/common/text/Title';
import { ButtonText } from '@components/common/button/ButtonText';
import FavoriteFilter from '@components/common/favorite/FavoriteFilter';
import Select from '@components/common/select/Select';
// styles
import {
  CategoryTitle,
  Container,
  FavoriteWrapper,
  Row1,
  Row2,
  Section1,
  Section2,
} from './index.styles';
import { ErrorFallback } from '@components/common/error/ErrorFallback';

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
    return <ErrorFallback error={error} />;
  }
  return (
    <>
      <SEO
        title="ACME Blog - Home"
        description="Welcome to the ACME Blog, featuring articles on knowledge, inspirations, interpretations, and available topics."
        url="https://yourdomain.com"
        image="https://yourdomain.com/home-og-image.jpg"
      />

      <Container>
        <Section1>
          <Title variant="h1" text="Blog Edukacyjny" />
        </Section1>

        <ErrorBoundary>
          <Section2>
            <CategoryTitle>
              <Title variant="h2" text="Kategorie" />
            </CategoryTitle>

            <CategorySelect
              selectedCategory={selectedCategory}
              onChange={setActiveCategory}
            />
          </Section2>
        </ErrorBoundary>

        <Section1>
          <Row1>
            <Row2>
              <Title variant="h2" text="Wpisy" />

              <ErrorBoundary>
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
              </ErrorBoundary>
            </Row2>

            <ErrorBoundary>
              <Select
                label="pokaż od:"
                options={[
                  { id: 'newest', value: 'Najnowsze wpisy' },
                  { id: 'oldest', value: 'Najstarsze wpisy' },
                ]}
                activeOption={sortOrder}
                onChange={(e: any) => setSortOrder(e)}
              />
            </ErrorBoundary>
          </Row1>

          <ErrorBoundary>
            <FavoriteWrapper>
              <FavoriteFilter
                setShowFavorites={setShowFavorites}
                showFavorites={showFavorites}
              />
            </FavoriteWrapper>
          </ErrorBoundary>

          <ErrorBoundary>
            <PostListContainer
              currentPagePosts={currentPagePosts}
              currentPage={currentPage}
              totalPages={totalPages}
              goToNextPage={goToNextPage}
              goToPrevPage={goToPrevPage}
            />
          </ErrorBoundary>
        </Section1>
      </Container>
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
