const express = require('express')
const router = express.Router()

const handlers = require('./handlers')

/**
 * GET /api/v1/board/:size
 * 
 * Retrieves the board of the day.
 * @param size The size of the board
 */
router.get('/board/:size', async (req, res) => {
    try {
        const size = parseInt(req.params.size)
        const board = await handlers.getWordBord(`boards${size}`, size)
        res.status(200).json(board)
    } catch (err) {
        res.status(400).json({ err: err.toString() })
    }
})

/**
 * GET /api/v1/leaderboard
 * 
 * Gets the top 10 entries in the leaderboard.
 */
router.get('/leaderboard', async (req, res) => {
    try {
        const leaderboard = await handlers.getLeaderboard()
        res.status(200).json(leaderboard)
    } catch (err) {
        res.status(400).json({ err: err.toString() })
    }
})

/**
 * POST /api/v1/leaderboard
 * 
 * Request Body
 * {
 *   name: String,
 *   score: Integer,
 *   boardSize: Integer,
 *   moves: [{
 *     dir: "row" | "col",
 *     i: Integer, - row/col being rotated
 *     n: Integer, - rotations in positive direction
 *     found: [String] - words found
 *   }]
 * }
 * 
 * Adds a score to the leaderboard, pending validation.
 */
router.post('/leaderboard', async (req, res) => {
    try {
        const body = req.body
        const response = await handlers.addLeaderboardScore(body)
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(400).json({ err: err.toString() })
    }
})

module.exports = router