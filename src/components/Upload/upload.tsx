import React, { useRef, useState } from 'react'
import axios from 'axios'
import Button from '../Button/button'

type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
// 文件的信息
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

// 文件上传的事件信息
interface uploadPros {
  action: string;
  onProgress?: (percentage: number, file: File) => void; // 过程
  onSuccess?: (data: any, file: File) => void; // 成功
  onError?: (err: any, file: File) => void; // 失败
  beforeUpload?: (file: File) => boolean | Promise<File>; // 上传之前
  onChange?: (file: File) => void // 文件改变
}

const Upload: React.FC<uploadPros> = (props) => {

  const {
    action,
    onProgress,
    onSuccess,
    onError,
    beforeUpload,
    onChange
  } = props

  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile []>([])
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
      // beforeUpload 提交之前进行判断
      if (!beforeUpload) {
        post(file)
      } else { // 返回两个值 布尔值或者promise
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
      uid: new Date() + 'upload-file',
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
    formData.append(file.name, file)
    axios.post(action, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
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
  return (
    <div className='viking-upload-component'>
      <Button onClick={handlerClick} btnType='primary'>fileIputTest</Button>
      <div className='viking-upload-inpu'>
        <input 
          type="file"
          multiple
          className="viking-file-input"
          onChange={handlerChange}
        />
      </div>
    </div>
  )
}

export default Upload