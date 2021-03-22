import React from 'react'
import Authentication from './Authentication'
import Posts from './Posts'

const Application = () => {
  return (
    <main className='Application'>
      <h1>Think Piece</h1>
      <Authentication />
      <Posts />
    </main>
  )
}

export default Application
