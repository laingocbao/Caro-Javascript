var board = [["_", "_", "_", "_"], 
            ["_", "_", "_", "_"],
            ["_", "_", "_", "_"],
            ["_", "_", "_", "_"]]

function test1(board1) {
    board1[0][0] = 'O'
    // board[0][0] = '_'
}

function copy(board) {
    var newArray = board.map(function(arr) {
        return arr.slice();
    });

    return newArray;
}

var boardClone = copy(board)
boardClone[0][0] = 'O'
console.log(board)
console.log(boardClone)