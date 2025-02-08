import { css, styled } from 'styled-components';
import { SWIPER_BREAKPOINTS } from 'utils/constants';

const sectionBaseStyles = css`
  padding-left: ${({ theme }) => theme.layoutPadding.xs};
  padding-right: ${({ theme }) => theme.layoutPadding.xs};

  @media (min-width: ${SWIPER_BREAKPOINTS.TWO_ITEMS}px) {
    padding-left: ${({ theme }) => theme.layoutPadding.md};
    padding-right: ${({ theme }) => theme.layoutPadding.md};
  }
  @media (min-width: ${SWIPER_BREAKPOINTS.FOUR_ITEMS}px) {
    padding-left: ${({ theme }) => theme.layoutPadding.lg};
    padding-right: ${({ theme }) => theme.layoutPadding.lg};
  }
`;

export const Container = styled.main`
  padding-bottom: 2rem;

  @media (min-width: ${SWIPER_BREAKPOINTS.FOUR_ITEMS}px) {
    padding-bottom: 4rem;
  }
`;

const BaseSection = styled.div`
  ${sectionBaseStyles}
`;
export const Section1 = styled(BaseSection)`
  padding-top: 4.25rem;
  padding-bottom: 0.5rem;

  @media (min-width: ${SWIPER_BREAKPOINTS.TWO_ITEMS}px) {
    padding-bottom: 3.375rem;
  }
`;
export const Section2 = styled(BaseSection)`
  padding-top: 2.3rem;
  padding-bottom: 7.125rem;
  background-color: ${({ theme }) => theme.colors.background2};

  @media (min-width: ${SWIPER_BREAKPOINTS.TWO_ITEMS}px) {
    padding-top: 3.4rem;
    padding-bottom: 7.6rem;
  }
`;

export const Row1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3.8rem;

  @media (min-width: ${SWIPER_BREAKPOINTS.TWO_ITEMS}px) {
    align-items: center;
    margin-bottom: 0;
  }
`;

export const Row2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: ${SWIPER_BREAKPOINTS.TWO_ITEMS}px) {
    flex-direction: row;
  }
`;

export const FavoriteWrapper = styled.div`
  margin-bottom: 3.75rem;
`;

export const CategoryTitle = styled.div`
  display: none;

  @media (min-width: ${SWIPER_BREAKPOINTS.TWO_ITEMS}px) {
    display: block;
    margin-bottom: 3.125rem;
  }
`;
