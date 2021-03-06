import React, { useState, FC, InputHTMLAttributes, ReactElement, ChangeEvent } from 'react'
import Input from '../Input/input'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

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
  fetchSuggessions: (str: string) => DataSourceType[];
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
    const [inputValue, setInputValue] = useState(value)
    // 2: 根据初始值获取相关联的值
    const [suggestions, SetSuggestions] = useState< DataSourceType[]>([])
    const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim()
      setInputValue(value)
      if(value) {
        const result = fetchSuggessions(value)
        SetSuggestions(result)
      } else {
        SetSuggestions([])
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
        <ul>
          {
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

