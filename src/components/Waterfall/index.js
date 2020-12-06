import React, { useState } from 'react'
import classnames from 'classnames'
import LazyLoad from 'react-lazyload';
import { OverPack } from 'rc-scroll-anim';
import TweenOne from 'rc-tween-one';
import BigImage from '../BigImage'
import styles from './index.css'

export default function (props) {
    let { data, role } = props
    const { col1, col2, col3, col4 } = data
    const [visible, setVisible] = useState(false)
    const [val, setVal] = useState({})
    function nameChange(e) {
        setVal({ ...val, name: e.target.value })
    }
    function descChange(e) {
        setVal({ ...val, desc: e.target.value })
    }
    function openBigImg(item) {
        setVisible(true)
    }
    function edit(item) {
        setVal(item)
    }
    function closeEdit() {
        setVal({})
    }
    function closeBigImg() {
        setVisible(false)
    }
    return (
        <div className={styles.container}>
            <div className={styles.waterfall}>
                <div className={styles.col1}>
                    {col1.map((item, index) =>
                        (
                        <OverPack playScale={0.2} key={index}>
                        <TweenOne component="div" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} key={index+'col1'} className={styles.imgWrapper}>
                            <LazyLoad height={200} offset={100}>
                            <img onClick={openBigImg.bind(null, item)} src={item.imgUrl} style={{ width: '100%', height: 'auto' }} />
                            </LazyLoad>
                            <div className={styles.imgFooter}>
                                <div>
                                    <div><span className={styles.nameText}>{item.name}</span><span className={styles.dateText}>{item.date}</span></div>
                                    <div className={styles.desc}>{item.desc}</div>
                                </div>
                                {role === 'admin' ? <img onClick={edit.bind(null, item)} src="editW.png" alt="" className={styles.editIcon} /> : null}
                            </div>
                            <div className={classnames(styles.editBox, { [styles.editShow]: val.id === item.id })}>
                                <div className={styles.editLeft}>
                                    <input value={val.name} onChange={nameChange} className={styles.editInput} style={{ height: '42px' }} />
                                    <textarea onChange={descChange} value={val.desc} className={styles.editTextArea} style={{ height: '70px' }} />
                                </div>
                                <div className={styles.editRight}>
                                    <img onClick={closeEdit} src="close.png" className={styles.editClose} alt="" />
                                    <img src="update.png" className={styles.editUpdate} alt="" />
                                    <img src="confirm.png" className={styles.checkIcon} alt="" />
                                </div>
                            </div>
                        </TweenOne>
                        </OverPack>
                        ))}
                </div>
                <div className={styles.col2}>{col2.map((item, index) =>
                    (
                        <OverPack key={index} playScale={0.2}>
                    <TweenOne key={index+'col2'} animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} className={styles.imgWrapper}>
                        <LazyLoad height={200} offset={100}><img onClick={openBigImg.bind(null, item)} src={item.imgUrl} style={{ width: '100%', height: 'auto' }} /></LazyLoad>
                        <div className={styles.imgFooter}>
                            <div>
                                <div><span className={styles.nameText}>{item.name}</span><span className={styles.dateText}>{item.date}</span></div>
                                <div className={styles.desc}>{item.desc}</div>
                            </div>
                            {role === 'admin' ? <img onClick={edit.bind(null, item)} src="editW.png" alt="" className={styles.editIcon} /> : null}
                        </div>
                        <div className={classnames(styles.editBox, { [styles.editShow]: val.id === item.id })}>
                            <div className={styles.editLeft}>
                                <input value={val.name} onChange={nameChange} className={styles.editInput} style={{ height: '42px' }} />
                                <textarea onChange={descChange} value={val.desc} className={styles.editTextArea} style={{ height: '70px' }} />
                            </div>
                            <div className={styles.editRight}>
                                <img onClick={closeEdit} src="close.png" className={styles.editClose} alt="" />
                                <img src="update.png" className={styles.editUpdate} alt="" />
                                <img src="confirm.png" className={styles.checkIcon} alt="" />
                            </div>
                        </div>
                    </TweenOne>
                    </OverPack>
                    ))}</div>
                <div className={styles.col3}>{col3.map((item, index) =>
                    (
                        <OverPack playScale={0.2} key={index}>
                    <TweenOne key={index+'col3'} animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} className={styles.imgWrapper}>
                        <LazyLoad height={200} offset={100}>
                        <img onClick={openBigImg.bind(null, item)} src={item.imgUrl} style={{ width: '100%', height: 'auto' }} />
                        </LazyLoad>
                        <div className={styles.imgFooter}>
                            <div>
                                <div><span className={styles.nameText}>{item.name}</span><span className={styles.dateText}>{item.date}</span></div>
                                <div className={styles.desc}>{item.desc}</div>
                            </div>
                            {role === 'admin' ? <img onClick={edit.bind(null, item)} src="editW.png" alt="" className={styles.editIcon} /> : null}
                        </div>
                        <div className={classnames(styles.editBox, { [styles.editShow]: val.id === item.id })}>
                            <div className={styles.editLeft}>
                                <input value={val.name} onChange={nameChange} className={styles.editInput} style={{ height: '42px' }} />
                                <textarea onChange={descChange} value={val.desc} className={styles.editTextArea} style={{ height: '70px' }} />
                            </div>
                            <div className={styles.editRight}>
                                <img onClick={closeEdit} src="close.png" className={styles.editClose} alt="" />
                                <img src="update.png" className={styles.editUpdate} alt="" />
                                <img src="confirm.png" className={styles.checkIcon} alt="" />
                            </div>
                        </div>
                    </TweenOne>
                    </OverPack>
                    ))}</div>
                <div className={styles.col4}>{col4.map((item, index) =>
                    (
                        <OverPack playScale={0.2} key={index}>
                    <TweenOne key={index+'col4'} animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} className={styles.imgWrapper}>
                        <LazyLoad height={200} offset={100}>
                        <img onClick={openBigImg.bind(null, item)} src={item.imgUrl} style={{ width: '100%', height: 'auto' }} />
                        </LazyLoad>
                        <div className={styles.imgFooter}>
                            <div>
                                <div><span className={styles.nameText}>{item.name}</span><span className={styles.dateText}>{item.date}</span></div>
                                <div className={styles.desc}>{item.desc}</div>
                            </div>
                            {role === 'admin' ? <img onClick={edit.bind(null, item)} src="editW.png" alt="" className={styles.editIcon} /> : null}
                        </div>
                        <div className={classnames(styles.editBox, { [styles.editShow]: val.id === item.id })}>
                            <div className={styles.editLeft}>
                                <input value={val.name} onChange={nameChange} className={styles.editInput} style={{ height: '42px' }} />
                                <textarea onChange={descChange} value={val.desc} className={styles.editTextArea} style={{ height: '70px' }} />
                            </div>
                            <div className={styles.editRight}>
                                <img onClick={closeEdit} src="close.png" className={styles.editClose} alt="" />
                                <img src="update.png" className={styles.editUpdate} alt="" />
                                <img src="confirm.png" className={styles.checkIcon} alt="" />
                            </div>
                        </div>
                    </TweenOne>
                    </OverPack>
                    ))}
                    {   <OverPack playScale={0.2}>
                        <TweenOne key="upload" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} className={styles.uploadBox}>
                            <div className={styles.upperBox}>
                                <img src="uploadB.png" className={styles.uploadIcon} alt="" />
                                <div className={styles.uploadText}>Upload image</div>
                            </div>
                            <div className={styles.uploadFooter}>
                                <div className={styles.uploadLeft}>
                                    <input className={styles.uploadInput} />
                                    <textarea className={styles.uploadTextArea} />
                                </div>
                                <div className={styles.uploadRight}>
                                    <img src="close.png" className={styles.closeIcon} />
                                    <img src="uploadS.png"  className={styles.uploadSmallIcon}/>
                                    <img src="confirm.png" className={styles.checkIcon} />
                                </div>
                            </div>
                        </TweenOne>
                        </OverPack>
                    }
                </div>
            </div>
            <div className={styles.loadMore}><img src="loadMore.png" className={styles.loadMoreImg} /><img src="loadMoreText.png" className={styles.loadMoreText} /></div>
            <BigImage visible={visible} close={closeBigImg} />
        </div>
    )
}