import React, { useState } from 'react'
import classNames from 'classnames'

type MenuMode = 'horizontal' | 'vertical'

interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties,
  onSelect?: (selectedIndex: string) => void;
}

interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties
}

interface IMenuContext {
  index: string;
  onSelect?: (selectedIndex: string) => void;
}

export const MenuContext = React.createContext<IMenuContext>({
  index: '0'
})

const Menu: React.FC<MenuProps> = (props) => {
  const {
    defaultIndex,
    className,
    mode,
    style,
    onSelect,
    children
  } = props
  const [ currentActive, setActive ] = useState(defaultIndex)

  const handleClick = (index: string) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }
  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString()
        })
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component')
      }
    })
  }

  return (
    <div>
      <ul className={classes} style={style} data-testid="test-menu">
        <MenuContext.Provider value={ passedContext } >
          { renderChildren() }
        </MenuContext.Provider>
      </ul>
    </div>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
}

export default Menu

// context 梳理
// 父: React.createContext({}) 声明
// 父: .Provider 进行包裹并传递参数value={}
// 子: hook接收 useContext(父级声明的context)