import styled from 'styled-components';
import { SWIPER_BREAKPOINTS } from 'utils/constants';

export const HeaderContainer = styled.header`
  /* position: sticky; */
  top: 0;
  z-index: 1000;
  background-color: ${({ theme }) => theme.colors.white};

  padding-top: 2rem;

  padding-left: ${({ theme }) => theme.layoutPadding.xs};
  padding-right: ${({ theme }) => theme.layoutPadding.xs};

  @media (min-width: ${SWIPER_BREAKPOINTS.TWO_ITEMS}px) {
    padding-left: ${({ theme }) => theme.layoutPadding.md};
    padding-right: ${({ theme }) => theme.layoutPadding.md};
  }
  @media (min-width: ${SWIPER_BREAKPOINTS.FOUR_ITEMS}px) {
    padding-top: 4rem;
    padding-left: ${({ theme }) => theme.layoutPadding.lg};
    padding-right: ${({ theme }) => theme.layoutPadding.lg};
  }
`;

export const StyledLogo = styled.img`
  max-width: 100%;
  height: auto;
`;
