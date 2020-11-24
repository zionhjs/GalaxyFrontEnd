import React, { useRef,useState } from 'react'
import { Carousel } from 'antd'
import classnames from 'classnames'
import NavBar from '../components/NavBar'
import Waterfall from '../components/Waterfall'
import styles from './image.css'
import img1 from '../assets/home/1.png'
import img2 from '../assets/home/2.png'
import img3 from '../assets/home/3.png'
import img4 from '../assets/home/4.png'

const swipers = [img1, img2, img3, img4]
const role="admin"
const data={
    col1:[],
    col2:[],
    col3:[],
    col4:[]
}
let temp=[]
for(let i=1;i<=35;i++){
    let img=require('../assets/waterfall/'+i+'.jpeg')
    temp.push({id:i,name:'voluptatem',date:'2020.11.23',desc:'GalaxyCGI is an Architectural Visualization',imgUrl:img})
}
data.col1=temp.slice(0,9)
    data.col2=temp.slice(9,18)
    data.col3=temp.slice(18,27)
    data.col4=temp.slice(27,35)
const navButtons=['Interior','Exterior','360','Mixed','Nav to Animation']
export default function (props) {
    const carouselRef = useRef()
    const [currentDot, setDot] = useState(0)//轮播图当前选中图片索引
    function pre() {
        const len = swipers.length
    if (currentDot === 0) {
      setDot(len - 1)
    } else {
      setDot(currentDot - 1)
    }
        carouselRef.current.prev()
    }
    function next() {
        const len = swipers.length
    if (currentDot === len - 1) {
      setDot(0)
    } else {
      setDot(currentDot + 1)
    }
        carouselRef.current.next()
    }
    function btnClicked(item){
        console.log(item)
    }
    return (
        <div className={styles.container}>
            <div className={styles.swiperBox}>
                <Carousel ref={carouselRef} dots={false} autoplay>
                    {swipers.map((item, index) => (
                        <div key={index} className={styles.swiperItem}>
                            <div className={styles.swiperImg} style={{ backgroundImage: `url(${item})` }}></div>
                        </div>
                    ))}
                </Carousel>
                <img className={styles.preBtn} src="pre.png" alt="" onClick={pre} />
                <img className={styles.nextBtn} src="next.png" alt="" onClick={next} />
                <div className={styles.dotsBox}>
                    {swipers.map((dot, idx) => (<div key={idx} className={classnames(styles.dotBtn, { [styles.activeDot]: currentDot === idx })}></div>))}
                </div>
            </div>
            <NavBar navButtons={navButtons} onBtnClicked={btnClicked}/>
            <Waterfall data={data} role={role} />
        </div>
    )
}