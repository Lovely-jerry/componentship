import React, { FC, useState } from 'react'
import classNames from 'classnames'

interface DraggerProps {
    onFile: (files: FileList) => void;
}

const Dragger: FC<DraggerProps> = (props) => {
    const { onFile, children } = props;
    //创建文件的状态
    const [dragOver, setDragOver] = useState(false)
    // 定义样式文件
    const dragClass = classNames('viking-uploader-dragger', {
        'is-dragover': dragOver
    })
    const handleDrop = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault()
        setDragOver(false)
        onFile(e.dataTransfer.files)
    }
    const handleDrag = (e: React.DragEvent<HTMLElement>, over: boolean) => {
        e.preventDefault()
        setDragOver(over)
    }

    return <div
        className={dragClass}
        onDragOver={(e) => handleDrag(e, true)}
        onDragLeave={(e) => handleDrag(e, false)}
        onDrop={handleDrop}
    >
        {children}
    </div>
}

export default Dragger