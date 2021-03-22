import React, { useEffect, useState, createContext } from 'react'
import { firestore } from '../firebase'
import { collectIdsAndData } from '../utilities'
export const PostsContext = createContext()

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const postsRef = firestore.collection('posts')

  const postsListener = () => {
    const unsubscribeFromFirestore = postsRef.onSnapshot(snapshot => {
      const allPosts = collectIdsAndData(snapshot)
      setPosts(allPosts)
    })
    return unsubscribeFromFirestore
  }

  useEffect(() => {
    const unsubscribeFromFirestore = postsListener()
    return () => unsubscribeFromFirestore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
}
