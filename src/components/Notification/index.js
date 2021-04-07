import React from 'react'
import {SmileFilled,FrownFilled} from '@ant-design/icons'
import Animate from 'rc-animate';
import classnames from 'classnames'
import {connect} from 'dva'
 const Notification=props=>{
  const {message,show,type,transitionName}=props;

  return (
    <Animate
      showProp="show"
      transitionName={transitionName}
    >
      {show ? <div className={classnames({'notification':type=='sucess'},{'notification-error':type=='error'},{'subscribe-success':type=='subscribe-success'},{'subscribe-error':type=='subscribe-error'})}>{(type=='success'||type=='subscribe-success')?<SmileFilled/>:<FrownFilled/>}<span className={'notify-msg'}>{message}</span></div>:null}
    </Animate>
  )
 }
 export default connect(({global})=>({show:global.show,message:global.message,type:global.type,transitionName:global.transitionName}))(Notification)
