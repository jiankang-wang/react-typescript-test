import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'


interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const {  title, index, className, children  } = props
  const context = useContext(MenuContext)
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpen = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
  const [menuOpen, setOpen] = useState(isOpen)
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
  })
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(!menuOpen)
  }
  const clickEvents = context.mode === 'vertical'  ? {
    onClick: handleClick
  } : {}

  let timer:any 
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setOpen(toggle)
    }, 300)
  }
  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false)}
  } : {}

  const renderChildren = () => {
    const subMenuClasses = classNames('viking-submenu', {
      'menu-opened': menuOpen
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        })
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component')
      }
    })
    return (
      <ul className={ subMenuClasses }>
        {childrenComponent}
      </ul>
    )
  }

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        { title }
      </div>
      {
        renderChildren()
      }
    </li>
  )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu
