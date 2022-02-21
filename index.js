require('dotenv').config() 

/* Dependencies */
const http = require('http')
const express = require('express')
const bp = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./src/routes')
const port = process.env.PORT || 8080
const dbUri = process.env.DBURI

const app = express()
const server = http.createServer(app)

app.use(bp.json())
app.use(cors())
app.use('/api/v1', routes)

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true }).then( () => {
    // Listen on server after connecting to MongoDB
    server.listen(port, () => {
        console.log('Listening on https://localhost:' + port)
    })
}).catch( err => console.log(err) )
