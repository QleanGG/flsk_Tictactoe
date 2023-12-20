from flask import Flask, render_template, url_for,request,redirect,jsonify
from flask_socketio import SocketIO

# socketio = SocketIO(app)

app = Flask(__name__)

# '''variables I need'''

# winning combinations for tic tac toe
winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], # Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], # Columns
            [0, 4, 8], [2, 4, 6]]             # Diagonals
    
turn = 'X'
game_board = ['', '', '', '', '', '', '', '', '']

def check_winner(game_board, turn):
    for combo in winningCombinations:
        if all(game_board[i] == turn for i in combo):
            print (turn +' wins!\n')
            return True
    return False

@app.route('/get_turn')
def get_turn():
    global turn
    return jsonify({'turn': turn}), 200

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/play', methods=['GET','POST'])
def play():
    global game_board,turn
    
    if request.method == 'POST':
        try:
            data = request.get_json()
            data_index = int(data.get('dataIndex'))

            # Update the game board 
            game_board[data_index] = turn
            
            if check_winner(game_board,turn):
                return jsonify({'message': f'{turn} wins!', 'turn': turn, 'winner': True}), 200

            turn = 'O' if turn == 'X' else 'X'
            return jsonify({'message': 'Move successful', 'turn': turn}), 200
        except Exception as e:
            print(str(e))
            return jsonify({'message': 'Error processing the move'}), 500
            
    return render_template('play.html')

@app.route('/reset_game')
def reset_game():
    global game_board, turn
    game_board = ['', '', '', '', '', '', '', '', '']
    turn = 'X'
    return jsonify({'message': 'Game reset successfully','turn' : turn}), 200

if __name__ == '__main__':
    app.run(debug=True)