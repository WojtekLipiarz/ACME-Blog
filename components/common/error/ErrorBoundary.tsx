import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

function ErrorFallback() {
  // Two approaches:
  // 1. Displaying a message where the error boundary occurred
  // 2. Not displaying anything, just sending the analytics to the server
  return null;
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
