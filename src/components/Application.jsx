import React from 'react'
import { Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import Authentication from './Authentication'
import  PostPage  from './PostPage'
import Posts from './Posts'
import { UserProfile } from './UserProfile'

const Application = () => {
  return (
    <main className='Application'>
      <Link to='/'>
        <h1>Think Piece</h1>
      </Link>
      <Authentication />

      <Switch>
        <Route exact path='/' component={Posts} />
        <Route exact path='/profile' component={UserProfile} />
        <Route exact path='/posts/:id' component={PostPage} />
      </Switch>
    </main>
  )
}

export default Application
