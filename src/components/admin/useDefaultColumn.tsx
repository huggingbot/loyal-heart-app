import { CellContext, ColumnDef, ColumnDefTemplate } from '@tanstack/react-table'
import { useCallback, useRef, useState } from 'react'

const makeUseCell = (editableColumns?: string[]) => {
  const useCell: ColumnDefTemplate<CellContext<unknown, unknown>> = ({ getValue, row: { index, getAllCells }, column: { id: columnId }, table }) => {
    const initialValue = useRef(getValue())
    const [value, setValue] = useState(initialValue.current)

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = useCallback(async () => {
      if (value === initialValue.current) {
        return
      }
      const cells = getAllCells()
      const dbId = cells.find((cell) => cell.column.id === 'id')?.getValue()

      if (dbId) {
        try {
          await table.options.meta?.updateData(String(dbId), index, columnId, value)
          initialValue.current = value
        } catch (e) {
          console.error('Failed to update data', e)
          setValue(initialValue.current)
        }
      }
    }, [columnId, getAllCells, index, table.options.meta, value])

    if (columnId === 'id' || (editableColumns && !editableColumns.includes(columnId))) {
      return <div>{value as string}</div>
    }

    return <input value={value as string} onChange={(e) => setValue(e.target.value)} onBlur={onBlur} />
  }
  return useCell
}

// Give our default column cell renderer editing superpowers!
export const useDefaultColumn = <T,>(editableColumns?: string[]) => {
  return {
    cell: makeUseCell(editableColumns) as (props: CellContext<T, unknown>) => unknown,
  } as Partial<ColumnDef<T>>
}
