import React from 'react'
import styles from './index.css'
import classnames from 'classnames';

const ImageHiddenNavBar=props=>{
  const {navButtons,currentNav,handleClick}=props;
  return (
    <div className={classnames(styles.container)}>
      {navButtons.map((item,index)=>(
        <div onClick={handleClick.bind(null,item,index)} key={index} className={classnames(styles.menuItem,{[styles.activeItem]:currentNav===index})}>
          {item}
          <div className={styles.underLine} style={currentNav===index ? {display:"block"}:{display:'none'}}></div>
        </div>
      ))}
    </div>
  )
}
export default ImageHiddenNavBar
