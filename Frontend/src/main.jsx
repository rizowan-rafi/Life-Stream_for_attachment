import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import UserProvider from './context/UserContext';
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <HelmetProvider>

    <App />
    </HelmetProvider>
  </UserProvider>
  
);
