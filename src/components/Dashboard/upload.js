import React ,{useState,useCallback,Fragment} from 'react'
import {Progress,message,Button} from 'antd';
import {CloudUploadOutlined,PaperClipOutlined,DeleteOutlined} from '@ant-design/icons'
import classnames from 'classnames'
import styles from './upload.css'
const UploadDialog=()=>{
  const [enter,setEnter]=useState(false)
  const [fileList,setFileList]=useState([])
  const [percent,setPercent]=useState(0)
  const [uploading,setUploading]=useState(false)
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
  function uploadProgress(evt) {
    if (evt.lengthComputable) {
      var percentComplete = Math.round(evt.loaded * 100 / evt.total);
      setPercent(percentComplete)
    }
  }
  function uploadComplete(evt) {
    setUploading(false)
  }
  function uploadFailed(evt) {
    setUploading(false)
  }
  function uploadCanceled(evt) {
    setUploading(false)
  }
  const handleSubmit=useCallback(()=>{
    setUploading(true)
    let fd=new FormData()
    fileList.forEach(function(file) {
      fd.append('multipartFile',file,file.name)
    })
    let xhr= new XMLHttpRequest()
    xhr.upload.addEventListener("progress", uploadProgress, false)
    xhr.addEventListener("load", uploadComplete, false);
    xhr.addEventListener("error", uploadFailed, false);
    xhr.addEventListener("abort", uploadCanceled, false);
    xhr.open("POST", "html5.action");
    xhr.send(fd);
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
        <Button onClick={handleSubmit} className={styles.submitBtn}>submit</Button>
      </div>
    </div>
  )
}
export default UploadDialog
