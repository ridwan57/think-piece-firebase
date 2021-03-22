import React, { useState } from 'react'
import { auth, firestore, storage } from '../firebase'

const initialState = { displayName: '' }
export const UserProfile = () => {
  const [credential, setCredential] = useState(initialState)
  const { displayName } = credential
  let imageInput = null
  let userRef = null
  let getUid = null
  if (auth.currentUser) {
    getUid = auth.currentUser.uid
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
    const file = imageInput && imageInput.files[0]
    event.preventDefault()
    if (displayName) {
      userRef.update({ displayName }).then(() => console.log('Updated'))
    }
    if (file) {
      console.log('file:', file)
      storage
        .ref()
        .child('users-profiles')
        .child(getUid)
        .child(file.name)
        .put(file)
        .then(response => response.ref.getDownloadURL())
        .then(photoURL => userRef.update({ photoURL }))
        .catch(err => console.log(err))
    }
    setCredential(initialState)
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
