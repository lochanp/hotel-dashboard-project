import { useState } from 'react'

import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'

import useUpdateUser from './useUpdateUser'
import { useUser } from './useUsers'

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user } = useUser()
  const { updateUser, isUpdating } = useUpdateUser()

  const [fullName, setFullName] = useState(user.user_metadata.fullName)
  const [avatar, setAvatar] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    if (fullName) {
      updateUser(
        { fullName, avatar },
        {
          onSuccess: () => {
            setAvatar(null)
            e.target.reset()
          }
        }
      )
    }
  }

  const handleCancel = () => {
    setFullName(user.user_metadata.fullName)
    setAvatar(null)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label='Email address'>
        <Input value={user.email} disabled={isUpdating} />
      </FormRow>
      <FormRow label='Full name'>
        <Input
          type='text'
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          id='fullName'
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label='Avatar image'>
        <FileInput id='avatar' accept='image/*' onChange={e => setAvatar(e.target.files[0])} disabled={isUpdating} />
      </FormRow>
      <FormRow>
        <Button type='reset' variation='secondary' disabled={isUpdating} onClick={() => handleCancel()}>
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  )
}

export default UpdateUserDataForm
