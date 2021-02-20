/*
 * @Author: xingzai
 * @Date: 2020-11-25 05:29:09
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-05 01:29:14
 * @FilePath: \GalaxyFrontEnd\src\pages\home.js
 */
/*
 * @Author: xingzai
 * @Date: 2020-11-25 05:29:09
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-04 08:04:10
 * @FilePath: \GalaxyFrontEnd\src\pages\home.js
 */

/*
 * @Author: xingzai
 * @Date: 2020-11-04 09:04:59
 * @LastEditors: xingzai
 * @LastEditTime: 2020-11-07 06:00:11
 * @FilePath: \test\src\pages\index.js
 */
import React,{useCallback,useEffect} from 'react';
import {connect} from 'dva'
import router from 'umi/router'
import styles from './home.css';
import Swiper from '../components/Swiper'
import QueueAnim from 'rc-queue-anim';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import TweenOne from 'rc-tween-one';
import { useMediaQuery } from 'react-responsive'
import MobileHome from '../mobile/Home'
const HomePage=(props)=> {
  const {profiles,illustration,stillImages,aniImages,dispatch}=props;
  console.log('updated at 2021/2/20')
  //const isMobile = useMediaQuery({ maxWidth: 767 })
  const isMobile=window.screen.width<768
  const toPage=useCallback(item=>{
    dispatch({type:'global/setCurrentNav',payload:item.nav})
    router.push(item.route)
  },[])  
  return isMobile ? (<MobileHome />) : (
    <div className={styles.container}>
       <Swiper />
      <OverPack playScale={0.1} className={styles.aboutBox}>
        <TweenOne key="aniTitle" animation={{y:'+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} className={styles.titleBox}><img key="logoAni" src="logo.png" className={styles.aboutLogo} /><span key="aboutText" className={styles.aboutTitle}>ABOUT US</span></TweenOne>
        <TweenOne key="textAnim" animation={{y:'+=50', opacity: 0,type: 'from', ease: "easeInCirc"}}>
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
        </TweenOne>
      </OverPack>
      <div className={styles.profileBox}>
        {profiles.map((item, index) => (
          <div key={index} className={styles.profile}>
            <img src={item.imgUrl} alt="" className={styles.profileImg} />
            <div onClick={toPage.bind(null,item)} className={styles.profileTitleBox}>
              <div className={styles.profileTitle}>{item.title}</div>
              <div className={styles.profileText}>{item.desc}</div>
            </div>
            <div className={styles.seeMoreBtn}>SEE MORE</div>
          </div>
        ))}
      </div>
      <div className={styles.illustrationBox}>
        <img src={illustration.imgUrl} className={styles.illustrationImg} alt="" />
        <OverPack playScale={0.1}>
        <QueueAnim key="titleAni" duration={500} ease="easeInCirc" animConfig={[{opacity:[1,0]},{opacity:[1,0]}]} className={styles.illustrationTitleBox}>
          <img key="illimgAni" src="diamon.png" style={{ width: '45px', height: 'auto' }} />
          <div key="illTitleAni" className={styles.illuTitle}>{illustration.title}</div>
        </QueueAnim>
        </OverPack>
        <div className={styles.illuListMask}></div>
        <OverPack playScale={0.1}>
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
                <div className={styles.illuListTitleBox}><img src={item.icon} alt="" style={{ width: '30px', height: 'auto' }} /><span className={styles.illuListItemTitle}>{item.title}</span></div>
                <div className={styles.illuSplitLine}></div>
                <div className={styles.illuListText}>{item.text}</div>
              </div>
            ))}
          </QueueAnim>
        </OverPack>
      </div>
      <div className={styles.stillWrapper}>
      <OverPack playScale={0.1}>
        <QueueAnim animConfig={[{opacity:[1,0]},{opacity:[1,0]}]} ease="easeInCirc" duration={500} className={styles.stillTitleBox}>
          <img key="stillImg" src="still.png" style={{ width: '41px', height: 'auto' }} />
          <span key="stillText" className={styles.stillTitle}>Still Image WorkFlow</span>
        </QueueAnim>
        </OverPack>
        <OverPack playScale={0.1}>
          <QueueAnim
           animConfig={[
            { opacity: [1, 0], translateY: [0, 250] },
            { opacity: [1, 0], translateY: [250,0] }
          ]}
          leaveReverse
            delay={[0,500,1000,1500,2000]}
            ease="easeInCirc"
            key="still"
            component="div"
            className={styles.wfOutterBox}>{stillImages.map((item, index) => (<div key={index} className={styles.wfInnerBox}><img src={item} className={styles.workflowImg} alt="" /></div>))}
          </QueueAnim>
        </OverPack>
        <OverPack playScale={0.1} className={styles.stepBox}>
          <TweenOne key="step1" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}}>
          <div className={styles.stepItem}>
            <div className={styles.stepTitle}>STEP 1<img src="step.png" className={styles.stepImg} /></div>
            <div className={styles.stepContent}>Information gathering We will collect all the related files for the project and give you the ETD as soon as we can</div>
          </div>
          </TweenOne>
          <TweenOne className={styles.stepArrowWrapper} key="step1Img" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}}>
          <img src="stepArrow.png" alt="" className={styles.stepArrow} />
          </TweenOne>
          <TweenOne key="step2" animation={{ x: '-=50',opacity: 0,type: 'from', ease: "easeInCirc"}}>
          <div className={styles.stepItem}>
            <div className={styles.stepTitle}>STEP 2<img src="step.png" className={styles.stepImg} /></div>
            <div className={styles.stepContent}>Setup 3D scene and confirm the possible camera with you</div>
          </div>
          </TweenOne>
          <TweenOne key="step2Img" className={styles.stepArrowWrapper} animation={{ x: '-=50',opacity: 0,type: 'from', ease: "easeInCirc"}}>
          <img src="stepArrow.png" alt="" className={styles.stepArrow} />
          </TweenOne>
          <TweenOne key="step3" animation={{ x: '-=50',opacity: 0,type: 'from', ease: "easeInCirc"}}>
          <div className={styles.stepItem}>
            <div className={styles.stepTitle}>STEP 3<img src="step.png" className={styles.stepImg} /></div>
            <div className={styles.stepContent}>Setup lighting &amp; texture and show it to you for adjusting</div>
          </div>
          </TweenOne>
          <TweenOne key="step3Img" className={styles.stepArrowWrapper} animation={{ x: '-=50',opacity: 0,type: 'from', ease: "easeInCirc"}}>
          <img src="stepArrow.png" alt="" className={styles.stepArrow} />
          </TweenOne>
          <TweenOne key="step4" animation={{ x: '-=50',opacity: 0,type: 'from', ease: "easeInCirc"}}>
          <div className={styles.stepItem}>
            <div className={styles.stepTitle}>STEP 4<img src="step.png" className={styles.stepImg} /></div>
            <div className={styles.stepContent}>Work on the post productions to show you the photorealistic CGIs</div>
          </div>
          </TweenOne>
          <TweenOne key="step4Img" className={styles.stepArrowWrapper} animation={{ x: '-=50',opacity: 0,type: 'from', ease: "easeInCirc"}}>
          <img src="stepArrow.png" alt="" className={styles.stepArrow} />
          </TweenOne>
          <TweenOne key="step5" animation={{ x: '-=50',opacity: 0,type: 'from', ease: "easeInCirc"}}>
          <div className={styles.stepItem}>
            <div className={styles.stepTitle}>STEP 5<img src="step.png" className={styles.stepImg} /></div>
            <div className={styles.stepContent}>Take your comments and revise that till you satisfied.</div>
          </div>
          </TweenOne>
        </OverPack>
      </div>

      <div className={styles.animationWrapper}>
        <OverPack playScale={0.1}>
        <QueueAnim animConfig={[{opacity:[1,0]},{opacity:[1,0]}]} ease="easeInCirc" duration={500} className={styles.animationTitleBox}>
          <img key="stiImg" src="still.png" style={{ width: '41px', height: 'auto' }} />
          <span key="stiText" className={styles.animationTitle}>Animation WorkFlow</span>
        </QueueAnim>
        </OverPack>

        <OverPack playScale={0.1}>
          <QueueAnim
             animConfig={[
              { opacity: [1, 0], translateY: [0, 250] },
              { opacity: [1, 0], translateY: [250,0] }
            ]}
             key="ani"
             delay={[0,500,1000,1500,2000]}
             ease="easeInCirc"
            leaveReverse
            component="div"
            className={styles.wfOutterBox}>{aniImages.map((item, index) => (<div key={index} className={styles.wfInnerBox}><img src={item} className={styles.workflowImg} alt="" /></div>))}
          </QueueAnim>
        </OverPack>
        <OverPack playScale={0.1} className={styles.stepBox}>
          <TweenOne key="step1" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}}>
          <div className={styles.stepItem}>
            <div className={styles.stepTitle}>STEP 1<img src="step.png" className={styles.stepImg} /></div>
            <div className={styles.stepContent}>Information gathering We will collect all the related files for the project and give you the ETD as soon as we can</div>
          </div>
          </TweenOne>
          <TweenOne key="step1Img" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} className={styles.stepArrowWrapper}>
          <img src="stepArrow.png" alt="" className={styles.stepArrow} />
          </TweenOne>
          <TweenOne key="step2" animation={{ x: '-=50',opacity: 0,type: 'from', ease: "easeInCirc"}}>
          <div className={styles.stepItem}>
            <div className={styles.stepTitle}>STEP 2<img src="step.png" className={styles.stepImg} /></div>
            <div className={styles.stepContent}>Setup 3D scene and confirm the possible camera with you</div>
          </div>
          </TweenOne>
          <TweenOne key="step2Img" animation={{ x: '-=50',opacity: 0,type: 'from', ease: "easeInCirc"}} className={styles.stepArrowWrapper}>
          <img src="stepArrow.png" alt="" className={styles.stepArrow} />
          </TweenOne>
          <TweenOne key="step3" animation={{ x: '-=50',opacity: 0,type: 'from', ease: "easeInCirc"}}>
          <div className={styles.stepItem}>
            <div className={styles.stepTitle}>STEP 3<img src="step.png" className={styles.stepImg} /></div>
            <div className={styles.stepContent}>Setup lighting &amp; texture and show it to you for adjusting</div>
          </div>
          </TweenOne>
          <TweenOne key="step3Img" animation={{ x: '-=50',opacity: 0,type: 'from', ease: "easeInCirc"}} className={styles.stepArrowWrapper}>
          <img src="stepArrow.png" alt="" className={styles.stepArrow} />
          </TweenOne>
          <TweenOne key="step4" animation={{ x: '-=50',opacity: 0,type: 'from', ease: "easeInCirc"}}>
          <div className={styles.stepItem}>
            <div className={styles.stepTitle}>STEP 4<img src="step.png" className={styles.stepImg} /></div>
            <div className={styles.stepContent}>Work on the post productions to show you the photorealistic CGIs</div>
          </div>
          </TweenOne>
          <TweenOne key="step4Img" animation={{ x: '-=50',opacity: 0,type: 'from', ease: "easeInCirc"}} className={styles.stepArrowWrapper}>
          <img src="stepArrow.png" alt="" className={styles.stepArrow} />
          </TweenOne>
          <TweenOne key="step5" animation={{ x: '-=50',opacity: 0,type: 'from', ease: "easeInCirc"}}>
          <div className={styles.stepItem}>
            <div className={styles.stepTitle}>STEP 5<img src="step.png" className={styles.stepImg} /></div>
            <div className={styles.stepContent}>Take your comments and revise that till you satisfied.</div>
          </div>
          </TweenOne>
        </OverPack>
      </div>
    </div>
  );
}
export default connect(({home})=>({profiles:home.profiles,illustration:home.illustration,stillImages:home.stillImages,aniImages:home.aniImages}))(HomePage)
