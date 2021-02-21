import React ,{useState,useCallback,Fragment} from 'react'
import {Upload,message} from 'antd';
import {CloudUploadOutlined,PaperClipOutlined,DeleteOutlined} from '@ant-design/icons'
import classnames from 'classnames'
import styles from './upload.css'
const { Dragger } = Upload;
const UploadDialog=()=>{
  const [enter,setEnter]=useState(false)
  const [fileList,setFileList]=useState([])
  const handleDrop=useCallback((e)=>{
    e.preventDefault();
    setEnter(false)
    var files = e.dataTransfer.files;
    console.log('files==',files)
    setFileList(fileList.concat(files[0]))
  },[fileList.length])
  const handleDragover=useCallback((e)=>{
    setEnter(true)
  },[])
  const handleDragLeave=useCallback(e=>{
    setEnter(false)
  },[])
  const handleDelete=useCallback(index=>{
    setFileList(fileList.filter((v,i)=>i!==index))
  },[fileList.length])
  const handleSubmit=useCallback(()=>{
    console.log(fileList)
  },[fileList.length])
  const handleChange=useCallback((e)=>{
    let files=Array.prototype.slice.apply(e.target.files)
    setFileList(fileList.concat(files))
  },[fileList.length])
  const createUrl=window.createObjectURL||window.URL.createObjectURL||window.webkitURL.createObjectURL
  return (
    <div className={styles.container}>
      <div className={styles.uploadWrapper}>
      <input onChange={handleChange} multiple={'multiple'}  id="contained-button-file"  accept="image/*" className={styles.uploadInput} type={'file'} />
      <label onDragLeave={handleDragLeave} onDragOver={handleDragover} onDrop={handleDrop} className={classnames(styles.uploadLabel,{[styles.dashedBox]:enter})} htmlFor={'contained-button-file'}>
        {
         !enter ? (<p className={styles.uploadIcon}>
          <CloudUploadOutlined />
        </p>) : <div className={styles.dashedPlus}></div>
        }
        <p className={styles.uploadText1}>Drag and drop or Click here</p>
        <p style={enter ? {marginBottom:'20px'}:{}} className={styles.uploadText2}>
          to upload your image(max 10MB)
        </p>
      </label>
        {
          fileList.map((item,index)=>(
            <div className={styles.listItem} key={index}>
              <div className={styles.preView}>
                <img className={styles.previewImg} src={createUrl(item)} alt={''} />
              </div>
             <span className={styles.fileName}>{item.name}</span>
              <DeleteOutlined onClick={handleDelete.bind(null,index)} className={styles.deleteIcon} />
            </div>
          ))
        }
        <button onClick={handleSubmit} className={styles.submitBtn}>submit</button>
      </div>
    </div>
  )
}
export default UploadDialog
