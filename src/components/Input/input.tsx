import React, { InputHTMLAttributes, ChangeEvent } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames'
import Icon from '../Icon/icon'

type InputSize = 'lg' | 'sm'
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size' > {
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp; // icon 字符串字面量
  prepend?: string | React.ReactElement; // 前缀
  append?: string | React.ReactElement; // 后缀
  ChangeEvent?: (e: ChangeEvent<HTMLInputElement>) => void; // 改变事件触发
}

const Input: React.FC<InputProps> = props => {
  // 1:取出各种props
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    style,
    ...restProps
  } = props
  // 2: classNames
  const classes = classNames('viking-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend 
  })

  // 3: 根据属性判断是否添加一些特定的节点
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }
  if('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }

  return (
    <div className={ classes } style={ style }>
      {/* 前缀 */}
      {
        prepend && 
        <div className="viking-input-group-prepend">
          {prepend}
        </div>
      }
      {/* 图标 */}
      {
        icon && 
        <div className="icon-wrapper">
          <Icon icon={icon} title={`title-${icon}`}/>
        </div>
      }
      <input 
        className="viking-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {/* 后缀 */}
      { append &&
        <div className="viking-input-group-append">
          {append}
        </div>
      }
    </div>
  )
}

Input.displayName = 'Input'
export default Input