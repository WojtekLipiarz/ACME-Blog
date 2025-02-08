import styled, { css } from 'styled-components';
import Image from 'next/image';
import { SWIPER_BREAKPOINTS } from 'utils/constants';
import Link from 'next/link';

export const PostContainer = styled.main`
  max-width: 1200px;
  padding-top: 4.25rem;

  padding-left: ${({ theme }) => theme.layoutPadding.xs};
  padding-right: ${({ theme }) => theme.layoutPadding.xs};
  padding-bottom: 2rem;

  @media (min-width: ${SWIPER_BREAKPOINTS.TWO_ITEMS}px) {
    padding-left: ${({ theme }) => theme.layoutPadding.md};
    padding-right: ${({ theme }) => theme.layoutPadding.md};
  }
  @media (min-width: ${SWIPER_BREAKPOINTS.FOUR_ITEMS}px) {
    padding-left: ${({ theme }) => theme.layoutPadding.lg};
    padding-right: ${({ theme }) => theme.layoutPadding.lg};
    padding-bottom: 4rem;
  }
`;

export const PostHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.1rem;
  margin-bottom: 2rem;

  @media (min-width: ${SWIPER_BREAKPOINTS.THREE_ITEMS}px) {
    flex-direction: row;
    justify-content: space-between;
    /* gap: 1rem; */
    margin-bottom: 7.75rem;
  }
`;

interface PostSectionProps {
  $withMargin?: boolean;
}
export const PostSection = styled.section<PostSectionProps>`
  ${({ $withMargin }) =>
    $withMargin &&
    css`
      margin-bottom: 4.875rem;

      @media (min-width: ${SWIPER_BREAKPOINTS.TWO_ITEMS}px) {
        margin-bottom: 7.75rem;
      }
    `}
`;

export const PostSectioTitle = styled.h2`
  font-family: Open Sans;
  font-weight: 700;
  font-size: 1.75rem;
  line-height: 2.4rem;
  letter-spacing: 0%;
  margin-bottom: 2rem;

  color: ${({ theme }) => theme.colors.accent2};
`;

export const PostEntryText = styled.p`
  font-family: Open Sans;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.5rem;
  letter-spacing: 0%;
  color: ${({ theme }) => theme.colors.accent2};
  margin-top: 1.5rem;
`;

export const PostBody = styled.p`
  font-family: Open Sans;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.5rem;
  letter-spacing: 0%;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 4.25rem;
`;

export const PostImage = styled(Image)`
  border-top-left-radius: ${({ theme }) => theme.radius.lg};
  border-bottom-right-radius: ${({ theme }) => theme.radius.lg};
`;

export const PostBackLinkContent = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 1.4rem;

  font-family: Open Sans;
  font-weight: 700;
  font-size: 2rem;
  line-height: 2.7rem;
  letter-spacing: 0%;
  color: ${({ theme }) => theme.colors.accent2};
`;
