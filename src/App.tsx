import React, { useState, useEffect } from 'react';
import Button from './components/Button/button'
import Alert from './components/Alert/alert'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMeu from './components/Menu/subMenu'
import Input from './components/Input/input'
import AutoComplete from './components/AutoComplete/auto'
import AutoCompleteObject from './components/AutoComplete/autoComplete'
import AsynAutoCompleteObject from './components/AutoComplete/asyncAutoComplete'
import Upload from './components/Upload/upload'
// 测试axios
import axios from 'axios'

interface DataSourceObject {
  value: string
}
type DataSourceType<T = {}> = T & DataSourceObject

function App() {
  const [value, setValue] = useState('')
  // 测试axios
  const [title, setTitle] = useState('')

  // get请求(get请求第二个参数是进行配置型的)
  // useEffect(() => {
  //   axios.get('https://jsonplaceholder.typicode.com/posts/1', {
  //     // 必要时添加或者全局配置
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8"
  //     } 
  //   })
  //     .then(({ data: { title } }) => {
  //       setTitle(title)
  //     })
  // })
  
  //post请求(post请求第二个参数是实际的参数， 第三个参数才是配置项)
    useEffect(() => {
      axios.post('https://jsonplaceholder.typicode.com/posts', {
        id: 1,
        title: '测试axios'
      }, {
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        } 
      }).then(({ data: { title } }) => {
        setTitle(title)
      })
    }, [])

  useEffect(() => {
    console.log(value)
  }, [value])

  const handlerAsynFetchobject = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
      })
  }

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

  // 基本上传文件的流程
  const handlerChangeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files)
    const files = e.target.files
    if (files) {
      const currentFile = files[0]
      const formData = new FormData()
      formData.append(currentFile.name, currentFile)
      axios.post('https://jsonplaceholder.typicode.com/posts', formData,{
        headers: {
          'Content-type': 'multipart/form-data'
        }
      }).then(res => {
        console.log(res.data)
      })
    }
  }

  // 检查文件 beforeUpload
  // 1: 文件大小
  // const checkFileSize = (file: File) => {
  //   if (Math.floor(file.size)/ 1024 > 50) {
  //     alert('file size big')
  //     return false
  //   }
  //   return true
  // }
  
  // 2: filePromise 文件(修改文件的命名)
  const filePromise = (file: File) => {
    // 修改文件名
    // const newFile = new File([file], 'repeat-name', { type: file.type })
    // return Promise.resolve(newFile)
    return Promise.resolve(file)
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
      <div>
        <AsynAutoCompleteObject
          style={{
            width: '200px'
          }}
          fetchSuggessions={handlerAsynFetchobject}
          renderOption={renderOptionObject}
        />
      </div>
      <div>
        <span>{ title }</span>
        <h5>基本上传</h5>
          <input 
            type="file"
            name="upload-file"
            multiple
            onChange={handlerChangeUpload}
          />
      </div>
      <div>
        <span>test upload</span>
        <Upload
          beforeUpload={ filePromise }
          action = { 'https://jsonplaceholder.typicode.com/posts' }
          multiple = { true }
          withCredentials= { true }
          headers={{
            'X-power-enhancer': 'wjk-demo'
          }}
          data={{
            key: 'value'
          }}
          accept={ '.jpg'}
          drag= { true }
        />
      </div>
    </div>
  )
}

export default App;
