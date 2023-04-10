import { useEffect } from 'react'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import PostsCell from 'src/components/PostsCell'

const HomePage = () => {
  const { currentUser } = useAuth()

  useEffect(() => {
    console.log(currentUser)
  })
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <div className="container mx-auto mt-10 w-1/2">
        {currentUser ? <PostsCell userId={currentUser?.id || 0} /> : <></>}
      </div>
    </>
  )
}

export default HomePage
