import React, { useState } from 'react'
import axios from 'axios'

const Login = ({history}) =>{

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const login = async function(event){
        event.preventDefault()
        
        try{
            const result = await axios.post('http://localhost:4000/api/users/login', {username, password})
            console.log(result.data)
            history.push('/welcome')
        }
        catch(error){
            console.log(error.response.data.error)
            setError(error.response.data.error)
        }
    }

    return(
        <div className='form'>
            <div className='form-container'>
                <form onSubmit={login}>
                    <input type='text' placeholder='Username' value={username} onChange={(event) => setUsername(event.target.value)}/><br/>
                    <input type='password' placeholder='Password' value={password} onChange={(event) => setPassword(event.target.value)}/><br/>
                    <button type='submit'>Login</button>
                </form>
                <div style={{
                    margin: '20px'
                }}>
                    {
                        error && <p>{error}</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default Login