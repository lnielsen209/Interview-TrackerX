import { createGlobalStyle } from 'styled-components';

const theme = {
  color: '#1a1a1a',
  bg: '#f3f2ef',
  primary: '#1666c5',
  secondary: '#ffffff',
};

const GlobalStyle = createGlobalStyle`
*, *:after, *:before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  outline: 0;
}

body {
  min-width: 100vh;
  min-height: 100vh;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background: ${theme.bg};
  color: ${theme.color};
}

a {
  text-decoration: none;
}

ul {
  list-style: none;
}
`;

export default GlobalStyle;
