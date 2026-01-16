import { useState, useEffect } from 'react'
import './style.css'
import CreateBoard from './CreateBoard'
import PreGame from './Pregame'
import WinCondition from './WinCondition'
import Leaderboard from './Leaderboard'
import svg from '../favicon.svg'

function App() {


  const [elapsedTime, setElapsedTime] = useState(0)
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      return savedTheme
    } else {
      return 'dark'
    }
  })
  const [bestTimes, setBestTimes] = useState(() => {
    const saved = localStorage.getItem('bestTimes')
    return saved ? JSON.parse(saved) : {}
  })
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [gameState, setGameState] = useState('idle'); // idle, playing, won, lost
  const [minesRemaining, setMinesRemaining] = useState(0);

  useEffect(() => {
    if (gameState === 'playing') {
      const interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameState]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };


  const handleStartGame = (config) => {
    setDifficulty(config);
    setGameStarted(true);
    setGameState('playing');
    setMinesRemaining(config.mines);
    document.getElementById('logo').classList.add("hidden");
  };

  const resetGame = () => {
    setGameStarted(false);
    setDifficulty(null);
    setGameState('idle');
    document.getElementById('timer').classList.add("hidden");
    document.getElementById('reset').classList.add("hidden");
    setElapsedTime(0);
    setMinesRemaining(0);
    document.getElementById('logo').classList.remove("hidden");
  }

  //Save Theme
  useEffect(() => {
    document.body.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  //Save Best Times
  useEffect(() => {
    localStorage.setItem('bestTimes', JSON.stringify(bestTimes))
  }, [bestTimes])

  const handleNewBestTime = (difficultyKey, time) => {
    setBestTimes(prev => ({
      ...prev,
      [difficultyKey]: time
    }))
  }




  return (
    <>
      <div className="vertical-container">
        <img id="logo" src={svg} alt="" style={{ width: '100px', height: '100px' }} />
      </div>
      <div className="horizontal-container">
        <label className="theme-label">Select Theme:</label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="theme-select"
        >
          <option value="dark">Dark</option>
          <option value="ocean">Ocean</option>
          <option value="retro">Retro</option>
        </select>
        <h1 id="timer" className={!gameStarted ? 'hidden' : ''}>
          {formatTime(elapsedTime)}
        </h1>
        <h2 id="mines-remaining" className={!gameStarted ? 'hidden' : ''}>
          Mines: {minesRemaining}
        </h2>
        <button id="reset" className="hidden" onClick={resetGame}>Reset</button>
      </div>

      <div className="main-container">
        <div className="game-area">
          {!gameStarted && <PreGame onGameStart={handleStartGame} />}
          {gameStarted && (
            <>
              <CreateBoard
                difficulty={difficulty}
                onGameStateChange={setGameState}
                onMinesRemainingChange={setMinesRemaining}
              />
              <WinCondition
                gameState={gameState}
                onReset={resetGame}
                elapsedTime={elapsedTime}
                difficulty={difficulty}
                bestTimes={bestTimes}
                onNewBestTime={handleNewBestTime}
              />
            </>
          )}
        </div>
        <Leaderboard bestTimes={bestTimes} />
      </div>

    </>
  )
}

export default App
