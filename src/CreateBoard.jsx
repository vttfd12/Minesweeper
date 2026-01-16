import { useState, useEffect } from 'react';
import './style.css'

/*https://www.npmjs.com/package/minesweeper*/
export default function CreateBoard({ difficulty, onGameStateChange, onMinesRemainingChange }) {
    const [grid, setGrid] = useState([]);




    useEffect(() => {
        window.minesweeper = minesweeper;
        const mineArray = minesweeper.generateMineArray(difficulty);
        const board = new minesweeper.Board(mineArray);
        const fullGrid = board.grid();
        setGrid(fullGrid);
    }, [difficulty]);

    // console.log(grid);

    //Testing
    function revealAll() {
        setGrid(prevGrid => {
            const newGrid = prevGrid.map(row => [...row]);
            newGrid.forEach(row => row.forEach(cell => cell.revealed = true));
            return newGrid;
        });
    }

    // Force numbers 1-8 on the first 8 cells to test colors
    // Force numbers 1-8 on the first 8 cells to test colors
    function testColors() {
        const { cols } = difficulty;
        setGrid(prevGrid => {
            const newGrid = prevGrid.map(row => row.map(cell => ({ ...cell }))); // Deep copy
            // Loop through first 8 cells (indices 0-7)
            for (let i = 0; i < 8; i++) {
                const row = Math.floor(i / cols);
                const col = i % cols;
                if (newGrid[row] && newGrid[row][col]) {
                    newGrid[row][col].revealed = true;
                    newGrid[row][col].isMine = false; // Ensure it's not a mine
                    newGrid[row][col].numAdjacentMines = i + 1; // Set number 1-8
                }
            }
            return newGrid;
        });
    }


    const revealCell = (index) => {
        const { cols, rows, mines } = difficulty;

        setGrid(prevGrid => {
            const newGrid = prevGrid.map(row => row.map(cell => ({ ...cell })));
            const stack = [index];
            let mineHit = false;

            while (stack.length > 0) {
                const currentIdx = stack.pop();
                const r = Math.floor(currentIdx / cols);
                const c = currentIdx % cols;

                if (r < 0 || r >= rows || c < 0 || c >= cols) continue;

                const cell = newGrid[r][c];
                if (cell.revealed) continue;

                // Reveal logic
                if (cell.isMine) {
                    // Check if this is the directly clicked mine (not from flood fill)
                    if (currentIdx === index) {
                        mineHit = true;
                        // console.log('Direct mine click detected!');
                    }
                    cell.revealed = true;
                    continue;
                }

                cell.revealed = true;

                // Flood fill for empty cells
                if (cell.numAdjacentMines === 0 && !cell.isMine) {
                    for (let dr = -1; dr <= 1; dr++) {
                        for (let dc = -1; dc <= 1; dc++) {
                            if (dr === 0 && dc === 0) continue;
                            const nr = r + dr;
                            const nc = c + dc;
                            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                                stack.push(nr * cols + nc);
                            }
                        }
                    }
                }
            }

            // Check Game States
            if (mineHit) {
                // console.log('Mine hit! Triggering lost state');
                if (onGameStateChange) {
                    onGameStateChange('lost');
                }
            } else {
                // Win Check: total cells - mines == revealed cells
                let revealedCount = 0;
                newGrid.forEach(row => row.forEach(c => {
                    if (c.revealed && !c.isMine) revealedCount++;
                }));

                const totalSafeCells = (rows * cols) - mines;
                // console.log(`Revealed: ${revealedCount}, Total Safe: ${totalSafeCells}`);
                if (revealedCount === totalSafeCells) {
                    // console.log('All safe cells revealed! Triggering won state');
                    if (onGameStateChange) {
                        onGameStateChange('won');
                    }
                }
            }

            return newGrid;
        });
    };



    function toggleFlag(e) {
        e.preventDefault();
        const { cols, rows, mines } = difficulty;

        const index = e.target.dataset.key;
        setGrid(prevGrid => {
            const newGrid = prevGrid.map(row => row.map(cell => ({ ...cell })));
            const row = Math.floor(index / cols);
            const col = index % cols;

            const cell = newGrid[row][col];
            if (!cell.revealed) {
                cell.flagged = !cell.flagged;
            }

            // Count flags and update mines remaining
            let flagCount = 0;
            newGrid.forEach(row => row.forEach(c => {
                if (c.flagged) flagCount++;
            }));

            if (onMinesRemainingChange) {
                onMinesRemainingChange(mines - flagCount);
            }

            // Check win condition: all safe cells revealed
            let revealedCount = 0;
            newGrid.forEach(row => row.forEach(c => {
                if (c.revealed && !c.isMine) revealedCount++;
            }));

            const totalSafeCells = (rows * cols) - mines;
            if (revealedCount === totalSafeCells) {
                if (onGameStateChange) {
                    onGameStateChange('won');
                }
            }

            return newGrid;
        });
    }


    return (
        <>
            <div id="board" style={{
                gridTemplateColumns: `repeat(${difficulty.cols}, 30px)`,
                gridTemplateRows: `repeat(${difficulty.rows}, 30px)`
            }}>
                {
                    // FLATTEN the 2D grid so we can map over it linearly
                    grid.flat().map((cell, i) => {
                        return (
                            <div key={i} data-key={i} className={`cell ${cell.revealed ? 'revealed' : ''} ${cell.flagged ? 'flagged' : ''}`}
                                id={`cell-${i}`}
                                onClick={() => revealCell(i)}
                                onContextMenu={(e) => toggleFlag(e)}
                                data-value={cell.revealed && cell.numAdjacentMines > 0 ? cell.numAdjacentMines : null}
                            >

                                {cell.revealed ? (cell.isMine ? 'x' : (cell.numAdjacentMines > 0 ? cell.numAdjacentMines : null)) : (
                                    cell.flagged ? '🚩' : (
                                        /* TEST: Visual indicator for HIDDEN empty cells. Delete to revert. */
                                        (cell.numAdjacentMines === 0 && !cell.isMine) ? '-' : null
                                    )
                                )}
                            </div>
                        )
                    })
                }
            </div>

            <button onClick={revealAll}>Reveal All</button>
            {/* <button onClick={testColors}>Test Colors</button> */}
        </>

    )

}