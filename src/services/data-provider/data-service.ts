import * as endpoints from './api-endpoints'
import request from './request'
import {
  IDeleteUsersPayload,
  ICreateUserPayload,
  IUpdateUserPayload,
  IUser,
  ICreateCouponPayload,
  ICoupon,
  IUpdateCouponPayload,
  IDeleteCouponsPayload,
  IUserCoupon,
  ICreateUserCouponPayload,
  IUpdateUserCouponPayload,
  IDeleteUserCouponsPayload,
} from './types/common'

export function getUsers(partnerId: string): Promise<{ status: string; data: IUser[] }> {
  const params = new URLSearchParams({ partnerId })
  return request.get(`${endpoints.users()}?${params.toString()}`)
}

export const createUser = (payload: ICreateUserPayload) => {
  return request.post(endpoints.users(), payload)
}

export const updateUser = (payload: IUpdateUserPayload) => {
  return request.patch(endpoints.users(), payload)
}

export const deleteUsers = (payload: IDeleteUsersPayload) => {
  return request.post(endpoints.deleteUsers(), payload)
}

export function getCoupons(partnerId: string): Promise<{ status: string; data: ICoupon[] }> {
  const params = new URLSearchParams({ partnerId })
  return request.get(`${endpoints.coupons()}?${params.toString()}`)
}

export const createCoupon = (payload: ICreateCouponPayload) => {
  return request.post(endpoints.coupons(), payload)
}

export const updateCoupon = (payload: IUpdateCouponPayload) => {
  return request.patch(endpoints.coupons(), payload)
}

export const deleteCoupons = (payload: IDeleteCouponsPayload) => {
  return request.post(endpoints.deleteCoupons(), payload)
}

export function getUserCoupons(partnerId: string): Promise<{ status: string; data: IUserCoupon[] }> {
  const params = new URLSearchParams({ partnerId })
  return request.get(`${endpoints.userCoupons()}?${params.toString()}`)
}

export const createUserCoupon = (payload: ICreateUserCouponPayload) => {
  return request.post(endpoints.userCoupons(), payload)
}

export const updateUserCoupon = (payload: IUpdateUserCouponPayload) => {
  return request.patch(endpoints.userCoupons(), payload)
}

export const deleteUserCoupons = (payload: IDeleteUserCouponsPayload) => {
  return request.post(endpoints.deleteUserCoupons(), payload)
}
