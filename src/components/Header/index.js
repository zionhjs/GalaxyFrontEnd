/*
 * @Author: xingzai
 * @Date: 2020-11-25 05:29:09
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-10 00:27:56
 * @FilePath: \GalaxyFrontEnd\src\components\Header\index.js
 */
import React,{useState,useCallback} from 'react'
import {connect} from 'dva'
import {SearchOutlined,MenuOutlined} from '@ant-design/icons'
import router from 'umi/router';
import {Link} from 'umi'
import classnames from 'classnames'
import styles from './index.css'
const Header=(props)=>{
  const {menus,openSub=function(){}}=props
  const [active,setActive]=useState(false)
  function handleClick(item, index) {
    //props.history.push('/test')
    setIdx(index)
    openSub()
    if(item.text==='Home'){
      router.push('home')
    }else if(item.text==='Images'){
      router.push('image')
    }else if(item.text==='Animations'){
      router.push('animation')
    }else if(item.text==='Blogs'){
      router.push('/blogs')
    }else if(item.text==='Team'){
      router.push('team')
    }
  }
  const focusHandler=useCallback(()=>{
   setActive(true)
  },[])
  const blurHandler=useCallback(()=>{
    setActive(false)
  },[])
  
    const [idx, setIdx] = useState(0);//顶部导航菜单索引
    return (
        <div className={styles.header}>
        <Link to="/"><img src="/purplelogo.png" alt="" className={styles.logo} /></Link>
        <div className={styles.menuBox}>
          {menus.map((item, index) => (
            <div onClick={() => handleClick(item, index)} key={index} className={classnames(styles.menuItem, { [styles['activeMenu']]: idx === index })}>
              <img src={item.icon} alt="" className={styles.icon} />
              <span style={{zIndex:100}}>{item.text}</span>
              {idx===index ? <img src="active.png" className={styles.activeBg} alt="" /> :null}
            </div>
          ))}
        </div>
        <div onBlur={blurHandler} onFocus={focusHandler}  className={classnames(styles.searchBox,{[styles.searchInactive]:!active,[styles.searchActive]:active})}>
          <input className={styles.searchInput} />
          <SearchOutlined className={styles.searchIcon} />
        </div>
        {/* <MenuOutlined onClick={openMenu} className={styles.toggleIcon} style={modalVisible ?{visibility:'hidden'}:{visibility:'visible'}} /> */}
      </div>
    )
}
export default connect(({global})=>({menus:global.menus}))(Header)