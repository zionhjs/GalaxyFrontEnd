/*
 * @Author: xingzai
 * @Date: 2020-12-14 01:17:07
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-14 01:17:08
 * @FilePath: \GalaxyFrontEnd\src\mobile\BlogDetail\index.js
 */
import React,{useMemo} from 'react'
import {connect} from 'dva'
import Block from './Block'
import Dialog from './Dialog'
import styles from './index.css'
const BlogDetail=(props)=>{
    const {data}=props;
    let richText = useMemo(() => {
        return data.article.replace(/\<img/gi, '<img class="rich-img" ')
    }, [data])
    return (
        <div className={styles.container}>
            <div className={styles.articleTitle}>{data.title}</div>
            <div className={styles.authorWrapper}>
                <span>{data.author}</span>
                <span>{data.date}</span>
            </div>
            <div className={styles.postHeader}>
                <img src="read.png" alt="" className={styles.readIcon} />
                <span className={styles.readText}>{data.read}</span>
                <img src="liked.png" alt="" className={styles.likedIcon} />
                <span className={styles.likedText}>{data.likes}</span>
                <img src="comment.png" className={styles.commentIcon} />
                <span className={styles.commentText}>{data.commentNum}</span>
                <img src="share.png" className={styles.shareIcon} />
                <span className={styles.shareText}>Share</span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: richText }} className={styles.post}>
            </div>
            <div className={styles.commentLabel}>User comment</div>
            <div className={styles.commentList}>
                {data.comments.map((item,index)=>(
                    <div key={index} className={styles.commentItem}>
                        <div className={styles.commentHeader}>
                            <img src={item.avatar} alt="" className={styles.commentAvatar} />
                            <span className={styles.commentName}>{item.name}</span>
                            <span className={styles.commentDate}>{item.date}</span>
                            <img src="liked.png" className={styles.commentLiked} alt="" />
                            <span className={styles.commentLikedText}>{item.likes}</span>
                        </div>
                         <div className={styles.commentContent}>{item.content}</div>
                    </div>
                ))}
            </div>
            <div className={styles.commentFooter}>All comments have been displayed</div>
            <Block />
            <Dialog />
        </div>
    )
}
export default connect(({blogdetail:{data}})=>({data}))(BlogDetail)