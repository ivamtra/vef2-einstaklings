import { useEffect } from 'react'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import PostsCell from 'src/components/PostsCell'

const HomePage = () => {
  const { currentUser, logOut } = useAuth()

  useEffect(() => {
    console.log(currentUser)
  })
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <div className="container mx-auto mt-10">
        <h1 className="mb-4 text-3xl font-bold">HomePage</h1>
        <p className="text-gray-600">
          Find me in <code>./web/src/pages/HomePage/HomePage.tsx</code>
        </p>
        <p className="mt-2 text-gray-600">
          My default route is named <code>home</code>, link to me with{' '}
          <Link to={routes.home()} className="text-blue-500">
            Home
          </Link>
        </p>
        {currentUser ? <PostsCell userId={currentUser?.id || 0} /> : <></>}
        <button
          onClick={logOut}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Logout
        </button>
      </div>
    </>
  )
}

export default HomePage
