import styled from 'styled-components';

export const Box = styled.aside`
  opacity: 1;
  z-index: 999;
  transition: .2s;

  &[aria-hidden='true'] {
    opacity: 0;
    z-index: -999;
  }
`;
