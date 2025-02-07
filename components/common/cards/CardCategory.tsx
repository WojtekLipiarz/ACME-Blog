'use client';

import React from 'react';
// models
import { CategoryItem } from '@models/category';
import { CardProps } from '@models/card';
// styles
import { CardContainer } from './Card.styles';
import { Icon } from '../icon/Icon';

interface CardCategoryProps extends CardProps {
  data: CategoryItem;
  isActive?: boolean;
}

export const CardCategory: React.FC<CardCategoryProps> = ({
  data,
  isActive = false,
}) => {
  const { text, icon, color, bg } = data || {};
  return (
    <CardContainer $isActive={isActive} $color={color} $bg={bg}>
      <span>{text}</span>
      <Icon iconName={icon} color={color} size={53} />
    </CardContainer>
  );
};
