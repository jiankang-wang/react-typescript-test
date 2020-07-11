import React, { useState, useEffect, useRef, FC, InputHTMLAttributes, ReactElement, ChangeEvent, KeyboardEvent } from 'react'
import classNames from 'classnames'
import Input from '../Input'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon'
import { UseDebounce } from '../../Hooks/useDebounce'
import { UseClickOutside } from '../../Hooks/useClickOutside'

type InputSize = 'lg' | 'sm'
interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size' > {
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prepend?: string | ReactElement;
  append?: string | ReactElement;
  ChangeEvent?: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface DataSourceObject {
  value: string
}
type DataSourceType<T = {}> = T & DataSourceObject

interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  // 联合类型异步操作
  fetchSuggessions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => React.ReactElement;
} 

const AutoComplete: FC<AutoCompleteProps> = props => {

    const {
      fetchSuggessions,
      onSelect,
      value,
      renderOption,
      ...restProps
    } = props

    // state 的值
    // 1: 初始化值 
    const [inputValue, setInputValue] = useState(value as string)
    // 2: 根据初始值获取相关联的值
    // 3: 添加loading 
    // 4: 高亮显示依据条件索引
    // 5: 点击空白处保证下拉收回
    const [loading, setloading] = useState(false)
    const [suggestions, SetSuggestions] = useState< DataSourceType[]>([])
    const [highlightIndex, setHighlightIndex] = useState(-1)
    const triggerSearch = useRef(false)
    const componentRef = useRef<HTMLDivElement>(null)
    const debounceValue = UseDebounce(inputValue, 500)
    UseClickOutside(componentRef, () => SetSuggestions([]))
    // 4: hook监听
    useEffect(() => {
      if(debounceValue && triggerSearch.current) {
        const result = fetchSuggessions(debounceValue)
        if(result instanceof Promise) {
          result.then(data => {
            setloading(false)
            SetSuggestions(data)
          })
        } else {
          SetSuggestions(result)
        }
      } else {
        SetSuggestions([])
        setloading(false)
      }
      setHighlightIndex(-1)
    }, [ debounceValue, fetchSuggessions ])

    // 事件监听
    const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
      setloading(true)
      const value = e.target.value.trim()
      setInputValue(value)
      triggerSearch.current = true
    }

    const highlight = (index: number) => {
      if (index < 0) index = 0
      if (index >= suggestions.length) {
        index = suggestions.length - 1
      }
      setHighlightIndex(index)
    }
    // 键盘时间
    const handlerKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      switch(e.keyCode) {
        case 13: // 回车
          if(suggestions[highlightIndex]) {
            handlerSelect(suggestions[highlightIndex])
          }
          break;
        case 38: // 上键
          highlight(highlightIndex - 1)
          break;
        case 40:// 下键
          highlight(highlightIndex + 1)
          break; 
        case 27: // ESC
          SetSuggestions([])
          break;
        default:
          break;
      }
    }

    const handlerSelect = (item: DataSourceType) => {
      setInputValue(item.value)
      SetSuggestions([])
      if (onSelect) {
        onSelect(item)
      }
      triggerSearch.current = false
    }

    const renderTemplate =(item: DataSourceType) => {
      return renderOption ? renderOption(item) : item.value
    }

    const generateDropdown = () => {
      return (
        <ul className="viking-suggestion-list">
          {
            loading ? (
              <Icon icon="spinner" spin/>
            ) : (
              suggestions.map((item, index) => {
                const classes = classNames('suggestion-item', {
                  'is-active': index === highlightIndex
                })
                return (
                  <li 
                    className={ classes }
                    key={index}
                    onClick={() => handlerSelect(item)}
                  >
                    { renderTemplate(item) }
                  </li>
                )
              })
            )
          }
        </ul>
      )
    }

  return (
    <div className="viking-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handlerChange}
        {...restProps}
        onKeyDown={handlerKeyDown}
      />
      {
        generateDropdown()
      }
    </div>
  )
}

export default AutoComplete

// useRef 可以用来存一个状态， 并且进行状态之间的一个切换 .current 拿到值
// useRef 也可以用来绑定dom元素， 并且进行监听dom元素， 来处理一些业务需求

