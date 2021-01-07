import React from 'react';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import './components/Style/Style.css';


render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);
