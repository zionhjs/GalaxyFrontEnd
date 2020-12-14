/*
 * @Author: xingzai
 * @Date: 2020-11-14 05:46:56
 * @LastEditors: xingzai
 * @LastEditTime: 2020-11-14 05:46:56
 * @FilePath: \test\src\pages\blogDetail.js
 */
import React, { useMemo,useEffect, useCallback } from 'react'
import { RightOutlined, CheckOutlined } from '@ant-design/icons'
import { useMediaQuery } from 'react-responsive'
import {connect} from 'dva'
import DetailMobile from '../mobile/BlogDetail'
import styles from './blogDetail.css'
const BlogDetail= (props)=> {
    const {data,dispatch,location:{query},checked}=props;
    const isMobile = useMediaQuery({ maxWidth: 767 })
    useEffect(()=>{
        dispatch({type:'blogdetail/getDetailData',payload:query.id})
        },[])
    let richText = useMemo(() => {
        return data.article.replace(/\<img/gi, '<img class="rich-img" ')
    }, [data])
    const toggleChecked=useCallback(()=>{
        dispatch({type:'blogdetail/toggleChecked'})
    },[])
    return isMobile ? (<DetailMobile />) : (
        <div className={styles.container}>
            <div className={styles.articleTitle}>{data.title}</div>
            <div className={styles.articleInfo}>
                <span className={styles.authorText}>{data.author}</span>
                <span className={styles.dateText}>{data.date}</span>
                <img src="read.png" className={styles.readIcon} />
                <span className={styles.readText}>{data.read}</span>
                <img src="liked.png" className={styles.likedIcon} />
                <span className={styles.likedText}>{data.likes}</span>
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
                                    <span className={styles.itemDate}>{item.date}</span>
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
                <img src="liked.png" className={styles.likedIcon} />
                <span className={styles.likedText}>{data.likes}</span>
                <img src="comment.png" className={styles.commentIcon} />
                <span className={styles.commentText}>{data.commentNum}</span>
                <img src="share.png" className={styles.shareIcon} />
                <span className={styles.shareText}>Share</span>
                <span className={styles.nextText}>Next Post</span>
                <RightOutlined className={styles.rightIcon} />
            </div>
            <div className={styles.commentBox}>
                <div className={styles.commentTitle}>Leave a Comment</div>
                <div className={styles.commentInputView}>
                    <input className={styles.commentInput} placeholder="Name" style={{ marginRight: '37px' }} />
                    <input className={styles.commentInput} placeholder="Email" />
                </div>
                <textarea className={styles.commentTextArea} placeholder="Enter your comment..." />
                <div className={styles.checkedRow}>{checked ? <span onClick={toggleChecked} className={styles.checked}><CheckOutlined /></span> : <span onClick={toggleChecked} className={styles.unChecked}></span>}<span className={styles.checkedText}>Save my name, email, and website in this browser for the next time I comment.</span></div>
                <div className={styles.sendBtn}>SEND</div>
                <div className={styles.commentLabel}>User comment</div>
                {data.comments.map((item,index)=>(
                    <div key={index} className={styles.commentRow}>
                        <div className={styles.commentInfo}>
                            <img className={styles.avatar} src={item.avatar} alt="" />
                            <span className={styles.commentNameText}>{item.name}</span>
                            <span className={styles.commentDateText}>{item.date}</span>
                            <img src="liked.png" alt="" className={styles.commentLikedIcon} />
                            <span className={styles.commentLikedText}>{item.likes}</span>
                        </div>
                <div className={styles.commentContent}>{item.content}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default connect(({blogdetail})=>({data:blogdetail.data,checked:blogdetail.checked}))(BlogDetail)