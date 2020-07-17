import React, { useState } from "react";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";
import classNames from "classnames";
var Alert = function (props) {
    var _a;
    var _b = useState(true), hide = _b[0], setHide = _b[1];
    var title = props.title, description = props.description, type = props.type, onClose = props.onClose, closable = props.closable, className = props.className;
    var classes = classNames("viking-alert", className, (_a = {},
        _a["viking-alert-" + type] = type,
        _a));
    var titleClass = classNames("viking-alert-title", {
        "bold-title": description
    });
    var handleClose = function () {
        if (onClose) {
            onClose();
        }
        setHide(false);
    };
    return (React.createElement("div", null,
        React.createElement(Transition, { in: hide, timeout: 300, animation: "zoom-in-top" },
            React.createElement("div", { className: classes },
                React.createElement("span", { className: titleClass }, title),
                description && React.createElement("p", { className: "viking-alert-desc" }, description),
                closable && (React.createElement("span", { className: "viking-alert-close", onClick: handleClose },
                    React.createElement(Icon, { icon: "times" })))))));
};
Alert.defaultProps = {
    type: "default",
    closable: true
};
export default Alert;
