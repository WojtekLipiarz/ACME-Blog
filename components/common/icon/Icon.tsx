import React from 'react';
import { IconWrapper } from './Icon.styles';

interface IconProps {
  /**
   * Icon file name (without extension),
   * e.g., 'chevron_left' -> located in public/svg/chevron_left.svg
   */
  iconName: string;

  /**
   * Color name from the theme (e.g., 'grey100'),
   * or any valid color string like "#333" / "red"
   */
  color?: string;

  /**
   * Icon size (width/height in px)
   */
  size?: number;
}

/**
 * Reusable icon component that loads an SVG file from `public/svg/`.
 * Uses masking (mask + background-color) to easily set the icon color.
 */
export const Icon: React.FC<IconProps> = ({
  iconName,
  color = 'black',
  size = 24,
}) => {
  return <IconWrapper $iconName={iconName} $color={color} $size={size} />;
};
