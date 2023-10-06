import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { createCabin } from '../../services/apiCabins'

import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Textarea from '../../ui/Textarea'

function CreateCabinForm() {
  const queryClient = useQueryClient()

  const { register, handleSubmit, reset, getValues, formState } = useForm()
  const { errors } = formState

  const { mutate, isLoading } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New Cabin Created Successfully'), queryClient.invalidateQueries({ queryKey: ['cabins'] }), reset()
    },
    onError: err => toast.error(err.message)
  })

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] })
  }

  function onError(errors) {
    console.error(errors)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label={'Cabin name'} error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isLoading}
          {...register('name', {
            required: 'This field is required'
          })}
        />
      </FormRow>
      <FormRow label={'Maximum capacity'} error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isLoading}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be atleast 1'
            }
          })}
        />
      </FormRow>
      <FormRow label={'Regular price'} error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isLoading}
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be atleast 1'
            }
          })}
        />
      </FormRow>

      <FormRow label={'discount'} error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          disabled={isLoading}
          {...register('discount', {
            required: 'This field is required',
            validate: value => value <= getValues().regularPrice || 'Discount should be less than the regular price'
          })}
        />
      </FormRow>

      <FormRow label={'Description for website'} error={errors?.description?.message}>
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          disabled={isLoading}
          {...register('description', {
            required: 'This field is required'
          })}
        />
      </FormRow>

      <FormRow label={'Cabin Photo'}>
        <FileInput
          id='image'
          accept='image/*'
          type='file'
          disabled={isLoading}
          {...register('image', {
            required: 'This field is required'
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isLoading}>Add cabin</Button>
      </FormRow>
    </Form>
  )
}

export default CreateCabinForm
