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
import QueueAnim from 'rc-queue-anim';
import Animate from 'rc-animate';
import _ from 'lodash'
import {ReactComponent as PlaneIcon} from '@/assets/icons/plane.svg'
import styles from './index.css'
import 'emoji-mart/css/emoji-mart.css'
import sendAudio from '@/assets/audio/send.wav'
import receiveAudio from '@/assets/audio/receive.wav'
const Chat = props => {
    const { messages,dispatch,visible,loading,timer,chatToken} = props;
    console.log('messages===',messages)
    const [msg,setMsg]=useState('')
    const [emoji,setEmoji]=useState('')
    const [emojiVisible,setEmojiVisible]=useState(false)
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
      if(chatToken!==null){
        dispatch({type:'chat/connect'})
      }
      if(timer==null&&chatToken!==null){
        let t= setInterval(()=>{
          dispatch({type:'chat/beat'})
        },3000)
        dispatch({type:'chat/setTimer',payload:t})
      }
      return function cleanup(){
        if(timer!==null){
          clearInterval(timer)
          dispatch({type:'chat/setTimer',payload:null})
        }
        if(chatToken!==null){
          dispatch({type:'chat/disconnect'})
        }
      }
    },[timer,chatToken])
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
    },[dispatch, msg, scrollIntoview])
    const onEnter=useCallback((e)=>{
        let ev = document.all ? window.event : e;
        if(ev.keyCode==13) {
         dispatch({type:'chat/sendMsg',payload:{msg},cb:scrollIntoview})
        }
    },[dispatch, msg, scrollIntoview])
    const handleClose=useCallback(()=>{
        dispatch({type:'chat/closeChat'})
    },[dispatch])
    const searchEmoji=useCallback((emoji,e)=>{
        setEmoji(emoji)
        setEmojiVisible(false)
        let ret=!_.isEmpty(msg) ? msg+emoji.native : emoji.native
        setMsg(ret)
    },[msg])
    const openEmoji=useCallback(()=>{
        setEmojiVisible(true)
    },[])
    return (<div className={styles.container} key={'chatani'}>
            <audio id={'sendWav'} src={sendAudio} hidden={true}></audio>
            <audio id={'receiveWav'} src={receiveAudio} hidden={true}></audio>
            <div className={styles.header}>
              <img src="chat.png" className={styles.chatIcon} alt=""/>
              <img onClick={handleClose} src="close.png" alt="" className={styles.closeIcon}/>
            </div>
            <div className={styles.chatTitle}>WELCOME TO GalaxyChat.</div>
            <div id="msg" className={styles.messageBox}>
              {
                messages?.map((item, index) =>
                  item.from =='user' ? (<div key={index} className={styles.userBox}>
                      <Animate transitionAppear transitionName={'slide'} ><div key={'userAni'+index} className={styles.userMsg}>{item.msg[0]}</div></Animate>
                    </div>)
                    : (
                      <Animate transitionAppear key={index} transitionName={'slideRight'}>
                      <div key={index+'Slide'} className={styles.assistantBox}>
                      <img src={'contact.png'} alt={''} className={styles.avatar}/>
                      <div>
                        <p className={styles.assistantName}>galaxy assistant</p>
                        <div className={styles.assistantMsg}>
                          {item.msg?.map(
                          (v,i)=>{
                            let regLink=/(www\..*?)(?=\s|$)/g;
                            let links=v.match(regLink)
                            let m=v.replace(regLink,'')
                            return links==null ? <p key={i}>{v}</p> :<div key={i}>{m}{links.map((link,linkIdx)=>(<div key={linkIdx}><a href={'https://'+link}>{link}</a></div>))}</div>
                          }
                        )}
                        </div>
                      </div>
                    </div>
                      </Animate>
                        )
                )
              }
              <Animate transitionAppear transitionLeave={false} key={'loadingAni'} transitionName={'slideRight'}>{loading?<div className={styles.loadingContainer}><img src={'contact.png'} alt={''} className={styles.avatar}/>
              <div className={styles.ballContainer}>
              <div className={classnames(styles.ball,styles.yellow)}></div>
                <div className={classnames(styles.ball,styles.red)}></div>
                <div className={classnames(styles.ball,styles.blue)}></div>
                <div className={classnames(styles.ball,styles.vollet)}></div>
              </div>
              </div>:null}
              </Animate>
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
              <button id={'sendBtn'} onClick={sendMsg} className={styles.sendBtn}><img className={styles.sendImg} src={'plane.png'} /> </button>
            </div>
            </div>
          </div>)
}
export default connect(({ chat: { messages,visible,loading,timer},global:{chatToken} }) => ({ messages,visible,loading,timer,chatToken}))(Chat)
