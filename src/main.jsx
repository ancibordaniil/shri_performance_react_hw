import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './styles/reset.css';
import './styles/fonts.css';
import './styles/styles.css';
import bg from '@assets/bg@2x.png';

const preloadBg = new Image();
preloadBg.src = bg;

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);