/*
 * @Author: xingzai
 * @Date: 2020-12-15 00:29:24
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-15 00:29:25
 * @FilePath: \GalaxyFrontEnd\src\mobile\Team\index.js
 */
import React from 'react'
import {connect} from 'dva'
import GetNew from '../components/GetNews'
import styles from './index.css'
const TeamPage=props=>{
    const {teamData}=props
    return (
        <div className={styles.container}>
            <div className={styles.banner}>
                <img src={teamData.bannerImg} className={styles.bannerImg} alt="" />
                <div className={styles.bannerTextBox}>
                    <div className={styles.bannerTitle}>{teamData.bannerTitle}</div>
                    <div className={styles.bannerText}>{teamData.bannerText}</div>
                </div>
            </div>
            <div className={styles.list}>
                {
                    teamData?.list?.map((item,index)=>(
                        <div className={styles.section} key={index}>
                            <div className={styles.sectionTitle}>{item.title}</div>
                            {
                                item.data.map((v,i)=>(
                                    <div className={styles.sectionItem} key={i}>
                                        <div className={styles.nameText}>{v.name}</div>
                                        <div className={styles.jobText}>{v.job}</div>
                                <div className={styles.emailText}>{v.email}</div>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
            <GetNew />
        </div>
    )
}

export default connect(({team:{data}})=>({teamData:data}))(TeamPage)