import React, { useEffect, useState } from 'react'
import { auth, createUserProfileDocument, firestore } from '../firebase'
import { fetchPosts } from '../utilities'
import Authentication from './Authentication'

import Posts from './Posts'

const Application = () => {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState({})
  const postsRef = firestore.collection('posts')

  const postsListener = () => {
    const unsubscribeFromFirestore = postsRef.onSnapshot(snapshot => {
      const allPosts = fetchPosts(snapshot)
      setPosts(allPosts)
    })
    return unsubscribeFromFirestore
  }

  useEffect(() => {
    const unsubscribeFromFirestore = postsListener()
    return () => unsubscribeFromFirestore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      console.log('userAuth:', userAuth)

      if (!userAuth) {
        const user = await createUserProfileDocument(userAuth)
        console.log('userFromAuth:', user)
      }
      setUser(userAuth ? userAuth : {})
    })
    return () => unsubscribeFromAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className='Application'>
      <h1>Think Piece</h1>
      <Authentication user={user} />
      <Posts posts={posts} />
    </main>
  )
}

export default Application
