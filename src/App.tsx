import React, { useState, useEffect } from 'react';
import Button from './components/Button/button'
import Alert from './components/Alert/alert'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMeu from './components/Menu/subMenu'
import Input from './components/Input'

function App() {
  const [value, setValue] = useState('')
  useEffect(() => {
    console.log(value)
  }, [value])
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
    </div>
  )
}

export default App;
