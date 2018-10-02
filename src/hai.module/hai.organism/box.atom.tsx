import styled from 'styled-components';

export const Box = styled.aside`
  position: fixed;
  opacity: 1;
  z-index: 999;
  transition: opacity .1s, z-index .1s;
  background: #fff;
  min-width: 150px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 2px;

  &[aria-hidden='true'] {
    opacity: 0;
    z-index: -999;
    transition-delay: .1s, .1s;
  }

  & ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  & li {
    padding: .1em .5em;
    cursor: pointer;
  }
`;
