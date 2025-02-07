import React from 'react';
import { TitleWrapper } from './Text.styles';

interface TitleProps {
  text: string;
  variant?: 'h1' | 'h2' | 'h3';
  color?: string;
  size?: number;
}

export const Title: React.FC<TitleProps> = ({
  text,
  variant = 'h1',
  color = 'accent2',
  size,
}) => {
  return (
    <TitleWrapper as={variant} $variant={variant} $color={color} $size={size}>
      {text}
    </TitleWrapper>
  );
};
