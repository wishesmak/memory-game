import { useEffect, useState } from 'react';
import { Header, Board, Footer } from './components';
import { useGameContext } from './contexts/GameContext';

function App() {
  const [isStart, setIsStart] = useState(false);

  const { startGame, restartGame, timeToVisible, isGameOver } = useGameContext();

  useEffect(() => {
    if (isStart) {
      startGame();
    }
  }, [isStart, timeToVisible]);

  return (
    <div>
      <Header restartGame={restartGame} />
      <div className="wrapper">
        {isStart ? (
          <>{isGameOver ? <h1>Game Over</h1> : <Board />}</>
        ) : (
          <button onClick={() => setIsStart(true)} className="button-bg-none">
            Start
          </button>
        )}
      </div>
      {isStart && timeToVisible ? (
        <h1 style={{ textAlign: 'center' }}>{timeToVisible}</h1>
      ) : (
        <Footer />
      )}
    </div>
  );
}

export default App;
