import React, { useContext } from 'react'

import moment from 'moment'
import { firestore } from '../firebase'
import { UserContext } from '../providers/UserProvider'

const belongToCurrentUser = (currentUser, postAuthor) => {
  console.log('postAuthor:', postAuthor)
  console.log('currentUser:', currentUser)
  console.log(currentUser === postAuthor)
  if (!currentUser) return false
  return currentUser.uid === postAuthor.uid
}

const Post = ({ title, content, user, createdAt, stars, id }) => {
  const currentUser = useContext(UserContext)

  const postsRef = firestore.doc(`posts/${id}`)
  const posts = postsRef.get()
  const handleRemove = id => postsRef.delete()
  const star = () =>
    postsRef.update({
      stars: stars + 1
    })
  return (
    <article className='Post'>
      <div className='Post--content'>
        <h3>{title}</h3>
        <div>{content}</div>
      </div>
      <div className='Post--meta'>
        <div>
          <p>
            <span role='img' aria-label='star'>
              ⭐️
            </span>
            {stars}
          </p>
          <p>Posted by {user.displayName}</p>
          <p>{moment(createdAt.toDate()).calendar()}</p>
        </div>
        <div>
          <button className='star' onClick={star}>
            Star
          </button>
          {belongToCurrentUser(currentUser, user) && (
            <button className='delete' onClick={handleRemove}>
              Delete
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

Post.defaultProps = {
  title: 'An Incredibly Hot Take',
  content:
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus est aut dolorem, dolor voluptatem assumenda possimus officia blanditiis iusto porro eaque non ab autem nihil! Alias repudiandae itaque quo provident.',
  user: {
    id: '123',
    displayName: 'Bill Murray',
    email: 'billmurray@mailinator.com',
    photoURL: 'https://www.fillmurray.com/300/300'
  },
  createdAt: new Date(),
  stars: 0
}

export default Post
