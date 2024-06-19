import { EPartnerId } from '../constants'

export interface IUser {
  id: string
  partnerId: EPartnerId
  name: string
  phoneNumber: string
}

export interface ICreateUserPayload {
  partnerId: EPartnerId
  name: string
  phoneNumber: string
}

export interface IUpdateUserPayload {
  id: string
  partnerId?: EPartnerId
  name?: string
  phoneNumber?: string
}

export interface IDeleteUsersPayload {
  ids: string[]
}

export interface ICoupon {
  id: string
  partnerId: EPartnerId
  code: string
  type: string
  value: number
}

export interface ICreateCouponPayload {
  partnerId: EPartnerId
  code: string
  type: string
  value: number
}

export interface IUpdateCouponPayload {
  id: string
  partnerId?: EPartnerId
  code?: string
  type?: string
  value?: number
}

export interface IDeleteCouponsPayload {
  ids: string[]
}

export interface IUserCoupon {
  id: string
  name: string // user name
  phoneNumber: string // user phone number
  code: string // coupon code
  redeemedAt: string
}

export interface ICreateUserCouponPayload {
  partnerId: EPartnerId
  phoneNumber: string
  code: string
}

export interface IUpdateUserCouponPayload {
  id: string
  redeemedAt?: Date
}

export interface IDeleteUserCouponsPayload {
  ids: string[]
}
