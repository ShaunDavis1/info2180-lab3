
document.addEventListener("DOMContentLoaded", function() {

    // Get all nine squares
    const squares = document.querySelectorAll("#board div");

    // Get the status message
    const status = document.querySelector("#status");

    // Get the New Game button
    const newGameButton = document.querySelector(".btn");

    // Track the current player
    let currentPlayer = "X";

    // Track the state of the game
    let gameState = ["", "", "", "", "", "", "", "", ""];

    // Track whether the game has ended
    let gameOver = false;

    // All possible winning combinations
    const winningCombinations = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal
        [2, 4, 6]  // Diagonal
    ];

    // Exercise 4: Check for a winner
    function checkWinner() {

        for (let combination of winningCombinations) {

            const [a, b, c] = combination;

            // Check whether all three squares contain
            // the same player's symbol
            if (
                gameState[a] !== "" &&
                gameState[a] === gameState[b] &&
                gameState[b] === gameState[c]
            ) {
                // Return the player and winning positions
                return {
                    player: gameState[a],
                    combination: combination
                };
            }
        }

        // Nobody has won
        return null;
    }

    // Loop through all nine squares
    squares.forEach(function(square, index) {

        // Exercise 1: Add the square CSS class
        square.classList.add("square");

        // Exercise 2: Handle clicks
        square.addEventListener("click", function() {

            // Prevent moves in occupied squares
            // or after the game has ended
            if (gameOver || gameState[index] !== "") {
                return;
            }

            // Display the current player's symbol
            square.textContent = currentPlayer;

            // Apply the corresponding CSS class
            square.classList.add(currentPlayer);

            // Record the move in the game state
            gameState[index] = currentPlayer;

            // Exercise 4: Check for a winner
            const winner = checkWinner();

            if (winner !== null) {

                // Display the winner message
                status.textContent =
                    `Congratulations! ${winner.player} is the Winner!`;

                // Apply the winner styling
                status.classList.add("you-won");

                // Highlight the winning combination
                winner.combination.forEach(function(position) {

                    const winningSquare = squares[position];

                    // Give the winning square a green background
                    winningSquare.style.backgroundColor = "#BBF7D0";

                    // Add a green border
                    winningSquare.style.border = "3px solid #16A34A";

                    // Keep its dimensions unchanged
                    winningSquare.style.boxSizing = "border-box";

                });

                // End the game
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

            // Alternate between X and O
            if (currentPlayer === "X") {
                currentPlayer = "O";
            } else {
                currentPlayer = "X";
            }

        });

        // Exercise 3: Mouse enters the square
        square.addEventListener("mouseenter", function() {

            // Only apply hover styling while playing
            if (!gameOver) {
                square.classList.add("hover");
            }

        });

        // Exercise 3: Mouse leaves the square
        square.addEventListener("mouseleave", function() {
            square.classList.remove("hover");
        });

    }); // End of squares.forEach()


    // Exercise 5: Restart the Game
    newGameButton.addEventListener("click", function() {

        // Reset the game variables
        currentPlayer = "X";

        gameState = ["", "", "", "", "", "", "", "", ""];

        gameOver = false;

        // Clear all nine squares
        squares.forEach(function(square) {

            // Remove X or O
            square.textContent = "";

            // Remove player and hover classes
            square.classList.remove("X", "O", "hover");

            // Remove winning highlight styles
            square.style.backgroundColor = "";
            square.style.border = "";
            square.style.boxSizing = "";

        });

        // Restore the original status message
        status.textContent =
            "Move your mouse over a square and click to play an X or an O.";

        // Remove the winner styling
        status.classList.remove("you-won");

    }); // End of New Game click listener

}); // End of DOMContentLoaded
