import React, { useState, useEffect, FC, InputHTMLAttributes, ReactElement, ChangeEvent } from 'react'
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
    const [loading, setloading] = useState(false)
    const [suggestions, SetSuggestions] = useState< DataSourceType[]>([])
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
        <ul>
          {
            loading ? (
              <Icon icon="spinner" spin/>
            ) : (
              suggestions.map((item, index) => {
                return (
                  <li 
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
      />
      {
        generateDropdown()
      }
    </div>
  )
}

export default AutoComplete

