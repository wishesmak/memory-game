import React from 'react';
import { useGameContext } from '../../contexts/GameContext';
import Cell from './Cell';

const Board = () => {
  const { board } = useGameContext();

  return (
    <div className="board">
      {board.map((cell) => (
        <Cell key={cell.id} cell={cell} />
      ))}
    </div>
  );
};

export default Board;
