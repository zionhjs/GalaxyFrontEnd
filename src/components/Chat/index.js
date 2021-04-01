/*
 * @Author: xingzai
 * @Date: 2020-12-16 03:14:52
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-16 03:14:52
 * @FilePath: \GalaxyFrontEnd\src\mobile\components\Chat\index.js
 */
import React,{useState,useCallback,useEffect,useRef} from 'react'
import { connect } from 'dva'
import {Picker} from 'emoji-mart'
import classnames from 'classnames'
import {Upload} from 'antd'
import QueueAnim from 'rc-queue-anim';
import Animate from 'rc-animate';
import _ from 'lodash'
import {ReactComponent as PlaneIcon} from '@/assets/icons/plane.svg'
import styles from './index.css'
import 'emoji-mart/css/emoji-mart.css'

const Chat = props => {
    const { messages,dispatch,visible} = props;
    const [msg,setMsg]=useState('')
    const [emoji,setEmoji]=useState('')
    const [emojiVisible,setEmojiVisible]=useState(false)
    const [token,setToken]=useState('')
  function handleClick(e) {
    const { layerX, layerY } = e;
    const { width, height } = this.getBoundingClientRect();

    this.style.setProperty('--top', `${(layerY / height) * 100}%`);
    this.style.setProperty('--left', `${(layerX / width) * 100}%`);

    // for the size consider the distance from the farthest angle
    const dx = layerX > width / 2 ? layerX : width - layerX;
    const dy = layerY > height / 2 ? layerY : height - layerY;
    const size = Math.sqrt(dx ** 2 + dy ** 2) * 2;
    this.style.setProperty('--size', `${size}px`);
  }
    useEffect(()=>{
      let btn=document.getElementById('sendBtn')
      btn&&btn.addEventListener('mousedown',handleClick)
        let ret=localStorage.getItem('artjwt')
        setToken(ret)
    },[])
    const handleChange=useCallback((e)=>{
      setMsg(e.target.value)
    },[])
    const scrollIntoview=useCallback(()=>{
        let el=document.getElementById('bottom')
        el.scrollIntoView(false)
        setMsg('')
    },[])
    const sendMsg=useCallback(()=>{
        dispatch({type:'chat/sendMsg',payload:{msg},cb:scrollIntoview})
    },[msg])
    const onEnter=useCallback((e)=>{
        let ev = document.all ? window.event : e;
        if(ev.keyCode==13) {
         dispatch({type:'chat/sendMsg',payload:{msg},cb:scrollIntoview})
        }
    },[msg])
    const handleClose=useCallback(()=>{
        dispatch({type:'chat/closeChat'})
    },[])
    const searchEmoji=useCallback((emoji,e)=>{
        setEmoji(emoji)
        setEmojiVisible(false)
        let ret=!_.isEmpty(msg) ? msg+emoji.native : emoji.native
        setMsg(ret)
    },[msg])
    const openEmoji=useCallback(()=>{
        setEmojiVisible(true)
    },[])
    return (
        <QueueAnim type={'right'} animConfig={[
          { opacity: [1, 0], translateX: [0, 500] },
          { opacity: [1, 0], translateX: [0, 500] }
        ]} duration={500} >{
          visible ? (<div className={styles.container} key={'chatani'}>
            <div className={styles.header}>
              <img src="chat.png" className={styles.chatIcon} alt=""/>
              <img onClick={handleClose} src="close.png" alt="" className={styles.closeIcon}/>
            </div>
            <div className={styles.chatTitle}>WELCOME TO GalaxyChat.</div>
            <div id="msg" className={styles.messageBox}>
              {
                messages?.map((item, index) =>
                  item.from =='user' ? (<div key={index} className={styles.userBox}>
                      <Animate transitionAppear transitionName={'slide'} ><p key={'userAni'+index} className={styles.userMsg}>{item.msg}</p></Animate>
                    </div>)
                    : (
                      <Animate transitionAppear key={index} transitionName={'slideRight'}>
                      <div key={index+'Slide'} className={styles.assistantBox}>
                      <img src={'contact.png'} alt={''} className={styles.avatar}/>
                      <div>
                        <p className={styles.assistantName}>galaxy assistant</p>
                        <p className={styles.assistantMsg}>{item.msg}</p>
                      </div>
                    </div>
                      </Animate>
                        )
                )
              }

              <div id="bottom" style={{ height: '150px' }}></div>
            </div>
           {/* <div className={styles.emojiBox}>
              {emojiVisible && <Picker style={{ position: 'absolute', left: '0px', bottom: '0px' }} set="apple" emoji=""
                                       showPreview={false} onClick={searchEmoji}/>}
              <img onClick={openEmoji} src="xiaolian.png" className={styles.xiaolianIcon} alt=""/>
              <Upload showUploadList={false} headers={{ accessToken: token }}
                      action="http://localhost:9400/gateway/upload/images/uploadImages" name="multipartFile"><img
                src="folder.png" className={styles.folderIcon} alt=""/></Upload>
            </div>*/}
            <div className={styles.sendBox}>
            <div className={styles.inputContainer}>
              <div className={classnames(styles.hidden)}>{msg}</div>
              <textarea
                type="text"
                onKeyDown={onEnter}
                value={msg}
                onChange={handleChange}
                className={styles.chatTextarea}
                placeholder="Please enter"/>
            </div>
            <div className={styles.chatBtnWrapper}>
              <div className={styles.emojiBox}>
                {emojiVisible && <Picker style={{ position: 'absolute', right: '0px', bottom: '0px' }} set="apple" emoji=""
                                         showPreview={false} onClick={searchEmoji}/>}
                <img onClick={openEmoji} src="xiaolian.png" className={styles.xiaolianIcon} alt=""/>
              </div>
              <button id={'sendBtn'} onClick={sendMsg} className={styles.sendBtn}><PlaneIcon /> </button>
            </div>
            </div>
          </div>) : null
        }
        </QueueAnim>
    )
}
export default connect(({ chat: { messages,visible} }) => ({ messages,visible}))(Chat)
