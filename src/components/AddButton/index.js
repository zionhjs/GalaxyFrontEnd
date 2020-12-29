/*
 * @Author: xingzai
 * @Date: 2020-12-29 01:48:12
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-29 01:48:14
 * @FilePath: \GalaxyFrontEnd\src\components\AddButton\index.js
 */
import React,{useCallback} from 'react'
import {connect} from 'dva'
import router from 'umi/router'
import {PlusOutlined} from '@ant-design/icons'
import styles from './index.css'

const AddBtn=props=>{
    const toPage=useCallback(()=>{
        router.push('/addArticle')
    },[])
    return (
        <div onClick={toPage} className={styles.addBtn} >
            <PlusOutlined className={styles.addIcon} />
            <span className={styles.addText}>Add article</span>
        </div>
    )
}
export default connect()(AddBtn)
