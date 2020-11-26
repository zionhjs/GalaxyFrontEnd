import React,{useState} from 'react'
import classnames from 'classnames'
import styles from './index.css'
export default function(props){
  const [idx,setIdx]=useState(0)
    let {navButtons,onBtnClicked}=props;
    function handleClick(item,index){
      setIdx(index)
      onBtnClicked(item)
    }
    return (
        <div className={styles.container}>
          {navButtons.map((item,index)=>(
              <div onClick={()=>handleClick(item,index)} key={index} className={classnames(styles.menuItem,{[styles.activeItem]:idx===index})}>
                  {item}
                  <div className={styles.underLine} style={idx===index ? {display:"block"}:{display:'none'}}></div>
                </div>
          ))}
        </div>
    )
}