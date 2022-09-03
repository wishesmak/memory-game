import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useTimer } from '../hooks/useTimer';
import { ICell } from '../types/types';
import initialBoard from '../utils/initialBoard';

interface IContext {
  board: ICell[];
  timeToVisible: number;
  moves: number;
  isGameOver: boolean;
  timer: {
    m: number;
    s: number;
  };
  startGame: () => void;
  restartGame: () => void;
  onCellClick: (id: number) => void;
}

const GameContext = createContext<IContext | null>(null);

export const useGameContext = () => {
  return useContext(GameContext) as IContext;
};

export const GameProvider = ({ children }: { children: JSX.Element }) => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [board, setBoard] = useState<ICell[]>(initialBoard);
  const [timeToVisible, setTimeToVisible] = useState(3);
  const [prevCellId, setPrevCellId] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [isTimeout, setIsTimeout] = useState(false);
  const [isFirstClick, setIsFirstClick] = useState(true);

  const { timer, startTimer, stopTimer, setTimer } = useTimer();

  const startGame = useCallback(() => {
    if (timeToVisible > 0) {
      setTimeout(() => {
        setTimeToVisible(timeToVisible - 1);
      }, 1000);
    } else {
      setBoard(board.map((cell) => true && { ...cell, isVisible: false }));
    }
  }, [timeToVisible]);

  const restartGame = () => {
    if (timeToVisible === 0) {
      setBoard(
        board
          .map((cell) => true && { ...cell, isVisible: true, isFinded: false })
          .sort(() => Math.random() - 0.5),
      );
      setTimeToVisible(3);
      setIsGameOver(false);
      setMoves(0);
      setIsFirstClick(true);
      stopTimer();
      setTimer({ m: 0, s: 0 });
    }
  };

  const onCellClick = (id: number) => {
    const prevCell = prevCellId && board.find((cell) => cell.id === prevCellId);
    const findedCell = board.find((cell) => cell.id === id);

    if (isFirstClick) {
      startTimer();
      setIsFirstClick(false);
    }

    if (timeToVisible === 0 && findedCell?.isFinded !== true && isTimeout === false) {
      setBoard(board.map((cell) => (cell.id === id ? { ...cell, isVisible: true } : cell)));

      if (!prevCellId) {
        setPrevCellId(id);
      } else if (prevCell && prevCell.id !== findedCell?.id && prevCell.item === findedCell?.item) {
        setBoard(
          board.map((cell) =>
            cell.id === findedCell.id || cell.id === prevCell.id
              ? { ...cell, isFinded: true, isVisible: false }
              : cell,
          ),
        );
        setPrevCellId(null);
        setMoves(moves + 1);
      } else if (prevCell && prevCell.item !== findedCell?.item) {
        setIsTimeout(true);
        setTimeout(() => {
          setBoard(board.map((cell) => true && { ...cell, isVisible: false }));
          setIsTimeout(false);
        }, 1000);
        setMoves(moves + 1);
        setPrevCellId(null);
      }
    }
  };

  useEffect(() => {
    if (board.every((cell) => cell.isFinded === true)) {
      setIsGameOver(true);
      stopTimer();
    }
  }, [board]);

  const value = {
    isGameOver,
    board,
    moves,
    timeToVisible,
    startGame,
    restartGame,
    onCellClick,
    timer,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
