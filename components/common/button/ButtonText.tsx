import React from 'react';
import { ButtonTextWrapper } from './Button.styles';
import { Icon } from '../icon/Icon';

interface ButtonTextProps {
  onClick: () => void;
  text: string;
  iconName?: string;
  iconColor?: string;
  color?: string;
  size?: number;
  isActive?: boolean;
}

export const ButtonText: React.FC<ButtonTextProps> = ({
  onClick,
  text,
  iconName,
  iconColor,
  color = 'accent2',
  size = 16,
  isActive,
}) => {
  return (
    <ButtonTextWrapper
      $color={color}
      $size={size}
      $isActive={isActive}
      onClick={onClick}
    >
      <span>{text}</span>
      {iconName && (
        <Icon
          iconName={iconName}
          color={iconColor || color}
          size={size * 0.5}
        />
      )}
    </ButtonTextWrapper>
  );
};
