import { ComponentType, useCallback, useEffect, useState } from 'react'
import ReactSelectAsync from 'react-select/async'
import { FixedSizeList as List } from 'react-window'
import Fuse, { IFuseOptions } from 'fuse.js'
import debounce from 'debounce-promise'
import { ActionMeta, MenuListProps } from 'react-select'

const arrayIsEmpty = (arr: React.ReactNode[]) => !Array.isArray(arr) || !arr.length

const MenuList: ComponentType<MenuListProps> = ({ options, children, getValue }) => {
  const childrenNode = children as React.ReactNode[]
  const lineHeight = 40
  const [value] = getValue()
  const initialOffset = Math.max(options.indexOf(value) * lineHeight, 0)
  const maxHeight = Math.min(childrenNode.length * lineHeight, 300) || lineHeight

  // if no options, render react-selects default message
  if (arrayIsEmpty(childrenNode)) {
    return <div>{children}</div>
  }

  return (
    <List width='100%' height={maxHeight} itemCount={childrenNode.length} itemSize={lineHeight} initialScrollOffset={initialOffset}>
      {({ index, style }) => <div style={style}>{childrenNode[index]}</div>}
    </List>
  )
}

interface IProps<T extends Record<string, unknown>> {
  options: T[]
  fuzzyOptions: IFuseOptions<T>
  wait?: number
  onChange: (newValue: unknown, actionMeta: ActionMeta<unknown>) => void
}

const Select = <T extends Record<string, unknown>>({ options, fuzzyOptions, wait = 100, onChange }: IProps<T>) => {
  const [fuse, setFuse] = useState<Fuse<(typeof options)[number]>>()

  // use fuse to search
  const searchOptions = useCallback(
    (inputValue: string): Promise<T[]> => {
      if (!fuse) {
        return Promise.resolve([])
      }
      return new Promise((resolve) => {
        resolve(fuse.search(inputValue).map((c) => ({ ...c.item })))
      })
    },
    [fuse]
  )

  // call promiseOptions
  const loadOptions = useCallback(
    (inputValue: string) => {
      return searchOptions(inputValue)
    },
    [searchOptions]
  )

  // debouncer
  const debouncedLoadOptions = debounce(loadOptions, wait)

  useEffect(() => {
    setFuse(new Fuse(options, fuzzyOptions))
    return () => setFuse(undefined)
  }, [options, fuzzyOptions])

  useEffect(() => {
    if (fuse && options) {
      fuse.setCollection(options)
    }
  }, [fuse, options])

  return (
    <ReactSelectAsync options={options} components={{ MenuList }} defaultOptions={options} loadOptions={debouncedLoadOptions} onChange={onChange} />
  )
}

export default Select
