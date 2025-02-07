import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import styled from 'styled-components';
import { LAYOUT_BREAKPOINTS } from 'utils/constants';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const FallbackContainer = styled.div`
  padding-left: ${({ theme }) => theme.padding.xs};
  padding-right: ${({ theme }) => theme.padding.xs};
  background-color: ${({ theme }) => theme.colors.background1};
  color: ${({ theme }) => theme.colors.danger};

  @media (min-width: ${LAYOUT_BREAKPOINTS.xs}) {
    padding-left: ${({ theme }) => theme.padding.lg};
    padding-right: ${({ theme }) => theme.padding.lg};
  }
`;

function ErrorFallback() {
  return (
    <FallbackContainer>
      <h2>Something went wrong.</h2>
      <p>Please try again later.</p>
    </FallbackContainer>
  );
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        console.error('ErrorBoundary caught an error', error, info);
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
