/*
 * @Author: xingzai
 * @Date: 2020-11-14 05:46:56
 * @LastEditors: xingzai
 * @LastEditTime: 2020-11-14 05:46:56
 * @FilePath: \test\src\pages\blogDetail.js
 */
import React, { useMemo,useEffect, useCallback,useState } from 'react'
import { RightOutlined, CheckOutlined } from '@ant-design/icons'
import { useMediaQuery } from 'react-responsive'
import {connect} from 'dva'
import * as moment from 'moment'
import DetailMobile from '../mobile/BlogDetail'
import styles from './blogDetail.css'
const BlogDetail= (props)=> {
    const {data,dispatch,location:{query}}=props;
    const isMobile = useMediaQuery({ maxWidth: 767 })
    useEffect(()=>{
        dispatch({type:'blogdetail/getDetailData',payload:query.id})
        },[query.id])
    let richText = useMemo(() => {
        return data.article.replace(/\<img/gi, '<img class="rich-img" ')
    }, [data])
    const [checked,setChecked]=useState(false)
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [comment,setComment]=useState('')
    const toggleChecked=useCallback(()=>{
        setChecked(!checked)
    },[])
    const nameChange=useCallback(e=>{
        setName(e.target.value)
    },[])
    const eamilChange=useCallback(e=>{
        setEmail(e.target.value)
    },[])
    const commentChange=useCallback(e=>{
        setComment(e.target.value)
    },[])
    const send=useCallback(()=>{
        dispatch({type:'blogdetail/addComment',payload:{momentId:query.id,comment,name,email,checked}})
    },[comment,name,email,checked,query.id])
    const toNext=useCallback(()=>{
        dispatch({type:'blogdetail/toNextPost',payload:{articleId:query.id}})
    },[query.id])
    const addLike=useCallback(()=>{
        dispatch({type:'blogdetail/addLike',payload:{type:1,id:query.id}})
    },[query.id])
    const addCommentLike=useCallback((commentId)=>{
        dispatch({type:'blogdetail/addCommentLike',payload:{type:2,commentId,id:query.id}})
    },[query.id])
    return isMobile ? (<DetailMobile />) : (
        <div className={styles.container}>
            <div className={styles.articleTitle}>{data.title}</div>
            <div className={styles.articleInfo}>
                <span className={styles.authorText}>{data.author}</span>
                <span className={styles.dateText}>{moment(data.date).format('YYYY[.]MM[.]DD')}</span>
                <img src="read.png" className={styles.readIcon} />
                <span className={styles.readText}>{data.read}</span>
                <img onClick={addLike} src="liked.png" className={styles.likedIcon} />
                <span  className={styles.likedText}>{data.likes}</span>
                <img src="comment.png" className={styles.commentIcon} />
                <span className={styles.commentText}>{data.commentNum}</span>
                <img src="share.png" className={styles.shareIcon} />
                <span className={styles.shareText}>Share</span>
            </div>
            <div className={styles.blogContent}>
                <div dangerouslySetInnerHTML={{ __html: richText }} className={styles.post}>
                </div>
                <div className={styles.sider}>
                    <div className={styles.searchBox}>
                        <div className={styles.searchTitle}>Blog Search</div>
                        <div className={styles.inputView}>
                            <input placeholder="Blog Search" className={styles.searchInput} />
                            <img src="search.png" className={styles.searchIcon} />
                        </div>
                    </div>
                    <div className={styles.getNews}>
                        <div className={styles.getNewsTitle}>Get News</div>
                        <div className={styles.newsText}>{data.news}</div>
                        <input className={styles.nameInput} placeholder="Name" />
                        <input className={styles.emailInput} placeholder="Email" />
                        <div className={styles.signupBtn}>Sign Me Up</div>
                    </div>
                    <div className={styles.recentPost}>
                        <div className={styles.recentPostTitle}>Recent Posts</div>
                        {data.recentPosts.map((item, index) => (
                            <div key={index} className={styles.recentPostItem}>
                                <div className={styles.itemContent}>
                                    <img src={item.imgUrl} className={styles.itemImg} alt="" />
                                    <div className={styles.itemText}>{item.title}</div>
                                </div>
                                <div className={styles.itemDesc}>
                                    <span className={styles.itemAuthor}>{item.author}</span>
                                    <span className={styles.itemDate}>{moment(item.date).format('YYYY[.]MM[.]DD')}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.tagsBox}>
                        <div className={styles.tagsTitle}>Tags</div>
                        <div className={styles.tagInner}>
                            {data.tags.map((item, index) => (
                                <div key={index} className={styles.tag}>{item}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.postInfo}>
                <img src="read.png" className={styles.readIcon} style={{ marginLeft: 0 }} />
                <span className={styles.readText}>{data.read}</span>
                <img onClick={addLike} src="liked.png" className={styles.likedIcon} />
                <span  className={styles.likedText}>{data.likes}</span>
                <img src="comment.png" className={styles.commentIcon} />
                <span className={styles.commentText}>{data.commentNum}</span>
                <img src="share.png" className={styles.shareIcon} />
                <span className={styles.shareText}>Share</span>
                <span onClick={toNext} className={styles.nextText}>Next Post</span>
                <RightOutlined onClick={toNext} className={styles.rightIcon} />
            </div>
            <div className={styles.commentBox}>
                <div className={styles.commentTitle}>Leave a Comment</div>
                <div className={styles.commentInputView}>
                    <input value={name} onChange={nameChange} className={styles.commentInput} placeholder="Name" style={{ marginRight: '37px' }} />
                    <input value={email} onChange={eamilChange} className={styles.commentInput} placeholder="Email" />
                </div>
                <textarea value={comment} onChange={commentChange} className={styles.commentTextArea} placeholder="Enter your comment..." />
                <div className={styles.checkedRow}>{checked ? <span onClick={toggleChecked} className={styles.checked}><CheckOutlined /></span> : <span onClick={toggleChecked} className={styles.unChecked}></span>}<span className={styles.checkedText}>Save my name, email, and website in this browser for the next time I comment.</span></div>
                <div onClick={send} className={styles.sendBtn}>SEND</div>
                <div className={styles.commentLabel}>User comment</div>
                {data.comments.map((item,index)=>(
                    <div key={index} className={styles.commentRow}>
                        <div className={styles.commentInfo}>
                            <img className={styles.avatar} src={item.avatar} alt="" />
                            <span className={styles.commentNameText}>{item.name}</span>
                            <span className={styles.commentDateText}>{moment(item.date).format('YYYY[.]MM[.]DD')}</span>
                            <img onClick={addCommentLike.bind(null,item.id)} src="liked.png" alt="" className={styles.commentLikedIcon} />
                            <span className={styles.commentLikedText}>{item.likes}</span>
                        </div>
                <div className={styles.commentContent}>{item.content}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default connect(({blogdetail})=>({data:blogdetail.data}))(BlogDetail)