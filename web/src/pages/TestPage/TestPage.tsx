import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import ImageForm from 'src/components/ImageForm/ImageForm'
import PostForm from 'src/components/PostForm/PostForm'

const TestPage = () => {
  return (
    <>
      <MetaTags title="Test" description="Test page" />

      <ImageForm />
      <h1>.........................</h1>
      <PostForm />
    </>
  )
}

export default TestPage
