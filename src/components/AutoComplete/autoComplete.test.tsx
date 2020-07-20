import React, { ReactElement, InputHTMLAttributes, ChangeEvent } from 'react'
import { render, fireEvent, RenderResult, cleanup, wait } from  '@testing-library/react'
import { config } from 'react-transition-group'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import AutoComplete from './asyncAutoComplete'
config.disabled = true

type InputSize = 'lg' | 'sm'

interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prepend?: string | ReactElement;
  append?: string | ReactElement;
  ChangeEvent?: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface DataSourceObject {
  value: string
}
type DataSourceType<T = {}> = T & DataSourceObject

interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggessions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => React.ReactElement;
}

const testArray = [
  {
    value: 'ab', number: 11
  }, {
    value: 'abc', number: 1
  }, {
    value: 'b', number: 4
  }, {
    value: 'c', number: 15
  }
]

const testProps: AutoCompleteProps = {
  fetchSuggessions: query => testArray.filter(item => item.value.includes(query)),
  onSelect: jest.fn(),
  placeholder: 'auto-complete'
}

// 类型声明
let wrapper: RenderResult, inputNode: HTMLInputElement

describe('test Aitocomplete complete', () => {
  
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps}/>)
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
  })

  it('test AutoComplete component', async () => {
    // // 异步加载, 因为又一个debounce防抖函数
    // fireEvent.change(inputNode, {target: { value: 'a'}})
    // await wait(() => {
    //   expect(wrapper.queryByText('ab')).toBeInTheDocument()
    // })
    // // Dom 节点可以使用container 拿到
    // expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2)
    // // 进行节点点击
    // fireEvent.click(wrapper.getByText('ab'))
    // expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 11 })
    // expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    // expect(inputNode.value).toBe('ab')
  })

  it('should provide keyboard support', async() => {
    // cleanup()
    // // 异步加载， 因为又一个debounce 防抖函数
    // fireEvent.change(inputNode, {target: { value: 'a'}})
    // await wait(() => {
    //   expect(wrapper.queryByText('ab')).toBeInTheDocument()
    // })

    // const firstResult = wrapper.queryByText('ab')
    // const secondResult = wrapper.queryByText('abc')

    // // down
    //   fireEvent.keyDown(inputNode, { keyCode: 40 })
    //   expect(firstResult).toHaveClass('is-active')
    // // down
    //   fireEvent.keyDown(inputNode, { keyCode: 40 })
    //   expect(secondResult).toHaveClass('is-active')
    
    // // up
    //   fireEvent.keyDown(inputNode, {keyCode: 38 })
    //   expect(firstResult).toHaveClass('is-active')

    // // enter 
    //   fireEvent.keyDown(inputNode, { keyCode: 13 })
    //   expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11})
    //   expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })

  it('click outside should hide the dropdown', () => {

  })

})


