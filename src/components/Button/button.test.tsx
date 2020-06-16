import React from 'react'
import { render, fireEvent } from "@testing-library/react"
import Button, { ButtonProps } from './button'

// 绑定事件
const defaultProps = {
  onClick: jest.fn()
}

const testProps: ButtonProps = {
  btnType: 'default'
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
}

test('our first react test case', () => {
  const wrapper = render(<Button { ...defaultProps}>Nice</Button>)
  const element = wrapper.queryByText('Nice')
  expect(element).toBeTruthy()
})

describe('test Button component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Button {...testProps} { ...defaultProps }>Nice</Button>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    expect(element.disabled).toBeFalsy() // 真 假
    fireEvent.click(element) // 点击事件
    expect(defaultProps.onClick).toHaveBeenCalled()
  })

  it('should render the correct component based on different props', () => {
    const wrapper = render(<Button {...testProps}>Nice</Button>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn btn-default')
  })

  it('should render a link when btnTykpe equals link and href is provided', () => {
    const wrapper = render(<Button btnType='link' href='www.baidu.com'>Link</Button>)
    const element = wrapper.getByText('Link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
  })

  it('should render disabled button when disabled set to true', () => {
    const wrapper = render(<Button {...disabledProps}>Nice</Button>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })

})