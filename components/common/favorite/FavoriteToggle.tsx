'use client';

import React, { useMemo } from 'react';
// context
import { useFavorites } from '@context/FavoritesContext';
// components
import { Icon } from '@components/common/icon/Icon';
// styles
import { FavoriteContainer } from './FavoriteToggle.styles';

interface FavoriteToggleProps {
  postId: number;
}

const FavoriteToggle: React.FC<FavoriteToggleProps> = ({ postId }) => {
  const { favoriteIds, toggleFavorite } = useFavorites();

  const isFavorite = useMemo(
    () => favoriteIds.includes(postId),
    [favoriteIds, postId]
  );

  const getContent = useMemo(() => {
    return {
      text: isFavorite ? 'dodaj do ulubionych' : 'usuń z ulubionych',
      iconName: isFavorite ? 'icon_favorite_active' : 'icon_favorite_inactive',
    };
  }, [favoriteIds, postId]);

  return (
    <FavoriteContainer onClick={() => toggleFavorite(postId)}>
      <Icon iconName={getContent.iconName} color="accent6" size={33} />
      <span>{getContent.text}</span>
    </FavoriteContainer>
  );
};

export default FavoriteToggle;
