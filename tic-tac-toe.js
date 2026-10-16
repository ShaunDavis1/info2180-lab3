document.addEventListener("DOMContentLoaded", function() {

    // Get all nine squares
    const squares = document.querySelectorAll("#board div");

    // Get the status message
    const status = document.querySelector("#status");

    // Track the current player
    let currentPlayer = "X";

    // Track the game state
    let gameState = ["", "", "", "", "", "", "", "", ""];

    // Track whether the game has ended
    let gameOver = false;

    // All possible winning combinations
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Exercise 4: Check for a winner
    function checkWinner() {

        for (let combination of winningCombinations) {

            const [a, b, c] = combination;

            if (
                gameState[a] !== "" &&
                gameState[a] === gameState[b] &&
                gameState[b] === gameState[c]
            ) {
                return gameState[a];
            }
        }

        return null;
    }

    // Loop through each square
    squares.forEach(function(square, index) {

        // Exercise 1: Add the square class
        square.classList.add("square");

        // Exercise 2: Handle clicks
        square.addEventListener("click", function() {

            // Prevent moves in occupied squares or finished games
            if (gameOver || gameState[index] !== "") {
                return;
            }

            // Display the current player's symbol
            square.textContent = currentPlayer;

            // Add the correct CSS class
            square.classList.add(currentPlayer);

            // Record the move
            gameState[index] = currentPlayer;

            // Exercise 4: Check for a winner
            const winner = checkWinner();

            if (winner !== null) {

                status.textContent =
                    `Congratulations! ${winner} is the Winner!`;

                status.classList.add("you-won");

                gameOver = true;
                return;
            }

            // Check for a tie
            if (gameState.every(function(value) {
                return value !== "";
            })) {
                status.textContent = "It's a Tie!";
                gameOver = true;
                return;
            }

            // Alternate players
            if (currentPlayer === "X") {
                currentPlayer = "O";
            } else {
                currentPlayer = "X";
            }

        });

        // Exercise 3: Mouse enters the square
        square.addEventListener("mouseenter", function() {
            square.classList.add("hover");
        });

        // Exercise 3: Mouse leaves the square
        square.addEventListener("mouseleave", function() {
            square.classList.remove("hover");
        });

    });

});