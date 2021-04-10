import React, { useState} from 'react';
import router from 'umi/router'


export default function (props) {
  const handleClick=function() {
    router.push('/hidden/animation-quotation')
  }
    return (<div style={{width:'100%',height:'100%',backgroundColor:'#fff'}}>
      <div onClick={handleClick}>click</div>
    </div>
   
  )
}
