import React, { useContext } from 'react'
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
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
  })

  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: index.toString()
        })
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component')
      }
    })
    return (
      <ul className={ 'viking-submenu' }>
        {childrenComponent}
      </ul>
    )
  }

  return (
    <li key={index} className={classes}>
      <div className="submenu-title">
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
