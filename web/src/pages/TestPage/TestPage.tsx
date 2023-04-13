import { MetaTags } from '@redwoodjs/web'

import ImageForm from 'src/components/ImageForm/ImageForm'

const TestPage = () => {
  return (
    <>
      <MetaTags title="Test" description="Test page" />

      <ImageForm />
    </>
  )
}

export default TestPage
