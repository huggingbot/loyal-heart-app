import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { EBaseModalSize } from '.'
import { ICoupon, IUser, useCreateUserCouponMutation } from '../../services'
import { EPartnerId } from '../../services/data-provider/constants'
import Select from '../select'
import FormModal from './FormModal'

interface IProps {
  partnerId: EPartnerId
  users?: IUser[]
  coupons?: ICoupon[]
  onAddUserCoupon: (success: boolean) => void
}

export const UserCouponFormModal = ({ onAddUserCoupon, partnerId, users, coupons }: IProps): JSX.Element => {
  const form = useForm({
    mode: 'onBlur',
    defaultValues: {
      phoneNumber: '',
      code: '',
    },
    reValidateMode: 'onBlur',
    shouldFocusError: false,
  })

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
    setValue,
  } = form

  const createUserCouponMutation = useCreateUserCouponMutation()

  const onSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      void handleSubmit(async (e) => {
        try {
          const filteredObj = Object.fromEntries(Object.entries(e).filter(([, value]) => value)) as typeof e
          await createUserCouponMutation.mutateAsync({ partnerId, ...filteredObj })
          onAddUserCoupon(true)
          reset()
        } catch (err) {
          console.error('error', err)
          onAddUserCoupon(false)
        }
      })()
    },
    [handleSubmit, createUserCouponMutation, partnerId, onAddUserCoupon, reset]
  )

  const isSubmitButtonDisabled = !isValid || isSubmitting

  const userOptions = useMemo(() => {
    return users?.map((user) => ({ ...user, value: `${user.name} (${user.phoneNumber})`, label: `${user.name} (${user.phoneNumber})` })) ?? []
  }, [users])

  const couponOptions = useMemo(() => {
    return coupons?.map((coupon) => ({ ...coupon, value: coupon.code, label: coupon.code })) ?? []
  }, [coupons])

  const userFuzzyOptions = useMemo(() => {
    return { keys: userOptions.length ? Object.keys(userOptions[0]) : [] }
  }, [userOptions])

  const couponFuzzyOptions = useMemo(() => {
    return { keys: couponOptions.length ? Object.keys(couponOptions[0]) : [] }
  }, [couponOptions])

  const onUserSelectChange = useCallback(
    (newValue: unknown) => {
      const value = newValue as (typeof userOptions)[number]
      setValue('phoneNumber', value.phoneNumber)
    },
    [setValue]
  )

  const onCouponSelectChange = useCallback(
    (newValue: unknown) => {
      const value = newValue as (typeof couponOptions)[number]
      setValue('code', value.code)
    },
    [setValue]
  )

  return (
    <FormModal modalSize={EBaseModalSize.Large} title={'Add a new coupon'}>
      <form className='mx-auto mb-0 mt-8 max-w-md space-y-4'>
        <div>
          <div>
            <label htmlFor='user' className='block text-sm text-gray-500'>
              User
            </label>
            {/* <input
            id='type'
            type='text'
            placeholder='Type'
            className='block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40'
            {...register('phoneNumber', { required: true })}
          /> */}
            <Select options={userOptions} fuzzyOptions={userFuzzyOptions} onChange={onUserSelectChange} />
          </div>

          <label htmlFor='code' className='block text-sm text-gray-500'>
            Coupon
          </label>
          {/* <input
            id='code'
            type='text'
            placeholder='Code'
            className='block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40'
            {...register('code', { required: true })}
          /> */}
          <Select options={couponOptions} fuzzyOptions={couponFuzzyOptions} onChange={onCouponSelectChange} />
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
