import styled from 'styled-components';

export const FavoriteFilterContainer = styled.div`
  display: flex;
  gap: 2.8rem;

  div {
    display: flex;
    gap: 0.75rem;
  }
`;
export const Separator = styled.span`
  color: ${({ theme }) => theme.colors.featured};
  font-size: 1rem;
  font-weight: 700;
`;
