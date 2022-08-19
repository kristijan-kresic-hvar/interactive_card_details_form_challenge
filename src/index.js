import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { CardInformationContextProvider } from './context/CardInformationContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CardInformationContextProvider>
      <App />
    </CardInformationContextProvider>
  </React.StrictMode>
);
reportWebVitals();
