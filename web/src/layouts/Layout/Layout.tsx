import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

type LayoutProps = {
  children?: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { currentUser, logOut, isAuthenticated } = useAuth()

  return (
    <div className="flex min-h-screen flex-col">
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between">
          <Link to={routes.home()}>
            <div className="text-4xl font-bold text-white ">ChatHub</div>
          </Link>
          <div>
            {isAuthenticated ? (
              <div>
                <p className="text-white">
                  Logged in as{' '}
                  <Link to={routes.profile({ id: currentUser?.id })}>
                    <strong className="text-white">{currentUser.email}</strong>
                  </Link>
                </p>
                <button
                  onClick={logOut}
                  className="mt-4 rounded bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-600"
                >
                  Logout
                </button>
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
        <div className="text-center text-gray-800">Chathub</div>
      </footer>
    </div>
  )
}

export default Layout
