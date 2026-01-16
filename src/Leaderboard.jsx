import './style.css'

function Leaderboard({ bestTimes }) {
    const difficulties = [
        { name: 'Easy', key: 'easy', size: '8x8' },
        { name: 'Medium', key: 'medium', size: '16x16' },
        { name: 'Hard', key: 'hard', size: '30x16' }
    ];

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="leaderboard">
            <h3>Best Times</h3>
            {difficulties.map(diff => (
                <div key={diff.key} className="leaderboard-item">
                    <div className="difficulty-name">{diff.name}</div>
                    <div className="difficulty-size">{diff.size}</div>
                    <div className="difficulty-time">
                        {bestTimes[diff.key] ? formatTime(bestTimes[diff.key]) : 'No record yet'}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Leaderboard;
