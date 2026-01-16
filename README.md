Overview

A browser-based implementation of the classic Minesweeper game built with React.
The project focuses on clean component separation, state management, user interaction handling, and game rule evaluation.

Players can select difficulty, interact with the game board, and track wins using a persistent leaderboard stored in localStorage.



Technologies Used
    JavaScript (ES6+)
    React
    HTML / CSS
    Browser localStorage



Key Features

1. Game Setup

    Difficulty Selection: Players can choose between Beginner, Intermediate, and Expert modes.
    Board Generation: The game board is generated through an external function that creates a 2D array of cells.
    Mine Placement: Mines are placed randomly on the board, with the first click always being safe.

2. Game State Management

    The application uses React state to manage the game board, game status (playing, won, lost), timer, and mine count.
    State updates are handled immutably to ensure predictable component rendering.

3. User Interaction

    Left Click: Reveals a cell. If it's a mine, the game ends. If it's empty, it shows the number of adjacent mines.
    Right Click: Flags or unflags a cell.
    Double Click: Auto-reveals all adjacent cells if the current cell's number matches the number of adjacent flags.

4. Game Logic

    Win Condition: The game is won when all non-mine cells have been revealed.
    Loss Condition: The game is lost when a mine is clicked.
    Timer: Tracks the elapsed time in seconds.
    Mine Counter: Tracks the number of mines remaining (total mines minus flagged mines).

5. Persistence

    Leaderboard: The game stores high scores for each difficulty level in the browser's localStorage.
    The leaderboard displays the player's name and the time taken to complete the game.

6. Theming

    The application supports two themes: Light and Dark.
    Theme preference is saved in localStorage and can be toggled using the theme switch button.

Component Structure

    App.jsx: The main component that manages the overall game state and orchestrates the application flow.
    Pregame.jsx: Handles difficulty selection and initial game setup.
    Game.jsx: The core game component that renders the board and manages game logic.
    Board.jsx: Renders the grid of cells.
    Cell.jsx: Represents individual cells on the board with their own state and click handlers.
    Leaderboard.jsx: Displays the high scores for each difficulty level.
    ThemeToggle.jsx: A UI component to switch between light and dark themes.

Game Rules

    The goal is to clear the board of all mines.
    Clicking a numbered cell reveals the number of mines adjacent to it.
    Flagging cells helps keep track of potential mine locations.
    The first click is always safe and will never be a mine.
    The game ends when all mines are found or when a mine is clicked.