/*
 * @Author: xingzai
 * @Date: 2020-12-16 03:14:52
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-16 03:14:52
 * @FilePath: \GalaxyFrontEnd\src\mobile\components\Chat\index.js
 */
import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'dva'
import classnames from 'classnames'
import styles from './index.css'
import { Picker } from 'emoji-mart';
import { Upload } from 'antd';
import TweenOne from 'rc-tween-one';
import _ from 'lodash';

const Chat = props => {
    const { messages,dispatch,visible } = props;
    const [msg,setMsg]=useState('')
  const [emoji,setEmoji]=useState('')
  const [emojiVisible,setEmojiVisible]=useState(false)
  const [token,setToken]=useState('')
  useEffect(()=>{
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
    return visible ? (
        <div className={styles.container}>
            <img onClick={handleClose} src="close.png" alt="" className={styles.closeIcon} />
            <div className={styles.header}>
                <img src="chat.png" className={styles.chatIcon} alt="" />
                <span className={styles.chatTitle}>conversation</span>
            </div>
            <div id="msg" className={styles.messageBox}>
               {/* {
                    messages.map((item, index) => (
                        <div className={classnames(styles.msgItem)} key={index}>
                            <div className={classnames(styles.leftBox, { [styles.normal]: item.owner === 'me', [styles.reverse]: item.owner === 'other' })}>
                                <img src={item.avatar} alt="" className={styles.avatar} />
                            </div>
                            <div className={classnames(styles.rightBox,{[styles.normalMsg]:item.owner==='me',[styles.reverseMsg]:item.owner==='other'})}>
                                <div className={classnames({[styles.nameText]:item.owner==='me',[styles.reverseText]:item.owner==='other'})}>{item.sender}</div>
                                <div className={classnames({ [styles.msgContent]: item.owner === 'me', [styles.msgReverse]: item.owner === 'other' })}>{item.msg}</div>
                            </div>
                        </div>
                    ))
                }*/}
              {
                messages.map((item,index)=>
                  index%2==0 ? (<div key={index} className={styles.userBox}>
                      <p className={styles.userMsg}>{item}</p>
                    </div>)
                    : (<div key={index} className={styles.assistantBox}>
                      <img src={'contact.png'} alt={''} className={styles.avatar} />
                      <div>
                        <p className={styles.assistantName}>galaxy assistant</p>
                        <p className={styles.assistantMsg}>{item}</p>
                      </div>
                    </div>)
                )
              }
                <div id="bottom" style={{height:'150px'}}></div>
            </div>
          <div className={styles.emojiBox}>
            {emojiVisible&&<Picker style={{ position: 'absolute', left:'0px',bottom:'0px' }}  set="apple" emoji="" showPreview={false} onClick={searchEmoji} />}
            <img onClick={openEmoji} src="xiaolian.png" className={styles.xiaolianIcon} alt="" />
            <Upload showUploadList={false} headers={{accessToken:token}} action="http://localhost:9400/gateway/upload/images/uploadImages" name="multipartFile"><img src="folder.png" className={styles.folderIcon} alt="" /></Upload>
          </div>
            <textarea onKeyDown={onEnter}  value={msg} onChange={handleChange} className={styles.chatTextarea} placeholder="Please enter" />
            <div onClick={sendMsg} className={styles.chatBtnWrapper}><div className={styles.sendBtn}>Send out</div></div>
        </div>
    ) : null
}
export default connect(({ chat: { messages,visible } }) => ({ messages,visible }))(Chat)
