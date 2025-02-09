import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
// styles
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '@styles/GlobalStyles';
import { darkTheme, lightTheme } from '@styles/theme';
// hooks
import useScrollRestoration from '@hooks/useScrollRestoration';
// context
import { FavoritesProvider } from '@context/FavoritesContext';
// common
import { ErrorBoundary } from '@components/common/error/ErrorBoundary';
import Header from '@components/layout/Header';

function MyApp({ Component, pageProps }: AppProps) {
  useScrollRestoration();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // I wanted to test a solution with sessionStorage instead of global context.
  // I am not fully satisfied with this solution.
  // In the case of an application that is going to be released in production, I would refactor it to a global application context
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
    }
    setIsInitialized(true);
  }, []);

  if (isInitialized === false) return null;
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <ErrorBoundary>
        <FavoritesProvider>
          <GlobalStyles />
          <Header toggleDarkMode={toggleDarkMode} />
          <Component {...pageProps} />
        </FavoritesProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default MyApp;
