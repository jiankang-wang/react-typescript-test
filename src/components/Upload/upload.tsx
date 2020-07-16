import React, { useRef, useState } from 'react'
import axios from 'axios'
import UploadList from './uploadList'
import Dragger from './dragger'

type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
// single file information
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

interface uploadPros {
  action: string;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onChange?: (file: File) => void;
  onRemove?: (file: UploadFile) => void;
  defaultFileList?: UploadFile[];
  // enhanced attributes
  headers?: { [key: string]: any };
  name?: string;
  data?: { [key: string]: any };
  withCredentials?: boolean;
  multiple?: boolean;
  accept?: string;
  drag?: boolean
}

const Upload: React.FC<uploadPros> = (props) => {

  const {
    action,
    onProgress,
    onSuccess,
    onError,
    beforeUpload,
    onChange,
    onRemove,
    defaultFileList,
    headers,
    name,
    data,
    withCredentials,
    multiple,
    accept,
    drag
  } = props

  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile []>(defaultFileList || [])

  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }

  const handlerClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    uploadFiles(files) 
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  const uploadFiles = (files: FileList) => {
    const postFiles = Array.from(files)
    postFiles.forEach(file => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then(processedFile => {
            post(processedFile)
          })
        } else if (result !== false) {
          post(file)
        }
      }
    })
  }

  const post = (file: File) => {
    let _file: UploadFile = {
      uid: new Date() + 'upload-file' + file.name,
      size: file.size,
      name: file.name,
      raw: file,
      status: 'ready',
      percent: 0,
    }

    setFileList(prevList => {
      return [_file, ...prevList]
    })
    
    const formData = new FormData()
    formData.append(name || file.name, file)
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    }
    axios.post(action, formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      },
      withCredentials,
      onUploadProgress: (e) => {
        let percentage = Math.round((e.loaded * 100) / e.total) || 0
        if (percentage <= 100) {
          updateFileList(_file, { percent: percentage, status: 'uploading'})
          if (onProgress) {
            onProgress(percentage, file)
          }
        }
      }
    }).then(res => {
      updateFileList(_file, { status: 'success', response: res.data })
      if (onSuccess) {
        onSuccess(res.data, file)
      }
      if (onChange) {
        onChange(file)
      }
    }).catch(err => {
      updateFileList(_file, { status: 'error', error: err })
      if(onError) {
        onError(err, file)
      }
      if (onChange) {
        onChange(file)
      } 
    })
  }

  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
    }
  }

  return (
    <div className='viking-upload-component'>
      <div 
        className='viking-upload-input'
        onClick={handlerClick}
      >
        {
          drag ? (
            <Dragger
              onFile={files => uploadFiles(files) }
            >
            </Dragger>
          ) : (
            <input 
              style={{ width: '80px' }}
              type="file"
              multiple={ multiple }
              className="viking-file-input"
              onChange={ handlerChange }
              accept={ accept }
            />
          )
        }
      </div>
      <div>
        <UploadList 
          fileList={ fileList }
          onRemove={ handleRemove }
        />
      </div>
    </div>
  )
}

Upload.defaultProps = {
  name: 'file'
}

export default Upload