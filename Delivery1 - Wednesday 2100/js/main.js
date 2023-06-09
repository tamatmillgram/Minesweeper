'use strict'
const MINE = '💣'
const FLAG = '🚩'
const EMPTY = ''

// The Model
var gBoard
var gGameInterval
var gGame
var gLevel

function onInit() {
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    gLevel = {
        SIZE: 4,
        MINES: 2
    }
    gBoard = buildBoard()
    console.log(gBoard)
    renderBoard(gBoard)

}

function buildBoard() {
    const board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            const cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false, //(Math.random() > 0.5) ? true : false, 
                isMarked: false
            }
            board[i][j] = cell
        }
    }
    board[0][0].isMine = true
    board[3][3].isMine = true

    findMinesNegsCount(board)
    return board
}


function findMinesNegsCount(board) {

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (!board[i][j].isMine) {
                var currCell = board[i][j]
                currCell.minesAroundCount = setMinesNegsCount(i, j, board)
            }
        }
    }
    return board
}


function setMinesNegsCount(rowIdx, colIdx, board) {
    var minesAroundCount = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j];
            if (currCell.isMine) minesAroundCount++
        }
    }
    return minesAroundCount
}


function renderBoard() {
    var strHTML = ''
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += `<tr>\n`
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j]

            if (cell.isShown) {
                var className = 'shown'
                // cell = MINE
            } else {
                className = ''
                // cell = cell.minesAroundCount

            }
            strHTML += `\t<td 
                        class="cell ${className}" 
                        onclick="onCellClicked(this, ${i}, ${j})"></td>\n`
        }
        strHTML += `</tr>\n`
    }
    //  console.log(strHTML)

    const elCell = document.querySelector('.board')
    elCell.innerHTML = strHTML
}

function onCellClicked(elCell, i, j) {
    
    var cell = gBoard[i][j];
    if (cell.isMarked || cell.isShown) return;
    cell.isShown = true;
    if(cell.isShown && cell.isMine) {
        elCell.innerText= MINE
        elCell = 'mine'
    } else if (cell.isShown && cell.minesAroundCount){
        elCell.innerText=cell.minesAroundCount
    }
}