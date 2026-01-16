import { useState } from "react";
import './style.css'

export default function Pregame({ onGameStart }) {
    const [difficulty, setDifficulty] = useState(() => {
        // hideTimer()
        const saved = localStorage.getItem('difficulty');
        return saved || 'BEGINNNER';
    });


    function showTimer() {
        document.getElementById('timer').classList.remove("hidden")
        document.getElementById('reset').classList.remove("hidden")
    }

    function hideTimer() {
        document.getElementById('timer').classList.add("hidden")
        document.getElementById('reset').classList.add("hidden")
    }

    const handleStart = () => {
        showTimer()
        localStorage.setItem('difficulty', difficulty);
        let config;
        switch (difficulty) {
            case 'BEGINNNER':
                config = { name: 'Easy', rows: 9, cols: 9, mines: 10 };
                break;
            case 'INTERMEDIATE':
                config = { name: 'Medium', rows: 16, cols: 16, mines: 40 };
                break;
            case 'EXPERT':
                config = { name: 'Hard', rows: 16, cols: 30, mines: 99 };
                break;
            default:
                config = { name: 'Easy', rows: 9, cols: 9, mines: 10 };
        }
        onGameStart(config);
    };

    return (
        <div id="pregame">
            <label className="gridSize-label">Difficulty</label>
            <select
                className="gridSize-select"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
            >
                <option value="BEGINNNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="EXPERT">Expert</option>
            </select>
            <button onClick={handleStart}>Start</button>
        </div>
    )
}