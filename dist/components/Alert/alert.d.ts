import React from "react";
declare type AlertType = "success" | "default" | "danger" | "warning";
export interface AlertProps {
    title: string;
    description?: string;
    type?: AlertType;
    onClose?: () => void;
    closable?: boolean;
    className?: string;
}
declare const Alert: React.FC<AlertProps>;
export default Alert;
