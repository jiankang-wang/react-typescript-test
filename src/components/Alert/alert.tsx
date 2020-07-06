import React, { useState } from "react";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";
import classNames from "classnames";

// 类型
type AlertType = "success" | "default" | "danger" | "warning";

export interface AlertProps {
  title: string;
  // 描述
  description?: string;
  type?: AlertType;
  onClose?: () => void;
  closable?: boolean;
  className?: string;
}

const Alert: React.FC<AlertProps> = props => {
  const [hide, setHide] = useState(true);
  const { title, description, type, onClose, closable, className } = props;

  const classes = classNames("viking-alert", className, {
    [`viking-alert-${type}`]: type
  });

  const titleClass = classNames("viking-alert-title", {
    "bold-title": description
  });

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    setHide(false);
  };

  return (
    <div>
      <Transition in={hide} timeout={300} animation={"zoom-in-top"}>
        <div className={classes}>
          <span className={titleClass}>{title}</span>
          {description && <p className="viking-alert-desc">{description}</p>}
          {closable && (
            <span className="viking-alert-close" onClick={handleClose}>
              <Icon icon="times" />
            </span>
          )}
        </div>
      </Transition>
    </div>
  );
};

Alert.defaultProps = {
  type: "default",
  closable: true
};

export default Alert;
