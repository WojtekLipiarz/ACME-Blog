'use client';

import React from 'react';
import Image from 'next/image';
// models
import { CategoryItem } from '@models/category';
import { CardProps } from '@models/card';
// styles
import { CardCategoryContainer, CardCategoryContent } from './Card.styles';
import { Icon } from '../icon/Icon';

interface CardCategoryProps extends CardProps {
  data: CategoryItem;
  isActive?: boolean;
}

export const CardCategory: React.FC<CardCategoryProps> = ({
  data,
  isActive = false,
}) => {
  const { id, text, img, icon, color, bg } = data;
  return (
    <CardCategoryContainer $isActive={isActive} $color={color} $bg={bg}>
      <Image
        src={img}
        alt={`Grafika kategorii ${text}`}
        width={500}
        height={246}
        priority
      />
      <CardCategoryContent>
        <span>{text}</span>
        <Icon iconName={icon} color={color} size={53} />
      </CardCategoryContent>
    </CardCategoryContainer>
  );
};
