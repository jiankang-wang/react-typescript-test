import React, { useState, FC, InputHTMLAttributes, ReactElement, ChangeEvent } from 'react'
import Input from '../Input'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

// 编码遵循的原则
//(MVP) Minimize viable products 最小化可行产品

type InputSize = 'lg' | 'sm'
interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size' > {
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prepend?: string | ReactElement;
  append?: string | ReactElement;
  ChangeEvent?: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggessions: (str: string) => string[];
  onSelect?: (item: string) => void;
  renderOption?: (item: string) => React.ReactElement;
}

const AutoComplete: FC<AutoCompleteProps> = props => {
  // 1: 拿到props
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
    const [suggestions, SetSuggestions] = useState<string []>([])
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

    const handlerSelect = (item: string) => {
      setInputValue(item)
      SetSuggestions([])
      if (onSelect) {
        onSelect(item)
      }
    }

    const renderTemplate =(item: string) => {
      return renderOption ? renderOption(item) : item
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

