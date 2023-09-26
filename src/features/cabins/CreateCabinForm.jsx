import { useForm } from 'react-hook-form';

import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  // Grab values from cabinToEdit for single cabin edit form
  // Sometimes wont exist so by default is an empty object above
  const { id: editId, ...editValues } = cabinToEdit;

  // To determine if we are using this form to edit a cabin or creating a new one
  // If there is an editId then its true, if no edit id then false; good way to determine session based on presence of value
  const isEditSession = Boolean(editId);

  // register inputs into this hook, the form we are setting up using this hook
  // Can set up useForm with options
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    // Check for image status
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          // This callback gets access to the new cabin data returned from the query
          // The reset allows us to update form with new values
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label='Cabin Name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isWorking}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Max Capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label='Regular Price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Price should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          disabled={isWorking}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            // custom validation
            validate: (value) =>
              value <= getValues().regularPrice ||
              'Discount should be less than the regular price',
          })}
        />
      </FormRow>

      <FormRow label='Description' error={errors?.description?.message}>
        <Textarea
          type='number'
          id='description'
          disabled={isWorking}
          defaultValue=''
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Cabin Photo'>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', {
            // Dont requre photo if just editing cabin details
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation='secondary'
          type='reset'
          // Optional chaining can be used on this function call in case that this form is used outside the modal and this prop is not passed
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit cabin' : 'Create New Cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
