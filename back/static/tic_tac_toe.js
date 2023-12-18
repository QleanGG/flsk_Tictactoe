    // brings all the cells info
    const cells = document.querySelectorAll('.cell');

    //turn to play
    let turn = 'X';

    // number of moves they played
    let moveCounter = 0;

    // gameboard tracker 
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    

    // add x/o and checks for winners
    function play(event) {
        if (event.target.innerText == '') {
            event.target.innerText = turn;
            const dataIndex = event.target.getAttribute('data-index');
           gameBoard[dataIndex] = turn;
            console.log(gameBoard);
            turn = (turn == 'X' ? 'O' : 'X')
            document.getElementById("gameMessage").innerHTML = `${turn} turn to play`;
            moveCounter++;
            determineWinner();
        }

        if (moveCounter === 9 && checkWin() === false) {
            document.getElementById("gameMessage").innerHTML = `That's a tie!`;
        }
    }

    // // check if someone wins
    // function checkWin() {
    //     // loops for every possible winning combination
    //     for (let i = 0; i < winningCombinations.length; i++) {
    //         let combo = winningCombinations[i];
    //         let winX = 0, winO = 0;
    //         // loops for the 3 combination positions to find a mark 
    //         for (let j = 0; j < combo.length; j++) {
    //             if (gameBoard[combo[j]] === 'X') {
    //                 winX++;
    //             }if(gameBoard[combo[j]] === 'O') {
    //                 winO++;
    //             }
    //         }
    //         if (winX === 3) {
    //             return 'X';
    //         } else if (winO === 3) {
    //             return 'O';
    //         }
    //     } return false; // return false to check for tie
    // }

    // // declares the winner
    // function determineWinner() {
    //     if (checkWin() === "X") {//X won!
    //         document.getElementById("gameMessage").innerHTML = `X is the winner!`;
    //     } else if (checkWin() === "O") {//O won!
    //         document.getElementById("gameMessage").innerHTML = `O is the winner!`;
    //     }
    // }

    // //resets everything to the start of the game 
    // function resetGame() {
    //     gameBoard = ['', '', '', '', '', '', '', '', ''];
    //     turn = 'X';
    //     moveCounter = 0;
    //     cells.forEach(cell => {cell.textContent = ''; });
    //     document.getElementById("gameMessage").innerHTML = `${turn} turn to play`;
    //     console.log(gameBoard);
    // }
