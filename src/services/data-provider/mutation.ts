import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'

import * as dataService from './data-service'
import {
  IDeleteUsersPayload,
  ICreateUserPayload,
  IUpdateUserPayload,
  ICreateCouponPayload,
  IUpdateCouponPayload,
  IDeleteCouponsPayload,
  ICreateUserCouponPayload,
  IUpdateUserCouponPayload,
  IDeleteUserCouponsPayload,
} from './types/common'
import { EPartnerId, QueryKeys } from './constants'

export const useCreateUserMutation = (): UseMutationResult<void, unknown, ICreateUserPayload, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: ICreateUserPayload) => dataService.createUser(payload),
    onSuccess: (_, variable) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Users, QueryKeys[variable.partnerId]] })
    },
  })
}

export const useUpdateUserMutation = (partnerId: EPartnerId): UseMutationResult<void, unknown, IUpdateUserPayload, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: IUpdateUserPayload) => dataService.updateUser(payload),
    onSuccess: async (_, variable) => {
      // invalidate all users if partnerId is provided as we are switching partner
      const queryKey = variable.partnerId ? [QueryKeys.Users] : [QueryKeys.Users, QueryKeys[partnerId]]
      queryClient.invalidateQueries({ queryKey })
    },
  })
}

export const useDeleteUserMutation = (partnerId: EPartnerId): UseMutationResult<unknown, unknown, IDeleteUsersPayload, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: IDeleteUsersPayload) => dataService.deleteUsers(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Users, QueryKeys[partnerId]] })
    },
  })
}

export const useCreateCouponMutation = (): UseMutationResult<void, unknown, ICreateCouponPayload, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: ICreateCouponPayload) => dataService.createCoupon(payload),
    onSuccess: (_, variable) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Coupons, QueryKeys[variable.partnerId]] })
    },
  })
}

export const useUpdateCouponMutation = (partnerId: EPartnerId): UseMutationResult<void, unknown, IUpdateCouponPayload, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: IUpdateCouponPayload) => dataService.updateCoupon(payload),
    onSuccess: (_, variable) => {
      // invalidate all coupons if partnerId is provided as we are switching partner
      const queryKey = variable.partnerId ? [QueryKeys.Coupons] : [QueryKeys.Coupons, QueryKeys[partnerId]]
      queryClient.invalidateQueries({ queryKey })
    },
  })
}

export const useDeleteCouponMutation = (partnerId: EPartnerId): UseMutationResult<unknown, unknown, IDeleteCouponsPayload, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: IDeleteCouponsPayload) => dataService.deleteCoupons(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Coupons, QueryKeys[partnerId]] })
    },
  })
}

export const useCreateUserCouponMutation = (): UseMutationResult<void, unknown, ICreateUserCouponPayload, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: ICreateUserCouponPayload) => dataService.createUserCoupon(payload),
    onSuccess: (_, variable) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.UserCoupons, QueryKeys[variable.partnerId]] })
    },
  })
}

export const useUpdateUserCouponMutation = (partnerId: EPartnerId): UseMutationResult<void, unknown, IUpdateUserCouponPayload, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: IUpdateUserCouponPayload) => dataService.updateUserCoupon(payload),
    onSuccess: () => {
      const queryKey = [QueryKeys.UserCoupons, QueryKeys[partnerId]]
      queryClient.invalidateQueries({ queryKey })
    },
  })
}

export const useDeleteUserCouponMutation = (partnerId: EPartnerId): UseMutationResult<unknown, unknown, IDeleteUserCouponsPayload, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: IDeleteUserCouponsPayload) => dataService.deleteUserCoupons(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.UserCoupons, QueryKeys[partnerId]] })
    },
  })
}
