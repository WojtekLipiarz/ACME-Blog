'use client';

import React from 'react';
import { CardProps } from '@models/card';
import { CardContainer } from './Card.styles';

interface CardCategoryProps extends CardProps {
  categoryKey?: string;
  isActive?: boolean;
}

export const CardCategory: React.FC<CardCategoryProps> = ({
  categoryKey,
  isActive = false,
}) => {
  return (
    <CardContainer isActive={isActive}>
      <h3>{categoryKey}</h3>
    </CardContainer>
  );
};
