import styled from 'styled-components';
import { SWIPER_BREAKPOINTS } from 'utils/constants';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const PostsWrapper = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;

  @media (min-width: ${SWIPER_BREAKPOINTS.TWO_ITEMS}px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${SWIPER_BREAKPOINTS.THREE_ITEMS}px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${SWIPER_BREAKPOINTS.FOUR_ITEMS}px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
`;

export const PageButton = styled.button`
  cursor: pointer;
  margin: 0 8px;
  padding: 8px 16px;
  background-color: transparent;
  border: 0;
`;
