import { useState, useMemo, useEffect, useCallback } from 'react';
// models
import { Post } from '@models/post';
import { Category } from '@models/category';

export type SortOrder = 'newest' | 'oldest';

interface UseFilteredPostsOptions {
  posts: Post[];
  postsPerPage?: number;
  favoriteIds: number[];
}

export interface UseFilteredPostsReturn {
  filteredPosts: Post[];
  currentPagePosts: Post[];
  currentPage: number;
  totalPages: number;
  selectedCategory: Category | null;
  sortOrder: SortOrder;
  showFavorites: boolean;
  setActiveCategory: (category: Category | null) => void;
  setSortOrder: (order: SortOrder) => void;
  setShowFavorites: (show: boolean) => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  setCurrentPage: (page: number) => void;
}

export function useFilteredPosts({
  posts,
  postsPerPage = 12,
  favoriteIds,
}: UseFilteredPostsOptions): UseFilteredPostsReturn {
  // Local state for filtering, sorting, and pagination
  const [currentPage, setCurrentPage] = useState<number>(() => {
    if (typeof window === 'undefined') return 1;
    const stored = sessionStorage.getItem('currentPage');
    return stored ? Number(stored) : 1;
  });

  const [sortOrder, setSortOrder] = useState<SortOrder>(() => {
    if (typeof window === 'undefined') return 'newest';
    const stored = sessionStorage.getItem('sortOrder');
    return stored === 'oldest' ? 'oldest' : 'newest';
  });

  const [showFavorites, setShowFavorites] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const stored = sessionStorage.getItem('showFavorites');
    return stored === 'true';
  });

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    () => {
      if (typeof window === 'undefined') return null;
      const stored = sessionStorage.getItem('selectedCategory');
      if (stored) {
        try {
          return JSON.parse(stored) as Category;
        } catch (error) {
          console.error(
            'Error parsing selectedCategory from sessionStorage',
            error
          );
          return null;
        }
      }
      return null;
    }
  );

  // Update sessionStorage on state change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('currentPage', String(currentPage));
    }
  }, [currentPage]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('sortOrder', sortOrder);
    }
  }, [sortOrder]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('showFavorites', String(showFavorites));
    }
  }, [showFavorites]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('selectedCategory', JSON.stringify(selectedCategory)); // prettier-ignore
    }
  }, [selectedCategory]);

  // Reset paginacji przy zmianie filtrów lub sortowania
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortOrder, showFavorites]);

  // Filtering and sorting posts
  const filteredPosts = useMemo(() => {
    let filtered = posts;
    if (selectedCategory) {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }
    if (showFavorites) {
      filtered = filtered.filter((post) => favoriteIds.includes(post.id));
    }
    // Return a new sorted array to avoid in-place mutation
    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [posts, favoriteIds, selectedCategory, sortOrder, showFavorites]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const currentPagePosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(startIndex, startIndex + postsPerPage);
  }, [filteredPosts, currentPage, postsPerPage]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const setActiveCategory = useCallback(
    (category: Category | null) => {
      if (selectedCategory === category) {
        setSelectedCategory(null);
      } else {
        setSelectedCategory(category);
      }
    },
    [selectedCategory]
  );

  return {
    filteredPosts,
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
    setCurrentPage,
  };
}
