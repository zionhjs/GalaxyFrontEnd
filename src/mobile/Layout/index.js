/*
 * @Author: xingzai
 * @Date: 2020-12-02 04:57:46
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-02 04:57:47
 * @FilePath: \GalaxyFrontEnd\src\mobile\Layout\index.js
 */
import React,{useCallback,useState} from 'react'
import {SearchOutlined} from '@ant-design/icons'
import { Link } from 'umi'
import classnames from 'classnames'
import ThreeLine from '../../mobile/components/ThreeLine'
import Menus from '../../mobile/components/Menus'
import Footer from '../../mobile/components/Footer'
import Chat from '../components/Chat'
import styles from './index.css'
import NotifyCation from '../../mobile/components/Notifycation';
export default function (props) {
    const [active,setActive]=useState(false)
    const focusHandler=useCallback(()=>{
        setActive(true)
       },[])
       const blurHandler=useCallback(()=>{
         setActive(false)
       },[])
    return (
        <div id="top" className={styles.container}>
          <NotifyCation/>
            <div className={styles.header}>
                <Link to="/"><img src="/purplelogo.png" alt="" className={styles.logo} /></Link>
                <div onBlur={blurHandler} onFocus={focusHandler} className={classnames(styles.searchBox, { [styles.searchInactive]: !active, [styles.searchActive]: active })}>
                    <input className={styles.searchInput} />
                    <SearchOutlined className={styles.searchIcon} />
                </div>
                <ThreeLine />
            </div>
            <div className={styles.placeholder}></div>
            <Menus />
            {props.children}
            <Footer />
            <Chat />            
        </div>
    )
}
