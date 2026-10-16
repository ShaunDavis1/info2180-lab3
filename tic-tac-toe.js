// Creating the game board for tic-tac-toe
document.addEventListener("DOMContentLoaded", function() {

    const squares = document.querySelectorAll("#board div");

    squares.forEach(function(square) {

        square.classList.add("square");
        
    });
});

// Exercise 2
document.addEventListener("DOMContentLoaded", function() {

    // Get all nine squares
    const squares = document.querySelectorAll("#board div");

    // Track the current player
    let currentPlayer = "X";

    // Store the state of the game
    let gameState = ["", "", "", "", "", "", "", "", ""];

    // Loop through each square
    squares.forEach(function(square, index) {

        // Apply the CSS class
        square.classList.add("square");

        // Listen for a click on the square
        square.addEventListener("click", function() {

            // Do not do anything if the square is occupied
            if(gameState[index] !== "") {
                return;
            }

            // Display the current player's symbol
            square.textContent = currentPlayer;

            // Add the CSS Class
            square.classList.add(currentPlayer);

            // Change the current player
            if (currentPlayer === "X") {
                currentPlayer = "O";

            } else {
                currentPlayer = "X";
            }

        // Exercise 3: Mouse enters the square
        square.addEventListener("mouseenter", function() {
            square.classList.add("hover");
        });

        // Mouse leaves the square
        square.addEventListener("mouseleaves", function() {
            square.classList.add("hover");
        });
        
        });
    });
});