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
  setActiveCategory: (category: Category) => void;
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
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null); // prettier-ignore
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Reset pagination when filter, sort order, or favorites filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortOrder, showFavorites]);

  // Apply filtering based on category and favorites flag
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
    (category: Category) => {
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
