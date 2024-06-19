import { createLazyFileRoute } from '@tanstack/react-router'

import AdminCoupon from '../../../components/admin/AdminCoupon'
import { EPartnerId } from '../../../services/data-provider/constants'

export const Route = createLazyFileRoute('/admin/royal-heart/coupon')({
  component: () => <AdminCoupon partnerId={EPartnerId.RoyalHeart} />,
})
