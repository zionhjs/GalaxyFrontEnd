import React from 'react'
import {connect} from 'dva'
import AnimationSwiper from '@/components/AnimationSwiper'
import styles from './index.css'

const AnimationHidden=props=>{
  return (
    <div className={styles.container}>
      <AnimationSwiper />
    </div>
  )
}
export default connect()(AnimationHidden)
