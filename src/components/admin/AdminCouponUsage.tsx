import './index.css'

import {
  ColumnDef,
  RowSelectionState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useCallback, useMemo, useState } from 'react'
import { useModal } from '../../contexts/ModalContext'
import {
  IUserCoupon,
  useDeleteUserCouponMutation,
  useGetCouponsQuery,
  useGetUserCouponsQuery,
  useGetUsersQuery,
  useUpdateUserCouponMutation,
} from '../../services'
import { EPartnerId } from '../../services/data-provider/constants'
import { formatDateToReadable, parseReadableToDate } from '../../utils/date'
import ConfirmationModal from '../modal/ConfirmationModal'
import { UserCouponFormModal } from '../modal/UserCouponFormModal'
import DebouncedInput from './DebouncedInput'
import Filter from './Filter'
import { useDefaultColumn } from './useDefaultColumn'
import { useFuzzyFilter } from './useFuzzyFilter'
import { useSkipper } from './useSkipper'
import { useCreateColumns } from './useCreateColumns'
import { useAuth } from '../../contexts/AuthContext'

const emptyData: IUserCoupon[] = []

function AdminCouponUsage({ partnerId }: { partnerId: EPartnerId }) {
  useAuth()
  const [globalFilter, setGlobalFilter] = useState('')
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const defaultColumn = useDefaultColumn<IUserCoupon>(['redeemedAt'])
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()
  const fuzzyFilter = useFuzzyFilter()

  const getUsersQuery = useGetUsersQuery(partnerId)
  const getCouponsQuery = useGetCouponsQuery(partnerId)
  const getUserCouponsQuery = useGetUserCouponsQuery(partnerId)
  const updateUserCouponMutation = useUpdateUserCouponMutation(partnerId)
  const deleteUserCouponMutation = useDeleteUserCouponMutation(partnerId)

  const onAddCoupon = useCallback((success: boolean) => {
    if (success) {
      onDismissCreateCouponModal()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onDeleteCoupon = useCallback(async () => {
    const selectedRows = table.getRowModel().rows.filter((row) => row.getIsSelected())
    if (!selectedRows.length) {
      console.error('No coupon selected for deletion')
    }
    const ids = selectedRows.map((row) => row.original.id)

    try {
      await deleteUserCouponMutation.mutateAsync({ ids })
      table.resetRowSelection(true)
    } finally {
      onDismissCreateCouponModal()
    }
    table.resetRowSelection(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onCancelDeleteCoupon = useCallback(() => {
    onDismissDeleteCouponModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { onShowModal: onShowCreateCouponModal, onDismissModal: onDismissCreateCouponModal } = useModal(
    <UserCouponFormModal partnerId={partnerId} onAddUserCoupon={onAddCoupon} users={getUsersQuery.data} coupons={getCouponsQuery.data} />
  )
  const { onShowModal: onShowDeleteCouponModal, onDismissModal: onDismissDeleteCouponModal } = useModal(
    <ConfirmationModal message='Confirm delete coupons' onConfirm={onDeleteCoupon} onCancel={onCancelDeleteCoupon} />
  )

  const columnData = useMemo<ColumnDef<IUserCoupon, unknown>[]>(
    () => [
      { accessorKey: 'id', header: () => <span>ID</span> },
      { accessorKey: 'name', header: () => <span>User</span> },
      { accessorKey: 'phoneNumber', header: () => <span>Phone Number</span> },
      { accessorKey: 'code', header: () => <span>Code</span> },
      {
        accessorKey: 'redeemedAt',
        header: () => <span>Redeemed At</span>,
        accessorFn: (row) => {
          if (!row.redeemedAt) {
            return ''
          }
          return formatDateToReadable(new Date(row.redeemedAt))
        },
      },
    ],
    []
  )
  const columns = useCreateColumns<IUserCoupon>({ columnData })

  const table = useReactTable<IUserCoupon>({
    data: getUserCouponsQuery.data ?? emptyData,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter, // define as a filter function that can be used in column definitions
    },
    state: {
      globalFilter,
      rowSelection,
    },
    initialState: {
      sorting: [{ id: 'id', desc: false }],
    },
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    globalFilterFn: 'fuzzy', // apply fuzzy filter to the global filter (most common use case for fuzzy filter)
    enableRowSelection: true, //enable row selection for all rows
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    autoResetPageIndex,
    // Provide our updateData function to our table meta
    meta: {
      updateData: async (dbId, _rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex()

        let newValue = value
        if (value && columnId === 'redeemedAt') {
          newValue = parseReadableToDate(String(newValue))
        }

        await updateUserCouponMutation.mutateAsync({ id: dbId, [columnId]: newValue })
      },
    },
    debugTable: true,
  })

  return (
    <div className='flex flex-col p-2 gap-3'>
      <div>
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value))}
          className='p-2 font-lg shadow border border-block'
          placeholder='Search all columns...'
        />
      </div>
      <div className='h-2' />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.reduce((acc, header) => {
                let el: JSX.Element

                if (header.id === 'select') {
                  el = (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>}
                    </th>
                  )
                } else {
                  el = (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null}
                        </div>
                      )}
                    </th>
                  )
                }
                return acc.concat(el)
              }, [] as JSX.Element[])}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className='h-2' />
      <div className='flex items-center gap-2'>
        <button className='border rounded p-1' onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
          {'<<'}
        </button>
        <button className='border rounded p-1' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          {'<'}
        </button>
        <button className='border rounded p-1' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          {'>'}
        </button>
        <button className='border rounded p-1' onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
          {'>>'}
        </button>
        <span className='flex items-center gap-1'>
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
        <span className='flex items-center gap-1'>
          | Go to page:
          <input
            type='number'
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className='border p-1 rounded w-16'
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>{table.getRowModel().rows.length} Rows</div>
      <div>
        <button
          className='inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 mr-4'
          onClick={() => onShowCreateCouponModal()}
        >
          Add Coupon Usage
        </button>

        <button
          disabled={Object.keys(rowSelection).length === 0}
          className='inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 disabled:bg-gray-300'
          onClick={() => onShowDeleteCouponModal()}
        >
          Delete Coupon Usage
        </button>
      </div>
    </div>
  )
}

export default AdminCouponUsage
