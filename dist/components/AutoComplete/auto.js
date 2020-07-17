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
import React, { useState } from 'react';
import Input from '../Input/input';
var AutoComplete = function (props) {
    // 1: 拿到props
    var fetchSuggessions = props.fetchSuggessions, onSelect = props.onSelect, value = props.value, renderOption = props.renderOption, restProps = __rest(props
    // state 的值
    // 1: 初始化值 
    , ["fetchSuggessions", "onSelect", "value", "renderOption"]);
    // state 的值
    // 1: 初始化值 
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    // 2: 根据初始值获取相关联的值
    var _b = useState([]), suggestions = _b[0], SetSuggestions = _b[1];
    var handlerChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        if (value) {
            var result = fetchSuggessions(value);
            SetSuggestions(result);
        }
        else {
            SetSuggestions([]);
        }
    };
    var handlerSelect = function (item) {
        setInputValue(item);
        SetSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
    };
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item;
    };
    var generateDropdown = function () {
        return (React.createElement("ul", null, suggestions.map(function (item, index) {
            return (React.createElement("li", { key: index, onClick: function () { return handlerSelect(item); } }, renderTemplate(item)));
        })));
    };
    return (React.createElement("div", { className: "viking-auto-complete" },
        React.createElement(Input, __assign({ value: inputValue, onChange: handlerChange }, restProps)),
        generateDropdown()));
};
export default AutoComplete;
