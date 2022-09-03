import React from 'react';

interface Props {
  restartGame: () => void;
}

const Header: React.FC<Props> = ({ restartGame }) => {
  return (
    <div className="header">
      <h1>memory</h1>
      <div>
        <button onClick={restartGame} className="header__btns-restart">
          Restart
        </button>
      </div>
    </div>
  );
};

export default Header;
