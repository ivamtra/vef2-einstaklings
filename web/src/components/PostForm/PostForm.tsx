import { Post } from 'types/graphql'

import { Form, Submit, TextAreaField } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

import { QUERY as PostsQuery } from '../PostsCell'

export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      body
      userId
    }
  }
`

const PostForm = () => {
  const { currentUser } = useAuth()
  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: PostsQuery,
    variables: {
      userId: currentUser?.id,
    },
  })
  const onSubmit = (data: Partial<Post>) => {
    console.log(data)
    createPost({
      variables: {
        input: {
          userId: currentUser?.id,
          body: data.body,
        },
      },
    })
  }
  return (
    <Form
      onSubmit={onSubmit}
      className="rounded-lg bg-white px-4 py-3 shadow-md"
    >
      <TextAreaField
        placeholder="What's on your mind?"
        className="w-full resize-none border-none focus:outline-none"
        rows={3}
        name="body"
      />
      <Submit className="mt-2 rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600">
        Submit
      </Submit>
    </Form>
  )
}

export default PostForm
