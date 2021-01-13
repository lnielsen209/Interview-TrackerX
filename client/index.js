import React from 'react';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import { ProvideAuth } from './routes/useAuth';
import GlobalStyle from './style/global';

import './style/style.css';

render(
  <BrowserRouter>
    <ProvideAuth>
      <GlobalStyle />
      <App />
    </ProvideAuth>
  </BrowserRouter>,
  document.getElementById('app')
);
