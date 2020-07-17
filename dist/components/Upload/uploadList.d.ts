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
interface UploadListProps {
    fileList: UploadFile[];
    onRemove: (file: UploadFile) => void;
}
declare const UploadList: React.FC<UploadListProps>;
export default UploadList;
