import React, { Component, useState } from 'react'
const initialState = { content: '' }

const AddComment = ({ onCreate }) => {
  const [commentValues, setCommentValues] = useState(initialState)

  const { content } = commentValues

  const handleChange = event => {
    const { name, value } = event.target
    setCommentValues(prev => ({
      ...prev,

      [name]: value
    }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    onCreate(commentValues)
    console.log('commentValues:', commentValues)

    setCommentValues(initialState)
  }

  return (
    <form onSubmit={handleSubmit} className='AddComment'>
      <input
        type='text'
        name='content'
        placeholder='Comment'
        value={content}
        onChange={handleChange}
      />
      <input className='create' type='submit' value='Create Comment' />
    </form>
  )
}

export default AddComment
