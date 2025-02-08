import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useScrollRestoration = () => {
  const router = useRouter();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const saveScrollPos = (url: string) => {
      sessionStorage.setItem(
        `scrollPos:${url}`,
        JSON.stringify({ x: window.scrollX, y: window.scrollY })
      );
    };

    const restoreScrollPos = (url: string) => {
      const stored = sessionStorage.getItem(`scrollPos:${url}`);
      if (stored) {
        const { x, y } = JSON.parse(stored);
        window.scrollTo(x, y);
      }
    };

    const handleRouteChangeStart = (url: string) => {
      saveScrollPos(router.asPath);
    };

    const handleRouteChangeComplete = (url: string) => {
      restoreScrollPos(url);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    const handleBeforeUnload = () => saveScrollPos(router.asPath);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [router]);
};

export default useScrollRestoration;
