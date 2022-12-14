import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { GameProvider } from './contexts/GameContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <GameProvider>
    <App />
  </GameProvider>,
);
