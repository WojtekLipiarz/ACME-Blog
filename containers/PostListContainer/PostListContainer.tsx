'use client';

import React, { useState, useEffect, useRef, Fragment } from 'react';
// models
import { Post } from '@models/post';
// components
import { Icon } from '@components/common/icon/Icon';
import { CardPost } from '@components/common/cards/CardPost';
import { ErrorBoundary } from '@components/common/error/ErrorBoundary';
// styles
import {
  Container,
  PostsWrapper,
  PaginationControls,
  PageButton,
} from './PostListContainer.styles';

interface PostListContainerProps {
  currentPagePosts: Post[];
  currentPage: number;
  totalPages: number;
  goToNextPage: () => void;
  goToPrevPage: () => void;
}

const iconColor = 'black';
const iconColorDisabled = 'accent7';
const iconSize = 26;

export const PostListContainer: React.FC<PostListContainerProps> = ({
  currentPagePosts,
  currentPage,
  totalPages,
  goToNextPage,
  goToPrevPage,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    if (shouldScroll && bottomRef.current) {
      bottomRef.current.scrollIntoView();
      setShouldScroll(false);
    }
  }, [currentPagePosts, shouldScroll]);

  const handleNextPage = () => {
    setShouldScroll(true);
    goToNextPage();
  };

  const handlePrevPage = () => {
    setShouldScroll(true);
    goToPrevPage();
  };

  return (
    <Container>
      <PostsWrapper>
        {currentPagePosts.map((post: Post) => (
          <Fragment key={post.id}>
            <ErrorBoundary>
              <CardPost {...post} />
            </ErrorBoundary>
          </Fragment>
        ))}

        <div ref={bottomRef} />
      </PostsWrapper>

      {totalPages > 1 && (
        <PaginationControls>
          <PageButton onClick={handlePrevPage} disabled={currentPage === 1}>
            <Icon
              iconName="chevron_left"
              color={currentPage === 1 ? iconColorDisabled : iconColor}
              size={iconSize}
            />
          </PageButton>

          <span>
            Strona {currentPage} z {totalPages}
          </span>

          <PageButton
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <Icon
              iconName="chevron_right"
              color={currentPage === totalPages ? iconColorDisabled : iconColor}
              size={iconSize}
            />
          </PageButton>
        </PaginationControls>
      )}
    </Container>
  );
};
