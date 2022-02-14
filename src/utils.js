const fs = require('fs')
const moment = require('moment-timezone')

const fileToArray = (name) => {
    return fs.readFileSync(`res/${name}.txt`).toString().split('\n')
}

const getTodayIndex = () => {
    const adjusted = moment().tz('America/New_York') // always adjust to EST

    return adjusted.dayOfYear() + 365*(adjusted.year() - 2022)
}

module.exports = {
    fileToArray: fileToArray,
    getTodayIndex: getTodayIndex
}