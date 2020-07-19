require('dotenv').config()
const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const cors = require('cors')
const bodyParser = require('body-parser')
const port = process.env.PORT || 4000

const io = require('socket.io')(server)

io.on('connection', socket =>{

    //Playing the game
    socket.broadcast.on('play', (boardGame, playerX) =>{
        socket.emit('play', {boardGame, playerX})
    })
})

app.use(bodyParser.json())
app.use(cors())

server.listen(port, console.log(`Running on port ${port}`))