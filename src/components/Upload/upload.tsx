import React, { FC, useRef, ChangeEvent } from 'react'
import axios from 'axios'
import Button from '../Button/button'

// 定义upload组件需要参数的类型
export interface UploadProps {
    action: string;
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
}

// 定义upload组件
export const Upload: FC<UploadProps> = (props) => {

    const { action, onProgress, onSuccess, onError } = props;

    // 获取input元素的dom
    const fileInputRef = useRef<HTMLInputElement>(null)

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
            const formData = new FormData()
            formData.append(file.name, file)

            axios.post(action, formData, {
                headers: {
                    'Context-Type': 'multipart/form-data'
                },
                onUploadProgress: (e) => {
                    let percentage = Math.round((e.loaded * 100) / e.total) || 0;
                    if (percentage < 100) {
                        !!onProgress && onProgress(percentage, file)
                    }
                }
            }).then(resp => {
                console.log('new_resp', resp);
                !!onSuccess && onSuccess(resp.data, file)
            }).catch(err => {
                console.error('new_err', err);
                !!onError && onError(err, file)
            })
        })
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
    </div>
}

export default Upload;