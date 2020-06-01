NUMBER_ROW = 3
const CHARACTER = {
    HUMAN: 'O',
    COMPUTER: 'X',
    EMPTY: '_'
}

// board = [[CHARACTER.EMPTY, CHARACTER.EMPTY, CHARACTER.EMPTY], 
//          [CHARACTER.EMPTY, CHARACTER.EMPTY, CHARACTER.EMPTY], 
//          [CHARACTER.EMPTY, CHARACTER.EMPTY, CHARACTER.EMPTY]]

function drawBoard(board) {
    board.forEach(row => {
        rowString = ""
        row.forEach(item => {
            rowString = rowString + " " + item
        })
        console.log(rowString)
    });
}

function drawBoardHtlm(id) {
    htmlString = ""
    board.forEach(row => {
        rowString = ""
        row.forEach(item => {
            rowString = rowString + "<s> " + item + "</s>"
        })
        htmlString += rowString + '<br/>'
    });

    var s = document.getElementById(id)
    s.innerHTML = htmlString
}

function actionCheckAt() {
    var x = document.getElementById('x').value
    var y = document.getElementById('y').value
    if (board[y][x] == CHARACTER.EMPTY) {
        if (turn) {
            board[y][x] = CHARACTER.HUMAN
        }
        else {
            board[y][x] = CHARACTER.COMPUTER
        }  
        drawBoardHtlm("grid")
        if (checkWinManual(board)) {
            alert("Người thắng")
        }  

        boardClone = [...board]
        var index = miniMaxDecision(boardClone, CHARACTER.COMPUTER)[0]
        board[Math.floor(index/NUMBER_ROW)][index%NUMBER_ROW] = CHARACTER.COMPUTER
        drawBoardHtlm("grid")
        if (checkWinManual(board)) {
            alert("Máy thắng")
        }       
    }
}

function checkWinManual(board) {
    isWin = false

    // Check hàng dọc 
    if ((board[0][0] != CHARACTER.EMPTY && board[0][0] == board[0][1] && board[0][1] == board[0][2])
            || (board[1][0] != CHARACTER.EMPTY && board[1][0] == board[1][1] && board[1][1] == board[1][2])
            || (board[2][0] != CHARACTER.EMPTY && board[2][0] == board[2][1] && board[2][1] == board[2][2])) 
    {
        isWin = true
    }

    // Check hàng ngang 
    if ((board[0][0] != CHARACTER.EMPTY && board[0][0] == board[1][0] && board[1][0] == board[2][0])
            || (board[0][1] != CHARACTER.EMPTY && board[0][1] == board[1][1] && board[1][1] == board[2][1])
            || (board[0][2] != CHARACTER.EMPTY && board[0][2] == board[1][2] && board[1][2] == board[2][2])) 
    {
        isWin = true
    }

    // Check đường chéo  
    if ((board[0][0] != CHARACTER.EMPTY && board[0][0] == board[1][1] && board[1][1] == board[2][2])
            || (board[2][0] != CHARACTER.EMPTY && board[2][0] == board[1][1] && board[1][1] == board[0][2]))
    {
        isWin = true
    }
    if (isWin) { 
        return true
    }
    return false
}

function checkWin() {
    for (let i = 0; i < NUMBER_ROW; i++) {
        for (let j = 0; j < NUMBER_ROW; j++) {
            
            // if ()
            
        }
    }
}

function miniMaxDecision(boardTem, characterWillCheck) {  
    var optimizeScore = characterWillCheck == CHARACTER.COMPUTER ? -2 : 2
    var index = -1
    for (let i = 0; i < NUMBER_ROW; i++) {
        for (let j = 0; j < NUMBER_ROW; j++) {            
           if (boardTem[i][j] == CHARACTER.EMPTY) {
                boardTem[i][j] = characterWillCheck

                result = checkWinManual(boardTem)
                score = 0
                if (result) {
                    if (characterWillCheck == CHARACTER.COMPUTER) {
                        score = 1
                    }
                    else {
                        score = -1
                    }
                }  
                else {
                    score = miniMaxDecision(boardTem, characterWillCheck == CHARACTER.HUMAN ? CHARACTER.COMPUTER : CHARACTER.HUMAN)[1]
                }             
                
                if (characterWillCheck == CHARACTER.COMPUTER && score > optimizeScore) {
                    optimizeScore = score
                    index = i * NUMBER_ROW + j
                }
                else if (characterWillCheck == CHARACTER.HUMAN && score < optimizeScore) {
                    optimizeScore = score
                    index = i * NUMBER_ROW + j
                }
                
                boardTem[i][j] = CHARACTER.EMPTY
           }           
        }
    }
    return [index, optimizeScore]
}

function alphaBetaPruning(boardTem, characterWillCheck, alpha, beta) {  
    var optimizeScore = characterWillCheck == CHARACTER.COMPUTER ? -2 : 2
    var index = -1
    for (let i = 0; i < NUMBER_ROW; i++) {
        for (let j = 0; j < NUMBER_ROW; j++) {            
           if (boardTem[i][j] == CHARACTER.EMPTY) {
                boardTem[i][j] = characterWillCheck

                result = checkWinManual(boardTem)
                score = 0
                if (result) {
                    if (characterWillCheck == CHARACTER.COMPUTER) {
                        score = 1
                    }
                    else {
                        score = -1
                    }
                }  
                else {
                    score = alphaBetaPruning(boardTem, characterWillCheck == CHARACTER.HUMAN ? CHARACTER.COMPUTER : CHARACTER.HUMAN)[1]
                }             
                
                if (characterWillCheck == CHARACTER.COMPUTER && score > optimizeScore) {
                    optimizeScore = score
                    index = i * NUMBER_ROW + j
                }
                else if (characterWillCheck == CHARACTER.HUMAN && score < optimizeScore) {
                    optimizeScore = score
                    index = i * NUMBER_ROW + j
                }
                
                boardTem[i][j] = CHARACTER.EMPTY
           }           
        }
    }
    return [index, optimizeScore]
}

board = [[CHARACTER.EMPTY, CHARACTER.EMPTY, CHARACTER.COMPUTER], 
         [CHARACTER.COMPUTER, CHARACTER.EMPTY, CHARACTER.EMPTY], 
         [CHARACTER.COMPUTER, CHARACTER.HUMAN, CHARACTER.HUMAN]]
drawBoardHtlm("grid")
// getComputerDecision()