import React from 'react';
declare type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
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
    headers?: {
        [key: string]: any;
    };
    name?: string;
    data?: {
        [key: string]: any;
    };
    withCredentials?: boolean;
    multiple?: boolean;
    accept?: string;
    drag?: boolean;
}
declare const Upload: React.FC<uploadPros>;
export default Upload;
