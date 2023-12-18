import json
from flask import Flask, render_template, url_for,request,redirect
from flask_socketio import SocketIO

# socketio = SocketIO(app)


app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/play', methods=['GET','POST'])
def play():
    # winning combinations for tic tac toe
    winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], # Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], # Columns
            [0, 4, 8], [2, 4, 6]             # Diagonals
            ]
    
    # Update the game state and return the updated state as JSON
    # You might want to use Flask-SocketIO for real-time updates
    # return jsonify({'message': 'Move played successfully'})
    return render_template('play.html')


if __name__ == '__main__':
    app.run(debug=True)