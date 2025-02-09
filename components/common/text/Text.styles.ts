import styled from 'styled-components';

interface TitleWrapperProps {
  $variant: 'h1' | 'h2' | 'h3';
  $size?: number;
  $color: string;
}

export const TitleWrapper = styled.h1<TitleWrapperProps>`
  font-weight: 700;
  color: ${({ theme, $color }) => theme.colors[$color] || $color};
  font-size: ${({ $size, $variant }) => {
    if ($size) {
      return `${$size}px`;
    }
    switch ($variant) {
      case 'h1':
        return '2rem';
      case 'h2':
        return '1.5rem';
      case 'h3':
        return '1.24rem';
      default:
        return '2rem';
    }
  }};
  line-height: ${({ $size, $variant }) => {
    if ($size) {
      return 'unset';
    }
    switch ($variant) {
      case 'h2':
        return '2.75rem';
      default:
        return 'unset';
    }
  }};
`;
