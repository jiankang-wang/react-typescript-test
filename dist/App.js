var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState, useEffect } from 'react';
import Button from './components/Button/button';
import Alert from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMeu from './components/Menu/subMenu';
import Input from './components/Input/input';
import AutoComplete from './components/AutoComplete/auto';
import AutoCompleteObject from './components/AutoComplete/autoComplete';
import AsynAutoCompleteObject from './components/AutoComplete/asyncAutoComplete';
import Upload from './components/Upload/upload';
// 测试axios
import axios from 'axios';
function App() {
    var _a = useState(''), value = _a[0], setValue = _a[1];
    // 测试axios
    var _b = useState(''), title = _b[0], setTitle = _b[1];
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
    useEffect(function () {
        axios.post('https://jsonplaceholder.typicode.com/posts', {
            id: 1,
            title: '测试axios'
        }, {
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(function (_a) {
            var title = _a.data.title;
            setTitle(title);
        });
    }, []);
    useEffect(function () {
        console.log(value);
    }, [value]);
    var handlerAsynFetchobject = function (query) {
        return fetch("https://api.github.com/search/users?q=" + query)
            .then(function (res) { return res.json(); })
            .then(function (_a) {
            var items = _a.items;
            return items.slice(0, 10).map(function (item) { return (__assign({ value: item.login }, item)); });
        });
    };
    var handlerFetchObject = function (query) {
        var lakersWithNumber = [
            { value: 'bradley', number: 11 },
            { value: 'pope', number: 1 },
            { value: 'caruso', number: 4 },
            { value: 'cook', number: 2 },
            { value: 'cousins', number: 15 },
            { value: 'james', number: 23 },
            { value: 'AD', number: 3 },
            { value: 'green', number: 14 },
            { value: 'howard', number: 39 },
            { value: 'kuzma', number: 0 },
        ];
        return lakersWithNumber.filter(function (item) { return item.value.includes(query); }) || [];
    };
    var renderOptionObject = function (item) {
        return (React.createElement("h4", null, item.value));
    };
    var handlerFetch = function (query) {
        var data = ['agc', 'ssk', 'yun', 'qyui', 'jsbjwjl', 'sussjslb', 'bshsi', 'chauya', 'euossh'];
        return data.filter(function (item) { return item.includes(query); }) || [];
    };
    var renderOption = function (query) {
        return (React.createElement("h4", null, query));
    };
    // 基本上传文件的流程
    var handlerChangeUpload = function (e) {
        console.log(e.target.files);
        var files = e.target.files;
        if (files) {
            var currentFile = files[0];
            var formData = new FormData();
            formData.append(currentFile.name, currentFile);
            axios.post('https://jsonplaceholder.typicode.com/posts', formData, {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            }).then(function (res) {
                console.log(res.data);
            });
        }
    };
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
    var filePromise = function (file) {
        // 修改文件名
        // const newFile = new File([file], 'repeat-name', { type: file.type })
        // return Promise.resolve(newFile)
        return Promise.resolve(file);
    };
    return (React.createElement("div", { className: "App" },
        React.createElement("header", { className: "App-header" },
            React.createElement(Button, null, "\u786E\u5B9A"),
            React.createElement(Button, { btnType: 'primary' }, "primary"),
            React.createElement(Button, { btnType: 'danger' }, "danger"),
            React.createElement(Button, { btnType: 'link', href: 'http://www.baidu.com' }, "link"),
            React.createElement(Button, { size: 'lg', btnType: 'default' }, "lg"),
            React.createElement(Button, { size: 'sm', btnType: 'default' }, "sm")),
        React.createElement("div", null,
            React.createElement(Alert, { type: 'danger', title: 'test' })),
        React.createElement("div", null,
            React.createElement(Menu, { mode: "vertical", defaultIndex: '0', defaultOpenSubMenus: ['3'] },
                React.createElement(MenuItem, null, '首页'),
                React.createElement(MenuItem, null, '精品'),
                React.createElement(MenuItem, null, '轻奢'),
                React.createElement(SubMeu, { title: 'demo' },
                    React.createElement(MenuItem, null, 'drop1'),
                    React.createElement(MenuItem, null, 'drop2'),
                    React.createElement(MenuItem, null, 'drop3')))),
        React.createElement("div", null,
            React.createElement(Input, { icon: "search", value: value, onChange: function (e) { setValue(e.target.value); }, style: {
                    width: '200px'
                } }),
            React.createElement(Input, { prepend: "http://", style: {
                    width: '200px'
                } }),
            React.createElement(Input, { append: '.com', style: {
                    width: '200px'
                } })),
        React.createElement("div", null,
            React.createElement(AutoComplete, { style: {
                    width: '200px'
                }, fetchSuggessions: handlerFetch, renderOption: renderOption })),
        React.createElement("div", null,
            React.createElement(AutoCompleteObject, { style: {
                    width: '200px'
                }, fetchSuggessions: handlerFetchObject, renderOption: renderOptionObject })),
        React.createElement("div", null,
            React.createElement(AsynAutoCompleteObject, { style: {
                    width: '200px'
                }, fetchSuggessions: handlerAsynFetchobject, renderOption: renderOptionObject })),
        React.createElement("div", null,
            React.createElement("span", null, title),
            React.createElement("h5", null, "\u57FA\u672C\u4E0A\u4F20"),
            React.createElement("input", { type: "file", name: "upload-file", multiple: true, onChange: handlerChangeUpload })),
        React.createElement("div", null,
            React.createElement("span", null, "test upload"),
            React.createElement(Upload, { beforeUpload: filePromise, action: 'https://jsonplaceholder.typicode.com/posts', multiple: true, withCredentials: true, headers: {
                    'X-power-enhancer': 'wjk-demo'
                }, data: {
                    key: 'value'
                }, accept: '.jpg', drag: true }))));
}
export default App;
