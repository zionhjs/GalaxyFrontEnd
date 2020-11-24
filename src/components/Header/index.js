import React,{useState} from 'react'
import {SearchOutlined,MenuOutlined} from '@ant-design/icons'
import router from 'umi/router';
import classnames from 'classnames'
import styles from './index.css'
export default function(props){
  const {menus,open=function(){},modalVisible,openSub=function(){}}=props
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
  function openMenu(){
    open()
  }
    const [idx, setIdx] = useState(0);//顶部导航菜单索引
    return (
        <div className={styles.header}>
        <img src="/purplelogo.png" alt="" className={styles.logo} />
        <div className={styles.menuBox}>
          {menus.map((item, index) => (
            <div onClick={() => handleClick(item, index)} key={index} className={classnames(styles.menuItem, { [styles['activeMenu']]: idx === index })}>
              <img src={item.icon} alt="" className={styles.icon} />
              <span style={{zIndex:100}}>{item.text}</span>
              {idx===index ? <img src="active.png" className={styles.activeBg} alt="" /> :null}
            </div>
          ))}
        </div>
        <div className={styles.searchBox}>
          <input className={styles.searchInput} />
          <SearchOutlined className={styles.searchIcon} />
        </div>
        <MenuOutlined onClick={openMenu} className={styles.toggleIcon} style={modalVisible ?{visibility:'hidden'}:{visibility:'visible'}} />
      </div>
    )
}