const fs = require('fs')
const moment = require('moment-timezone')

const NUM_MOVES = 20
const SCORE_PER_MOVE = 100

const fileToArray = (name) => {
    return fs.readFileSync(`res/${name}.txt`).toString().split('\n')
}

const getTodayIndex = () => {
    const adjusted = moment().tz('America/New_York') // always adjust to EST

    return adjusted.dayOfYear() + 365 * (adjusted.year() - 2022)
}

const simulateGame = async (board, moves) => {
    let boardSize = board.length
    if (moves.length <= 0 || moves.length > NUM_MOVES)
        return false

    for (let move of moves) {
        move.dir === "row" ? rotateRow(board, move.i, move.n, boardSize) :
            rotateCol(board, move.i, move.n, boardSize)
        if (!checkBoard(board, move.found))
            return false
    }
    return true
}

const checkScore = async (score, moves) => {
    let computed = 0
    for (let move of moves)
        computed += move.found.length * SCORE_PER_MOVE
    return score <= computed && score % SCORE_PER_MOVE == 0
}

/*
 * Game Simulation Helpers
 */

const rotateRow = (board, row, n, boardSize) => {
    let newRow = []
    if (row >= boardSize)
        return

    board.forEach((element, index) => {
        let c = mod(index - n, boardSize)
        newRow.push(board[row][c])
    })
    board[row] = newRow
}

const rotateCol = (board, col, n, boardSize) => {
    let newCol = []
    if (col >= boardSize)
        return

    board.forEach((element, index) => {
        let r = mod(index - n, boardSize)
        newCol.push(board[r][col])
    })
    board.forEach((element, index) => board[index][col] = newCol[index])
}

const checkBoard = (board, words) => {
    let found = 0

    // Check all rows
    for (row of board) {
        const reversed = row.slice().reverse()
        if (words.includes(row.join("")) || words.includes(reversed.join(""))) found += 1
    }

    // Check all cols
    for (let c = 0; c < board.length; c++) {
        let word = ""
        let revWord = ""
        for (let r = 0; r < board.length; r++) {
            word += board[r][c]
            revWord += board[board.length - r - 1][c]
        }
        if (words.includes(word) || words.includes(revWord)) found += 1
    }

    return found == words.length
}

/*
 * Needed because Javascript modulo is buggy
 */
const mod = (n, m) => {
    return ((n % m) + m) % m;
}

module.exports = {
    fileToArray: fileToArray,
    getTodayIndex: getTodayIndex,
    simulateGame: simulateGame,
    checkScore: checkScore
}