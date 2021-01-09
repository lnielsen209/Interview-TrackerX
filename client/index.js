import React from 'react';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import './style/style.css';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);
