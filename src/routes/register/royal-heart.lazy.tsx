import { createFileRoute } from '@tanstack/react-router'

import Register from '../../components/register'
import { EPartnerId } from '../../services/data-provider/constants'

export const Route = createFileRoute('/register/royal-heart')({
  component: () => <Register partnerId={EPartnerId.RoyalHeart} />,
})
