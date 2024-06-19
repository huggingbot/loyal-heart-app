import { Column, Table } from '@tanstack/react-table'
import DebouncedInput from './DebouncedInput'

function Filter<T>({ column, table }: { column: Column<T, unknown>; table: Table<T> }) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  return typeof firstValue === 'number' ? (
    <div className='flex space-x-2'>
      <DebouncedInput
        type='number'
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={(value) => column.setFilterValue((old: [number, number]) => [value, old?.[1]])}
        placeholder={`Min`}
        className='w-24 border shadow rounded'
      />
      <DebouncedInput
        type='number'
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={(value) => column.setFilterValue((old: [number, number]) => [old?.[0], value])}
        placeholder={`Max`}
        className='w-24 border shadow rounded'
      />
    </div>
  ) : (
    <DebouncedInput
      type='text'
      value={(columnFilterValue ?? '') as string}
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Search...`}
      className='w-36 border shadow rounded'
    />
  )
}

export default Filter
