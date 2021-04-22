import React, { useCallback, useEffect } from 'react';
import classnames from 'classnames'
import {connect} from 'dva'
import NavBar from '@/components/ImageHiddenNavBar'
import styles from './index.css'
import { OverPack } from 'rc-scroll-anim/es';
import TweenOne from 'rc-tween-one';
import LazyLoad from 'react-lazyload';
import BigImage from '@/components/HiddenBigImage'
import router from 'umi/router'
import HiddenMobile from '../../mobile/Hidden'
const Hidden=props=>{
  const {currentCate,dispatch,starCol1,starCol2,starCol3,starCol4,galaxyCol1,galaxyCol2,galaxyCol3,galaxyCol4,universeCol1,universeCol2,universeCol3,universeCol4,
    starNavButtons,starCurrentNav,galaxyNavButtons,
    galaxyCurrentNav,universeNavButtons,universeCurrentNav}=props
  const isMobile=window.screen.width<768
  useEffect(()=>{
    dispatch({type:'imageHidden/getStarImage'})
    dispatch({type:'imageHidden/getGalaxyImage'})
    dispatch({type:'imageHidden/getUniverseImage'})
  },[])
  const handleClick=useCallback(item=>{
    dispatch({type:'imageHidden/setCate',payload:item})
    let el=document.getElementById(item)
    el.scrollIntoView({behavior:'smooth',block:'center'})
  },[])
  const openBigImg=useCallback((item,type)=>{
    dispatch({type:'imageHidden/setCurrent',payload:{type,item}})
    dispatch({type:'imageHidden/openBigImage'})
  },[])
  const starLoadMore=useCallback(()=>{
 dispatch({type:'imageHidden/getStarImage'})
  },[])
  const galaxyLoadMore=useCallback(()=>{
 dispatch({type:'imageHidden/getGalaxyImage'})
  },[])
  const universeLoadMore=useCallback(()=>{
 dispatch({type:'imageHidden/getUniverseImage'})
  },[])
  const starHandleClick=useCallback((item,index)=>{
    dispatch({type:'imageHidden/setStarCurrentNav',payload: index})
    if(index==4){
      router.push('/hidden/animation-quotation')
    }else{
      dispatch({type:'imageHidden/resetStar'})
      dispatch({type:'imageHidden/getStarImage'})
    }
  },[])
  const galaxyHandleClick=useCallback((item,index)=>{
    dispatch({type:'imageHidden/setGalaxyCurrentNav',payload:index})
    if(index==4){
      router.push('/hidden/animation-quotation')
    }else{
      dispatch({type:'imageHidden/resetGalaxy'})
      dispatch({type:'imageHidden/getGalaxyImage'})
    }
  },[])
  const universeHandleClick=useCallback((item,index)=>{
    dispatch({type:'imageHidden/setUniverseCurrentNav',payload:index})
    if(index==4){
      router.push('/hidden/animation-quotation')
    }else{
      dispatch({type:'imageHidden/resetUniverse'})
      dispatch({type:'imageHidden/getUniverseImage'})
    }
  },[])
  return isMobile ? <HiddenMobile /> : (
    <div className={styles.container}>
      <div className={styles.category}>
        <div onClick={handleClick.bind(null,'star')} className={classnames(styles['category-item'],{[styles['active-category']]:currentCate==='star'})}>Star</div>
        <div onClick={handleClick.bind(null,'galaxy')} className={classnames(styles['category-item'],styles['galaxy-item'],{[[styles['active-category']]]:currentCate==='galaxy'})}>Galaxy</div>
        <div onClick={handleClick.bind(null,'universe')} className={classnames(styles['category-item'],{[styles['active-category']]:currentCate==='universe'})}>Universe</div>
      </div>
      <div className={styles.space}></div>
      <div id={'star'} className={styles.titleBox}>Star - Good Quality</div>
      <NavBar navButtons={starNavButtons} currentNav={starCurrentNav} handleClick={starHandleClick}/>
      <div className={styles['star-container']}>
        <div className={styles['image-container']}>
        <div className={styles.col1}>
          {starCol1.map((item, index) =>
            (
              <OverPack playScale={0.2} key={index+item.imgUrl}>
                <TweenOne component="div" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'col1'} className={styles.imgWrapper}>
                  <LazyLoad height={200} offset={100}>
                    <img crossOrigin={'anonymous'} className={styles.listImg} onClick={openBigImg.bind(null, item,'star')} src={item.smallImage} />
                  </LazyLoad>
                  <div className={styles.imgFooter}>
                    <div>
                      <div><span className={styles.nameText}>{item.name}</span><span className={styles.dateText}>{item.date}</span></div>
                      <div className={styles.desc}>{item.desc}</div>
                    </div>
                  </div>
                </TweenOne>
              </OverPack>
            ))}
        </div>
        <div className={styles.col2}>
          {starCol2.map((item, index) =>
            (
              <OverPack playScale={0.2} key={index+item.imgUrl}>
                <TweenOne component="div" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'col1'} className={styles.imgWrapper}>
                  <LazyLoad height={200} offset={100}>
                    <img crossOrigin={'anonymous'} className={styles.listImg} onClick={openBigImg.bind(null, item,'star')} src={item.smallImage} />
                  </LazyLoad>
                  <div className={styles.imgFooter}>
                    <div>
                      <div><span className={styles.nameText}>{item.name}</span><span className={styles.dateText}>{item.date}</span></div>
                      <div className={styles.desc}>{item.desc}</div>
                    </div>
                  </div>
                </TweenOne>
              </OverPack>
            ))}
        </div>
        <div className={styles.col3}>
          {starCol3.map((item, index) =>
            (
              <OverPack playScale={0.2} key={index+item.imgUrl}>
                <TweenOne component="div" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'col1'} className={styles.imgWrapper}>
                  <LazyLoad height={200} offset={100}>
                    <img crossOrigin={'anonymous'} className={styles.listImg} onClick={openBigImg.bind(null, item,'star')} src={item.smallImage} />
                  </LazyLoad>
                  <div className={styles.imgFooter}>
                    <div>
                      <div><span className={styles.nameText}>{item.name}</span><span className={styles.dateText}>{item.date}</span></div>
                      <div className={styles.desc}>{item.desc}</div>
                    </div>
                  </div>
                </TweenOne>
              </OverPack>
            ))}
        </div>
        <div className={styles.col4}>
          {starCol4.map((item, index) =>
            (
              <OverPack playScale={0.2} key={index+item.imgUrl}>
                <TweenOne component="div" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'col1'} className={styles.imgWrapper}>
                  <LazyLoad height={200} offset={100}>
                    <img crossOrigin={'anonymous'} className={styles.listImg} onClick={openBigImg.bind(null, item,'star')} src={item.smallImage} />
                  </LazyLoad>
                  <div className={styles.imgFooter}>
                    <div>
                      <div><span className={styles.nameText}>{item.name}</span><span className={styles.dateText}>{item.date}</span></div>
                      <div className={styles.desc}>{item.desc}</div>
                    </div>
                  </div>
                </TweenOne>
              </OverPack>
            ))}
        </div>
        </div>
        <div onClick={starLoadMore} className={styles.loadMore}><img src="/loadMore.png" className={styles.loadMoreImg} /><img src='/loadMoreText.png' className={styles.loadMoreText} /></div>
      </div>
      <div id={'galaxy'} className={styles.titleBox}>Galaxy - Excellent Quality</div>
      <NavBar navButtons={galaxyNavButtons} currentNav={galaxyCurrentNav} handleClick={galaxyHandleClick}/>
      <div className={styles['galaxy-container']}>
        <div className={styles['image-container']}>
          <div className={styles.col1}>
            {galaxyCol1.map((item, index) =>
              (
                <OverPack playScale={0.2} key={index+item.imgUrl}>
                  <TweenOne component="div" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'col1'} className={styles.imgWrapper}>
                    <LazyLoad height={200} offset={100}>
                      <img crossOrigin={'anonymous'} className={styles.listImg} onClick={openBigImg.bind(null, item,'galaxy')} src={item.smallImage} />
                    </LazyLoad>
                    <div className={styles.imgFooter}>
                      <div>
                        <div><span className={styles.nameText}>{item.name}</span><span className={styles.dateText}>{item.date}</span></div>
                        <div className={styles.desc}>{item.desc}</div>
                      </div>
                    </div>
                  </TweenOne>
                </OverPack>
              ))}
          </div>
          <div className={styles.col2}>
            {galaxyCol2.map((item, index) =>
              (
                <OverPack playScale={0.2} key={index+item.imgUrl}>
                  <TweenOne component="div" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'col1'} className={styles.imgWrapper}>
                    <LazyLoad height={200} offset={100}>
                      <img crossOrigin={'anonymous'} className={styles.listImg} onClick={openBigImg.bind(null, item,'galaxy')} src={item.smallImage} />
                    </LazyLoad>
                    <div className={styles.imgFooter}>
                      <div>
                        <div><span className={styles.nameText}>{item.name}</span><span className={styles.dateText}>{item.date}</span></div>
                        <div className={styles.desc}>{item.desc}</div>
                      </div>
                    </div>
                  </TweenOne>
                </OverPack>
              ))}
          </div>
          <div className={styles.col3}>
            {galaxyCol3.map((item, index) =>
              (
                <OverPack playScale={0.2} key={index+item.imgUrl}>
                  <TweenOne component="div" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'col1'} className={styles.imgWrapper}>
                    <LazyLoad height={200} offset={100}>
                      <img crossOrigin={'anonymous'} className={styles.listImg} onClick={openBigImg.bind(null, item,'galaxy')} src={item.smallImage} />
                    </LazyLoad>
                    <div className={styles.imgFooter}>
                      <div>
                        <div><span className={styles.nameText}>{item.name}</span><span className={styles.dateText}>{item.date}</span></div>
                        <div className={styles.desc}>{item.desc}</div>
                      </div>
                    </div>
                  </TweenOne>
                </OverPack>
              ))}
          </div>
          <div className={styles.col4}>
            {galaxyCol4.map((item, index) =>
              (
                <OverPack playScale={0.2} key={index+item.imgUrl}>
                  <TweenOne component="div" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'col1'} className={styles.imgWrapper}>
                    <LazyLoad height={200} offset={100}>
                      <img crossOrigin={'anonymous'} className={styles.listImg} onClick={openBigImg.bind(null, item,'galaxy')} src={item.smallImage} />
                    </LazyLoad>
                    <div className={styles.imgFooter}>
                      <div>
                        <div><span className={styles.nameText}>{item.name}</span><span className={styles.dateText}>{item.date}</span></div>
                        <div className={styles.desc}>{item.desc}</div>
                      </div>
                    </div>
                  </TweenOne>
                </OverPack>
              ))}
          </div>
        </div>
        <div onClick={galaxyLoadMore} className={styles.loadMore}><img src="/loadMore.png" className={styles.loadMoreImg} /><img src="/loadMoreText.png" className={styles.loadMoreText} /></div>
      </div>
      <div id={'universe'} className={styles.titleBox}>Universe - Superior Quality</div>
      <NavBar navButtons={universeNavButtons} currentNav={universeCurrentNav} handleClick={universeHandleClick}/>
      <div className={styles['universe-container']}>
        <div className={styles['image-container']}>
          <div className={styles.col1}>
            {universeCol1.map((item, index) =>
              (
                <OverPack playScale={0.2} key={index+item.imgUrl}>
                  <TweenOne component="div" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'col1'} className={styles.imgWrapper}>
                    <LazyLoad height={200} offset={100}>
                      <img crossOrigin={'anonymous'} className={styles.listImg} onClick={openBigImg.bind(null, item,'universe')} src={item.smallImage} />
                    </LazyLoad>
                    <div className={styles.imgFooter}>
                      <div>
                        <div><span className={styles.nameText}>{item.name}</span><span className={styles.dateText}>{item.date}</span></div>
                        <div className={styles.desc}>{item.desc}</div>
                      </div>
                    </div>
                  </TweenOne>
                </OverPack>
              ))}
          </div>
          <div className={styles.col2}>
            {universeCol2.map((item, index) =>
              (
                <OverPack playScale={0.2} key={index+item.imgUrl}>
                  <TweenOne component="div" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'col1'} className={styles.imgWrapper}>
                    <LazyLoad height={200} offset={100}>
                      <img crossOrigin={'anonymous'} className={styles.listImg} onClick={openBigImg.bind(null, item,'universe')} src={item.smallImage} />
                    </LazyLoad>
                    <div className={styles.imgFooter}>
                      <div>
                        <div><span className={styles.nameText}>{item.name}</span><span className={styles.dateText}>{item.date}</span></div>
                        <div className={styles.desc}>{item.desc}</div>
                      </div>
                    </div>
                  </TweenOne>
                </OverPack>
              ))}
          </div>
          <div className={styles.col3}>
            {universeCol3.map((item, index) =>
              (
                <OverPack playScale={0.2} key={index+item.imgUrl}>
                  <TweenOne component="div" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'col1'} className={styles.imgWrapper}>
                    <LazyLoad height={200} offset={100}>
                      <img crossOrigin={'anonymous'} className={styles.listImg} onClick={openBigImg.bind(null, item,'universe')} src={item.smallImage} />
                    </LazyLoad>
                    <div className={styles.imgFooter}>
                      <div>
                        <div><span className={styles.nameText}>{item.name}</span><span className={styles.dateText}>{item.date}</span></div>
                        <div className={styles.desc}>{item.desc}</div>
                      </div>
                    </div>
                  </TweenOne>
                </OverPack>
              ))}
          </div>
          <div className={styles.col4}>
            {universeCol4.map((item, index) =>
              (
                <OverPack playScale={0.2} key={index+item.imgUrl}>
                  <TweenOne component="div" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'col1'} className={styles.imgWrapper}>
                    <LazyLoad height={200} offset={100}>
                      <img crossOrigin={'anonymous'} className={styles.listImg} onClick={openBigImg.bind(null, item,'universe')} src={item.smallImage} />
                    </LazyLoad>
                    <div className={styles.imgFooter}>
                      <div>
                        <div><span className={styles.nameText}>{item.name}</span><span className={styles.dateText}>{item.date}</span></div>
                        <div className={styles.desc}>{item.desc}</div>
                      </div>
                    </div>
                  </TweenOne>
                </OverPack>
              ))}
          </div>
        </div>
        <div onClick={universeLoadMore} className={styles.loadMore}><img src="/loadMore.png" className={styles.loadMoreImg} /><img src="/loadMoreText.png" className={styles.loadMoreText} /></div>
      </div>
      <BigImage/>
    </div>
  )
}
export default connect(({imageHidden:{currentCate,starCol1,starCol2,starCol3,starCol4,galaxyCol1,galaxyCol2,galaxyCol3,galaxyCol4,universeCol1,universeCol2,universeCol3,universeCol4,
  starCurrentNav,starNavButtons,galaxyCurrentNav,galaxyNavButtons,universeCurrentNav,universeNavButtons}})=>({currentCate,starCol1,starCol2,starCol3,starCol4,galaxyCol1,galaxyCol2,galaxyCol3,galaxyCol4,universeCol1,universeCol2,universeCol3,universeCol4,
  starCurrentNav,starNavButtons,galaxyCurrentNav,galaxyNavButtons,universeCurrentNav,universeNavButtons}))(Hidden)
