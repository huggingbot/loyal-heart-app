import { useCallback } from 'react'
import FormModal from './FormModal'
import { EBaseModalSize } from '.'

interface IProps {
  onConfirm: () => void
  onCancel: () => void
  title?: string
  message: string
  confirmButtonText?: string
  cancelButtonText?: string
  modalSize?: EBaseModalSize
}

const ConfirmationModal = ({
  title,
  message,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
  modalSize = EBaseModalSize.Small,
}: IProps): JSX.Element => {
  const handleConfirm = useCallback(() => {
    onConfirm()
  }, [onConfirm])

  const handleCancel = useCallback(() => {
    onCancel()
  }, [onCancel])

  return (
    <FormModal modalSize={modalSize} title={title ?? 'Confirmation'}>
      <div className='mx-auto mb-0 mt-8 max-w-md space-y-4'>
        <p className='text-center text-sm text-gray-500'>{message}</p>
        <div className='mt-8 flex justify-center space-x-4'>
          <button
            type='button'
            className='inline-block rounded border border-red-600 px-12 py-3 text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring active:bg-red-500'
            onClick={handleConfirm}
          >
            {confirmButtonText ?? 'Confirm'}
          </button>
          <button
            type='button'
            className='inline-block rounded border border-gray-400 px-12 py-3 text-sm font-medium text-gray-400 hover:bg-gray-400 hover:text-white focus:outline-none focus:ring active:bg-gray-300'
            onClick={handleCancel}
          >
            {cancelButtonText ?? 'Cancel'}
          </button>
        </div>
      </div>
    </FormModal>
  )
}

export default ConfirmationModal
