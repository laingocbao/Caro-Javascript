const NUMBER_ROW = 15
const CHARACTER = {
    HUMAN: 'O',
    COMPUTER: 'X',
    EMPTY: '_'
}

function getInitialBoard () {
    var board = [];

    for (var x = 0;x < NUMBER_ROW;x++) {
        board.push([]);

        for (var y = 0;y < NUMBER_ROW;y++) {
        board[x].push(CHARACTER.EMPTY);
        }
    }

    // return board;

    // var board = [[CHARACTER.EMPTY, CHARACTER.HUMAN, CHARACTER.COMPUTER, CHARACTER.COMPUTER], 
    //             [CHARACTER.HUMAN, CHARACTER.HUMAN, CHARACTER.COMPUTER, CHARACTER.COMPUTER], 
    //             [CHARACTER.EMPTY, CHARACTER.EMPTY, CHARACTER.HUMAN, CHARACTER.COMPUTER],
    //             [CHARACTER.EMPTY, CHARACTER.EMPTY, CHARACTER.HUMAN, CHARACTER.HUMAN]]

    // var board = [[CHARACTER.HUMAN, CHARACTER.COMPUTER, CHARACTER.COMPUTER, CHARACTER.COMPUTER], 
    //             [CHARACTER.HUMAN, CHARACTER.COMPUTER, CHARACTER.HUMAN, CHARACTER.EMPTY],
    //             [CHARACTER.HUMAN, CHARACTER.HUMAN, CHARACTER.HUMAN, CHARACTER.COMPUTER], 
    //             [CHARACTER.COMPUTER, CHARACTER.EMPTY, CHARACTER.HUMAN, CHARACTER.EMPTY]]
    
    var board =     [["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"],
                    ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"],
                    ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"],
                    ["_", "_", "_", "_", "_", "_", "_", "X", "_", "_", "X", "_", "_", "_", "_"],
                    ["_", "_", "_", "_", "_", "_", "O", "O", "_", "O", "_", "_", "_", "_", "_"],
                    ["_", "_", "_", "_", "_", "_", "_", "O", "O", "_", "_", "_", "_", "_", "_"],
                    ["_", "_", "_", "_", "_", "_", "_", "O", "O", "_", "_", "_", "_", "_", "_"],
                    ["_", "_", "_", "_", "_", "_", "_", "_", "X", "_", "_", "_", "_", "_", "_"],
                    ["_", "_", "_", "_", "_", "_", "_", "_", "_", "X", "_", "_", "_", "_", "_"],
                    ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "X", "_", "_", "_", "_"],
                    ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "X", "_", "_", "_"],
                    ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "O", "_", "_"],
                    ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "X", "_"],
                    ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"],
                    ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"]]

    // var board = [["_", "_", "_", "_", "_", "_"],
    //             ["X", "_", "O", "_", "_", "_"],
    //             ["X", "_", "O", "_", "_", "_"],
    //             ["_", "_", "O", "_", "_", "_"],
    //             ["_", "_", "_", "_", "_", "_"],
    //             ["_", "_", "_", "_", "_", "_"]]

    // var board = [["_", "_", "_", "_", "_", "_"],
    //             ["X", "O", "_", "_", "_", "_"],
    //             ["X", "O", "_", "_", "_", "_"],
    //             ["_", "O", "_", "_", "_", "_"],
    //             ["_", "_", "_", "_", "_", "_"],
    //             ["_", "_", "_", "_", "_", "_"]]

    return board
}

var board = getInitialBoard();

// Kiểm tra đường biên có an toàn hay không
// Kết quả trả về là một mảng 4 phần tử kiểu Bool đại diện cho 4 chiều: ngang, dọc, chéo chính, chéo phụ
// Hàm này kiểm tra tại ô đó có khả năng tạo được một chuỗi 5 phần tử hay không 
function checkSafeAreaFor5Cell(row, col) {
    var result = {
        horizontal: false,
        vertical: false,
        mainDiagonal: false,
        secondaryDiagonal: false 
    }

    // Ngang 
    if (col + NUMBER_CHARACTER_WIN - 1 < NUMBER_ROW) {
        result.horizontal = true
    }

    // Dọc 
    if (row + NUMBER_CHARACTER_WIN - 1 < NUMBER_ROW) {
        result.vertical = true
    }

    // Chéo chính 
    if ((col + NUMBER_CHARACTER_WIN - 1 < NUMBER_ROW) && (row + NUMBER_CHARACTER_WIN - 1 < NUMBER_ROW)) {
        result.mainDiagonal = true
    }

    // Chéo phụ 
    if ((col - NUMBER_CHARACTER_WIN + 1 >= 0) && (row + NUMBER_CHARACTER_WIN - 1 < NUMBER_ROW)) {
        result.secondaryDiagonal = true
    }

    return result
}

