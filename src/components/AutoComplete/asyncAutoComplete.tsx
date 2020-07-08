import React, { useState, useEffect, FC, InputHTMLAttributes, ReactElement, ChangeEvent, KeyboardEvent } from 'react'
import classNames from 'classnames'
import Input from '../Input'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon'
import { UseDebounce } from '../../Hooks/useDebounce'

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
    // 4: 高亮显示
    const [loading, setloading] = useState(false)
    const [suggestions, SetSuggestions] = useState< DataSourceType[]>([])
    const [highlightIndex, setHighlightIndex] = useState(-1)
    const debounceValue = UseDebounce(inputValue, 500)
    // 4: hook监听
    useEffect(() => {
      if(debounceValue) {
        const result = fetchSuggessions(debounceValue)
        // 返回的是一个异步函数值
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
      // if(value) {
      //   const result = fetchSuggessions(value)
      //   // 反悔的是一个异步操作值
      //   if(result instanceof Promise) {
      //     result.then(data => {
      //       setloading(false)
      //       SetSuggestions(data)
      //     })
      //   } else {
      //     SetSuggestions(result)
      //   }
      // } else {
      //   SetSuggestions([])
      //   setloading(false)
      // }
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
    <div className="viking-auto-complete">
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

