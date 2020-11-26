/*
 * @Author: xingzai
 * @Date: 2020-11-09 05:50:15
 * @LastEditors: xingzai
 * @LastEditTime: 2020-11-09 05:54:40
 * @FilePath: \test\src\pages\blog.js
 */
import React from 'react'
import NavBar from '../components/NavBar'
import ArticleList from '../components/ArticleList'
import styles from './blogs.css'
import img1 from '../assets/article/1.png'
import img2 from '../assets/article/2.png'
import img3 from '../assets/article/3.png'

const arr=[img1,img2,img3]
const navButtons = ['All', 'News', 'Visualization', 'Tutorials','Real Estate']
const data=[
    {id:1,
    images:arr,title:'3D Architecture Renders for a Rural Residence Designed by Wunschhaus Architektur & Baukunst',
    author:'Author:Tom',date:'2020.11.23',content:'Making brilliant architecture presentations is an art in itself. Because no matter how genius a concept is, poor delivery can bury it for good. The thing is, it’s not about just presenting a great idea. It’s about convincing a potential client that it’s the best solution for them. Now, this might seem a bit too complicated, but it absolutely isn’t. In fact, creating a successful demo is more like following a recipe that guarantees amazing results. ...',
    read:'122 Read',liked:'23 Likes',comment:'No Comments'
},
{id:2,
    images:arr,title:'3D Architecture Renders for a Rural Residence Designed by Wunschhaus Architektur & Baukunst',
    author:'Author:Tom',date:'2020.11.23',content:'Making brilliant architecture presentations is an art in itself. Because no matter how genius a concept is, poor delivery can bury it for good. The thing is, it’s not about just presenting a great idea. It’s about convincing a potential client that it’s the best solution for them. Now, this might seem a bit too complicated, but it absolutely isn’t. In fact, creating a successful demo is more like following a recipe that guarantees amazing results. ...',
    read:'122 Read',liked:'23 Likes',comment:'No Comments'
},
{id:3,
    images:arr,title:'3D Architecture Renders for a Rural Residence Designed by Wunschhaus Architektur & Baukunst',
    author:'Author:Tom',date:'2020.11.23',content:'Making brilliant architecture presentations is an art in itself. Because no matter how genius a concept is, poor delivery can bury it for good. The thing is, it’s not about just presenting a great idea. It’s about convincing a potential client that it’s the best solution for them. Now, this might seem a bit too complicated, but it absolutely isn’t. In fact, creating a successful demo is more like following a recipe that guarantees amazing results. ...',
    read:'122 Read',liked:'23 Likes',comment:'No Comments'
},
{id:4,
    images:arr,title:'3D Architecture Renders for a Rural Residence Designed by Wunschhaus Architektur & Baukunst',
    author:'Author:Tom',date:'2020.11.23',content:'Making brilliant architecture presentations is an art in itself. Because no matter how genius a concept is, poor delivery can bury it for good. The thing is, it’s not about just presenting a great idea. It’s about convincing a potential client that it’s the best solution for them. Now, this might seem a bit too complicated, but it absolutely isn’t. In fact, creating a successful demo is more like following a recipe that guarantees amazing results. ...',
    read:'122 Read',liked:'23 Likes',comment:'No Comments'
},
]
const role="admin"
export default function(props){

    function btnClicked(item) {
        console.log(item)
      }
    return (
        <div className={styles.container}>
            <div className={styles.bannerBox}>
                <img src="splash.jpeg" className={styles.bannerImg} />
                <div className={styles.searchBox}>
                    <div className={styles.searchTitle}>Work with us</div>
                    <div className={styles.searchText}>See how 3D visualization can improve your business</div>
                    <div className={styles.inputView}>
                        <input className={styles.searchInput} placeholder="Blog Search Bar" />
                        <img src="search.png" className={styles.searchIcon}  />
                        </div>                    
                </div>
            </div>
            <NavBar navButtons={navButtons} onBtnClicked={btnClicked} />
            <ArticleList data={data} role={role} />
        </div>
    )
}