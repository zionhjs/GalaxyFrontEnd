/*
 * @Author: xingzai
 * @Date: 2020-12-09 23:51:42
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-09 23:51:43
 * @FilePath: \GalaxyFrontEnd\src\mobile\components\Menus\index.js
 */
import React,{useCallback} from 'react'
import {connect} from 'dva'
import {Link} from 'umi'
import styles from './index.css'
const Menus=({menus,visible})=>{
    return visible ? (
        <div className={styles.container}>
            <div className={styles.menuBox}>
            {menus.map((item,index)=>(
                <Link to={item.route} key={index} className={styles.menuItem}>
                    <img src={item.icon} alt="" className={styles.menuIcon} />
                    <span className={styles.menuText}>{item.text}</span>
                </Link>
            ))}
        </div>
        </div>
    ) : null
}
export default connect(({global})=>({menus:global.menus,visible:global.menuVisibleMobile}))(Menus)