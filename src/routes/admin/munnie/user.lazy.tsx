import { createLazyFileRoute } from '@tanstack/react-router'

import AdminUser from '../../../components/admin/AdminUser'
import { EPartnerId } from '../../../services/data-provider/constants'

export const Route = createLazyFileRoute('/admin/munnie/user')({
  component: () => <AdminUser partnerId={EPartnerId.Munnie} />,
})
