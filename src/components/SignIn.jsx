import React, { useState } from 'react'
import { signInWithGoogle } from '../firebase'

const initialState = { email: '', password: '' }
const SignIn = () => {
  const [credentials, setCredentials] = useState(initialState)
  const { email, password } = credentials

  const handleChange = event => {
    const { name, value } = event.target

    setCredentials(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    

    setCredentials(initialState)
  }

  return (
    <form className='SignIn' onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <input
        type='email'
        name='email'
        placeholder='Email'
        value={email}
        onChange={handleChange}
      />
      <input
        type='password'
        name='password'
        placeholder='Password'
        value={password}
        onChange={handleChange}
      />
      <input type='submit' value='Sign In' />
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </form>
  )
}

export default SignIn
