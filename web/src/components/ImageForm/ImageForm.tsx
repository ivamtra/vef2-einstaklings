import { useEffect, useState } from 'react'

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import { FileField, Form, Submit } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { projectStorage } from '../../../../api/firebase/config'

//TODO: Passa að mynd sé uploaduð

// GraphQL

const CHANGE_IMAGE = gql`
  mutation changeImage($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      profilePic
    }
  }
`

const ImageForm = () => {
  const [changeImage] = useMutation(CHANGE_IMAGE, {
    onCompleted: () => toast.success('Image uploaded'),
    onError: () => toast.error('Something went wrong'),
  })
  // Add to firebase

  const [fileUrl, setFileUrl] = useState('')
  const [showImage, setShowImage] = useState(false)

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
            id: 1,
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
    <>
      <div>
        <h2>{'ImageForm'}</h2>
      </div>
      <Form onSubmit={onSubmit} className="img-form">
        {/* Þessi ma vera required */}

        <FileField
          className="file-field"
          name="file"
          onChange={onChange}
          required
        />
        <Submit className="submit">Submit</Submit>
      </Form>
      {showImage ? (
        <>
          <img style={{ width: '300px' }} src={fileUrl} alt="Poop" />
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default ImageForm
