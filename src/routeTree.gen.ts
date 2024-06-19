/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const AdminIndexLazyImport = createFileRoute('/admin/')()
const RegisterRoyalHeartLazyImport = createFileRoute('/register/royal-heart')()
const RegisterMunnieLazyImport = createFileRoute('/register/munnie')()
const AdminRoyalHeartUserLazyImport = createFileRoute(
  '/admin/royal-heart/user',
)()
const AdminRoyalHeartCouponUsageLazyImport = createFileRoute(
  '/admin/royal-heart/coupon-usage',
)()
const AdminRoyalHeartCouponLazyImport = createFileRoute(
  '/admin/royal-heart/coupon',
)()
const AdminMunnieUserLazyImport = createFileRoute('/admin/munnie/user')()
const AdminMunnieCouponUsageLazyImport = createFileRoute(
  '/admin/munnie/coupon-usage',
)()
const AdminMunnieCouponLazyImport = createFileRoute('/admin/munnie/coupon')()

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const AdminIndexLazyRoute = AdminIndexLazyImport.update({
  path: '/admin/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/admin/index.lazy').then((d) => d.Route))

const RegisterRoyalHeartLazyRoute = RegisterRoyalHeartLazyImport.update({
  path: '/register/royal-heart',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/register/royal-heart.lazy').then((d) => d.Route),
)

const RegisterMunnieLazyRoute = RegisterMunnieLazyImport.update({
  path: '/register/munnie',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/register/munnie.lazy').then((d) => d.Route),
)

const AdminRoyalHeartUserLazyRoute = AdminRoyalHeartUserLazyImport.update({
  path: '/admin/royal-heart/user',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/admin/royal-heart/user.lazy').then((d) => d.Route),
)

const AdminRoyalHeartCouponUsageLazyRoute =
  AdminRoyalHeartCouponUsageLazyImport.update({
    path: '/admin/royal-heart/coupon-usage',
    getParentRoute: () => rootRoute,
  } as any).lazy(() =>
    import('./routes/admin/royal-heart/coupon-usage.lazy').then((d) => d.Route),
  )

const AdminRoyalHeartCouponLazyRoute = AdminRoyalHeartCouponLazyImport.update({
  path: '/admin/royal-heart/coupon',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/admin/royal-heart/coupon.lazy').then((d) => d.Route),
)

const AdminMunnieUserLazyRoute = AdminMunnieUserLazyImport.update({
  path: '/admin/munnie/user',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/admin/munnie/user.lazy').then((d) => d.Route),
)

const AdminMunnieCouponUsageLazyRoute = AdminMunnieCouponUsageLazyImport.update(
  {
    path: '/admin/munnie/coupon-usage',
    getParentRoute: () => rootRoute,
  } as any,
).lazy(() =>
  import('./routes/admin/munnie/coupon-usage.lazy').then((d) => d.Route),
)

const AdminMunnieCouponLazyRoute = AdminMunnieCouponLazyImport.update({
  path: '/admin/munnie/coupon',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/admin/munnie/coupon.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/register/munnie': {
      id: '/register/munnie'
      path: '/register/munnie'
      fullPath: '/register/munnie'
      preLoaderRoute: typeof RegisterMunnieLazyImport
      parentRoute: typeof rootRoute
    }
    '/register/royal-heart': {
      id: '/register/royal-heart'
      path: '/register/royal-heart'
      fullPath: '/register/royal-heart'
      preLoaderRoute: typeof RegisterRoyalHeartLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/': {
      id: '/admin/'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AdminIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/munnie/coupon': {
      id: '/admin/munnie/coupon'
      path: '/admin/munnie/coupon'
      fullPath: '/admin/munnie/coupon'
      preLoaderRoute: typeof AdminMunnieCouponLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/munnie/coupon-usage': {
      id: '/admin/munnie/coupon-usage'
      path: '/admin/munnie/coupon-usage'
      fullPath: '/admin/munnie/coupon-usage'
      preLoaderRoute: typeof AdminMunnieCouponUsageLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/munnie/user': {
      id: '/admin/munnie/user'
      path: '/admin/munnie/user'
      fullPath: '/admin/munnie/user'
      preLoaderRoute: typeof AdminMunnieUserLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/royal-heart/coupon': {
      id: '/admin/royal-heart/coupon'
      path: '/admin/royal-heart/coupon'
      fullPath: '/admin/royal-heart/coupon'
      preLoaderRoute: typeof AdminRoyalHeartCouponLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/royal-heart/coupon-usage': {
      id: '/admin/royal-heart/coupon-usage'
      path: '/admin/royal-heart/coupon-usage'
      fullPath: '/admin/royal-heart/coupon-usage'
      preLoaderRoute: typeof AdminRoyalHeartCouponUsageLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/royal-heart/user': {
      id: '/admin/royal-heart/user'
      path: '/admin/royal-heart/user'
      fullPath: '/admin/royal-heart/user'
      preLoaderRoute: typeof AdminRoyalHeartUserLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  RegisterMunnieLazyRoute,
  RegisterRoyalHeartLazyRoute,
  AdminIndexLazyRoute,
  AdminMunnieCouponLazyRoute,
  AdminMunnieCouponUsageLazyRoute,
  AdminMunnieUserLazyRoute,
  AdminRoyalHeartCouponLazyRoute,
  AdminRoyalHeartCouponUsageLazyRoute,
  AdminRoyalHeartUserLazyRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/register/munnie",
        "/register/royal-heart",
        "/admin/",
        "/admin/munnie/coupon",
        "/admin/munnie/coupon-usage",
        "/admin/munnie/user",
        "/admin/royal-heart/coupon",
        "/admin/royal-heart/coupon-usage",
        "/admin/royal-heart/user"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/register/munnie": {
      "filePath": "register/munnie.lazy.tsx"
    },
    "/register/royal-heart": {
      "filePath": "register/royal-heart.lazy.tsx"
    },
    "/admin/": {
      "filePath": "admin/index.lazy.tsx"
    },
    "/admin/munnie/coupon": {
      "filePath": "admin/munnie/coupon.lazy.tsx"
    },
    "/admin/munnie/coupon-usage": {
      "filePath": "admin/munnie/coupon-usage.lazy.tsx"
    },
    "/admin/munnie/user": {
      "filePath": "admin/munnie/user.lazy.tsx"
    },
    "/admin/royal-heart/coupon": {
      "filePath": "admin/royal-heart/coupon.lazy.tsx"
    },
    "/admin/royal-heart/coupon-usage": {
      "filePath": "admin/royal-heart/coupon-usage.lazy.tsx"
    },
    "/admin/royal-heart/user": {
      "filePath": "admin/royal-heart/user.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */