import { useState } from 'react'

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import { FileField, Form, Submit } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'

import { projectStorage } from '../../../../api/firebase/config'

// GraphQL

export const CHANGE_IMAGE = gql`
  mutation changeImage($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      profilePic
    }
  }
`

const ImageForm = () => {
  const [changeImage] = useMutation(CHANGE_IMAGE, {
    onCompleted: () => toast.success('Profile picture successfully changed'),
    onError: () => toast.error('Something went wrong'),
  })
  // Add to firebase

  const [fileUrl, setFileUrl] = useState('')
  const [showImage, setShowImage] = useState(false)
  const { currentUser } = useAuth()

  const uploadToFireBase = (data) => {
    console.log(data)
    const file = data?.file[0]

    const imageRef = ref(projectStorage, `images/${file?.name}`)
    uploadBytes(imageRef, file)
      .then(async (snap) => {
        console.log('Uploaded!')
        const url = await getDownloadURL(snap.ref)
        console.log(url)
        // Hér þarf að kalla á createImage
        changeImage({
          variables: {
            // Todo current user
            id: currentUser.id,
            input: {
              profilePic: url,
            },
          },
        })
      })
      .then(() => console.log('Success!'))
  }

  const onChange = (e) => {
    // Birta mynd áður en hún er uploaduð
    console.log(e.target.files[0])
    setShowImage(true)
    setFileUrl(URL.createObjectURL(e.target.files[0]))
  }

  // Add to database
  const onSubmit = (data) => {
    uploadToFireBase(data)
  }
  return (
    <div className="text-center">
      <h2 className="mb-4 text-2xl font-semibold">Change profile picture</h2>
      <Form onSubmit={onSubmit} className="img-form">
        {/* This field is required */}
        <FileField
          className="file-field"
          name="file"
          onChange={onChange}
          required
        />
        <Submit className="mt-4 rounded bg-blue-500 px-4 py-2 font-semibold text-white transition duration-200 hover:bg-blue-600">
          Submit
        </Submit>
      </Form>
      {showImage && (
        <img className="mx-auto mt-4 max-w-[300px]" src={fileUrl} alt="" />
      )}
    </div>
  )
}

export default ImageForm
