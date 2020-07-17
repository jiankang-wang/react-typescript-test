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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Input from '../Input/input';
import Icon from '../Icon/icon';
import { UseDebounce } from '../../Hooks/useDebounce';
import { UseClickOutside } from '../../Hooks/useClickOutside';
var AutoComplete = function (props) {
    var fetchSuggessions = props.fetchSuggessions, onSelect = props.onSelect, value = props.value, renderOption = props.renderOption, restProps = __rest(props
    // state 的值
    // 1: 初始化值 
    , ["fetchSuggessions", "onSelect", "value", "renderOption"]);
    // state 的值
    // 1: 初始化值 
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    // 2: 根据初始值获取相关联的值
    // 3: 添加loading 
    // 4: 高亮显示依据条件索引
    // 5: 点击空白处保证下拉收回
    var _b = useState(false), loading = _b[0], setloading = _b[1];
    var _c = useState([]), suggestions = _c[0], SetSuggestions = _c[1];
    var _d = useState(-1), highlightIndex = _d[0], setHighlightIndex = _d[1];
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    var debounceValue = UseDebounce(inputValue, 500);
    UseClickOutside(componentRef, function () { return SetSuggestions([]); });
    // 4: hook监听
    useEffect(function () {
        if (debounceValue && triggerSearch.current) {
            var result = fetchSuggessions(debounceValue);
            if (result instanceof Promise) {
                result.then(function (data) {
                    setloading(false);
                    SetSuggestions(data);
                });
            }
            else {
                SetSuggestions(result);
            }
        }
        else {
            SetSuggestions([]);
            setloading(false);
        }
        setHighlightIndex(-1);
    }, [debounceValue, fetchSuggessions]);
    // 事件监听
    var handlerChange = function (e) {
        setloading(true);
        var value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    };
    var highlight = function (index) {
        if (index < 0)
            index = 0;
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighlightIndex(index);
    };
    // 键盘时间
    var handlerKeyDown = function (e) {
        switch (e.keyCode) {
            case 13: // 回车
                if (suggestions[highlightIndex]) {
                    handlerSelect(suggestions[highlightIndex]);
                }
                break;
            case 38: // 上键
                highlight(highlightIndex - 1);
                break;
            case 40: // 下键
                highlight(highlightIndex + 1);
                break;
            case 27: // ESC
                SetSuggestions([]);
                break;
            default:
                break;
        }
    };
    var handlerSelect = function (item) {
        setInputValue(item.value);
        SetSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
        triggerSearch.current = false;
    };
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var generateDropdown = function () {
        return (React.createElement("ul", { className: "viking-suggestion-list" }, loading ? (React.createElement(Icon, { icon: "spinner", spin: true })) : (suggestions.map(function (item, index) {
            var classes = classNames('suggestion-item', {
                'is-active': index === highlightIndex
            });
            return (React.createElement("li", { className: classes, key: index, onClick: function () { return handlerSelect(item); } }, renderTemplate(item)));
        }))));
    };
    return (React.createElement("div", { className: "viking-auto-complete", ref: componentRef },
        React.createElement(Input, __assign({ value: inputValue, onChange: handlerChange }, restProps, { onKeyDown: handlerKeyDown })),
        generateDropdown()));
};
export default AutoComplete;
// useRef 可以用来存一个状态， 并且进行状态之间的一个切换 .current 拿到值
// useRef 也可以用来绑定dom元素， 并且进行监听dom元素， 来处理一些业务需求
