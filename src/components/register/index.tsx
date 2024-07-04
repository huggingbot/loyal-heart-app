import { useForm } from 'react-hook-form'
import { useCreateUserMutation } from '../../services'
import { useCallback } from 'react'
import { EPartnerId } from '../../services/data-provider/constants'
import Spinner from '../Svg/Spinner'
import RoyalHeartIcon from '../Svg/RoyalHeartIcon'

function Register({ partnerId }: { partnerId: EPartnerId }) {
  const form = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      phoneNumber: '',
    },
    reValidateMode: 'onBlur',
    shouldFocusError: false,
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
  } = form

  const createUserMutation = useCreateUserMutation()

  const onSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      void handleSubmit(async (e) => {
        try {
          await createUserMutation.mutateAsync({ partnerId, ...e })
          reset()
        } catch (err) {
          console.error('error', err)
        }
      })()
    },
    [handleSubmit, createUserMutation, reset, partnerId]
  )

  const isSubmitButtonDisabled = !isValid || isSubmitting

  return (
    <div className='flex flex-col w-full justify-center items-center'>
      {partnerId === EPartnerId.RoyalHeart && <RoyalHeartIcon />}
      <form className='mx-auto mb-0 mt-8 max-w-md'>
        <div>
          <label htmlFor='name' className='block text-sm text-gray-500'>
            Name
          </label>
          <input
            id='name'
            type='text'
            placeholder='Name'
            disabled={isSubmitting}
            className='block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40'
            {...register('name', { required: true })}
          />
        </div>

        <div>
          <label htmlFor='phone' className='block mt-6 text-sm text-gray-500'>
            Phone
          </label>
          <input
            id='phone'
            type='tel'
            placeholder='Phone Number'
            disabled={isSubmitting}
            className='block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40'
            {...register('phoneNumber', { required: true })}
          />
        </div>

        <div className='mt-12 flex justify-center'>
          <button
            type='submit'
            className={`inline-block rounded border  px-12 py-3 text-sm font-medium 
                ${
                  isSubmitButtonDisabled
                    ? 'border-gray-400 text-gray-400 cursor-not-allowed'
                    : 'border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500'
                }`}
            disabled={isSubmitButtonDisabled}
            onClick={onSubmit}
          >
            {isSubmitting ? <Spinner className='mr-2 size-4' /> : <>Register</>}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register
