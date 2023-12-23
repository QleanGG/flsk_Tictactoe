// Extract the game mode from the URL
const pathSegments = window.location.pathname.split('/');
const gameModeFromURL = pathSegments[pathSegments.length - 1];
let gameMode = ''; // Default game mode

// Check if the 'mode' parameter is present in the URL
if (gameModeFromURL === 'pvp' || gameModeFromURL === 'pvc') {
    gameMode = gameModeFromURL;
}


// brings all the cells info
const cells = document.querySelectorAll('.cell');
const errorMessage = document.getElementById('errorMessage');
const gameMessage = document.getElementById('gameMessage');
let gameActive = true;
let turn = 'X';

const sendIndexToServer = async (dataIndex) => {
    try {
        const response = await axios.post(`/play/${gameMode}`, { dataIndex });
        if (response.data.message.includes('wins')) {
            declareWinner(response.data.message);
            return true;
        }
        if (response.data.message.includes('DRAW')) {
            declareWinner(response.data.message);
            return true;
        }
        turn = response.data.turn;
        if (gameMode == 'pvc') {
            let cputurn = response.data.cpu_turn;
            cells[cputurn].innerText = 'O';
        }
    } catch (error) {
        console.error('Error:', error);
        return ''; 
    }
}

const play = async (event) => {
    // checks if game is active
    if (gameActive) {

        // checks the squre is empty
        if (event.target.innerText === '') {
            try {
                errorMessage.innerText = '';
                event.target.innerText = turn

                // send to server
                const dataIndex = event.target.getAttribute('data-index');
                let checkwin = await sendIndexToServer(dataIndex);
                if (checkwin) {
                    return ; //stops the function
                }
                // change to next turn
                gameMessage.innerText = `${turn} turn to play`;

            } catch (error) {
                console.error('Error: ', error);
            }
        } else {
            errorMessage.innerText = 'Please pick a different square';
        }
    }
}

const resetGame = async () => {
    try {
        const response = await axios.get('/reset_game');
        turn = response.data.turn;
        cells.forEach(cell => {
            cell.innerText = '';
        });
        gameMessage.innerText = `${turn} turn to play`;
        gameActive = true;
    } catch (error) {
        console.error('Error:', error);
        return ''; 
    }
}
const declareWinner = async (message) => {
    gameMessage.innerHTML = message;
    gameActive = false;
}

addEventListener("DOMContentLoaded", () => {
    resetGame();
});

