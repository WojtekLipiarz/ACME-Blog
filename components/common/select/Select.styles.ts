import styled from 'styled-components';

export const SelectContainer = styled.div`
  label {
    color: ${({ theme }) => theme.colors.accent2};
    margin-right: 2.75rem;
  }
`;

export const SortSelect = styled.select`
  position: relative;
  padding: 0.25rem 0.5rem;
  border: 0;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #e5e5e5;
  margin: 0.75rem 0;
`;
