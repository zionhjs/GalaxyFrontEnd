
/*
 * @Author: xingzai
 * @Date: 2020-11-04 09:04:59
 * @LastEditors: xingzai
 * @LastEditTime: 2020-11-07 06:00:11
 * @FilePath: \test\src\pages\index.js
 */
import React, { useState, useRef, useEffect } from 'react';
import styles from './home.css';
import { Carousel } from 'antd';
import classnames from 'classnames'
import QueueAnim from 'rc-queue-anim';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import TweenOne from 'rc-tween-one';

const leftBanners = ['banner1.jpeg', 'banner2.jpeg', 'banner3.jpeg', 'banner4.jpeg']
const midBanners = ['banner2.jpeg', 'banner3.jpeg', 'banner4.jpeg', 'banner1.jpeg']
const rightBanners = ['banner3.jpeg', 'banner4.jpeg', 'banner1.jpeg', 'banner2.jpeg']
const profiles = [{ imgUrl: 'profile1.jpeg', title: 'Interior rendering', desc: 'Sed ut perspiciatis unde iste natus' },
{ imgUrl: 'profile2.jpeg', title: 'Exterior rendering', desc: 'Sed ut perspiciatis unde iste natus' },
{ imgUrl: 'profile3.jpeg', title: 'Architectural Animation', desc: 'Sed ut perspiciatis unde iste natus' }]
const illustration = {
  imgUrl: 'profile3.jpeg', title: 'CGI ILLUSTRATION WITHOUT LIMITS', list: [
    { title: '24-Hour Estimate', text: 'we serves immediately visualization quotations 24 hours a day,365 a year', icon: 'estime.png' },
    { title: '100% On Time Delivery', text: 'Our Delivery always on time,never mess up your presentation.We late,you don\'t pay.', icon: 'deliver.png' },
    { title: 'Match Expectations', text: 'Depends on the budget,we provide different quality of works.What we showed you we can do,we do it for you!', icon: 'expectation.png' }
  ]
}
const stillImages = ['wf1.png', 'wf2.png', 'wf3.png', 'wf4.png', 'wf5.png']
const aniImages = stillImages
export default function (props) {
  const [currentDot, setDot] = useState(0)//轮播图当前选中图片索引
  const leftCarousel = useRef()
  const rightCarousel = useRef()
  const midCarousel = useRef()
  function pre() {
    let arr = [leftCarousel, midCarousel, rightCarousel]
    const len = midBanners.length
    if (currentDot === 0) {
      setDot(len - 1)
    } else {
      setDot(currentDot - 1)
    }
    for (const value of arr) {
      value.current.prev()
    }
  }
  function next() {
    let arr = [leftCarousel, midCarousel, rightCarousel]
    const len = midBanners.length
    if (currentDot === len - 1) {
      setDot(0)
    } else {
      setDot(currentDot + 1)
    }
    for (const value of arr) {
      value.current.next()
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.bannerBox}>
        <div className={styles.leftBox}>
          <Carousel dots={false} ref={leftCarousel}>
            {leftBanners.map((item, index) => (
              <div key={index} className={styles.leftBanner}><img src={item} alt="" className={styles.leftImg} /></div>
            ))}
          </Carousel>
          <img className={styles.preBtn} src="pre.png" alt="" onClick={pre} />
        </div>
        <div className={styles.midBox}>
          <Carousel dots={false} ref={midCarousel}>
            {midBanners.map((item, index) => (
              <div key={index} className={styles.midBanner}><img src={item} alt="" className={styles.midImg} /></div>
            ))}
          </Carousel>
          <div className={styles.dotsBox}>
            {midBanners.map((dot, idx) => (<div key={idx} className={classnames(styles.dotBtn, { [styles.activeDot]: currentDot === idx })}></div>))}
          </div>
          <div className={styles.descBox}>
            <div className={styles.descTitle}>Interior Rending</div>
            <div className={styles.descText}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque</div>
            <div className={styles.descText}>laudantium ,totam rem aperiam,eaque ipsa quae ab illo inventore veritatis et quasi architecto</div>
            <div className={styles.descText}>beatae vitae dicta sunt explicabo.</div>
            <div className={styles.contactBtn}>
              <span className={styles.btnText}>Contact Us</span>
            </div>
          </div>
        </div>
        <div className={styles.rightBox}>
          <Carousel dots={false} ref={rightCarousel}>
            {rightBanners.map((item, index) => (
              <div key={index} className={styles.rightBanner}><img src={item} alt="" className={styles.rightImg} /></div>
            ))}
          </Carousel>
          <img className={styles.nextBtn} src="next.png" alt="" onClick={next} />
        </div>
      </div>
      <div className={styles.aboutBox}>
        <div className={styles.titleBox}><img src="logo.png" className={styles.aboutLogo} /><span className={styles.aboutTitle}>ABOUT US</span></div>
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
            <div className={styles.seeMoreBtn}>SEE MORE</div>
          </div>
        ))}
      </div>
      <div className={styles.illustrationBox}>
        <img src={illustration.imgUrl} className={styles.illustrationImg} alt="" />
        <div className={styles.illustrationTitleBox}>
          <img src="diamon.png" style={{ width: '45px', height: 'auto' }} />
          <div className={styles.illuTitle}>{illustration.title}</div>
        </div>
        <div className={styles.illuListMask}></div>
        <OverPack playScale={0.3}>
          <QueueAnim
            animConfig={[
              { opacity: [1, 0], translateY: [0, 50] },
              { opacity: [1, 0], translateY: [0, -50] }
            ]}
            delay={[0,1000,2000]}
            ease="easeInOutCubic"
            key="queue"
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
        <div className={styles.stillTitleBox}>
          <img src="still.png" style={{ width: '41px', height: 'auto' }} />
          <span className={styles.stillTitle}>Still Image WorkFlow</span>
        </div>
        <OverPack playScale={0.3}>
          <QueueAnim
            type="bottom"
            delay={[0,1000,2000]}
            ease="easeInOutCubic"
            key="queue"
            leaveReverse
            component="div"
            className={styles.wfOutterBox}>{stillImages.map((item, index) => (<div key={index} className={styles.wfInnerBox}><img src={item} className={styles.workflowImg} alt="" /></div>))}
          </QueueAnim>
        </OverPack>
        <div className={styles.stepBox}>
          <div className={styles.stepItem}>
            <div className={styles.stepTitle}>STEP 1<img src="step.png" className={styles.stepImg} /></div>
            <div className={styles.stepContent}>Information gathering We will collect all the related files for the project and give you the ETD as soon as we can</div>
          </div>
          <img src="stepArrow.png" alt="" className={styles.stepArrow} />
          <div className={styles.stepItem}>
            <div className={styles.stepTitle}>STEP 2<img src="step.png" className={styles.stepImg} /></div>
            <div className={styles.stepContent}>Setup 3D scene and confirm the possible camera with you</div>
          </div>
          <img src="stepArrow.png" alt="" className={styles.stepArrow} />
          <div className={styles.stepItem}>
            <div className={styles.stepTitle}>STEP 3<img src="step.png" className={styles.stepImg} /></div>
            <div className={styles.stepContent}>Setup lighting &amp; texture and show it to you for adjusting</div>
          </div>
          <img src="stepArrow.png" alt="" className={styles.stepArrow} />
          <div className={styles.stepItem}>
            <div className={styles.stepTitle}>STEP 4<img src="step.png" className={styles.stepImg} /></div>
            <div className={styles.stepContent}>Work on the post productions to show you the photorealistic CGIs</div>
          </div>
          <img src="stepArrow.png" alt="" className={styles.stepArrow} />
          <div className={styles.stepItem}>
            <div className={styles.stepTitle}>STEP 5<img src="step.png" className={styles.stepImg} /></div>
            <div className={styles.stepContent}>Take your comments and revise that till you satisfied.</div>
          </div>
        </div>
      </div>

      <div className={styles.animationWrapper}>
        <div className={styles.animationTitleBox}>
          <img src="still.png" style={{ width: '41px', height: 'auto' }} />
          <span className={styles.animationTitle}>Animation WorkFlow</span>
        </div>

        <OverPack playScale={0.3}>
          <QueueAnim
            type="bottom"
            key="queue"
            leaveReverse
            component="div"
            className={styles.wfOutterBox}>{aniImages.map((item, index) => (<div key={index} className={styles.wfInnerBox}><img src={item} className={styles.workflowImg} alt="" /></div>))}
          </QueueAnim>
        </OverPack>
        <div className={styles.stepBox}>
          <div className={styles.stepItem}>
            <div className={styles.stepTitle}>STEP 1<img src="step.png" className={styles.stepImg} /></div>
            <div className={styles.stepContent}>Information gathering We will collect all the related files for the project and give you the ETD as soon as we can</div>
          </div>
          <img src="stepArrow.png" alt="" className={styles.stepArrow} />
          <div className={styles.stepItem}>
            <div className={styles.stepTitle}>STEP 2<img src="step.png" className={styles.stepImg} /></div>
            <div className={styles.stepContent}>Setup 3D scene and confirm the possible camera with you</div>
          </div>
          <img src="stepArrow.png" alt="" className={styles.stepArrow} />
          <div className={styles.stepItem}>
            <div className={styles.stepTitle}>STEP 3<img src="step.png" className={styles.stepImg} /></div>
            <div className={styles.stepContent}>Setup lighting &amp; texture and show it to you for adjusting</div>
          </div>
          <img src="stepArrow.png" alt="" className={styles.stepArrow} />
          <div className={styles.stepItem}>
            <div className={styles.stepTitle}>STEP 4<img src="step.png" className={styles.stepImg} /></div>
            <div className={styles.stepContent}>Work on the post productions to show you the photorealistic CGIs</div>
          </div>
          <img src="stepArrow.png" alt="" className={styles.stepArrow} />
          <div className={styles.stepItem}>
            <div className={styles.stepTitle}>STEP 5<img src="step.png" className={styles.stepImg} /></div>
            <div className={styles.stepContent}>Take your comments and revise that till you satisfied.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
