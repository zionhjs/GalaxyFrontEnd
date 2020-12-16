/*
 * @Author: xingzai
 * @Date: 2020-12-16 03:14:52
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-16 03:14:52
 * @FilePath: \GalaxyFrontEnd\src\mobile\components\Chat\index.js
 */
import React,{useState,useCallback} from 'react'
import { connect } from 'dva'
import classnames from 'classnames'
import styles from './index.css'

const Chat = props => {
    const { messages,dispatch,visible } = props;
    const [msg,setMsg]=useState('')
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
    const handleClose=useCallback(()=>{
        dispatch({type:'chat/closeChat'})
    },[])
    return visible ? (
        <div className={styles.container}>
            <img onClick={handleClose} src="close.png" alt="" className={styles.closeIcon} />
            <div className={styles.header}>
                <img src="chat.png" className={styles.chatIcon} alt="" />
                <span className={styles.chatTitle}>conversation</span>
            </div>
            <div id="msg" className={styles.messageBox}>
                {
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
                }
                <div id="bottom" style={{height:'150px'}}></div>
            </div>
            <div className={styles.emojiBox}>
                <img src="xiaolian.png" className={styles.xiaolianIcon} alt="" />
                <img src="folder.png" className={styles.folderIcon} alt="" />
            </div>
            <textarea value={msg} onChange={handleChange} className={styles.chatTextarea} placeholder="Please enter" />
            <div onClick={sendMsg} className={styles.chatBtnWrapper}><div className={styles.sendBtn}>Send out</div></div>
        </div>
    ) : null
}
export default connect(({ chat: { messages,visible } }) => ({ messages,visible }))(Chat)