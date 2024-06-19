import { baseUrl } from './constants'

export const users = () => `${baseUrl}/api/users`

export const deleteUsers = () => `${baseUrl}/api/users/delete`

export const coupons = () => `${baseUrl}/api/coupons`

export const deleteCoupons = () => `${baseUrl}/api/coupons/delete`

export const userCoupons = () => `${baseUrl}/api/user-coupons`

export const deleteUserCoupons = () => `${baseUrl}/api/user-coupons/delete`
