import React, { useCallback, useEffect, useMemo } from 'react';
import {connect} from 'dva'
import styles from './index.css'
import classnames from 'classnames';
import _ from 'lodash';
import TweenOne from 'rc-tween-one';
import { OverPack } from 'rc-scroll-anim';
import * as moment from 'moment';
import { FullscreenOutlined } from '@ant-design/icons';

const AnimationHidden=props=>{
  const {dispatch,currentCate,videoList}=props
  useEffect(()=>{
    dispatch({type:'animationHidden/getAnimation'})},[])
  let list = useMemo(() => {
    return _.chunk(videoList, 3)
  }, [videoList])
  const handleClick=useCallback(item=>{
    dispatch({type:'animationHidden/setCate',payload:item})
    let el=document.getElementById(item)
    el.scrollIntoView({behavior:'smooth',block:'center'})
  },[])
  const play=useCallback((item)=>{
    dispatch({type:'animationHidden/setCurrent',payload:item})
    dispatch({type:'animationHidden/openVideo'})
  },[])
  return (
    <div className={styles.container}>
      <div className={styles.category}>
        <div onClick={handleClick.bind(null,'star')} className={classnames(styles['category-item'],{[styles['active-category']]:currentCate==='star'})}>Star</div>
        <div onClick={handleClick.bind(null,'galaxy')} className={classnames(styles['category-item'],styles['galaxy-item'],{[[styles['active-category']]]:currentCate==='galaxy'})}>Galaxy</div>
        <div onClick={handleClick.bind(null,'universe')} className={classnames(styles['category-item'],{[styles['active-category']]:currentCate==='universe'})}>Universe</div>
      </div>
      <div id={'star'} className={styles.titleBox}>Star - Good Quality</div>
      <div className={styles.starContainer}>
        {
          list.map((item,index)=>{
            const colStyle = index % 2 === 0 ? { order: 1 } : { order: 2 }
            const col1Style = index % 2 === 0 ? { order: 2 } : { order: 1 }
            return (
              <OverPack playScale={0.3} key={index} className={styles.row}>
                {item[0]&&(<TweenOne key="box1ani" animation={{ x: '-=50',opacity: 0,type: 'from', ease: 'easeOutQuad'}} resetStyle style={colStyle} className={styles.box1}>
                  <img src={item[0].imgUrl} className={styles.box1Img} />
                  <div className={styles.nameWrapper}><span className={styles.nameText}>{item[0].name}</span><span className={styles.dateText}>{moment(item[0].date).format('YYYY[.] MM[.] DD')}</span><FullscreenOutlined className={styles.fullScreen} /></div>
                  <div className={styles.desc}>{item[0].desc}</div>
                  <img onClick={play.bind(null,item[0])} src="playBtn.png" className={styles.playBtn1} />
                </TweenOne>)}
                <OverPack playScale={0.3} style={col1Style} className={styles.rightBox}>
                  {item[1]&&(<TweenOne key="box2ani" animation={{ y: '-=50',opacity: 0,type: 'from', ease: 'easeOutQuad'}} resetStyle className={styles.box2}>
                    <img src={item[1].imgUrl} className={styles.box2Img} />
                    <div className={styles.nameWrapper}><span className={styles.nameText}>{item[1].name}</span><span className={styles.dateText}>{moment(item[1].date).format('YYYY[.] MM[.] DD')}</span><FullscreenOutlined className={styles.fullScreen} /></div>
                    <div className={styles.desc}>{item[1].desc}</div>
                    <img onClick={play.bind(null,item[1])} src="playBtn.png" className={styles.playBtn2} />
                  </TweenOne>)}
                  {item[2]&&(<TweenOne key="box3ani" animation={{ y: '+=50',opacity: 0,type: 'from', ease: 'easeOutQuad'}} resetStyle className={styles.box3}>
                    <img src={item[2].imgUrl} className={styles.box3Img} />
                    <div className={styles.nameWrapper}><span className={styles.nameText}>{item[2].name}</span><span className={styles.dateText}>{moment(item[2].date).format('YYYY[.] MM[.] DD')}</span><FullscreenOutlined className={styles.fullScreen} /></div>
                    <div className={styles.desc}>{item[2].desc}</div>
                    <img onClick={play.bind(null,item[2])} src="playBtn.png" className={styles.playBtn3} />
                  </TweenOne>)}
                </OverPack>
              </OverPack>
            )
          })
        }
      </div>
      <div id={'galaxy'} className={styles.titleBox}>Galaxy - Excellent Quality</div>
      <div className={styles.galaxyContainer}>
        {
          list.map((item,index)=>{
            const colStyle = index % 2 === 0 ? { order: 1 } : { order: 2 }
            const col1Style = index % 2 === 0 ? { order: 2 } : { order: 1 }
            return (
              <OverPack playScale={0.3} key={index} className={styles.row}>
                {item[0]&&(<TweenOne key="box1ani" animation={{ x: '-=50',opacity: 0,type: 'from', ease: 'easeOutQuad'}} resetStyle style={colStyle} className={styles.box1}>
                  <img src={item[0].imgUrl} className={styles.box1Img} />
                  <div className={styles.nameWrapper}><span className={styles.nameText}>{item[0].name}</span><span className={styles.dateText}>{moment(item[0].date).format('YYYY[.] MM[.] DD')}</span><FullscreenOutlined className={styles.fullScreen} /></div>
                  <div className={styles.desc}>{item[0].desc}</div>
                  <img onClick={play.bind(null,item[0])} src="playBtn.png" className={styles.playBtn1} />
                </TweenOne>)}
                <OverPack playScale={0.3} style={col1Style} className={styles.rightBox}>
                  {item[1]&&(<TweenOne key="box2ani" animation={{ y: '-=50',opacity: 0,type: 'from', ease: 'easeOutQuad'}} resetStyle className={styles.box2}>
                    <img src={item[1].imgUrl} className={styles.box2Img} />
                    <div className={styles.nameWrapper}><span className={styles.nameText}>{item[1].name}</span><span className={styles.dateText}>{moment(item[1].date).format('YYYY[.] MM[.] DD')}</span><FullscreenOutlined className={styles.fullScreen} /></div>
                    <div className={styles.desc}>{item[1].desc}</div>
                    <img onClick={play.bind(null,item[1])} src="playBtn.png" className={styles.playBtn2} />
                  </TweenOne>)}
                  {item[2]&&(<TweenOne key="box3ani" animation={{ y: '+=50',opacity: 0,type: 'from', ease: 'easeOutQuad'}} resetStyle className={styles.box3}>
                    <img src={item[2].imgUrl} className={styles.box3Img} />
                    <div className={styles.nameWrapper}><span className={styles.nameText}>{item[2].name}</span><span className={styles.dateText}>{moment(item[2].date).format('YYYY[.] MM[.] DD')}</span><FullscreenOutlined className={styles.fullScreen} /></div>
                    <div className={styles.desc}>{item[2].desc}</div>
                    <img onClick={play.bind(null,item[2])} src="playBtn.png" className={styles.playBtn3} />
                  </TweenOne>)}
                </OverPack>
              </OverPack>
            )
          })
        }
      </div>
      <div id={'universe'} className={styles.titleBox}>Universe - Superior Quality</div>
      <div className={styles.universeContainer}>
        {
          list.map((item,index)=>{
            const colStyle = index % 2 === 0 ? { order: 1 } : { order: 2 }
            const col1Style = index % 2 === 0 ? { order: 2 } : { order: 1 }
            return (
              <OverPack playScale={0.3} key={index} className={styles.row}>
                {item[0]&&(<TweenOne key="box1ani" animation={{ x: '-=50',opacity: 0,type: 'from', ease: 'easeOutQuad'}} resetStyle style={colStyle} className={styles.box1}>
                  <img src={item[0].imgUrl} className={styles.box1Img} />
                  <div className={styles.nameWrapper}><span className={styles.nameText}>{item[0].name}</span><span className={styles.dateText}>{moment(item[0].date).format('YYYY[.] MM[.] DD')}</span><FullscreenOutlined className={styles.fullScreen} /></div>
                  <div className={styles.desc}>{item[0].desc}</div>
                  <img onClick={play.bind(null,item[0])} src="playBtn.png" className={styles.playBtn1} />
                </TweenOne>)}
                <OverPack playScale={0.3} style={col1Style} className={styles.rightBox}>
                  {item[1]&&(<TweenOne key="box2ani" animation={{ y: '-=50',opacity: 0,type: 'from', ease: 'easeOutQuad'}} resetStyle className={styles.box2}>
                    <img src={item[1].imgUrl} className={styles.box2Img} />
                    <div className={styles.nameWrapper}><span className={styles.nameText}>{item[1].name}</span><span className={styles.dateText}>{moment(item[1].date).format('YYYY[.] MM[.] DD')}</span><FullscreenOutlined className={styles.fullScreen} /></div>
                    <div className={styles.desc}>{item[1].desc}</div>
                    <img onClick={play.bind(null,item[1])} src="playBtn.png" className={styles.playBtn2} />
                  </TweenOne>)}
                  {item[2]&&(<TweenOne key="box3ani" animation={{ y: '+=50',opacity: 0,type: 'from', ease: 'easeOutQuad'}} resetStyle className={styles.box3}>
                    <img src={item[2].imgUrl} className={styles.box3Img} />
                    <div className={styles.nameWrapper}><span className={styles.nameText}>{item[2].name}</span><span className={styles.dateText}>{moment(item[2].date).format('YYYY[.] MM[.] DD')}</span><FullscreenOutlined className={styles.fullScreen} /></div>
                    <div className={styles.desc}>{item[2].desc}</div>
                    <img onClick={play.bind(null,item[2])} src="playBtn.png" className={styles.playBtn3} />
                  </TweenOne>)}
                </OverPack>
              </OverPack>
            )
          })
        }
      </div>
    </div>
  )
}
export default connect(({animationHidden:{currentCate,videoList}})=>({currentCate,videoList}))(AnimationHidden)
