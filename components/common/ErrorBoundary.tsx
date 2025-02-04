import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import styled from 'styled-components';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const FallbackContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.backgroundErrorFallback};
  color: ${({ theme }) => theme.colors.errorText};
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
