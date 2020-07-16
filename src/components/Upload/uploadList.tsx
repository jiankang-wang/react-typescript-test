import React from 'react'
import Icon from '../Icon/icon'
import Progress from '../Progress/progress'

type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
interface UploadFile {
  uid: string;
  size?: number;
  name?: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (file: UploadFile) => void;
}

const UploadList: React.FC<UploadListProps> = (props) => {
  const {
    fileList,
    onRemove
  } = props

  return (
    <ul className="viking-upload-list">
      {
        fileList.map(item =>{
          return (
            <li className="viking-upload-list-item" key={item.uid}>
              <span className={`file-name file-name-${item.status}`}>
                <Icon icon="file-alt" theme="secondary" />
                {item.name}
              </span>
              <span className="file-status">
                {(item.status === 'uploading' || item.status === 'ready') && <Icon icon="spinner" spin theme="primary" />}
                {item.status === 'success' && <Icon icon="check-circle" theme="success" />}
                {item.status === 'error' && <Icon icon="times-circle" theme="danger" />}
              </span>
              <span className="file-actions">
                <Icon icon="times" onClick={() => { onRemove(item)}}/>
              </span>
              {item.status === 'uploading' && 
                <Progress 
                  percent={item.percent || 0}
                />
              }
            </li>
          )
        })
      }
    </ul>
  )
}

export default UploadList