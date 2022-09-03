import React from 'react';
import { useGameContext } from '../contexts/GameContext';

const Footer = () => {
  const { moves, timer } = useGameContext();

  return (
    <div className="footer">
      <div className="footer__block">
        <p>Time</p>
        <span>
          {timer.m} : {timer.s < 10 ? '0' + timer.s : timer.s}
        </span>
      </div>
      <div className="footer__block">
        <p>Moves</p>
        <span>{moves}</span>
      </div>
    </div>
  );
};

export default Footer;
