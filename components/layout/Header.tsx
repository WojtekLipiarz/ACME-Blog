import React from 'react';
import Link from 'next/link';
// styles
import { HeaderContainer, StyledLogo } from './Header.styles';

interface HeaderProps {
  toggleDarkMode: () => void;
}

export default function Header({ toggleDarkMode }: HeaderProps) {
  return (
    <HeaderContainer>
      <Link href="/" legacyBehavior>
        <picture>
          <source
            srcSet="/logo/acme-logo-mobile.png"
            media="(max-width: 500px)"
          />
          <StyledLogo
            src="/logo/acme-logo-full.png"
            alt="Acme institute logo"
          />
        </picture>
      </Link>

      <button
        type="button"
        onClick={toggleDarkMode}
        style={{ display: 'none' }}
      >
        Toggle Dark Mode
      </button>
    </HeaderContainer>
  );
}
