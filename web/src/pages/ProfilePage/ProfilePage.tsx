import { MetaTags } from '@redwoodjs/web'

import UserCell from 'src/components/UserCell'

const ProfilePage = ({ id }) => {
  return (
    <>
      <MetaTags title="Profile" description="Profile page" />

      <UserCell id={id} />
    </>
  )
}

export default ProfilePage
