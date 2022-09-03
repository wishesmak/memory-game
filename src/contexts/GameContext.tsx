import { createContext, useContext, useState } from 'react';
import { ICell } from '../types/types';
import initialBoard from '../utils/initialBoard';

interface IContext {
  board: ICell[];
  setBoard: (i: ICell[]) => void;
}

const GameContext = createContext<IContext | null>(null);

export const useGameContext = () => {
  return useContext(GameContext) as IContext;
};

export const GameProvider = ({ children }: { children: JSX.Element }) => {
  const [board, setBoard] = useState<ICell[]>(initialBoard);

  const value = { board, setBoard };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
