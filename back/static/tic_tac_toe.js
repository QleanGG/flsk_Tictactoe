// brings all the cells info
const cells = document.querySelectorAll('.cell');
const errorMessage = document.getElementById('errorMessage');
const gameMessage = document.getElementById('gameMessage');
let gameActive = true;
let turn = '';

const sendIndexToServer = async (dataIndex) => {
    try {
        const response = await axios.post('/play', { dataIndex });
        if (response.data.message.includes('wins')) {
            declareWinner(response.data.message)
            return true;
        }
        if (response.data.message.includes('DRAW')) {
            declareWinner(response.data.message)
            return true;
        }
        turn = response.data.turn;
    } catch (error) {
        console.error('Error:', error);
        return ''; // or handle the error in a way that makes sense for your application
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
        console.log(turn);
        cells.forEach(cell => {
            cell.innerText = '';
        });
        gameMessage.innerText = `${turn} turn to play`;
        gameActive = true;
    } catch (error) {
        console.error('Error:', error);
        return ''; // or handle the error in a way that makes sense for your application
    }
}

const declareWinner = async (message) => {
    gameMessage.innerHTML = message;
    gameActive = false;
}

addEventListener("DOMContentLoaded", resetGame)