import {useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {},onCloseModal}) {
  const isEditing = Boolean(cabinToEdit.id)

  const {register,handleSubmit,reset,getValues,formState} = useForm({
    defaultValues : isEditing ? cabinToEdit : {}
  })

  const {errors} = formState;

  const {isCreating,createCabin} = useCreateCabin()
  const {isEditLoading,editCabin} = useEditCabin()

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if(isEditing) {
      editCabin(
        { 
          newCabin: { 
          ...data, image 
          }, 
          id: cabinToEdit.id 
        },
        { 
          onSuccess : () => {reset(); onCloseModal?.()}
        }
      )
    } 
    else {
      createCabin(
        {
          ...data, 
          image : image
        }, 
        { 
          onSuccess : () => {reset(); onCloseModal?.()}
        }
      )
    }
  }

  function onError(errors) {
    console.error(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit,onError)} type={onCloseModal ? 'modal' : 'regular'}>
      <FormRow label={'Cabin name'} error={errors?.name?.message} >
        <Input type="text" id="name" disabled={isEditLoading || isCreating} 
        {...register("name",{
            required:'This field is required'
          })} />
      </FormRow>
      <FormRow label={'Maximum capacity'} error={errors?.maxCapacity?.message} >
        <Input type="number" id="maxCapacity" disabled={isEditLoading || isCreating} 
        {...register("maxCapacity",{
          required:'This field is required',
          min : {
            value : 1,
            message : 'Capacity should be atleast 1'
          }
        })} />
      </FormRow>
      <FormRow label={'Regular price'} error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" disabled={isEditLoading || isCreating} 
        {...register("regularPrice",{
          required:'This field is required',
          min : {
            value : 1,
            message : 'Capacity should be atleast 1'
          }
        })} />
      </FormRow>

      <FormRow label={'discount'} error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} disabled={isEditLoading || isCreating} 
        {...register("discount",{
          required:'This field is required',
          validate : (value) => value <= getValues().regularPrice || 'Discount should be less than the regular price'
        })} />
      </FormRow>

      <FormRow label={'Description for website'} error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" disabled={isEditLoading || isCreating} 
        {...register("description",{
          required:'This field is required'
        })} />
      </FormRow>

      <FormRow label={'Cabin Photo'} error={errors?.image?.message}>
        <FileInput id="image" accept="image/*" type="file" disabled={isEditLoading || isCreating}
           {...register("image",{
            required: isEditing ? false : 'This field is required'
          })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={()=>onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isEditLoading || isCreating}>{isEditing ? 'Edit cabin' : 'Create new cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
