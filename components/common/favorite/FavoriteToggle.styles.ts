import styled from 'styled-components';

// prettier-ignore
export const FavoriteContainer = styled.button`
  cursor: pointer;  
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  background-color: transparent;
  border: 0;
  
  span {
    color: ${({ theme }) => theme.colors.accent2};
    font-size: 1.125rem;
    font-weight: 700;
  }
`;
