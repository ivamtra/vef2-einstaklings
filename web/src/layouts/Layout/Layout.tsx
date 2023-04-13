import { useState } from 'react'

import { FaUserFriends } from 'react-icons/fa'

import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import FriendRequestsCell from 'src/components/FriendRequestsCell'

type LayoutProps = {
  children?: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { currentUser, logOut, isAuthenticated } = useAuth()
  const [showFriendRequests, setShowFriendRequests] = useState(false)

  return (
    <>
      <Toaster />
      <div className="flex min-h-screen flex-col">
        <nav className="bg-blue-500 p-4">
          <div className="container mx-auto flex justify-between">
            <Link to={routes.home()}>
              <div className="text-4xl font-bold text-white ">ChatHub</div>
            </Link>
            <div>
              {isAuthenticated ? (
                <div className="flex items-center justify-between gap-5">
                  <div>
                    <button
                      onClick={() => setShowFriendRequests(!showFriendRequests)}
                    >
                      <div>
                        <FaUserFriends
                          className={
                            !showFriendRequests
                              ? ' h-8 w-8  rounded-lg  p-[2px] text-white'
                              : 'h-8 w-8  rounded-lg  bg-white p-[2px] text-blue-500 '
                          }
                        />
                      </div>
                    </button>

                    <div
                      className={
                        showFriendRequests ? 'absolute right-[30px]' : 'hidden'
                      }
                    >
                      <FriendRequestsCell userId={currentUser?.id} />
                    </div>
                  </div>
                  <Link to={routes.profile({ id: currentUser?.id })}>
                    <div className="flex flex h-auto items-center justify-center gap-2">
                      <p className=" text-white">
                        Logged in as{' '}
                        <strong className="text-white">
                          {currentUser?.name}
                        </strong>
                      </p>
                      <img
                        src={currentUser?.profilePic}
                        alt=""
                        className="w-8 rounded-full"
                      />
                    </div>
                  </Link>
                  <div className="">
                    <button
                      onClick={logOut}
                      className="rounded bg-blue-500 text-white transition duration-200 hover:bg-blue-600"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <Link
                    className="ml-4 text-white transition duration-200 hover:text-gray-200"
                    to={routes.login()}
                  >
                    Login
                  </Link>
                  <Link
                    className="ml-4 text-white transition duration-200 hover:text-gray-200"
                    to={routes.signup()}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
        <div className="container mx-auto my-4 flex-grow">{children}</div>
        <footer className="bg-gray-300 py-4">
          <div className="text-center text-gray-800">Ívan Már Þrastarson</div>
        </footer>
      </div>
    </>
  )
}

export default Layout
