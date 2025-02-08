'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
// services
import { fetchPosts } from '@services/api';
// models
import { Post } from '@models/post';

interface PostsContextValue {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

export const PostsContext = createContext<PostsContextValue>({
  posts: [],
  loading: false,
  error: null,
});

interface PostsProviderProps {
  children: React.ReactNode;
}

export const PostsProvider: React.FC<PostsProviderProps> = ({ children }) => {
  // Inicjalizujemy stan jako pustą tablicę
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedPosts = sessionStorage.getItem('posts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      // If there are no saved posts, we fetch them from API
      const getPosts = async () => {
        try {
          setLoading(true);
          const data = await fetchPosts();
          setPosts(data);
          sessionStorage.setItem('posts', JSON.stringify(data));
        } catch (err) {
          console.error('Error fetching posts:', err);
          setError('Failed to load posts');
        } finally {
          setLoading(false);
        }
      };
      getPosts();
    }
  }, []);

  return (
    <PostsContext.Provider value={{ posts, loading, error }}>
      {children}
    </PostsContext.Provider>
  );
};

export function usePosts() {
  return useContext(PostsContext);
}
