import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Upload from './components/Upload/upload'
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
    console.log('newFile',newFile);
    return Promise.resolve(newFile)
  }
  return (
    <>
      {/* <div className="App" style={{ marginTop: '100px', marginLeft: '100px' }}>
        <input type='file' name='myFile' onChange={handleFileChange} />
      </div> */}
      <Upload
        action='https://jsonplaceholder.typicode.com/posts'
        // beforeUpload={checkFileSize}
        beforeUpload={filePromise}
        onChange={(file) => console.log('我被出发了')}
      />
    </>
  );
}

export default App;
