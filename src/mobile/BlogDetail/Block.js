/*
 * @Author: xingzai
 * @Date: 2020-12-15 02:51:41
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-15 02:51:42
 * @FilePath: \GalaxyFrontEnd\src\mobile\BlogDetail\Block.js
 */
import React,{useCallback} from 'react'
import {connect} from 'dva'
import classnames from 'classnames'
import styles from './block.css'
const Block=props=>{
    const {dispatch,visible}=props
    const handleClick=useCallback(()=>{
        dispatch({type:'blogdetail/openComment'})
    },[])
    return (
        <div className={classnames({[styles.container]:!visible,[styles.container1]:visible})} onClick={handleClick}>
            <div className={styles.ellipseBox}>
                <img src="pencil.png" alt="" className={styles.pencilIcon} />
                <span className={styles.ellipseText}>Write a Review...</span>
            </div>
            <img src="plane.png" alt="" className={styles.planeIcon} />            
        </div>
    )
}
export default connect(({blogdetail:{commentDialogVisible}})=>({visible:commentDialogVisible}))(Block)