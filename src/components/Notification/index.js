import React from 'react'
import Animate from 'rc-animate';
import classnames from 'classnames'
import {connect} from 'dva'
 const Notification=props=>{
  const {message,show,type}=props;
  return (
    <Animate
      showProp="show"
      transitionName="notification"
    >
      {show ? <div className={classnames({'notification':type=='sucess'},{'notification-error':type=='error'})}>{message}</div>:null}
    </Animate>
  )
 }
 export default connect(({global})=>({show:global.show,message:global.message,type:global.type}))(Notification)
