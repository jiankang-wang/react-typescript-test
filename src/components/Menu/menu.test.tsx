import React from 'react'
import { render, RenderResult, fireEvent, cleanup, wait } from '@testing-library/react'

import Menu from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

type MenuMode = 'horizontal' | 'vertical'

interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: (selectedIndex: string) => void;
}

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical'
}

const generateMenu = (props: MenuProps) => {
  return (
    <div>
      <Menu {...props}>
        <MenuItem>
          active
        </MenuItem>
        <MenuItem disabled>
          disabled
        </MenuItem>
        <MenuItem>
          xyz
        </MenuItem>
        <SubMenu title='dropDown'>
          <MenuItem>
            drop1
          </MenuItem>
        </SubMenu>
      </Menu>
    </div>
  )
}

const createStyleFile = () => {
  const cssFile: string = `
    .viking-submenu {
      display: none;
    }
    .viking-submenu.menu-opened {
      display:block;
    }
  `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}


// 声明类型
let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement

describe('test Menu and MenuItem component', () => {

  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    // css 节点插入
      wrapper.container.append(createStyleFile())
    menuElement =  wrapper.getByTestId('test-menu')
    activeElement= wrapper.getByText('active')
    disabledElement= wrapper.getByText('disabled')
  })

  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('viking-menu test')
    // expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('is-disabled')
  })

  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('xyz')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
  })

  it('should render vertical mode when mode is set to vertical', () => {
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('viking-menu menu-vertical')
  })

  it('should show dropdown items when hover on subMenu', async () => {
    expect(wrapper.queryByText('drop1')).not.toBeVisible()
    // 触发事件处理
    const dropDownElement = wrapper.getByText('dropDown')
    fireEvent.mouseEnter(dropDownElement)
    // 时间处理结果 出现 异步出现
    // expect(wrapper.getByText('drop1')).toBeVisible()
    await wait(() => {
      expect(wrapper.getByText('drop1')).toBeVisible()
    })
    // 测试点击事件
    fireEvent.click(wrapper.getByText('drop1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')

  })

})