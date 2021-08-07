import React, { FC } from 'react'
import { UploadFile } from "./upload";
import Icon from '../Icon/icon'


interface UploadListProps {
    fileList: UploadFile[];
    onRemove: (_file: UploadFile) => void;
}

const UploadList: FC<UploadListProps> = ({ fileList, onRemove }) => {

    return <ul className='viking-upload-list'>
        {
            fileList.map((file) => (
                <li className="viking-upload-list-item" key={file.uid}>
                    <span className={`file-name file-name-${file.status}`}>
                        <Icon icon='file-alt' theme='secondary' />
                        {file.name}
                    </span>
                    <span className='file-status'>
                        {(file.status === 'uploading' || file.status === 'ready') && <Icon icon='spinner' spin theme='primary' />}
                        {file.status === 'success' && <Icon icon='check-circle' theme='success' />}
                        {file.status === 'error' && <Icon icon='times-circle' theme='danger' />}
                    </span>
                    <span className='file-actions'>
                        <Icon icon='times' onClick={() => onRemove(file)} />
                    </span>
                </li>
            ))
        }
    </ul>
}

export default UploadList;