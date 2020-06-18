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

  return (
    <div>
      <ul className={classes} style={style}>
        <MenuContext.Provider value={ passedContext } >
          { children }
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
 