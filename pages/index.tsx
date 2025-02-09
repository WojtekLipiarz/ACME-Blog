'use client';

import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';
// context
import { PostsProvider, usePosts } from '@context/PostsContext';
import { useFavorites } from '@context/FavoritesContext';
// hooks
import { useFilteredPosts } from '@hooks/useFilteredPosts';
// models
import { categoryMap } from '@models/category';
// components
import SEO from '@components/common/SEO';
import { ErrorFallback } from '@components/common/error/ErrorFallback';
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
  ShowOnDtWrapper,
  ShowOnMobileWrapper,
} from 'pagesStyles/blog.style';

// dynamic import
const DynamicPostListContainer = dynamic(
  () =>
    import('@containers/postListContainer/PostListContainer').then(
      (mod) => mod.PostListContainer
    ),
  {
    loading: () => <div>Ładowanie listy wpisów...</div>,
    ssr: false,
  }
);
const DynamicCategorySelect = dynamic(
  () =>
    import('@containers/categorySelect/CategorySelect').then(
      (mod) => mod.CategorySelect
    ),
  {
    loading: () => <div>Ładowanie listy wpisów...</div>,
    ssr: false,
  }
);

function HomePageContent() {
  const { posts, loading, error } = usePosts();
  const { favoriteIds } = useFavorites();

  // Użycie custom hooka do filtrowania, sortowania i paginacji.
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

  const renderActiveCategory = useCallback(() => {
    const categoryDataText = selectedCategory ? categoryMap[selectedCategory]?.text : null; // prettier-ignore
    if (!categoryDataText) return null;
    return (
      <ButtonText
        text={categoryDataText}
        color="featured"
        iconName="icon_close"
        iconColor="black"
        isActive={true}
        onClick={() => setActiveCategory(null)}
      />
    );
  }, [selectedCategory]);

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
            <DynamicCategorySelect
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
                <ShowOnDtWrapper>{renderActiveCategory()}</ShowOnDtWrapper>
              </ErrorBoundary>

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
            </Row2>

            <ErrorBoundary>
              <ShowOnMobileWrapper>
                {renderActiveCategory()}
              </ShowOnMobileWrapper>
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
            <DynamicPostListContainer
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
