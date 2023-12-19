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


    // sends the cell to the array in the server
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
        }else {
            
        }
    }
