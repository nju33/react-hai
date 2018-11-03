import styled from 'styled-components';

export const Box = styled.aside`
  position: fixed;
  opacity: 1;
  z-index: 999;
  transition: opacity .1s, z-index .1s;
  min-width: 150px;
  box-sizing: border-box;

  &:before {
    content: '';
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  &[aria-hidden='true'] {
    opacity: 0;
    z-index: -999;
    transition-delay: .1s, .1s;
  }
`;
