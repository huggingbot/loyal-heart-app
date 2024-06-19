import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { SideMenu } from '../components/section/SideMenu'

export const Route = createRootRoute({
  component: () => <Root />,
})

const Root = () => {
  const location = useLocation()
  const isAdminRoute = /admin\/.+/.test(location.pathname)

  return (
    <>
      <div className='flex'>
        {isAdminRoute ? <SideMenu /> : null}
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  )
}
