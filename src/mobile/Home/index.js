/*
 * @Author: xingzai
 * @Date: 2020-12-02 04:49:32
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-02 04:49:32
 * @FilePath: \GalaxyFrontEnd\src\mobile\Home\index.js
 */
import React from 'react'
import {connect} from 'dva'
import QueueAnim from 'rc-queue-anim';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import Swiper from './swiper'
import styles from './index.css'
const HomePage= (props)=> {
  const {profiles,illustration}=props
  return (
    <div className={styles.container}>
      <Swiper />
      <div className={styles.aboutBox}>
        <OverPack playScale={0.3}><QueueAnim duration={1000} ease="easeInCirc" animConfig={[
          { opacity: [1, 0] },
          { opacity: [1, 0] }
        ]} className={styles.titleBox}><img key="logoAni" src="logo.png" className={styles.aboutLogo} /><span key="aboutText" className={styles.aboutTitle}>ABOUT US</span></QueueAnim></OverPack>
        <div className={styles.aboutText}>GalaxyCGI is an Architural Visualization Company which focus on provide affordable photorealistic CG imagery &amp; Animation marketing campaigns and design presentations.</div>
        <div className={styles.aboutText}>Founded in 2010 by a group of architects and CGI artists in China ,
        the company seized the opportunity of China's blooming architectural revolution and organized &amp; trained a</div>
        <div className={styles.aboutText}>permanent team of Top CGI artists which specialized in Architectural Visualization.In 2016  the company opened the Shanghai office to serve
        the top Chinese architectural</div>
        <div className={styles.aboutText}> visualization needs an in 2019 the company opened Los Angeles branch to offer our service world wide.</div>
        <div className={styles.aboutText}>Nowadays,GalaxyCGI works with 200 companies all over the world and has multitude teams which specialize in multi-language communication / 3D modeling/ Image Rending/ 3D</div>
        <div className={styles.aboutText}>Animation/Cutting edge 360 VR/AR illustration etc.All these allows us to provide our client in this industry in the future to embrace a brighter
        future for architecture and</div>
        <div className={styles.aboutText}>continuing provide our affordable high quality renders service.</div>
      </div>
      <div className={styles.profileBox}>
        {profiles.map((item, index) => (
          <div key={index} className={styles.profile}>
            <img src={item.imgUrl} alt="" className={styles.profileImg} />
            <div className={styles.profileTitleBox}>
              <div className={styles.profileTitle}>{item.title}</div>
              <div className={styles.profileText}>{item.desc}</div>
            </div>
            <div className={styles.seeMoreBtn}>SEE&nbsp;&nbsp;  MORE</div>
          </div>
        ))}
      </div>
      <div className={styles.illustrationBox}>
        <img src={illustration.imgUrl} className={styles.illustrationImg} alt="" />
        <OverPack playScale={0.05}>
        <QueueAnim key="titleAni" duration={500} ease="easeInCirc" animConfig={[{opacity:[1,0]},{opacity:[1,0]}]} className={styles.illustrationTitleBox}>
          <img key="illimgAni" src="diamon.png" style={{ width: '45px', height: 'auto' }} />
          <div key="illTitleAni" className={styles.illuTitle}>{illustration.title}</div>
        </QueueAnim>
        </OverPack>
        <div className={styles.illuListMask}></div>
        <OverPack playScale={0.3}>
          <QueueAnim
            animConfig={[
              { opacity: [1, 0], translateY: [0, 50] },
              { opacity: [1, 0], translateY: [0, -50] }
            ]}
            delay={[0,1000,2000]}
            ease="easeInOutCubic"
            key="ill"
            leaveReverse
            component="div"
            className={styles.illuListBox}
          >
            {illustration.list.map((item, index) => (
              <div key={index + '#'} className={styles.illuListItem}>
                <div className={styles.illuListTitleBox}><img src={item.icon} alt="" className={styles.diamonIcon} /><span className={styles.illuListItemTitle}>{item.title}</span></div>
                <div className={styles.illuSplitLine}></div>
                <div className={styles.illuListText}>{item.text}</div>
              </div>
            ))}
          </QueueAnim>
        </OverPack>
      </div>
    </div>
  )
}
export default connect(({home})=>({profiles:home.profiles,illustration:home.illustration}))(HomePage)