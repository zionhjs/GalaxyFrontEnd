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
import {connect} from 'dva'
const ThreeLine=(props)=>{
    const {dispatch}=props
    const handleClick=useCallback(()=>{
        dispatch({type:'global/toggleMenu'})
        dispatch({type:'global/closeAll'})
        var nav_line_1 = document.getElementById('nav-line-1');
        var nav_line_2 = document.getElementById('nav-line-2');
        var nav_line_3 = document.getElementById('nav-line-3');
        nav_line_1.classList.toggle("nav-line-actived-1");
        nav_line_2.classList.toggle("nav-line-actived-2");
        nav_line_3.classList.toggle("nav-line-actived-3");
    },[])
    return (
        <div onClick={handleClick} className="nav-icon" id="nav-icon">
          <div className="nav-line" id="nav-line-1" />
          <div className="nav-line" id="nav-line-2" />
          <div className="nav-line" id="nav-line-3" />
        </div>
    )
}
export default connect()(ThreeLine)