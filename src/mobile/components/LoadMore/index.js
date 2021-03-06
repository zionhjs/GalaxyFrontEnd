/*
 * @Author: xingzai
 * @Date: 2020-12-13 00:14:06
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-13 00:14:06
 * @FilePath: \GalaxyFrontEnd\src\mobile\components\LoadMore\index.js
 */
import React,{useCallback} from 'react'
import { OverPack } from 'rc-scroll-anim';
import TweenOne from 'rc-tween-one';
import {connect} from 'dva'
import styles from './index.css'

const LoadMore=(props)=>{
  const {loadMore=function(){},handleScroll=function(){}}=props;

    return (
            <OverPack onScroll={handleScroll} playScale={0.3} ><TweenOne onClick={loadMore} animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key="loadmore" className={styles.loadMore}><img src="/loadMore.png" className={styles.loadMoreImg} /><img src="/loadMoreText.png" className={styles.loadMoreText} /></TweenOne></OverPack>
            
    
    )
}
export default connect()(LoadMore)
