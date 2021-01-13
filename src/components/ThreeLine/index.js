/*
 * @Author: xingzai
 * @Date: 2020-12-05 04:29:24
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-05 04:33:34
 * @FilePath: \GalaxyFrontEnd\src\components\ThreeLine\index.js
 */
/*
 * @Author: xingzai
 * @Date: 2020-12-05 04:29:24
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-05 04:29:24
 * @FilePath: \GalaxyFrontEnd\src\components\ThreeLine\index.js
 */
import React,{useCallback} from 'react'
import classnames from 'classnames'
import {connect} from 'dva'
const ThreeLine=(props)=>{
    const {dispatch,visible}=props
    const handleClick=useCallback(()=>{
        dispatch({type:'global/toggleMenu'})
        dispatch({type:'global/closeAll'})
    },[])
    return (
        <div onClick={handleClick} className="nav-icon" id="nav-icon">
          <div className={classnames('nav-line',{"nav-line-actived-1":visible})}  id="nav-line-1" />
          <div className={classnames('nav-line',{'nav-line-actived-2':visible})} id="nav-line-2" />
          <div className={classnames('nav-line',{'nav-line-actived-3':visible})} id="nav-line-3" />
        </div>
    )
}
export default connect(({global})=>({visible:global.menuVisible}))(ThreeLine)