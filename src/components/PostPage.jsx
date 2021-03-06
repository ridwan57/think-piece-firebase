import React, { useContext, useEffect, useState } from 'react'
import Post from './Post'
import Comments from './Comments'
import { useHistory, useParams } from 'react-router'
import { firestore } from '../firebase'
import { UserContext } from '../providers/UserProvider'
import { withUser } from './withUser'
import { collectIdsAndData } from '../utilities'

const PostPage = ({ user }) => {
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const { id } = useParams()
  const getPostID = id
  const postRef = firestore.doc(`/posts/${getPostID}`)
  const commentsRef = postRef.collection('comments')
  //   const user = useContext(UserContext)

  useEffect(() => {
    const unsubscribeFromPost = postRef.onSnapshot(snapshot => {
      console.log('postRef snapshot:', snapshot.data())
      setPost({
        uid: snapshot.id,
        ...snapshot.data()
      })
    })

    return () => unsubscribeFromPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const unsubscribeFromComments = commentsRef.onSnapshot(snapshots => {
      const comments = collectIdsAndData(snapshots)
      setComments(comments)
    })

    return () => unsubscribeFromComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const createComment = comment => {
    setComments([])
    commentsRef.add({
      ...comment,
      user
    })
  }

  return (
    <div>
      {post && (
        <>
          <Post {...post} />
          <Comments
            key={post.uid}
            comments={comments}
            onCreate={createComment}
          />
        </>
      )}
    </div>
  )
}
export default withUser(PostPage)
