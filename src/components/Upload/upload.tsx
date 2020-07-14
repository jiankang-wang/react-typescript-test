import React, { useRef } from 'react'
import axios from 'axios'
import Button from '../Button/button'

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
    // 1: 转换为数组
    const postFiles = Array.from(files)
    // 2: 进行遍历
    postFiles.forEach(file => {
      // 3: 数据请求
      // 4: beforeUpload 提交之前进行判断
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
    const formData = new FormData()
    formData.append(file.name, file)
    axios.post(action, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (e) => { // 过程
        let percentage = Math.round((e.loaded * 100) / e.total) || 0
        if (onProgress) {
          onProgress(percentage, file)
        }
      }
    }).then(res => {
      if (onSuccess) {
        onSuccess(res.data, file)
      }
      if (onChange) {
        onChange(file)
      }
    }).catch(err => {
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
          className="viking-file-input"
          onChange={handlerChange}
        />
      </div>
    </div>
  )
}

export default Upload