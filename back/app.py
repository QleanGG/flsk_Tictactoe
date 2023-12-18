from flask import Flask, render_template, url_for,request,redirect,jsonify
from flask_socketio import SocketIO

# socketio = SocketIO(app)

app = Flask(__name__)

# '''variables I need'''

turn = ''

def determine_turn():
    global turn
    if turn == '' or turn == 'O': turn = 'X'
    else: turn = 'O'
    return turn

@app.route('/get_turn')
def get_turn():
    current_turn = determine_turn()
    return jsonify({'turn': current_turn}), 200

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/play', methods=['GET','POST'])
def play():
    turn = ''
    # winning combinations for tic tac toe
    winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], # Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], # Columns
            [0, 4, 8], [2, 4, 6]]             # Diagonals
    
    def receive_move():
        pass
        

    # Update the game state and return the updated state as JSON
    # You might want to use Flask-SocketIO for real-time updates
    # return jsonify({'message': 'Move played successfully'})
    return render_template('play.html')


if __name__ == '__main__':
    app.run(debug=True)