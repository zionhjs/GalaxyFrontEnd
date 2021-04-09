import React from 'react'
import {SmileFilled,FrownFilled} from '@ant-design/icons'
import Animate from 'rc-animate';
import classnames from 'classnames'
import styles from './index.css'
import {connect} from 'dva'
const Notification=props=>{
  const {message,show,type,transitionName}=props;

  return (
    <Animate
      showProp="show"
      transitionName={transitionName}
    >
      {show ? <div className={classnames({[styles['notification']]:type=='sucess'},{[styles['notification-error']]:type=='error'},{[styles['subscribe-success']]:type=='subscribe-success'},{[styles['subscribe-error']]:type=='subscribe-error'})}>{(type=='success'||type=='subscribe-success')?<SmileFilled/>:<FrownFilled/>}<span className={styles['notify-msg']}>{message}</span></div>:null}
    </Animate>
  )
}
export default connect(({global})=>({show:global.show,message:global.message,type:global.type,transitionName:global.transitionName}))(Notification)
