const { fileToArray, getTodayIndex } = require('./utils')
const db = require('./db')

const getWordBord = async (boardName, boardSize) => {
    const boards = fileToArray(boardName)
    const dayIndex = getTodayIndex()

    // Generate the board
    const board = Array(boardSize).fill([])
    for (index in board)
        board[index] = await boards[dayIndex * boardSize + parseInt(index)].split('')
            .slice(0, -1)

    return board
}

const getLeaderboard = async () => {
    return db.getScores()
}

const addLeaderboardScore = async (req) => {
    
    // TODO: Game/score validation
    
    const score = {
        name: req.name,
        score: req.score
    }
    const obj = db.addScore(score)
    return score
}

module.exports = {
    getWordBord: getWordBord,
    getLeaderboard: getLeaderboard,
    addLeaderboardScore: addLeaderboardScore
}