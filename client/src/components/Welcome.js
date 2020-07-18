import React, {useState} from 'react'
import io from 'socket.io-client'

const Welcome = ({history}) =>{

    const socket = io('http://localhost:4000')

    const user = localStorage.getItem('user')
    const [gameid, setGameid] = useState(null)

    const joinGame = () =>{
        if(!gameid){
            alert('Enter Game ID')
        }
        else if(!user){
            history.push('/login')
        }
        socket.emit('joinGame', {name: user.username, room: gameid})
    }

    const newGame = () =>{
        if(!user){
            history.push('/login')
        }
        socket.emit('createGame', {name: user.username})
    }

    return(
        <div>
            <h1>Tic-Tac-Toe</h1>
            <hr/>

            <div className='new-game'>    
                <h3>Create A New Game</h3>
                <button onClick={newGame}>New Game</button>
            </div>
            <hr/>

            <div className='join-game'>
                <h3>Join A New Game</h3>
                <form onSubmit={joinGame}>
                    <input type='text' placeholder='Enter Game ID' onChange={(e) => setGameid(e.target.value) } />
                    <button type='submit'>Join</button>
                </form>
            </div>
        </div>
    )
}

export default Welcome