# Minesweeper (React)

## Code Attribution

The core board generation logic in Minesweeper.js was adapted from an external source.

-> https://github.com/binaryluke/Minesweeper

All React components, state management, UI flow, difficulty selection, win/loss logic, theming, and localStorage-based leaderboard functionality were implemented by me.


## Overview
A browser-based implementation of the classic **Minesweeper** game built with **React**.  
This project focuses on clean component separation, predictable state management, user interaction handling, and game rule evaluation.

Players can select difficulty levels, interact with the game board, and track wins using a persistent leaderboard stored in **browser localStorage**.

--

## Technologies Used
- JavaScript (ES6+)
- React
- HTML / CSS
- Browser localStorage
- Vite

---

## How to Run Locally
```bash
npm install
npm run dev
```

## Class Uses
main.jsx           → Vite/Root Initialization
App.jsx            → Main application state & orchestration
Pregame.jsx        → Difficulty selection & setup
WinCondition.jsx   → Checking For Errors / Wins
CreateBoard.jsx    → Grid rendering
Leaderboard.jsx    → High score persistence & display
Minesweeper.js     → External board generation helper


## What I Learned
    Managing application state across multiple React components
    Handling user input and event-driven updates
    Implementing game logic and edge-case handling
    Persisting structured data using browser localStorage
    Structuring React applications for readability and maintainability
    Debugging state-related and logic-based issues