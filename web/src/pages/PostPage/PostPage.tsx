import { useEffect } from 'react'

import { MetaTags } from '@redwoodjs/web'

import PostCell from 'src/components/PostCell'

const PostPage = ({ id }) => {
  useEffect(() => {
    console.log(id)
  })
  return (
    <>
      <MetaTags title="Post" description="Post page" />

      <h1>PostPage</h1>
      <p>
        Find me in <code>./web/src/pages/PostPage/PostPage.tsx</code>
      </p>
      <PostCell id={id} />
    </>
  )
}

export default PostPage
