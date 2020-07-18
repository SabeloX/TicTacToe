require('dotenv').config()
const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/users')
const port = process.env.PORT
const {notFound, error} = require('./handlers/error')

const io = require('socket.io')(server)

io.sockets.on('connection', socket =>{

    //Player 1 creates a game/room
    socket.on('createGame', data =>{
        socket.join('room-' + ++rooms)
        socket.emit('newGame', {name: data.name, room: 'room-'+rooms})
    })

    //For second player to join am existing game/room
    socket.on('joinGame', data =>{
        const room = io.nsps['/'].adapter.rooms[data.room]

        //if there is a room and 1 player
        if( room && room.length == 1){
          socket.join(data.room)
          socket.broadcast.to(data.room).emit('player1', {})
          socket.emit('player2', {name: data.name, room: data.room })
        }

        //If there are two players
        else {
          socket.emit('err', {message: 'The game is full!'})
        }
    })

    //When a player makes their turn
    socket.on('playTurn', data =>{
        socket.broadcast.to(data.room).emit('turnPlayed', {
          tile: data.tile,
          room: data.room
        })
    })

    //Tell players the game is over
    socket.on('gameEnded', (data) =>{
        socket.broadcast.to(data.room).emit('gameEnd', data)
    })

    socket.broadcast.on('play', (boardGame, playerX) =>{
        socket.emit('play', {boardGame, playerX})
    })
})

app.use(bodyParser.json())
app.use(cors())

app.use('/api/users', router)

app.use(notFound)
app.use(error)

server.listen(port, console.log(`Running on port ${port}`))