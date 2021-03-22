import React, { useState } from 'react'
import { auth, firestore } from '../firebase'

const initialPost = { title: '', content: '', body: '' }
const AddPost = () => {
  const [post, setPost] = useState(initialPost)
  const { uid, displayName, email, photoURL, createdAt } =
    auth.currentUser || {}

  const handleChange = event => {
    const { name, value } = event.target
    setPost(post => ({
      ...post,
      [name]: value
    }))
  }

  const onCreate = post => {
    firestore
      .collection('posts')
      .add(post)
      .then(doc => {
        //created
        // console.log(doc)
      })
      .catch(err => console.log(err))
  }

  const handleSubmit = event => {
    event.preventDefault()
    const { title, body } = post

    const singlePost = {
      //   id: Date.now().toString(),
      title,
      body,
      user: {
        uid,
        displayName,
        email,
        photoURL,
        createdAt
      },
      favorites: 0,
      createdAt: new Date()
    }

    onCreate(singlePost)

    setPost(initialPost)
  }

  const { title, content } = post
  return (
    <form onSubmit={handleSubmit} className='AddPost'>
      <input
        type='text'
        name='title'
        placeholder='Title'
        value={title}
        onChange={handleChange}
      />
      <input
        type='text'
        name='content'
        placeholder='Body'
        value={content}
        onChange={handleChange}
      />
      <input className='create' type='submit' value='Create Post' />
    </form>
  )
}

export default AddPost
