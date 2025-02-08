// comment 1:
// These values ​​can limit component reusability.
// They currently do not affect code quality, but it may turn out that they will need to be set conditionally

import styled from 'styled-components';
import { SWIPER_BREAKPOINTS } from 'utils/constants';

const swiperPaddingTop = 1.75;

export const CategorySelectWrapper = styled.div`
  /* Read comment 1 */
  @media (max-width: ${SWIPER_BREAKPOINTS.FOUR_ITEMS}px) {
    margin-left: -${({ theme }) => theme.layoutPadding.xs};
    margin-right: -${({ theme }) => theme.layoutPadding.xs};
  }

  .swiper {
    width: 100%;

    @media (max-width: ${SWIPER_BREAKPOINTS.FOUR_ITEMS}px) {
      padding-top: ${swiperPaddingTop}rem;
    }
  }
  .swiper-slide {
    display: flex;
    align-items: stretch;
    justify-content: center;
  }
  .swiper-pagination {
    top: 0;
    height: fit-content;
  }
  .swiper-pagination-bullet {
    opacity: 1;
    width: 1rem;
    height: 1rem;
    background-color: transparent;
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.accent1};
  }
  .swiper-pagination-bullet-active {
    background-color: ${({ theme }) => theme.colors.accent2};
    opacity: 1;
  }
`;

export const SliderControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ArrowWrapper = styled.div`
  @media (min-width: ${SWIPER_BREAKPOINTS.FOUR_ITEMS}px) {
    display: none;
  }

  button {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 2rem;
    padding: 0.5rem 0;
    color: ${({ theme }) => theme.colors.grey600};
    margin-top: ${swiperPaddingTop}rem;

    /* Read comment 1 */
    width: ${({ theme }) => theme.layoutPadding.xs};
  }
`;

export const CategorySelectItem = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  width: 100%;
`;
