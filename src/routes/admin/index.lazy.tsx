import { createFileRoute } from '@tanstack/react-router'
import SignIn from '../../components/admin/SignIn'

export const Route = createFileRoute('/admin/')({
  component: () => <SignIn />,
})
