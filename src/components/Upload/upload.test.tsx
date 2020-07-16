import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import axios from 'axios'
import { render, RenderResult, fireEvent, wait} from '@testing-library/react'
import Upload from './upload'

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

const mockedAxios = axios as jest.Mocked<typeof axios>

const testProps: uploadPros = {
  action: "fakeurl.com",
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true
}

let wrapper: RenderResult, fileInput: HTMLElement, uploadArea: HTMLElement
const testFile = new File(['xyz'], 'test.png', {type: 'image/png'})

describe('test upload component', () => {

  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
  })

})



