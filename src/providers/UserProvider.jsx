import React, { useEffect, useState, createContext } from 'react'
import { auth, createUserProfileDocument } from '../firebase'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      console.log('userAuth:', userAuth)

      const userRef = await createUserProfileDocument(userAuth)
      userRef.onSnapshot(snapshot => {
        setUser({
          uid: snapshot.id,
          ...snapshot.data()
        })
      })
    })
    return () => unsubscribeFromAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

// console.log('userDoc:', userDoc.data())
// return { uid, ...userDoc.data() }
