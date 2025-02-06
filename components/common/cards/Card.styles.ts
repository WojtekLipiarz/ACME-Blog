import styled from 'styled-components';

interface CardContainerProps {
  isActive?: boolean;
}
// prettier-ignore
export const CardContainer = styled.div<CardContainerProps>`
  height: 300px;
  background-color: ${({ theme, isActive }) => isActive ? theme.colors.primary : theme.colors.grey300};
`;
