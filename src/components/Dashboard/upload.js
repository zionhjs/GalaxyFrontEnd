import React from 'react'
import {Upload,message} from 'antd';
import {CloudUploadOutlined} from '@ant-design/icons'
import styles from './upload.css'
const { Dragger } = Upload;
const UploadDialog=()=>{
  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <div className={styles.container}>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <CloudUploadOutlined />
        </p>
        <p className={styles.uploadText1}>Drag and drop or Click here</p>
        <p className={styles.uploadText2}>
          to upload your image(max 10MB)
        </p>
      </Dragger>,
    </div>
  )
}
export default UploadDialog
