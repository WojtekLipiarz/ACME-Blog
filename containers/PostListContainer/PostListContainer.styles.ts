import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
`;

export const FilterBar = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
`;

export const SortSelect = styled.select`
  margin-left: 8px;
  padding: 4px 8px;
`;

export const FavoritesToggleLabel = styled.label`
  margin-left: 8px;
  font-size: 14px;
  input {
    margin-right: 4px;
  }
`;

export const PostsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
`;

export const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  margin: 24px 0;
`;

export const PageButton = styled.button`
  margin: 0 8px;
  padding: 8px 16px;
  cursor: pointer;
`;

export const PostCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 16px;
  background-color: #fff;
`;
