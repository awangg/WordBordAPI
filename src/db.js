const moment = require('moment-timezone')

const Score  = require('./models/score.model')

const getScores = async () => {
    const today = moment().tz('America/New_York').startOf('day')

    return Score.find({
        createdAt: {
            $gte: today.toDate(),
            $lte: moment(today).endOf('day').toDate()
        }
    }, { '_id': 0, '__v': 0, 'createdAt': 0 }, {
        sort: { score: -1 },
        limit: 10
    })
}

const addScore = async (scoreReq) => {
    const score = new Score(scoreReq)
    return score.save()
}

module.exports = {
    getScores: getScores,
    addScore: addScore
}