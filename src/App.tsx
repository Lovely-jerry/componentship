import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Icon from './components/Icon/icon'
import Upload, { UploadFile } from './components/Upload/upload'
import { library, Library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas)

function App() {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    console.log('files', files);

    if (files) {
      const uploadedFile = files[0];
      const formData = new FormData()
      console.log('formData', formData);
      formData.append(uploadedFile.name, uploadedFile)
      axios.post('https://jsonplaceholder.typicode.com/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        console.log('res', res);

      })
    }
  }
  const checkFileSize = (file: File) => {
    if (Math.round(file.size / 1024) > 50) {
      console.log('file too big');
      return false
    }
    return true
  }
  const filePromise = (file: File) => {
    const newFile = new File([file], 'new_name.docx', { type: file.type })
    console.log('newFile', newFile);
    return Promise.resolve(newFile)
  }
  const defaultFileList: UploadFile[] = [
    { uid: '110', size: 1234, name: 'hello.md', status: 'uploading', percent: 42 },
    { uid: '111', size: 1234, name: 'axy.md', status: 'success', percent: 42 },
    { uid: '112', size: 1234, name: 'rfbh.md', status: 'error', percent: 42 },
  ]
  return (
    <>
      {/* <div className="App" style={{ marginTop: '100px', marginLeft: '100px' }}>
        <input type='file' name='myFile' onChange={handleFileChange} />
      </div> */}
      <Upload
        action='https://jsonplaceholder.typicode.com/posts'
        // action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
        // beforeUpload={checkFileSize}
        defaultFileList={defaultFileList}
        // beforeUpload={filePromise}
        onChange={(file) => console.log('我被出发了')}
        onRemove={(_file) => { console.log('我是被删除的哪一项', _file) }}
        name='fileName'
        data={{ key: 'value' }}
        headers={{ 'X-Powered-By': 'vikingship' }}
        multiple
        accept='.ts'
        darg
      >
        <Icon icon="upload" size="5x" theme="secondary" />
        <br />
        <p>Drag file over to upload</p>
      </Upload>
    </>
  );
}

export default App;
