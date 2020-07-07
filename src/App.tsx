import React, { useState, useEffect } from 'react';
import Button from './components/Button/button'
import Alert from './components/Alert/alert'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMeu from './components/Menu/subMenu'
import Input from './components/Input'
import AutoComplete from './components/AutoComplete'
import AutoCompleteObject from './components/AutoComplete/autoComplete'

interface DataSourceObject {
  value: string
}
type DataSourceType<T = {}> = T & DataSourceObject

function App() {
  const [value, setValue] = useState('')
  useEffect(() => {
    console.log(value)
  }, [value])

  const handlerFetchObject = (query: string) => {
    const lakersWithNumber = [
      {value: 'bradley', number: 11},
      {value: 'pope', number: 1},
      {value: 'caruso', number: 4},
      {value: 'cook', number: 2},
      {value: 'cousins', number: 15},
      {value: 'james', number: 23},
      {value: 'AD', number: 3},
      {value: 'green', number: 14},
      {value: 'howard', number: 39},
      {value: 'kuzma', number: 0},
    ]
    return lakersWithNumber.filter(item => item.value.includes(query)) || []
  }

  const renderOptionObject = (item: DataSourceType) => {
    return (
      <h4>{item.value}</h4>
    )
  } 

  const handlerFetch = (query: string) => {
    let data = ['agc', 'ssk', 'yun', 'qyui', 'jsbjwjl', 'sussjslb', 'bshsi', 'chauya', 'euossh']

    return data.filter(item => item.includes(query)) || []
  }

  const renderOption = (query: string) => {
    return (
      <h4>{query}</h4>
    )
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <Button>确定</Button>
        <Button
          btnType={ 'primary' }
        >
          primary
        </Button>
        <Button
          btnType={ 'danger' }
        >
          danger
        </Button>
        <Button
          btnType={ 'link' }
          href={ 'http://www.baidu.com' }
        >
          link
        </Button>
        <Button
          size={ 'lg' }
          btnType={ 'default' }
        >
          lg
        </Button>
        <Button
          size={ 'sm' }
          btnType={ 'default' }
        >
          sm
        </Button>
      </header>
      <div>
        <Alert type={ 'danger' } title={ 'test' } />
      </div>
      <div>
        <Menu 
          mode="vertical"
          defaultIndex={ '0' }
          defaultOpenSubMenus={ ['3'] }
        >
          <MenuItem>
            { '首页' }
          </MenuItem>
          <MenuItem>
            { '精品' }
          </MenuItem>
          <MenuItem>
            { '轻奢' }
          </MenuItem>
          <SubMeu title={'demo'}>
            <MenuItem>
              { 'drop1' }
            </MenuItem>
            <MenuItem>
              { 'drop2' }
            </MenuItem>
            <MenuItem>
              { 'drop3' }
            </MenuItem>
          </SubMeu>
        </Menu>
      </div>
      <div>
        <Input 
          icon="search"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setValue(e.target.value) }}
          style={
            {
              width: '200px'
            }
          } 
        />
        <Input
          prepend="http://"
          style={
            {
              width: '200px'
            }
          } 
        />
        <Input 
          append='.com'
          style={{
            width: '200px'
          }}
        />
      </div>
      <div>
      <AutoComplete 
        style={{
          width: '200px'
        }}
        fetchSuggessions={handlerFetch}
        renderOption={renderOption}
      />
      </div>
      <div>
        <AutoCompleteObject
          style={{
            width: '200px'
          }}
          fetchSuggessions={handlerFetchObject}
          renderOption={renderOptionObject}
        />
      </div>
    </div>
  )
}

export default App;
