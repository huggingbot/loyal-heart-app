import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import IndeterminateCheckbox from './IndeterminateCheckbox'

interface IProps<T> {
  columnData: Array<ColumnDef<T, unknown>>
}

export const useCreateColumns = <T,>({ columnData }: IProps<T>) => {
  const columns = useMemo<ColumnDef<T, unknown>[]>(
    () => [
      {
        id: 'select',
        accessorKey: 'select',
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className='px-2'>
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      ...columnData.map((column) => column),
    ],
    [columnData]
  )
  return columns
}
