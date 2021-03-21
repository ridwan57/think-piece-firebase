import React, { useState } from 'react'
import { auth, createUserProfileDocument } from '../firebase'
const initialState = { displayName: '', email: '', password: '' }

const SignUp = () => {
  const [credential, setCredential] = useState(initialState)
  const { displayName, email, password } = credential

  const handleChange = event => {
    const { name, value } = event.target

    setCredential(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(cred => {
        console.log('Success: ', cred)
        const { user } = cred
        user.updateProfile({ displayName })
        createUserProfileDocument(user, { displayName})
      })
      .catch(err => {
        console.log(err)
      })

    setCredential(initialState)
  }

  return (
    <form className='SignUp' onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        type='text'
        name='displayName'
        placeholder='Display Name'
        value={displayName}
        onChange={handleChange}
      />
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
      <input type='submit' value='Sign Up' />
    </form>
  )
}

export default SignUp
