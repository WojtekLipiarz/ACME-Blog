import type { AppProps } from 'next/app';
import { useState } from 'react';
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
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

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
