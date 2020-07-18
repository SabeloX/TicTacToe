import React, { useState } from 'react'
import axios from 'axios'

const Register = ({history}) =>{

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [match, setMatch] = useState(true)
    const [error, setError] = useState(null)

    const register = async function(event){
        event.preventDefault()

        try{
            if(password === confirmPassword){
                const result = await axios.post('http://localhost:4000/api/users/register', {username, password})
                if(result){
                    console.log(result)
                    alert('Success! Click Okay to proceed')
                    history.push('/login')
                }
            }
            setMatch(false)
        }
        catch(error){
            console.log(error.response)
            setError(error.response.data.error)
        }
    }

    return(
        <div className='form'>
            <div className='form-container'>
                <form onSubmit={register}>
                    <input type='text' placeholder='Username' value={username} onChange={(event) => setUsername(event.target.value)}/><br/>
                    <input type='password' placeholder='Password' value={password} onChange={(event) => setPassword(event.target.value)}/><br/>
                    <input type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}/><br/>
                    <button type='submit'>Register</button>
                </form>
                {!match && <small>Passwords Do Not Match</small>}
                <div style={{
                        margin: '20px'
                }}>
                    {
                        error && <p>{`${error}`}</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default Register