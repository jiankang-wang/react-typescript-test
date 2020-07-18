import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import './styles/index.scss'
import App from './App';
import * as serviceWorker from './serviceWorker';

// 导入入口文件start
  export { default as AsyncAutoComplete } from './components/AutoComplete'
  export { default as Button } from './components/Button'
  export { default as Icon } from './components/Icon'
  export { default as Input } from './components/Input'
  export { default as Progress } from './components/Progress'
  export { default as Transition } from './components/Transition'
  export { default as Upload } from './components/Upload'
  export { default as Menu } from './components/Menu'
// 倒入入口文件end
 
// 软链接 A项目 npm link
//  切换到上层目录 找到B项目  npm link A项目的名字 进行软链接就可以使用导出的控件组件了（注意react版本的一致性以及icon图标库的引用）

library.add(fas)

ReactDOM.render(
  // <React.StrictMode>
    <App />,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
