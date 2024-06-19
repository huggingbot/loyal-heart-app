import { rankItem } from '@tanstack/match-sorter-utils'
import { FilterFn } from '@tanstack/react-table'

// Define a custom fuzzy filter function that will apply ranking info to rows (using match-sorter utils)
export const useFuzzyFilter = () => {
  const fuzzyFilter: FilterFn<unknown> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value)

    // Store the itemRank info
    addMeta({
      itemRank,
    })

    // Return if the item should be filtered in/out
    return itemRank.passed
  }

  return fuzzyFilter
}
