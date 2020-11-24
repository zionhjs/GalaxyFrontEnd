/*
 * @Author: xingzai
 * @Date: 2020-11-09 09:10:40
 * @LastEditors: xingzai
 * @LastEditTime: 2020-11-10 01:23:28
 * @FilePath: \test\src\components\ArticleList\index.js
 */
import React,{Fragment,useState} from 'react'
import { RightOutlined,FormOutlined } from '@ant-design/icons'
import router from 'umi/router'
import styles from './index.css'
import Swiper from './swiper'
import LoadMore from '../LoadMore'
import Confirm from '../Confirm'
export default function (props) {
    const { data,role } = props
    const [visible,setVisible]=useState(false)
    const [curItem,setCurItem]=useState(null)
    function todetail(item){
        router.push('blogDetail')
    }
    function delPost(item){
 setCurItem(item)
 setVisible(true)
    }
    function toEdit(item){
        router.push('editBlog?id='+item.id)
    }
    function onConfirm(item){
        console.log('confirm',item)
        setVisible(false)
    }
    function closeConfirm(){
        setVisible(false)
    }
    return (
        <div className={styles.container}>
            {data.map((item, index) => (
                <div key={index} className={styles.listItem}>
                    <div className={styles.leftBox}>
                        <Swiper images={item.images} />
                    </div>
                    <div className={styles.rightBox}>
                         {role==='admin' ? <img onClick={delPost.bind(null,item)} src="redClose.png" alt="" className={styles.redClose} /> : null}
                        <div className={styles.listTitle}>{item.title}</div>
                        <div className={styles.listMidBox}><div className={styles.listAuthor}>{item.author}</div><div className={styles.listDate}>{item.date}</div></div>
                        <div className={styles.listContent}>{item.content}</div>
                        <div className={styles.listFooter}>
                            <img src="read.png" className={styles.readIcon} />
                            <div className={styles.readText}>{item.read}</div>
                            <img src="liked.png" className={styles.likedIcon} />
                            <div className={styles.likedText}>{item.liked}</div>
                            <img src="comment.png" className={styles.commentIcon} />
                            <div className={styles.commentText}>{item.comment}</div>
                            {
                                role==='admin' ? <FormOutlined onClick={toEdit.bind(null,item)} className={styles.editIcon} /> :<><span onClick={todetail.bind(null,item)} className={styles.moreText}>more</span>
                                <RightOutlined onClick={todetail.bind(null,item)} className={styles.rightIcon} /></>
                            }
                        </div>
                    </div>
                </div>
            ))}
            <LoadMore />
            <Confirm visible={visible} onConfirm={onConfirm.bind(null,curItem)} close={closeConfirm} />
        </div>
    )
}