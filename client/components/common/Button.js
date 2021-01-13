import styled, { css } from 'styled-components';

const Button = styled.button`
  color: white;
  background: ${(p) => (p.secondary ? 'black' : '#f8049c')};
  font-weight: bold;
  ${(p) =>
    p.large
      ? css`
          padding: 8px;
          border-radius: 4px;
          font-size: 1em;
        `
      : css`
          padding: 16px;
          border-radius: 4px;
          font-size: 1em;
        `}
  box-shadow: none;
  border: none;
`;

export { Button };
