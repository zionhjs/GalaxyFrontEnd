/*
 * @Author: xingzai
 * @Date: 2020-11-25 05:29:09
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-11 07:56:52
 * @FilePath: \GalaxyFrontEnd\src\pages\image.js
 */
import React, {useEffect} from 'react'
import {connect} from 'dva'
import { useMediaQuery } from 'react-responsive'
import ImageSwiper from '../components/ImageSwiper'
import NavBar from '../components/NavBar'
import Waterfall from '../components/Waterfall'
import ImageMobile from '../mobile/components/ImageMobile'
import styles from './image.css'
const role="admin"
const ImagePage= ({dispatch})=> {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    useEffect(()=>{
        dispatch({type:'image/getImage'})
    },[])    
    
   
    return isMobile ? (<ImageMobile />) : (
        <div className={styles.container}>
           <ImageSwiper />
            <NavBar />
            <Waterfall role={role} />
        </div>
    )
}
export default connect(({image})=>({}))(ImagePage)