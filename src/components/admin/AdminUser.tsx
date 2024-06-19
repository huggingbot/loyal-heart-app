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
import { IUser, useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from '../../services'
import { EPartnerId } from '../../services/data-provider/constants'
import ConfirmationModal from '../modal/ConfirmationModal'
import { UserFormModal } from '../modal/UserFormModal'
import DebouncedInput from './DebouncedInput'
import Filter from './Filter'
import { useDefaultColumn } from './useDefaultColumn'
import { useFuzzyFilter } from './useFuzzyFilter'
import { useSkipper } from './useSkipper'
import { useCreateColumns } from './useCreateColumns'
import { useAuth } from '../../contexts/AuthContext'

const emptyData: IUser[] = []

function AdminUser({ partnerId }: { partnerId: EPartnerId }) {
  useAuth()
  const [globalFilter, setGlobalFilter] = useState('')
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const defaultColumn = useDefaultColumn<IUser>()
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()
  const fuzzyFilter = useFuzzyFilter()

  const getUsersQuery = useGetUsersQuery(partnerId)
  const updateUserMutation = useUpdateUserMutation(partnerId)
  const deleteUserMutation = useDeleteUserMutation(partnerId)

  const onAddUser = useCallback((success: boolean) => {
    if (success) {
      onDismissCreateUserModal()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onDeleteUser = useCallback(async () => {
    const selectedRows = table.getRowModel().rows.filter((row) => row.getIsSelected())
    if (!selectedRows.length) {
      console.error('No user selected for deletion')
    }
    const ids = selectedRows.map((row) => row.original.id)

    try {
      await deleteUserMutation.mutateAsync({ ids })
      table.resetRowSelection(true)
    } finally {
      onDismissDeleteUserModal()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onCancelDeleteUser = useCallback(() => {
    onDismissDeleteUserModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { onShowModal: onShowCreateUserModal, onDismissModal: onDismissCreateUserModal } = useModal(
    <UserFormModal partnerId={partnerId} onAddUser={onAddUser} />
  )
  const { onShowModal: onShowDeleteUserModal, onDismissModal: onDismissDeleteUserModal } = useModal(
    <ConfirmationModal message='Confirm delete users' onConfirm={onDeleteUser} onCancel={onCancelDeleteUser} />
  )

  const columnData = useMemo<ColumnDef<IUser, unknown>[]>(
    () => [
      { accessorKey: 'id', header: () => <span>ID</span> },
      { accessorKey: 'partnerId', header: () => <span>Partner ID</span> },
      { accessorKey: 'name', header: () => <span>Name</span> },
      { accessorKey: 'phoneNumber', header: () => <span>Phone Number</span> },
    ],
    []
  )
  const columns = useCreateColumns<IUser>({ columnData })

  const table = useReactTable<IUser>({
    data: getUsersQuery.data ?? emptyData,
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
        await updateUserMutation.mutateAsync({ id: dbId, [columnId]: value })
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
          onClick={() => onShowCreateUserModal()}
        >
          Add User
        </button>

        <button
          disabled={Object.keys(rowSelection).length === 0}
          className='inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 disabled:bg-gray-300'
          onClick={() => onShowDeleteUserModal()}
        >
          Delete User
        </button>
      </div>
    </div>
  )
}

export default AdminUser
