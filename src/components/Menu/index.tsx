import React, { FC } from 'react'

import Menu from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

type MenuMode = 'horizontal' | 'vertical'

interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties,
  onSelect?: (selectedIndex: string) => void;
  defaultOpenSubMenus?: string[] 
}

interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties
}

interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

export type IMenuComponent = FC<MenuProps> & {
  Item: FC<MenuItemProps>,
  SubMenu: FC<SubMenuProps>
}

const TransMenu = Menu as IMenuComponent

TransMenu.Item = MenuItem
TransMenu.SubMenu = SubMenu

export default TransMenu


