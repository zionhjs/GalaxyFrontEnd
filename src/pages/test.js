import React, { useState, useEffect, useMemo } from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import styles from './test.css'


export default function (props) {
  const list=['111111','2222222','3333333']
    return (
   <div className={styles.container}>
     <div className={styles.space}></div>
     <OverPack playScale={0.3}>
       <QueueAnim type="bottom" className={styles.mylist} component="div" componentProps={list}>
         {
           list.map((item,index)=>(
             <div className={styles.listItem} key={index}>{item}</div>
           ))
         }
       </QueueAnim>
     </OverPack>

   </div>
  )
}