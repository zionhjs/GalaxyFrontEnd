/*
 * @Author: xingzai
 * @Date: 2020-11-12 06:01:38
 * @LastEditors: xingzai
 * @LastEditTime: 2020-11-13 04:40:38
 * @FilePath: \test\src\components\Menus\index.js
 */

/*
 * @Author: xingzai
 * @Date: 2020-11-12 06:01:38
 * @LastEditors: xingzai
 * @LastEditTime: 2020-11-12 06:01:38
 * @FilePath: \test\src\components\Menus\index.js
 */
import React, { useState,useEffect } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import QueueAnim from 'rc-queue-anim';
import styles from './index.css'
import {getImages} from '../../service/api'

const menus = ['Login', 'Logout', 'Dashboard']
export default function (props) {
    const { visible, close,openLogin,openDashboard } = props
    const [idx, setIdx] = useState(0)
    function handleClose() {
        close()
    }
    async function handleCliked(item, index) {
        setIdx(index)
        if(item==='Login'){
            openLogin()//打开登录框
            close()
        }
        if(item==='Logout'){
          let result= await getImages()
          console.log('getImage',result)
        }
        if(item==='Dashboard'){
           openDashboard()
           close()
        }
       
    }

    return (
        visible ? (<div className={styles.container}>
            <div className={styles.closeWrapper}><CloseOutlined className={styles.closeIcon} onClick={handleClose} /></div>
            <QueueAnim ease={"easeInOutElastic"} type="bottom"  className={styles.menuBox}>
                {menus.map((item, index) => (
                        <div className={styles.menuItem} key={index} onClick={() => handleCliked(item, index)} style={idx === index ? { color: '#fff' } : { color: '#9e9e9e' }}>{item}</div>                    
                ))}
            </QueueAnim>
        </div>):null
    )
}
