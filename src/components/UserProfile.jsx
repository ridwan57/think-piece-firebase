import React, { useState } from 'react'
import { auth, firestore } from '../firebase'

export const UserProfile = () => {
  const [credential, setCredential] = useState({ displayName: '' })
  const { displayName } = credential
  let imageInput = null
  let userRef = null
  if (auth.currentUser) {
    const getUid = auth.currentUser.uid || ''
    userRef = firestore.doc(`users/${getUid}`)
  }

  const handleChange = event => {
    const { name, value } = event.target
    setCredential(post => ({
      ...post,
      [name]: value
    }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (displayName) {
      userRef.update({ displayName }).then(() => console.log('Updated'))
    }
  }

  return (
    <section className='UserProfile'>
      <form onSubmit={handleSubmit} className='AddPost'>
        <input
          type='text'
          name='displayName'
          placeholder='Display Name'
          value={displayName}
          onChange={handleChange}
        />
        <input type='file' ref={ref => (imageInput = ref)} />
        {/* <input
          type='text'
          name='content'
          placeholder='Body'
          value={content}
          onChange={handleChange}
        /> */}
        <input className='update' type='submit' value='Update Post' />
      </form>
    </section>
  )
}
