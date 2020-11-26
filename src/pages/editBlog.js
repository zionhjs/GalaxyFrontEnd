/*
 * @Author: xingzai
 * @Date: 2020-11-16 00:31:38
 * @LastEditors: xingzai
 * @LastEditTime: 2020-11-16 00:31:38
 * @FilePath: \test\src\pages\editBlog.js
 */
import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill'
import classnames from 'classnames'
import 'react-quill/dist/quill.snow.css';
import styles from './editBlog.css'
import res from '../data/editBlog.json'
export default function (props) {
    const [data, setData] = useState({ caption: '', author: '', tags: [], article: '',comments:[] })
    const [saveDate, setSaveDate] = useState('（ Auto save：2020-11-3 13:40:18 ）')
    const [article, setArticle] = useState('')
    const [images,setImages]=useState([])
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
        setData(res)
        setArticle(res.article)
    }, [])
    const [checked, setChecked] = useState(false)
    function captionChange(e) {
        setData({ ...data, caption: e.target.value })
    }
    function authorChange(e) {
        setData({ ...data, author: e.target.value })
    }
    function checkedChange() {
        setChecked(!checked)
    }
    function onHtmChange(value) {
        setArticle(value)
    }
    function selectFiles(e){
        let files=e.target.files
        let len=files.length
        let imgArr=[]
        for(let i=0;i<len;i++){
            imgArr.push(URL.createObjectURL(files[i]))
        }
        setImages(imgArr.concat(images))
    }


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
            <div className={styles.textRow}><span className={styles.textStyle}>Text</span><span className={styles.saveText}>{saveDate}</span></div>
            <ReactQuill
                value={article}
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
            <div className={styles.submit}>Submit</div>
        </div>
    )
}