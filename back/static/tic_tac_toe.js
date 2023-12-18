    // brings all the cells info
    const cells = document.querySelectorAll('.cell');

    //turn to play
    let turn = '';

    // number of moves they played
    let moveCounter = 0;
    
   
    const getTurn = async () => {
        try {
            const response = await axios.get('/get_turn');
            return response.data.turn;
        } catch (error) {
            console.error('Error:', error);
            return ''; // or handle the error in a way that makes sense for your application
        }
    };

    const sendIndexToServer = (dataIndex) => {
        axios.post('/play', { dataIndex })
                .then(response => {
                    console.log(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    // add x/o and checks for winners
    const play = async (event) => {
        if (event.target.innerText == '') {
            try {
                const turn = await getTurn();
                event.target.innerText = turn 
                const dataIndex = event.target.getAttribute('data-index');
                // send to server
                sendIndexToServer(dataIndex)

            } catch(error) {
                console.error('Error: ',error);
            }
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
