import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { routeTree } from './routeTree.gen.ts'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { FilterFn, RowData } from '@tanstack/react-table'
import { RankingInfo } from '@tanstack/match-sorter-utils'
import Providers from './Providers.tsx'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (dbId: string, rowIndex: number, columnId: string, value: unknown) => Promise<void>
  }
  //add fuzzy filter to the filterFns
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </React.StrictMode>
)
