import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface FavoritesContextValue {
  favoriteIds: number[];
  toggleFavorite: (postId: number) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  // Load favorites from localStorage on initial mount.
  useEffect(() => {
    const stored = localStorage.getItem('favoriteIds');
    if (stored) {
      try {
        setFavoriteIds(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse favorites from localStorage', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change.
  useEffect(() => {
    localStorage.setItem('favoriteIds', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const toggleFavorite = (postId: number) => {
    setFavoriteIds((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook for easy access to the favorites context.
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
