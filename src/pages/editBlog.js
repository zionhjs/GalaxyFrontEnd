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
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
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
    }, [])
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
    const selectFiles=useCallback((e)=>{
        let file=e.target.files[0]
        dispatch({type:'editblog/uploadCover',payload:{file}})  
    },[])
    const handleSubmit=useCallback(()=>{
        dispatch({type:'editblog/submit'})
    },[])

    return (
        <div className={styles.container}>
            <div className={styles.label}>Caption</div>
            <div className={styles.inputView}>
                <input onChange={captionChange} className={styles.inputStyle} value={data.caption} />
                <span>{data.captionRightText}</span>
            </div>
            <div className={styles.label}>Author</div>
            <div className={styles.inputView}>
                <input onChange={authorChange} className={styles.inputStyle} value={data.author} />
                <span>{data.authorRightText}</span>
            </div>
            <div className={styles.label}>Tag</div>
            <div className={styles.tagBox}>
                {
                    data.tags.map((item, index) => (
                        <div key={index} className={styles.tagItem}><div>{item.text}</div>
                            <span className={styles.tagRight}>{item.rightText}</span>
                        </div>
                    ))
                }
                <div className={styles.tagItem} style={{ justifyContent: 'center', alignItems: 'center' }}><img className={styles.addIcon} src="add.png" alt="" /></div>
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
                formats={formats}
                className={styles.editContainer}
                onChange={onHtmChange}
            />
            <div className={styles.commentLabel}>Comment</div>
            <div className={styles.commentBox}>
                {
                    data.comments.map((item,index)=>(
                        <div key={index} className={styles.commentItem}>
                            <img src="redClose.png" className={styles.closeIcon} alt="" />
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