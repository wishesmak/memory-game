import React from 'react';
import { useGameContext } from '../contexts/GameContext';

const Footer = () => {
  const { moves } = useGameContext();

  return (
    <div className="footer">
      <div className="footer__block">
        <p>Time</p>
        <span>00:00</span>
      </div>
      <div className="footer__block">
        <p>Moves</p>
        <span>{moves}</span>
      </div>
    </div>
  );
};

export default Footer;
