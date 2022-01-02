/*
 * @Author: xingzai
 * @Date: 2020-11-09 09:10:40
 * @LastEditors: xingzai
 * @LastEditTime: 2020-11-10 01:23:28
 * @FilePath: \test\src\components\ArticleList\index.js
 */
import React,{useState,useCallback} from 'react'
import { RightOutlined,FormOutlined } from '@ant-design/icons'
import router from 'umi/router'
import TweenOne from 'rc-tween-one';
import { OverPack } from 'rc-scroll-anim';
import * as moment from 'moment'
import {connect} from 'dva'
import styles from './index.css'
import Swiper from './swiper'
import AddButton from '../AddButton'
import LoadMore from '../LoadMore'
import Confirm from '../Confirm'
const ArticleList=(props)=> {
    const {articles,role,dispatch } = props
    const delPost=useCallback((item)=>{
        dispatch({type:'blog/setDelItem',payload:item})
        dispatch({type:'blog/openConfirm'})
    },[])
    const todetail=useCallback((item)=>{
        router.push('blogDetail?id='+item.id)
    },[])
    const toEdit=useCallback((item)=>{
        router.push('editBlog?id='+item.id)
    },[])
    const loadMore=useCallback(()=>{
        //dispatch({type:'blog/loadMore'})
    },[])
    const addLike=useCallback((item)=>{
        dispatch({type:'blog/addLike',payload:{id:item.id,type:1}})
    },[])   
    
    return (
        <div className={styles.container}>
            {articles.length!==0&&articles.map((item, index) => (
                <OverPack key={index+'listitem'} playScale={0.3}>
                <TweenOne animation={{ x: '-=50',opacity: 0,type: 'from', ease: 'easeInCirc'}} key={index} className={styles.listItem}>
                    <div className={styles.leftBox}>
                        <Swiper images={item.images} />
                    </div>
                    <div className={styles.rightBox}>
                         {role==='admin' ? <img onClick={delPost.bind(null,item)} src="/redClose.png" alt="" className={styles.redClose} /> : null}
                        <div className={styles.listTitle}>{item.title}</div>
                        <div className={styles.listMidBox}><div className={styles.listAuthor}>{item.author}</div><div className={styles.listDate}>{moment(item.date).format('YYYY[.]MM[.]DD')}</div></div>
                        <div className={styles.listContent}><div dangerouslySetInnerHTML={{ __html: item.content }}></div></div>
                        <div className={styles.listFooter}>
                            <img src="read.png" className={styles.readIcon} />
                            <div className={styles.readText}>{item.read}</div>
                            <img onClick={addLike.bind(null,item)} src="liked.png" className={styles.likedIcon} />
                            <div className={styles.likedText}>{item.liked}</div>
                            <img src="comment.png" className={styles.commentIcon} />
                            <div className={styles.commentText}>{item.comment}</div>
                            {
                                role==='admin' ? <FormOutlined onClick={toEdit.bind(null,item)} className={styles.editIcon} /> :<><span onClick={todetail.bind(null,item)} className={styles.moreText}>more</span>
                                <RightOutlined onClick={todetail.bind(null,item)} className={styles.rightIcon} /></>
                            }
                        </div>
                    </div>
                </TweenOne>
                </OverPack>
            ))}
            {role==='admin'? (<AddButton />):null}
            <LoadMore loadMore={loadMore} />
            <Confirm  />
        </div>
    )
}
export default connect(({blog:{articles},global:{role}})=>({articles,role}))(ArticleList)
