import styled from 'styled-components';

export const List = styled.ul`
  padding: 0;
  margin: 5px 0 0;
  list-style: none;
  border: 1px solid #ccc;
  border-radius: 2px;
  transition: .2s;

  & li {
    padding: 5px 10px;
    cursor: pointer;
  }

  & li:active {
    background: #acd0f9;
    transition: 0;
  }
`;
