import random
from flask import Flask, render_template, url_for,request,redirect,jsonify

app = Flask(__name__)

'''variables I need'''
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
            # print (turn +' wins!\n')
            return True
    return False

def check_draw(game_board):
    for square in game_board:
        if square == '':
            return False  # There is an empty string in the array
    return True  # No empty strings found in the array

def cpu_make_move():
    global game_board
    #checks to win
    for i in range(9):
        if game_board[i] == '':
            game_board[i] = 'O'
            if check_winner(game_board,'O') :
                return i
            game_board[i] = ''

    # check to block
    for i in range(9):
        if game_board[i] == '':
            game_board[i] = 'X'
            if check_winner(game_board,'X') :
                game_board[i] = 'O'
                return i
            game_board[i] = ''
    empty_cells = [i for i in range(9) if game_board[i] == '']
    return random.choice(empty_cells)


@app.route('/')
def index():
    return render_template('menu.html')

@app.route('/play/<mode>', methods=['GET','POST'])
def play(mode):
    global game_board,turn
    
    if request.method == 'POST':
        try:
            data = request.get_json()
            data_index = int(data.get('dataIndex'))

            # Update the game board 
            game_board[data_index] = turn
            
            if check_winner(game_board,turn):
                return jsonify({'message': f'{turn} wins!', 'turn': turn, 'winner': True}), 200
            
            if check_draw(game_board):
                return jsonify({'message': "It's a DRAW!", 'turn': turn, 'winner': True}), 200

            ''' checks the mode'''
            if mode == 'pvp':
                turn = 'O' if turn == 'X' else 'X'
                return jsonify({'message': 'Move successful', 'turn': turn}), 200
            elif mode == 'pvc':
                cpu_turn = cpu_make_move()
                #Checking winnings after cpu turn
                if check_winner(game_board,turn):
                    return jsonify({'message': f'{turn} wins!', 'turn': turn, 'winner': True}), 200
            
                if check_draw(game_board):
                    return jsonify({'message': "It's a DRAW!", 'turn': turn, 'winner': True}), 200
                return jsonify({'message': 'Move successful', 'turn': turn, 'cpu_turn':cpu_turn}), 200


        except Exception as e:
            print(str(e))
            return jsonify({'message': 'Error processing the move'}), 500
            
    return render_template('play.html')

# reset game in server 
@app.route('/reset_game')
def reset_game():
    global game_board, turn
    game_board = ['', '', '', '', '', '', '', '', '']
    turn = 'X'
    return jsonify({'message': 'Game reset successfully','turn' : turn}), 200

if __name__ == '__main__':
    app.run(debug=True)