/*
 * @Author: xingzai
 * @Date: 2020-11-09 05:50:15
 * @LastEditors: xingzai
 * @LastEditTime: 2020-11-09 05:54:40
 * @FilePath: \test\src\pages\blog.js
 */
import React,{useEffect,useCallback,useState} from 'react'
import {connect} from 'dva'
import { useMediaQuery } from 'react-responsive'
import NavBar from '../components/NavBar'
import ArticleList from '../components/ArticleList'
import BlogMobile from '../mobile/Blogs'
import styles from './blogs.css'


const Blogs=(props)=>{
    const {dispatch}=props;
    const [title,setTitle]=useState('')
    const isMobile = useMediaQuery({ maxWidth: 767 })
    useEffect(()=>{
    dispatch({type:'blog/getArticles'})
    },[]) 
    const blogTitleChange=useCallback(e=>{
        setTitle(e.target.value)
      },[])
      const search=useCallback(()=>{
        dispatch({type:'blog/search',payload:{title}})
    },[title])  
    return isMobile ? (<BlogMobile />) : (
        <div className={styles.container}>
            <div className={styles.bannerBox}>
                <img src="splash.jpeg" className={styles.bannerImg} />
                <div className={styles.searchBox}>
                    <div className={styles.searchTitle}>Work with us</div>
                    <div className={styles.searchText}>See how 3D visualization can improve your business</div>
                    <div className={styles.inputView}>
                        <input value={title} onChange={blogTitleChange} className={styles.searchInput} placeholder="Blog Search Bar" />
                        <img onClick={search} src="search.png" className={styles.searchIcon}  />
                        </div>                    
                </div>
            </div>
            <NavBar />
            <ArticleList />
        </div>
    )
}
export default connect()(Blogs)