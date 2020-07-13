import React, { useRef } from 'react'
import axios from 'axios'
import Button from '../Button/button'

interface uploadPros {
  action: string;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
}

const Upload: React.FC<uploadPros> = (props) => {

  const {
    action,
    onProgress,
    onSuccess,
    onError
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
      post(file)
    })
  }

  const post = (file: File) => {
    const formData = new FormData()
    formData.append(file.name, file)
    axios.post(action, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (e) => {
        let percentage = Math.round((e.loaded * 100) / e.total) || 0
        if (onProgress) {
          onProgress(percentage, file)
        }
      }
    }).then(res => {
      if (onSuccess) {
        onSuccess(res.data, file)
      }
    }).catch(err => {
      if(onError) {
        onError(err, file)
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