import React from 'react'
import Icon from '../Icon/icon'
import classNames from 'classnames'

// 类型
type AlertType = 'success' | 'default' | 'danger' | 'warning'

export interface AlertProps {
  title: string;
  // 描述
  description?: string;
  type?: AlertType;
  onClose?: () => void;
  closable?: boolean;
  className?: string;
}

const Alert: React.FC<AlertProps> = (props) => {
  const {
    title,
    description,
    type,
    onClose,
    closable,
    className,
  } = props

  const classes = classNames('viking-alert', className, {
    [`viking-alert-${type}`]: type,
  })
  
  const titleClass = classNames('viking-alert-title', {
    'bold-title': description
  })

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  return (
    <div>
      <div className={classes}>
        <span className={titleClass}>{title}</span>
        {description && <p className="viking-alert-desc">{description}</p>}
        {closable && <span className="viking-alert-close" onClick={handleClose}><Icon icon="times"/></span>}
      </div>
    </div>
  )
}

Alert.defaultProps = {
  type: 'default',
  closable: true
}

export default Alert