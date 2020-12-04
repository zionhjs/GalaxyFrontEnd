/*
 * @Author: xingzai
 * @Date: 2020-12-02 04:57:46
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-02 04:57:47
 * @FilePath: \GalaxyFrontEnd\src\mobile\Layout\index.js
 */
import React from 'react'
import {Link} from 'umi'
import styles from './index.css'
export default function(props){
    return (
        <div className={styles.container}>
            <div className={styles.header}>
               <Link to="/"><img src="purplelogo.png" alt="" className={styles.logo} /></Link> 
            </div>
            {props.children}
        </div>
    )
}