import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button = styled.button<ButtonProps>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  border: none;

  ${({ variant = 'primary', theme }) => {
    const { colors } = theme;
    switch (variant) {
      case 'secondary':
        return `
          background-color: ${colors.secondary};
          color: ${colors.buttonText};
        `;
      case 'danger':
        return `
          background-color: ${colors.danger};
          color: ${colors.buttonText};
        `;
      default:
        return `
          background-color: ${colors.primary};
          color: ${colors.buttonText};
        `;
    }
  }}

  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`;
