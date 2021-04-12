import React, { useCallback, useEffect } from 'react';
import classnames from 'classnames'
import {connect} from 'dva'
import NavBar from '@/components/ImageHiddenNavBar'
import styles from './index.css'
import { OverPack } from 'rc-scroll-anim/es';
import TweenOne from 'rc-tween-one';
import LazyLoad from 'react-lazyload';
import router from 'umi/router'
import HiddenMobile from '../../mobile/Hidden'
const Hidden=props=>{
  const {currentCate,dispatch,col1,col2,col3,col4,
    starNavButtons,starCurrentNav,galaxyNavButtons,
    galaxyCurrentNav,universeNavButtons,universeCurrentNav}=props
  const isMobile=window.screen.width<768
  useEffect(()=>{
    dispatch({type:'imageHidden/getImage'})
  },[])
  const handleClick=useCallback(item=>{
    dispatch({type:'imageHidden/setCate',payload:item})
    let el=document.getElementById(item)
    el.scrollIntoView({behavior:'smooth',block:'center'})
  },[])
  //todo openBigImg
  const openBigImg=useCallback((item)=>{
  },[])
  //todo star loadmore
  const starLoadMore=useCallback(()=>{

  },[])
  //todo galaxy loadmore
  const galaxyLoadMore=useCallback(()=>{

  },[])
  //todo universe loadmore
  const universeLoadMore=useCallback(()=>{

  },[])
  //todo
  const starHandleClick=useCallback((item,index)=>{
    dispatch({type:'imageHidden/setStarCurrentNav',payload: index})
    if(index==4){
      router.push('/hidden/animation-quotation')
    }
  },[])
  //todo
  const galaxyHandleClick=useCallback((item,index)=>{
    dispatch({type:'imageHidden/setGalaxyCurrentNav',payload:index})
    if(index==4){
      router.push('/hidden/animation-quotation')
    }
  },[])
  const universeHandleClick=useCallback((item,index)=>{
    dispatch({type:'imageHidden/setUniverseCurrentNav',payload:index})
    if(index==4){
      router.push('/hidden/animation-quotation')
    }
  },[])
  return isMobile ? <HiddenMobile /> : (
    <div className={styles.container}>
      <div className={styles.category}>
        <div onClick={handleClick.bind(null,'star')} className={classnames(styles['category-item'],{[styles['active-category']]:currentCate==='star'})}>Star</div>
        <div onClick={handleClick.bind(null,'galaxy')} className={classnames(styles['category-item'],styles['galaxy-item'],{[[styles['active-category']]]:currentCate==='galaxy'})}>Galaxy</div>
        <div onClick={handleClick.bind(null,'universe')} className={classnames(styles['category-item'],{[styles['active-category']]:currentCate==='universe'})}>Universe</div>
      </div>
      <div id={'star'} className={styles.titleBox}>Star - Good Quality</div>
      <NavBar navButtons={starNavButtons} currentNav={starCurrentNav} handleClick={starHandleClick}/>
      <div className={styles['star-container']}>
        <div className={styles['image-container']}>
        <div className={styles.col1}>
          {col1.map((item, index) =>
            (
              <OverPack playScale={0.2} key={index+item.imgUrl}>
                <TweenOne component="div" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'col1'} className={styles.imgWrapper}>
                  <LazyLoad height={200} offset={100}>
                    <img crossOrigin={'anonymous'} className={styles.listImg} onClick={openBigImg.bind(null, item)} src={item.imgUrl} />
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
          {col2.map((item, index) =>
            (
              <OverPack playScale={0.2} key={index+item.imgUrl}>
                <TweenOne component="div" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'col1'} className={styles.imgWrapper}>
                  <LazyLoad height={200} offset={100}>
                    <img crossOrigin={'anonymous'} className={styles.listImg} onClick={openBigImg.bind(null, item)} src={item.imgUrl} />
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
          {col3.map((item, index) =>
            (
              <OverPack playScale={0.2} key={index+item.imgUrl}>
                <TweenOne component="div" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'col1'} className={styles.imgWrapper}>
                  <LazyLoad height={200} offset={100}>
                    <img crossOrigin={'anonymous'} className={styles.listImg} onClick={openBigImg.bind(null, item)} src={item.imgUrl} />
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
          {col4.map((item, index) =>
            (
              <OverPack playScale={0.2} key={index+item.imgUrl}>
                <TweenOne component="div" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'col1'} className={styles.imgWrapper}>
                  <LazyLoad height={200} offset={100}>
                    <img crossOrigin={'anonymous'} className={styles.listImg} onClick={openBigImg.bind(null, item)} src={item.imgUrl} />
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
            {col1.map((item, index) =>
              (
                <OverPack playScale={0.2} key={index+item.imgUrl}>
                  <TweenOne component="div" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'col1'} className={styles.imgWrapper}>
                    <LazyLoad height={200} offset={100}>
                      <img crossOrigin={'anonymous'} className={styles.listImg} onClick={openBigImg.bind(null, item)} src={item.imgUrl} />
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
            {col2.map((item, index) =>
              (
                <OverPack playScale={0.2} key={index+item.imgUrl}>
                  <TweenOne component="div" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'col1'} className={styles.imgWrapper}>
                    <LazyLoad height={200} offset={100}>
                      <img crossOrigin={'anonymous'} className={styles.listImg} onClick={openBigImg.bind(null, item)} src={item.imgUrl} />
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
            {col3.map((item, index) =>
              (
                <OverPack playScale={0.2} key={index+item.imgUrl}>
                  <TweenOne component="div" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'col1'} className={styles.imgWrapper}>
                    <LazyLoad height={200} offset={100}>
                      <img crossOrigin={'anonymous'} className={styles.listImg} onClick={openBigImg.bind(null, item)} src={item.imgUrl} />
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
            {col4.map((item, index) =>
              (
                <OverPack playScale={0.2} key={index+item.imgUrl}>
                  <TweenOne component="div" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'col1'} className={styles.imgWrapper}>
                    <LazyLoad height={200} offset={100}>
                      <img crossOrigin={'anonymous'} className={styles.listImg} onClick={openBigImg.bind(null, item)} src={item.imgUrl} />
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
            {col1.map((item, index) =>
              (
                <OverPack playScale={0.2} key={index+item.imgUrl}>
                  <TweenOne component="div" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'col1'} className={styles.imgWrapper}>
                    <LazyLoad height={200} offset={100}>
                      <img crossOrigin={'anonymous'} className={styles.listImg} onClick={openBigImg.bind(null, item)} src={item.imgUrl} />
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
            {col2.map((item, index) =>
              (
                <OverPack playScale={0.2} key={index+item.imgUrl}>
                  <TweenOne component="div" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'col1'} className={styles.imgWrapper}>
                    <LazyLoad height={200} offset={100}>
                      <img crossOrigin={'anonymous'} className={styles.listImg} onClick={openBigImg.bind(null, item)} src={item.imgUrl} />
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
            {col3.map((item, index) =>
              (
                <OverPack playScale={0.2} key={index+item.imgUrl}>
                  <TweenOne component="div" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'col1'} className={styles.imgWrapper}>
                    <LazyLoad height={200} offset={100}>
                      <img crossOrigin={'anonymous'} className={styles.listImg} onClick={openBigImg.bind(null, item)} src={item.imgUrl} />
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
            {col4.map((item, index) =>
              (
                <OverPack playScale={0.2} key={index+item.imgUrl}>
                  <TweenOne component="div" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'col1'} className={styles.imgWrapper}>
                    <LazyLoad height={200} offset={100}>
                      <img crossOrigin={'anonymous'} className={styles.listImg} onClick={openBigImg.bind(null, item)} src={item.imgUrl} />
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
    </div>
  )
}
export default connect(({imageHidden:{currentCate,col1,col2,col3,col4,starCurrentNav,starNavButtons,galaxyCurrentNav,galaxyNavButtons,universeCurrentNav,universeNavButtons}})=>({currentCate,col1,col2,col3,col4,starCurrentNav,starNavButtons,galaxyCurrentNav,galaxyNavButtons,universeCurrentNav,universeNavButtons}))(Hidden)
