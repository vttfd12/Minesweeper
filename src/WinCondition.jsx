import React, { useEffect } from 'react';
import './style.css';

export default function WinCondition({ gameState, onReset, elapsedTime, difficulty, bestTimes, onNewBestTime }) {
    // console.log('WinCondition rendered with gameState:', gameState);

    useEffect(() => {
        if (gameState === 'won' && difficulty) {
            // Check if this is a new best time
            const difficultyKey = difficulty.name.toLowerCase();
            const currentBest = bestTimes[difficultyKey];

            if (!currentBest || elapsedTime < currentBest) {
                // New record!
                onNewBestTime(difficultyKey, elapsedTime);
            }
        }
    }, [gameState, difficulty, elapsedTime, bestTimes, onNewBestTime]);

    if (gameState !== 'won' && gameState !== 'lost') return null;

    const isWin = gameState === 'won';
    const message = isWin ? "You Win!" : "Game Over";
    const className = isWin ? "win" : "loss";

    // Format time
    const mins = Math.floor(elapsedTime / 60);
    const secs = elapsedTime % 60;
    const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    // Check if new record
    const difficultyKey = difficulty?.name?.toLowerCase();
    const isNewRecord = isWin && difficultyKey && (!bestTimes[difficultyKey] || elapsedTime < bestTimes[difficultyKey]);

    return (
        <div className="modal-overlay">
            <div className={`game-result ${className}`}>
                <h2>{message}</h2>
                <p style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>Time: {timeStr}</p>
                {isNewRecord && <p className="new-record">🎉 New Record! 🎉</p>}
                <button onClick={onReset}>Play Again</button>
            </div>
        </div>
    );
}
