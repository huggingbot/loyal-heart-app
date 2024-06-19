export const mode = import.meta.env.MODE

export const baseUrls: Record<string, string> = {
  development: 'http://localhost:8888',
  production: 'https://loyal-heart-api.fly.dev',
}

export const baseUrl = baseUrls[mode] || ''

export enum EPartnerId {
  Munnie = '1',
  RoyalHeart = '2',
}

export const QueryKeys = {
  Users: 'users',
  Coupons: 'coupons',
  UserCoupons: 'user-coupons',
  [EPartnerId.Munnie]: 'munnie',
  [EPartnerId.RoyalHeart]: 'royal-heart',
}
