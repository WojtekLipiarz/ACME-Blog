'use client';

import React from 'react';
// components
import { ButtonText } from '@components/common/button/ButtonText';
// styles
import { FavoriteFilterContainer, Separator } from './FavoriteFilter.styles';

interface FavoriteFilterProps {
  showFavorites: boolean;
  setShowFavorites: (show: boolean) => void;
}

const FavoriteFilter: React.FC<FavoriteFilterProps> = ({
  showFavorites,
  setShowFavorites,
}) => {
  return (
    <FavoriteFilterContainer>
      <ButtonText
        text="Wszystkie"
        color="featured"
        isActive={!showFavorites}
        onClick={() => setShowFavorites(false)}
      />

      <div>
        <Separator>/</Separator>

        <ButtonText
          text="Ulubione"
          color="featured"
          isActive={showFavorites}
          onClick={() => setShowFavorites(true)}
        />
      </div>
    </FavoriteFilterContainer>
  );
};

export default FavoriteFilter;
