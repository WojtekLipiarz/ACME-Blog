'use client';

import React from 'react';
import { useFavorites } from '@context/FavoritesContext';

interface FavoriteToggleProps {
  postId: number;
}

const FavoriteToggle: React.FC<FavoriteToggleProps> = ({ postId }) => {
  const { favoriteIds, toggleFavorite } = useFavorites();

  return (
    <button onClick={() => toggleFavorite(postId)}>
      {favoriteIds.includes(postId)
        ? 'Remove from Favorites'
        : 'Add to Favorites'}
    </button>
  );
};

export default FavoriteToggle;
