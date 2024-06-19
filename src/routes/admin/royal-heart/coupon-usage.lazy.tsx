import { createLazyFileRoute } from '@tanstack/react-router'

import AdminCouponUsage from '../../../components/admin/AdminCouponUsage'
import { EPartnerId } from '../../../services/data-provider/constants'

export const Route = createLazyFileRoute('/admin/royal-heart/coupon-usage')({
  component: () => <AdminCouponUsage partnerId={EPartnerId.RoyalHeart} />,
})
