import { useLocation, useNavigate } from '@tanstack/react-router'

export const SideMenu = (): JSX.Element => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className='flex h-screen flex-col justify-between border-e bg-white min-w-[240px]'>
      <div className='px-4 py-6'>
        <ul className='space-y-1'>
          <li>
            <details className='group [&_summary::-webkit-details-marker]:hidden' open={true}>
              <summary className='flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500  hover:bg-gray-100 hover:text-gray-700'>
                <span className='text-sm font-medium'>Munnie</span>

                <span className='shrink-0 transition duration-300 group-open:-rotate-180'>
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                    <path
                      fillRule='evenodd'
                      d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>
              </summary>

              <ul className='mt-2 space-y-1 px-4'>
                <li>
                  <button
                    className={`flex rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 w-full ${
                      pathname === '/admin/munnie/user' ? 'bg-gray-100 text-gray-700' : ''
                    }`}
                    onClick={() => navigate({ to: '/admin/munnie/user' })}
                  >
                    User
                  </button>
                </li>

                <li>
                  <button
                    className={`flex rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 w-full ${
                      pathname === '/admin/munnie/coupon' ? 'bg-gray-100 text-gray-700' : ''
                    }`}
                    onClick={() => navigate({ to: '/admin/munnie/coupon' })}
                  >
                    Coupon
                  </button>
                </li>

                <li>
                  <button
                    className={`flex rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 w-full ${
                      pathname === '/admin/munnie/coupon-usage' ? 'bg-gray-100 text-gray-700' : ''
                    }`}
                    onClick={() => navigate({ to: '/admin/munnie/coupon-usage' })}
                  >
                    Coupon Usage
                  </button>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <details className='group [&_summary::-webkit-details-marker]:hidden' open={true}>
              <summary className='flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500  hover:bg-gray-100 hover:text-gray-700'>
                <span className='text-sm font-medium'>Royal Heart</span>

                <span className='shrink-0 transition duration-300 group-open:-rotate-180'>
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                    <path
                      fillRule='evenodd'
                      d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>
              </summary>

              <ul className='mt-2 space-y-1 px-4'>
                <li>
                  <button
                    className={`flex rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 w-full ${
                      pathname === '/admin/royal-heart/user' ? 'bg-gray-100 text-gray-700' : ''
                    }`}
                    onClick={() => navigate({ to: '/admin/royal-heart/user' })}
                  >
                    User
                  </button>
                </li>

                <li>
                  <button
                    className={`flex rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 w-full ${
                      pathname === '/admin/royal-heart/coupon' ? 'bg-gray-100 text-gray-700' : ''
                    }`}
                    onClick={() => navigate({ to: '/admin/royal-heart/coupon' })}
                  >
                    Coupon
                  </button>
                </li>

                <li>
                  <button
                    className={`flex rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 w-full ${
                      pathname === '/admin/royal-heart/coupon-usage' ? 'bg-gray-100 text-gray-700' : ''
                    }`}
                    onClick={() => navigate({ to: '/admin/royal-heart/coupon-usage' })}
                  >
                    Coupon Usage
                  </button>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  )
}
