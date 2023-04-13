import { Link, routes } from '@redwoodjs/router'

type LoginLayoutProps = {
  children?: React.ReactNode
}

const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <nav className="bg-blue-500 p-4">
          <div className="container mx-auto flex justify-between">
            <div className="text-4xl font-bold text-white ">ChatHub</div>
            <div>
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

export default LoginLayout
