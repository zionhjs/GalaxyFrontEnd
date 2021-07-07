/*
 * @Author: xingzai
 * @Date: 2020-11-16 00:31:38
 * @LastEditors: xingzai
 * @LastEditTime: 2020-11-16 00:31:38
 * @FilePath: \test\src\pages\editBlog.js
 */
import React, { useRef, useEffect,useCallback } from 'react'
import ReactQuill from 'react-quill'
import classnames from 'classnames'
import {connect} from 'dva'
import 'react-quill/dist/quill.snow.css';
import styles from './editBlog.css'
const EditBlog= (props)=> {
    const {data,dispatch,location:{query},checked,lastUpdate}=props;
    const {images}=data;
    const quill=useRef()
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{
        'background': ['rgb(  0,   0,   0)', 'rgb(230,   0,   0)', 'rgb(255, 153,   0)',
          'rgb(255, 255,   0)', 'rgb(  0, 138,   0)', 'rgb(  0, 102, 204)',
          'rgb(153,  51, 255)', 'rgb(255, 255, 255)', 'rgb(250, 204, 204)',
          'rgb(255, 235, 204)', 'rgb(255, 255, 204)', 'rgb(204, 232, 204)',
          'rgb(204, 224, 245)', 'rgb(235, 214, 255)', 'rgb(187, 187, 187)',
          'rgb(240, 102, 102)', 'rgb(255, 194, 102)', 'rgb(255, 255, 102)',
          'rgb(102, 185, 102)', 'rgb(102, 163, 224)', 'rgb(194, 133, 255)',
          'rgb(136, 136, 136)', 'rgb(161,   0,   0)', 'rgb(178, 107,   0)',
          'rgb(178, 178,   0)', 'rgb(  0,  97,   0)', 'rgb(  0,  71, 178)',
          'rgb(107,  36, 178)', 'rgb( 68,  68,  68)', 'rgb( 92,   0,   0)',
          'rgb(102,  61,   0)', 'rgb(102, 102,   0)', 'rgb(  0,  55,   0)',
          'rgb(  0,  41, 102)', 'rgb( 61,  20,  10)']
      }],
      [{
        'color': ['rgb(  0,   0,   0)', 'rgb(230,   0,   0)', 'rgb(255, 153,   0)',
          'rgb(255, 255,   0)', 'rgb(  0, 138,   0)', 'rgb(  0, 102, 204)',
          'rgb(153,  51, 255)', 'rgb(255, 255, 255)', 'rgb(250, 204, 204)',
          'rgb(255, 235, 204)', 'rgb(255, 255, 204)', 'rgb(204, 232, 204)',
          'rgb(204, 224, 245)', 'rgb(235, 214, 255)', 'rgb(187, 187, 187)',
          'rgb(240, 102, 102)', 'rgb(255, 194, 102)', 'rgb(255, 255, 102)',
          'rgb(102, 185, 102)', 'rgb(102, 163, 224)', 'rgb(194, 133, 255)',
          'rgb(136, 136, 136)', 'rgb(161,   0,   0)', 'rgb(178, 107,   0)',
          'rgb(178, 178,   0)', 'rgb(  0,  97,   0)', 'rgb(  0,  71, 178)',
          'rgb(107,  36, 178)', 'rgb( 68,  68,  68)', 'rgb( 92,   0,   0)',
          'rgb(102,  61,   0)', 'rgb(102, 102,   0)', 'rgb(  0,  55,   0)',
          'rgb(  0,  41, 102)', 'rgb( 61,  20,  10)']
      }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  }
        const formats = [
            'header',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image'
        ]
    useEffect(() => {
        dispatch({type:'editblog/getEditBlogData',payload:query.id})
    }, [query.id])
    const captionChange=useCallback((e)=>{
        dispatch({type:'editblog/changeCaption',payload:e.target.value})
    },[])
    const authorChange=useCallback((e)=>{
        dispatch({type:'editblog/changeAuthor',payload:e.target.value})
    },[])
    const checkedChange=useCallback(()=>{
        dispatch({type:'editblog/toggleChecked'})
    },[])
    const onHtmChange=useCallback((value)=>{
        dispatch({type:'editblog/changeArticle',payload:value})
    },[])
    const tagChange=useCallback((index,e)=>{
        dispatch({type:'editblog/tagChange',payload:{index,value:e.target.value}})
    },[])
    const addTag=useCallback(()=>{
        dispatch({type:'editblog/addTag'})
    },[])
    const selectFiles=useCallback((e)=>{
        let file=e.target.files[0]
        dispatch({type:'editblog/uploadCover',payload:{file}})  
    },[])
    const handleSubmit=useCallback(()=>{
        dispatch({type:'editblog/submit',payload:query.id})
    },[query.id])
  const deleteComment=useCallback((item)=>{
 dispatch({type:'editblog/deleteComment',payload:{commentId:item.id,blogId:query.id}})
  },[query.id])

    return (
        <div className={styles.container}>
            <div className={styles.label}>Caption</div>
            <div className={styles.inputView}>
                <input onChange={captionChange} className={styles.inputStyle} value={data.caption} />
                <span>{`${data.caption?.length||0}/100`}</span>
            </div>
            <div className={styles.label}>Author</div>
            <div className={styles.inputView}>
                <input onChange={authorChange} className={styles.inputStyle} value={data.author} />
                <span>{`${data.author?.length||0}/20`}</span>
            </div>
            <div className={styles.label}>Tag</div>
            <div className={styles.tagBox}>
                {
                    data.tags.map((item, index) => (
                        <div key={index} className={styles.tagItem}><input className={styles.tagInput} onChange={tagChange.bind(null,index)} value={item.text||''} />
                            <span className={styles.tagRight}>{`${index}/20`}</span>
                        </div>
                    ))
                }
                <div onClick={addTag} className={styles.tagItem} style={{ justifyContent: 'center', alignItems: 'center' }}><img className={styles.addIcon} src="add.png" alt="" /></div>
            </div>
            <div className={styles.frontCover}><span>Front Cover</span><span>（Recommended size：900px*500px）</span></div>
            <div className={styles.imageBox}>
                {
                    images.map((item, index) => (
                        <div key={index} className={classnames(styles.imageItem,styles.extra)}><img className={styles.imgStyle} src={item} alt="" /></div>
                    ))
                }
                <div className={classnames(styles.uploadBox,styles.extra)}>
                    <img src="upload.png" className={styles.uploadIcon} alt="" />
                    <div className={styles.uploadText}>upload</div>
                    <input type="file" accept="image/*" onChange={selectFiles} className={styles.fileSelect} multiple="multiple"/>
                </div>
            </div>
            <div className={styles.checkedRow}>
                {
                    checked ? <div onClick={checkedChange} className={styles.checked}>√</div> : <div onClick={checkedChange} className={styles.unChecked}></div>
                }
                <div className={styles.checkedText}>The cover image appears in the text</div>
            </div>
            <div className={styles.textRow}><span className={styles.textStyle}>Text</span><span className={styles.saveText}>{data.lastUpdate}</span></div>
            <ReactQuill
            ref={quill}
                value={data.article}
                theme="snow"
                modules={modules}
                //formats={formats}
                className={styles.editContainer}
                onChange={onHtmChange}
            />
            <div className={styles.commentLabel}>Comment</div>
            <div className={styles.commentBox}>
                {
                    data.comments.map((item,index)=>(
                        <div key={index} className={styles.commentItem}>
                            <img onClick={deleteComment.bind(null,item)} src="redClose.png" className={styles.closeIcon} alt="" />
                            <div className={styles.postInfo}>
                                <img src={item.avatar} alt="" className={styles.avatar} />
                               <div className={styles.commentNameText}>{item.name}</div>
                               <div className={styles.dateText}>{item.date}</div>
                               <img src="liked.png" alt="" className={styles.likedIcon} />
                               <div className={styles.likesText}>{item.likes}</div>
                            </div>
                    <div className={styles.commentBody}>{item.content}</div>
                        </div>
                    ))
                }
            </div>
            <div onClick={handleSubmit} className={styles.submit}>Submit</div>
        </div>
    )
}
export default connect(({editblog:{data,checked}})=>({data,checked}))(EditBlog)
