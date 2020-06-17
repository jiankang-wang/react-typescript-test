import React from 'react';
import Button from './components/Button/button'
import Alert from './components/Alert/alert'

function App() {
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
    </div>
  )
}

export default App;
