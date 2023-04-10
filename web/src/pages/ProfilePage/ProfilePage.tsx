import { MetaTags } from '@redwoodjs/web'

import UserCell from 'src/components/UserCell'

const ProfilePage = ({ id }) => {
  return (
    <>
      <MetaTags title="Profile" description="Profile page" />

      <h1>ProfilePage</h1>

      <UserCell id={id} />
    </>
  )
}

export default ProfilePage
