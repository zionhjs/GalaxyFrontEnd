import React, { useState, useMemo,useCallback } from 'react'
import { FullscreenOutlined } from '@ant-design/icons'
import classnames from 'classnames'
import ReactPlayer from 'react-player'
import {OverPack} from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import LoadMore from '../LoadMore'
import _ from 'lodash'

import styles from './index.css'

export default function (props) {
    let { data, role,play } = props
    let list = useMemo(() => {
        data=_.concat(data,{})
        return _.chunk(data, 3)
    }, [data])
    const [val, setVal] = useState({})//当前编辑的元素数据
    const [upload, setUpload] = useState({})//上传的数据
    function edit(item) {
        setVal(item)
    }
    function nameChange(e) {
        setVal({ ...val, name: e.target.value })
    }
    function descChange(e) {
        setVal({ ...val, desc: e.target.value })
    }
    function closeEditor() {
        setVal({ id: null })
    }
    function uploadNameChange(e) {
        setUpload({ ...upload, name: e.target.value })
    }
    function uploadDescChange(e) {
        setUpload({ ...upload, desc: e.target.value })
    }
    function selectFiles(item, e) {
        let file = e.target.files[0]
        let src = URL.createObjectURL(file)
    }
    return (
        <div className={styles.container}>
            {list.map((item, index) => {
                const colStyle = index % 2 === 0 ? { order: 1 } : { order: 2 }
                const col1Style = index % 2 === 0 ? { order: 2 } : { order: 1 }
                return (
                    <div key={index} className={styles.row}>
                        
                        {item[0]&&item[0].id!==undefined&&(<OverPack playScale={0.3}><TweenOne key="box1ani" animation={{ x: '-=50',opacity: 0,type: 'from', ease: 'easeOutQuad'}} resetStyle style={colStyle} className={styles.box1}>
                            <img src={item[0].imgUrl} className={styles.box1Img} />
                            <div className={styles.nameWrapper}><span className={styles.nameText}>{item[0].name}</span><span className={styles.dateText}>{item[0].date}</span><FullscreenOutlined className={styles.fullScreen} /></div>
                            <div className={styles.desc}>{item[0].desc}{role === 'admin' ? <img onClick={edit.bind(null, item[0])} src="editW.png" className={styles.editIcon} alt="" /> : null}</div>
                            <div className={classnames(styles.editBox, { [styles.editShow]: val.id === item[0].id })}>
                                <div className={styles.editLeft}>
                                    <input value={val.name} onChange={nameChange} className={styles.editInput} />
                                    <textarea onChange={descChange} value={val.desc} className={styles.editTextArea} />
                                </div>
                                <div className={styles.editRight}>
                                    <img onClick={closeEditor} src="close.png" className={styles.editClose} alt="" />
                                    <div className={styles.updateView}><img src="update.png" className={styles.editUpdate} alt="" /><input type="file" className={styles.fileUpload} accept="video/*" onChange={selectFiles.bind(null, item[0])} /></div>
                                    <img src="confirm.png" className={styles.checkIcon} alt="" />
                                </div>
                            </div>
                            <img onClick={play.bind(null,item[0])} src="playBtn.png" className={styles.playBtn1} />
                        </TweenOne></OverPack>)
                         }{
                            item[0]&&item[0].id===undefined&&(<div className={styles.bigUploadBox}>
                                <div className={styles.bigUpperBox}>
                                    <img src="uploadB.png" className={styles.uploadIcon} alt="" />
                                    <div className={styles.uploadText}>Upload video</div>
                                </div>
                                <div className={classnames(styles.editBox, styles.editShow)}>
                                    <div className={styles.editLeft}>
                                        <input value={upload.name} onChange={uploadNameChange} className={styles.editInput} style={{ height: '42px' }} />
                                        <textarea onChange={uploadDescChange} value={upload.desc} className={styles.editTextArea} style={{ height: '70px' }} />
                                    </div>
                                    <div className={styles.editRight}>
                                        <img src="close.png" className={styles.editClose} alt="" />
                                        <img src="uploadS.png" className={styles.editUpdate} alt="" />
                                        <img src="confirm.png" className={styles.checkIcon} alt="" />
                                    </div>
                                </div>
                            </div>) 
                         }

                        <OverPack playScale={0.3} style={col1Style} className={styles.rightBox}>
                            
                           {item[1]&&item[1].id!==undefined&&(<TweenOne key="box2ani" animation={{ y: '-=50',opacity: 0,type: 'from', ease: 'easeOutQuad'}} resetStyle className={styles.box2}>
                                <img src={item[1].imgUrl} className={styles.box2Img} />
                                <div className={styles.nameWrapper}><span className={styles.nameText}>{item[1].name}</span><span className={styles.dateText}>{item[1].date}</span><FullscreenOutlined className={styles.fullScreen} /></div>
                                <div className={styles.desc}>{item[1].desc}{role === 'admin' ? <img onClick={edit.bind(null, item[1])} src="editW.png" className={styles.editIcon} alt="" /> : null}</div>
                                <div className={classnames(styles.editBox, { [styles.editShow]: val.id === item[1].id })}>
                                    <div className={styles.editLeft}>
                                        <input value={val.name} onChange={nameChange} className={styles.editInput} style={{ height: '42px' }} />
                                        <textarea onChange={descChange} value={val.desc} className={styles.editTextArea} style={{ height: '70px' }} />
                                    </div>
                                    <div className={styles.editRight}>
                                        <img onClick={closeEditor} src="close.png" className={styles.editClose} alt="" />
                                        <div className={styles.updateView}><img src="update.png" className={styles.editUpdate} alt="" /><input className={styles.fileUpload} type="file" accept="video/*" onChange={selectFiles.bind(null, item[1])} /></div>
                                        <img src="confirm.png" className={styles.checkIcon} alt="" />
                                    </div>
                                </div>

                                <img src="playBtn.png" className={styles.playBtn2} />
                            </TweenOne>)
                           }

                           {item[1]&&item[1].id===undefined&&(<div className={styles.uploadBox}>
                                <div className={styles.upperBox}>
                                    <img src="uploadB.png" className={styles.uploadIcon} alt="" />
                                    <div className={styles.uploadText}>Upload video</div>
                                </div>
                                <div className={classnames(styles.editBox, styles.editShow)}>
                                    <div className={styles.editLeft}>
                                        <input value={upload.name} onChange={uploadNameChange} className={styles.editInput} style={{ height: '42px' }} />
                                        <textarea onChange={uploadDescChange} value={upload.desc} className={styles.editTextArea} style={{ height: '70px' }} />
                                    </div>
                                    <div className={styles.editRight}>
                                        <img src="close.png" className={styles.editClose} alt="" />
                                        <img src="uploadS.png" className={styles.editUpdate} alt="" />
                                        <img src="confirm.png" className={styles.checkIcon} alt="" />
                                    </div>
                                </div>
                            </div>)}

                            {item[2]&&item[2].id!==undefined&&(<TweenOne key="box3ani" animation={{ y: '+=50',opacity: 0,type: 'from', ease: 'easeOutQuad'}} resetStyle className={styles.box3}>
                                <img src={item[2].imgUrl} className={styles.box3Img} />
                                <div className={styles.nameWrapper}><span className={styles.nameText}>{item[2].name}</span><span className={styles.dateText}>{item[2].date}</span><FullscreenOutlined className={styles.fullScreen} /></div>
                                <div className={styles.desc}>{item[2].desc}{role === 'admin' ? <img onClick={edit.bind(null, item[2])} src="editW.png" className={styles.editIcon} alt="" /> : null}</div>
                                <div className={classnames(styles.editBox, { [styles.editShow]: val.id === item[2].id })}>
                                    <div className={styles.editLeft}>
                                        <input value={val.name} onChange={nameChange} className={styles.editInput} style={{ height: '42px' }} />
                                        <textarea onChange={descChange} value={val.desc} className={styles.editTextArea} style={{ height: '70px' }} />
                                    </div>
                                    <div className={styles.editRight}>
                                        <img onClick={closeEditor} src="close.png" className={styles.editClose} alt="" />
                                        <div className={styles.updateView}><img src="update.png" className={styles.editUpdate} alt="" /><input type="file" className={styles.fileUpload} accept="video/*" onChange={selectFiles.bind(null, item[2])} /></div>
                                        <img src="confirm.png" className={styles.checkIcon} alt="" />
                                    </div>
                                </div>
                                <img src="playBtn.png" className={styles.playBtn3} />
                            </TweenOne>)}

                            {item[2]&&item[2].id===undefined&&(<div className={styles.uploadBox}>
                                <div className={styles.upperBox}>
                                    <img src="uploadB.png" className={styles.uploadIcon} alt="" />
                                    <div className={styles.uploadText}>Upload video</div>
                                </div>
                                <div className={classnames(styles.editBox, styles.editShow)}>
                                    <div className={styles.editLeft}>
                                        <input value={upload.name} onChange={uploadNameChange} className={styles.editInput} style={{ height: '42px' }} />
                                        <textarea onChange={uploadDescChange} value={upload.desc} className={styles.editTextArea} style={{ height: '70px' }} />
                                    </div>
                                    <div className={styles.editRight}>
                                        <img src="close.png" className={styles.editClose} alt="" />
                                        <img src="uploadS.png" className={styles.editUpdate} alt="" />
                                        <img src="confirm.png" className={styles.checkIcon} alt="" />
                                    </div>
                                </div>
                            </div>)}
                        </OverPack>
                    </div>
                )
            })
            }
            <LoadMore />
        </div>
    )
}