import { useState, useMemo, useEffect } from 'react';
import { Post } from '@models/post';

export type SortOrder = 'newest' | 'oldest';

interface UseFilteredPostsOptions {
  posts: Post[];
  postsPerPage?: number;
}

export interface UseFilteredPostsReturn {
  filteredPosts: Post[];
  currentPagePosts: Post[];
  currentPage: number;
  totalPages: number;
  selectedCategory: string;
  sortOrder: SortOrder;
  setSelectedCategory: (category: string) => void;
  setSortOrder: (order: SortOrder) => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  setCurrentPage: (page: number) => void;
}

export function useFilteredPosts({
  posts,
  postsPerPage = 12,
}: UseFilteredPostsOptions): UseFilteredPostsReturn {
  // Local state for filtering, sorting, and pagination
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Reset pagination when filter or sort order changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortOrder]);

  // Filter and sort posts deterministically
  const filteredPosts = useMemo(() => {
    const filtered = selectedCategory
      ? posts.filter((post) => post.category === selectedCategory)
      : posts;
    // Return a new sorted array to avoid mutating the original posts array
    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [posts, selectedCategory, sortOrder]);

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

  return {
    filteredPosts,
    currentPagePosts,
    currentPage,
    totalPages,
    selectedCategory,
    sortOrder,
    setSelectedCategory,
    setSortOrder,
    goToNextPage,
    goToPrevPage,
    setCurrentPage,
  };
}
