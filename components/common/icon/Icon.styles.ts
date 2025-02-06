import styled from 'styled-components';

interface IconWrapperProps {
  $iconName: string;
  $size: number;
  $color: string;
}

export const IconWrapper = styled.div<IconWrapperProps>`
  display: inline-block;

  /* 
    * We set a mask using an SVG file from public/svg.
    * "mask-image" works in most modern browsers;
    * for Safari, "-webkit-mask" is sometimes needed.
    */
  mask: url('/svg/${({ $iconName }) => $iconName}.svg') no-repeat center;
  mask-size: contain;
  -webkit-mask: url('/svg/${({ $iconName }) => $iconName}.svg') no-repeat center;
  -webkit-mask-size: contain;

  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background-color: ${({ theme, $color }) => theme.colors[$color] || $color};
`;
