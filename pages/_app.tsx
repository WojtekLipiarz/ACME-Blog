import type { AppProps } from 'next/app';
import { useState } from 'react';
// styles
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '@styles/GlobalStyles';
import { darkTheme, lightTheme } from '@styles/theme';
// common
import { ErrorBoundary } from '@components/common/ErrorBoundary';
// context
import { FavoritesProvider } from '@context/FavoritesContext';

function MyApp({ Component, pageProps }: AppProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <ErrorBoundary>
        <FavoritesProvider>
          <GlobalStyles />

          <button
            type="button"
            onClick={toggleDarkMode}
            style={{ position: 'absolute', top: 16, right: 16 }}
          >
            Toggle Dark Mode
          </button>

          <Component {...pageProps} />
        </FavoritesProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default MyApp;