// Kiểm tra đường biên có an toàn hay không
// Kết quả trả về là một mảng 4 phần tử kiểu Bool đại diện cho 4 chiều: ngang, dọc, chéo chính, chéo phụ
// Hàm này kiểm tra tại ô đó có khả năng tạo được một chuỗi 4 phần tử, cùng với 2 ô trống hai đầu hay không 
function checkSafeAreaFor4Cell(row, col) {
    var result = {
        horizontal: false,
        vertical: false,
        mainDiagonal: false,
        secondaryDiagonal: false 
    }

    // Ngang 
    if (col + NUMBER_CHARACTER_WIN - 1 < NUMBER_ROW && col - 1 >= 0) {
        result.horizontal = true
    }

    // Dọc 
    if (row + NUMBER_CHARACTER_WIN - 1 < NUMBER_ROW && row - 1 >= 0) {
        result.vertical = true
    }

    // Chéo chính 
    if (col + NUMBER_CHARACTER_WIN - 1 < NUMBER_ROW 
        && col - 1 >= 0
        && row + NUMBER_CHARACTER_WIN - 1 < NUMBER_ROW
        && row - 1 >= 0) {
        result.mainDiagonal = true
    }

    // Chéo phụ 
    if (col - NUMBER_CHARACTER_WIN + 1 >= 0 
        && col + 1 < NUMBER_ROW
        && row + NUMBER_CHARACTER_WIN - 1 < NUMBER_ROW
        && row - 1 >= 0) {
        result.secondaryDiagonal = true
    }

    return result
}

// Kiểm tra đường biên có an toàn hay không
// Kết quả trả về là một mảng 8 phần tử kiểu Bool đại diện cho 8 chiều
// Hàm này kiểm tra tại ô đó có khả năng tạo được một chuỗi 3 phần tử, cùng với 2 ô trống hai đầu hay không (hoặc ô chứa cùng phần tử)
              // [row, col]
var directions8 = [[-1, -1],
                 [-1, 0],
                 [-1, 1],
                 [0, 1],
                 [1, 1],
                 [1, 0],
                 [1, -1],
                 [0, -1],]
function checkSafeAreaFor3Cell(row, col) {
    var result = [false, false, false, false, false, false, false, false]

    // for (index = 0; index < directions8.length; index++) { 
    //     if (row + 3 * directions8[index][0] < NUMBER_ROW && col + 3 * directions8[index][1] < NUMBER_ROW
    //         && row - directions8[index][0] >= 0 && col - directions8[index][1] >= 0) {
    //         result[index] = true
    //     }
    // } 
    
    // Direct0 
    if (col - 3 >= 0 && row - 3 >= 0
        && col + 1 < NUMBER_ROW && row + 1 < NUMBER_ROW) {
        result[0] = true
    }

    // Direct1 
    if (row - 3 >= 0 && row + 1 < NUMBER_ROW) {
        result[1] = true
    }

    // Direct2
    if (col + 3 < NUMBER_ROW && row - 3 >= 0
        && col - 1 >= 0 && row + 1 < NUMBER_ROW) {
        result[2] = true
    }

    // Direct3
    if (col + 3 < NUMBER_ROW && col - 1 >= 0) {
        result[3] = true
    }

    // Direct4
    if (col + 3 < NUMBER_ROW && row + 3 < NUMBER_ROW
        && col - 1 >= 0 && row - 1 >= 0) {
        result[4] = true
    }

    // Direct5
    if (row + 3 < NUMBER_ROW && row - 1 >= 0) {
        result[5] = true
    }

    // Direct6
    if (col - 3 >= 0 && row + 3 < NUMBER_ROW
        && col - 1 >= 0 && row + 1 < NUMBER_ROW) {
        result[6] = true
    }

    // Direct7
    if (col - 3 >= 0 && col + 1 < NUMBER_ROW) {
        result[7] = true
    }

    return result
}

// X X X X X
// Hàm này dùng để check win 5 ô trên một trục, trong đó
// row là dòng, rowCoefficient là hệ số cộng trên dòng
// col là cột, colCoefficient là hệ số công trên cột 
function checkWin5InAxis(board, row, rowCoefficient, col, colCoefficient) {
    var isWin = true
    for (let index = 0; index < NUMBER_CHARACTER_WIN; index++) {
        if (board[row][col] != board[row + rowCoefficient * index][col + colCoefficient * index]) {
            isWin = false
        }
    } 
    return isWin
}

