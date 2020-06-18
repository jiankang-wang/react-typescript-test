import React, { useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'

interface MenuItemProps {
  index: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const {
    index,
    disabled,
    className,
    style,
    children
  } = props
  // 进行接收
  const context = useContext(MenuContext)
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index
  })

  const handleClick = () => {
    if (context.onSelect && (typeof index === 'string')) {
      context.onSelect(index)
    }
  }

  return (
    <li className={ classes } style={style}  onClick={handleClick}>
      { children }
    </li>
  )
}

export default MenuItem