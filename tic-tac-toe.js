// Creating the game board for tic-tac-toe
document.addEventListener("DOMContentLoaded", function() {

    const squares = document.querySelectorALL("#board div");

    squares.forEach(function(square) {

        square.classList.add("square");
        
    });
});