// * X X X X *
// Hàm này dùng để check win 4 trên một trục: 4 ô liên tiếp, và trống 2 ô ở 2 đầu 
// Trong đó
// row là dòng, rowCoefficient là hệ số cộng trên dòng
// col là cột, colCoefficient là hệ số công trên cột 
function checkWin4InAxis(board, row, rowCoefficient, col, colCoefficient) {
    var isWin = true
    for (let index = 0; index < NUMBER_CHARACTER_WIN - 1; index++) {
        if (board[row][col] != board[row + rowCoefficient * index][col + colCoefficient * index]) {
            isWin = false
        }
    } 

    if (board[row - rowCoefficient][col - colCoefficient] != CHARACTER.EMPTY
        || board[row + (NUMBER_CHARACTER_WIN - 1) * rowCoefficient][col + (NUMBER_CHARACTER_WIN - 1) * colCoefficient] != CHARACTER.EMPTY) {
        isWin = false
    }
    return isWin
}

// * X X X *
// Hàm này dùng để check win 3 trên một trục: 3 ô liên tiếp, và trống 2 ô ở 2 đầu (2 ô này có thể là trống hoặc cùng với ô đang xét )
// Trong đó
// row là dòng, rowCoefficient là hệ số cộng trên dòng
// col là cột, colCoefficient là hệ số công trên cột 
function checkWin3InAxis(board, row, rowCoefficient, col, colCoefficient) {
    var isWin = true
    for (let index = 0; index < 3; index++) {
        if (board[row][col] != board[row + rowCoefficient * index][col + colCoefficient * index]) {
            isWin = false
        }
    } 

    var competiorCharacter = board[row][col] == CHARACTER.HUMAN ? CHARACTER.COMPUTER : CHARACTER.HUMAN
    if (board[row - rowCoefficient][col - colCoefficient] == competiorCharacter
        || board[row + 3 * rowCoefficient][col + 3 * colCoefficient] == competiorCharacter) {
        isWin = false
    }

    return isWin
}

function checkWin(board) {    
    for (let i = 0; i < NUMBER_ROW; i++) {
        for (let j = 0; j < NUMBER_ROW; j++) {              
            if (board[i][j] == CHARACTER.EMPTY) {
                continue
            }
         
            var safeArea5CellResult = checkSafeAreaFor5Cell(i, j)
            
            if (safeArea5CellResult.horizontal) {    // Ngang 
                if (checkWin5InAxis(board, i, 0, j, 1)) {
                    return true
                }          
            }
            if (safeArea5CellResult.vertical) { // Dọc 
                if (checkWin5InAxis(board, i, 1, j, 0)) {
                    return true
                }    
            }
            if (safeArea5CellResult.mainDiagonal) { // Chéo chính 
                if (checkWin5InAxis(board, i, 1, j, 1)) {
                    return true
                }    
            }
            if (safeArea5CellResult.secondaryDiagonal) {    // Chéo phụ
                if (checkWin5InAxis(board, i, 1, j, -1)) {
                    return true
                }    
            }          

            var safeArea4CellResult = checkSafeAreaFor4Cell(i, j)
            
            if (safeArea4CellResult.horizontal) {    // Ngang 
                if (checkWin4InAxis(board, i, 0, j, 1)) {
                    return true
                }          
            }
            if (safeArea4CellResult.vertical) { // Dọc 
                if (checkWin4InAxis(board, i, 1, j, 0)) {
                    return true
                }    
            }
            if (safeArea4CellResult.mainDiagonal) { // Chéo chính 
                if (checkWin4InAxis(board, i, 1, j, 1)) {
                    return true
                }    
            }
            if (safeArea4CellResult.secondaryDiagonal) {    // Chéo phụ
                if (checkWin4InAxis(board, i, 1, j, -1)) {
                    return true
                }    
            }   

            var safeArea3CellResult = checkSafeAreaFor3Cell(i, j)   
            var result3 = [false, false, false, false, false, false, false, false]
            var countTrue = 0
            for (index = 0; index < directions8.length; index++) { 
                result3[index] = checkWin3InAxis(board, i, directions8[index][0], j, directions8[index][1])
                if (result3[index] == true) {
                    countTrue += 1
                    if (countTrue == 2) {
                        return true
                    }
                }
            }      
        }
    }
    return false
}

var i = 4, j = 6
var safeArea3CellResult = checkSafeAreaFor3Cell(i, j)   
var result3 = [false, false, false, false, false, false, false, false]
var countTrue = 0
for (index = 0; index < directions8.length; index++) { 
    result3[index] = checkWin3InAxis(board, i, directions8[index][0], j, directions8[index][1])
    // if (result3[index] == true) {
    //     countTrue += 1
    //     if (countTrue == 2) {
    //         return true
    //     }
    // }
}    
console.log(result3)