/*
 * @Author: xingzai
 * @Date: 2020-12-15 00:29:24
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-15 00:29:25
 * @FilePath: \GalaxyFrontEnd\src\mobile\Team\index.js
 */
import React from 'react'
import { connect } from 'dva'
import { OverPack } from 'rc-scroll-anim';
import TweenOne from 'rc-tween-one';
import GetNew from '../components/GetNews'
import styles from './index.css'
const TeamPage = props => {
    const { teamData } = props
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
                    teamData?.list?.map((item, index) => (
                        <div className={styles.section} key={index}>
                            <OverPack playScale={0.3}><TweenOne animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={'title'+index} className={styles.sectionTitle}>{item.title}</TweenOne></OverPack>
                            {
                                item.data.map((v, i) => (
                                    <OverPack playScale={0.3} key={i}>
                                    <TweenOne animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={'team'+index+i} className={styles.sectionItem}>
                                        <div className={styles.nameText}>{v.name}</div>
                                        <div className={styles.jobText}>{v.job}</div>
                                        <div className={styles.emailText}>{v.email}</div>
                                    </TweenOne>
                                    </OverPack>
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

export default connect(({ team: { data } }) => ({ teamData: data }))(TeamPage)