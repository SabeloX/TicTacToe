import React, {useState, useEffect} from 'react'
import Board from '../components/Board'
import { calculateWinner } from './calculateWinner'
import io from 'socket.io-client'

const Game = () =>{

    const socket = io('http://localhost:4000')
    const [board, setBoard] = useState(Array(9).fill(null))
    const [playerX, setPlayerX] = useState(true)
    const winner = calculateWinner(board)

    useEffect(() =>{
      socket.on('play', data =>{
        setBoard(data.boardGame)
        setPlayerX(!data.playerX)
      })
    }, [playerX])

    const handleClick = (index) =>{
        const boardGame = [...board]
        if(winner){
            socket.emit('gameEnded', {room: this.getRoomId(), message: 'Game Tied'})
        }

        if(boardGame[index]) return

        boardGame[index] = playerX ? 'X' : 'O'

        setBoard(boardGame)
        setPlayerX(!playerX)
        socket.emit('play', boardGame, playerX)
    }

    return(
        <div className="game-container">
            <h1>Game Container</h1>
            <Board cells={board} handleClick={handleClick}/>
            <div>
                <p>{winner ? 'Winner is Player ' + winner : 'Player ' + (playerX ? 'X' : 'O') + "'s Turn"}</p>
            </div>
        </div>
    )
}

export default Game