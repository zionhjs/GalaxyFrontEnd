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
import styles from './index.css'
const AddarticlePage= (props)=> {
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
    const captionChange=useCallback((e)=>{
        dispatch({type:'addArticle/changeCaption',payload:e.target.value})
    },[])
    const authorChange=useCallback((e)=>{
        dispatch({type:'addArticle/changeAuthor',payload:e.target.value})
    },[])
    const checkedChange=useCallback(()=>{
        dispatch({type:'addArticle/toggleChecked'})
    },[])
    const onHtmChange=useCallback((value)=>{
        dispatch({type:'addArticle/changeArticle',payload:value})
    },[])
    const selectFiles=useCallback((e)=>{
        let file=e.target.files[0]
        dispatch({type:'addArticle/uploadCover',payload:{file}})  
    },[])
    const handleSubmit=useCallback(()=>{
        dispatch({type:'addArticle/submit'})
    },[])
    const addTag=useCallback(()=>{
        dispatch({type:'addArticle/addTag'})
    },[])
    const tagChange=useCallback((index,e)=>{
        dispatch({type:'addArticle/tagChange',payload:{index,value:e.target.value}})
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
                        <div key={index} className={styles.tagItem}><input className={styles.tagInput} onChange={tagChange.bind(null,index)} value={item.text||''} />
                            <span className={styles.tagRight}>{item.rightText}</span>
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
export default connect(({addArticle:{data,checked}})=>({data,checked}))(AddarticlePage)