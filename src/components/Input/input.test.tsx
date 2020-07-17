import React, { InputHTMLAttributes, ChangeEvent } from 'react'
import { render, fireEvent } from '@testing-library/react'
import  Input from './input'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

type InputSize = 'lg' | 'sm'
interface InputProps extends  Omit<InputHTMLAttributes<HTMLElement>, 'size' > {
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp; // icon 字符串字面量
  prepend?: string | React.ReactElement; // 前缀
  append?: string | React.ReactElement; // 后缀
  ChangeEvent?: (e: ChangeEvent<HTMLInputElement>) => void; // 改变事件触发
}

const defaultProps: InputProps  = {
  onChange: jest.fn(),
  placeholder: 'test-input'
}

// unit test

describe('test Input component', () => {

  it('should render the correct default Input', () => {
    const wrapper = render(<Input {...defaultProps}/>)
    const testNode = wrapper.getByPlaceholderText('test-input') as HTMLInputElement
    expect(testNode).toBeInTheDocument()
    expect(testNode).toHaveClass('viking-input-inner')
    // 触发change事件, 改变数据框的内容
    fireEvent.change(testNode, { target: { value: '23' } })
    expect(defaultProps.onChange).toHaveBeenCalled()
    // 改变其值
    expect(testNode.value).toEqual('23')
  })

  it('should render the disabled Input on disabled property', () => {
    const wrapper = render(<Input disabled placeholder='disabled'/>)
    const testNode = wrapper.getByPlaceholderText('disabled') as HTMLInputElement
    // 进行检验是否的是禁用标签
    expect(testNode.disabled).toBeTruthy()
  })
  
  it('should render different input sizes on size property', () => {
    const wrapper = render(<Input placeholder="sizes" size="lg" />)
    const testContainer = wrapper.container.querySelector('.viking-input-wrapper')
    expect(testContainer).toHaveClass('input-size-lg')
  })

  it('should render prepand and append element on prepand/append property', () => {
    const {queryByText, container } = render(<Input placeholder="pend" prepend="https://" append=".com"/>)
    const testContainer = container.querySelector('.viking-input-wrapper')
    expect(testContainer).toHaveClass('input-group input-group-append input-group-prepend')
    expect(queryByText('https://')).toBeInTheDocument()
    expect(queryByText('.com')).toBeInTheDocument()
  })

})
