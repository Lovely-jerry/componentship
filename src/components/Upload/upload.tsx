import React, { FC, useRef, ChangeEvent, useState } from 'react'
import axios from 'axios'
import Button from '../Button/button'
import UploadList from './uploadList'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';

export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    // 源文件
    raw?: File;
    response?: any;
    error?: any;
}

// 定义upload组件需要参数的类型
export interface UploadProps {
    action: string;
    defaultFileList?: UploadFile[];
    beforeUpload?: (file: File) => boolean | Promise<File>;
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    onChange?: (file: File) => void;
    onRemove?: (file: UploadFile) => void;
}

// 定义upload组件
export const Upload: FC<UploadProps> = (props) => {

    const { action, beforeUpload, onProgress, onSuccess, onError, onChange, defaultFileList, onRemove } = props;

    // 获取input元素的dom
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])

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

    // 点击文件上传按钮
    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    // input上传组件发生变化
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) {
            return
        }
        uploadFiles(files)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    // 定义上传文件函数(files:是一个类数组，使用时需要将他转化成数组)
    const uploadFiles = (files: FileList) => {
        // 类数组转化成数组的方式 使用..., 或者 Array.from()
        let postFiles = Array.from(files)
        postFiles.forEach(file => {
            if (!beforeUpload) {
                post(file)
            } else {
                const result = beforeUpload(file);
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

    //定义上传文件并请求接口
    const post = (file: File) => {

        let _file: UploadFile = {
            uid: Date.now() + 'upload-file',
            size: file.size,
            status: 'ready',
            name: file.name,
            percent: 0,
            raw: file
        }
        setFileList([_file, ...fileList])
        const formData = new FormData()
        formData.append(file.name, file)

        axios.post(action, formData, {
            headers: {
                'Context-Type': 'multipart/form-data'
            },
            onUploadProgress: (e) => {
                let percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: 'uploading' })
                    !!onProgress && onProgress(percentage, file)
                }
            }
        }).then(resp => {
            console.log('new_resp', resp);
            updateFileList(_file, { status: 'success', response: resp.data })
            !!onSuccess && onSuccess(resp.data, file)
        }).catch(err => {
            console.error('new_err', err);
            updateFileList(_file, { error: err })
            !!onError && onError(err, file)
        }).finally(() => {
            !!onChange && onChange(file)
        })
    }
    console.log('fileList', fileList);

    const handleRemove = (fileItem: UploadFile) => {
        setFileList(prevList => {
            return prevList.filter(file => file.uid !== fileItem.uid)
        })
        !!onRemove && onRemove(fileItem)
    }

    return <div className='viking-upload-component'>
        <Button
            btnType='primary'
            onClick={handleClick}
        >
            Upload File
        </Button>
        <input
            className="viking-file-input"
            style={{ display: 'none' }}
            type='file'
            ref={fileInputRef}
            onChange={handleFileChange}
        />
        <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
}

export default Upload;