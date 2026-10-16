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

        // Check each winning combination
        for (let combination of winningCombinations) {

            // Extract the three indices
            const [a, b, c] = combination;

            // Check whether the three positions match
            if (
                gameState[a] !== "" &&
                gameState[a] === gameState[b] &&
                gameState[b] === gameState[c]
            ) {
                // Return the winner and winning positions
                return {
                    player: gameState[a],
                    combination: combination
                };
            }
        }

        // No winner found
        return null;
    }

    // Loop through all nine squares
    squares.forEach(function(square, index) {

        // Exercise 1: Add the square CSS class
        square.classList.add("square");

        // Exercise 2 and 6: Handle clicks and prevent cheating
        square.addEventListener("click", function() {

            // Prevent changing an occupied square
            // or playing after the game ends
            if (gameOver || gameState[index] !== "") {
                return;
            }

            // Display X or O
            square.textContent = currentPlayer;

            // Apply the appropriate CSS class
            square.classList.add(currentPlayer);

            // Save the move in the game state
            gameState[index] = currentPlayer;

            // Exercise 4: Check for a winner
            const winner = checkWinner();

            if (winner !== null) {

                // Display the winning message
                status.textContent =
                    `Congratulations! ${winner.player} is the Winner!`;

                // Apply the winning message styling
                status.classList.add("you-won");

                // Highlight the three winning squares
                winner.combination.forEach(function(position) {
                    squares[position].classList.add("winning-square");
                });

                // End the game
                gameOver = true;
                return;
            }

            // Extra feature: Check for a tie
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

            if (!gameOver) {
                square.classList.add("hover");
            }

        });

        // Exercise 3: Mouse leaves the square
        square.addEventListener("mouseleave", function() {
            square.classList.remove("hover");
        });

    }); // End of squares.forEach()


    // Exercise 5: Restart the game
    newGameButton.addEventListener("click", function() {

        // Reset the current player
        currentPlayer = "X";

        // Reset the game state
        gameState = ["", "", "", "", "", "", "", "", ""];

        // Allow a new game to begin
        gameOver = false;

        // Clear all nine squares
        squares.forEach(function(square) {

            // Remove X and O
            square.textContent = "";

            // Remove player, hover, and winning classes
            square.classList.remove(
                "X",
                "O",
                "hover",
                "winning-square"
            );

        });

        // Restore the original status message
        status.textContent =
            "Move your mouse over a square and click to play an X or an O.";

        // Remove the winner styling
        status.classList.remove("you-won");

    }); // End of New Game click listener

}); // End of DOMContentLoaded
