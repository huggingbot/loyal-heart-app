import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

import { EBaseModalSize } from '.'
import FormModal from './FormModal'
import { useCreateCouponMutation } from '../../services'
import { EPartnerId } from '../../services/data-provider/constants'

interface IProps {
  partnerId: EPartnerId
  onAddCoupon: (success: boolean) => void
}

export const CouponFormModal = ({ onAddCoupon, partnerId }: IProps): JSX.Element => {
  const form = useForm({
    mode: 'onBlur',
    defaultValues: {
      code: '',
      type: '',
      value: 0,
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

  const createCouponMutation = useCreateCouponMutation()

  const onSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      void handleSubmit(async (e) => {
        try {
          const filteredObj = Object.fromEntries(Object.entries(e).filter(([, value]) => value)) as typeof e
          const value = Number(filteredObj.value)
          if (isNaN(value)) {
            throw new Error('Value must be a number')
          }
          await createCouponMutation.mutateAsync({ partnerId, ...filteredObj, value })
          onAddCoupon(true)
          reset()
        } catch (err) {
          console.error('error', err)
          onAddCoupon(false)
        }
      })()
    },
    [handleSubmit, createCouponMutation, partnerId, onAddCoupon, reset]
  )

  const isSubmitButtonDisabled = !isValid || isSubmitting

  return (
    <FormModal modalSize={EBaseModalSize.Large} title={'Add a new coupon'}>
      <form className='mx-auto mb-0 mt-8 max-w-md space-y-4'>
        <div>
          <label htmlFor='code' className='block text-sm text-gray-500'>
            Code
          </label>
          <input
            id='code'
            type='text'
            placeholder='Code'
            className='block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40'
            {...register('code', { required: true })}
          />
        </div>

        <div>
          <label htmlFor='type' className='block text-sm text-gray-500'>
            Type
          </label>
          <input
            id='type'
            type='text'
            placeholder='Type'
            className='block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40'
            {...register('type', { required: true })}
          />
        </div>

        <div>
          <label htmlFor='value' className='block text-sm text-gray-500'>
            Value
          </label>
          <input
            id='value'
            type='number'
            placeholder='Value'
            className='block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40'
            {...register('value', { required: true })}
          />
        </div>

        <div className='mt-8 flex justify-center'>
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
            Add Coupon
          </button>
        </div>
      </form>
    </FormModal>
  )
}
