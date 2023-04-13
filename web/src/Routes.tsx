// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from '@redwoodjs/router'

import { useAuth } from './auth'
import Layout from './layouts/Layout/Layout'
import LoginLayout from './layouts/LoginLayout/LoginLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Private unauthenticated="login">
        <Set wrap={Layout}>
          <Route path="/test" page={TestPage} name="test" />
          <Route path="/profile/{id:Int}" page={ProfilePage} name="profile" />
          <Route path="/post/{id:Int}" page={PostPage} name="post" />
          <Route path="/home" page={HomePage} name="home" />
        </Set>
      </Private>
      <Set wrap={LoginLayout}>
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
      </Set>
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
