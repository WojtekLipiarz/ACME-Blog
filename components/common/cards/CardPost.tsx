'use client';

import React, { useMemo } from 'react';
// context
import { useFavorites } from '@context/FavoritesContext';
// models
import { categoryMap } from '@models/category';
import { Post } from '@models/post';
// components
import { Icon } from '@components/common/icon/Icon';
// styles
import {
  CardPostContainer,
  CategoryText,
  MoreWrapper,
  PostCardBody,
  PostCardDate,
  PostCardTitle,
} from './Card.styles';

export const CardPost: React.FC<Post> = ({
  id,
  category,
  title,
  createdAt,
  body,
}) => {
  const { favoriteIds } = useFavorites();

  const categoryData = useMemo(() => categoryMap[category], [category]);

  return (
    <CardPostContainer href={`/posts/${id}`}>
      <CategoryText $color={categoryData.bg}>
        {favoriteIds.includes(id) && (
          <Icon iconName="icon_favorite_active" color="accent6" size={12} />
        )}
        <span>{categoryData.text}</span>
      </CategoryText>

      <PostCardTitle>{title}</PostCardTitle>

      <PostCardDate>{new Date(createdAt).toLocaleDateString()}</PostCardDate>

      <PostCardBody>{body}</PostCardBody>

      <MoreWrapper>
        <span>zobacz więcej</span>
        <Icon iconName="arrow_right" color="black" size={12} />
      </MoreWrapper>
    </CardPostContainer>
  );
};
