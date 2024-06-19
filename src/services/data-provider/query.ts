import { QueryObserverResult, useQuery, UseQueryOptions } from '@tanstack/react-query'

import * as dataService from './data-service'
import { ICoupon, IUser, IUserCoupon } from './types/common'
import { EPartnerId, QueryKeys } from './constants'

export const useGetUsersQuery = (partnerId: EPartnerId, config?: Partial<UseQueryOptions<IUser[]>>): QueryObserverResult<IUser[]> => {
  return useQuery<IUser[]>({
    queryKey: [QueryKeys.Users, QueryKeys[partnerId]],
    queryFn: async () => {
      const result = await dataService.getUsers(partnerId)
      return result.data
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: true,
    retry: false,
    ...config,
  })
}

export const useGetCouponsQuery = (partnerId: EPartnerId, config?: Partial<UseQueryOptions<ICoupon[]>>): QueryObserverResult<ICoupon[]> => {
  return useQuery<ICoupon[]>({
    queryKey: [QueryKeys.Coupons, QueryKeys[partnerId]],
    queryFn: async () => {
      const result = await dataService.getCoupons(partnerId)
      return result.data
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: true,
    retry: false,
    ...config,
  })
}

export const useGetUserCouponsQuery = (
  partnerId: EPartnerId,
  config?: Partial<UseQueryOptions<IUserCoupon[]>>
): QueryObserverResult<IUserCoupon[]> => {
  return useQuery<IUserCoupon[]>({
    queryKey: [QueryKeys.UserCoupons, QueryKeys[partnerId]],
    queryFn: async () => {
      const result = await dataService.getUserCoupons(partnerId)
      return result.data
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: true,
    retry: false,
    ...config,
  })
}
