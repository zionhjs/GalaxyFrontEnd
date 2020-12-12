import React, { useState, useMemo,useCallback } from 'react'
import {connect} from 'dva'
import { FullscreenOutlined } from '@ant-design/icons'
import classnames from 'classnames'
import ReactPlayer from 'react-player'
import {OverPack} from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import LoadMore from '../LoadMore'
import _ from 'lodash'

import styles from './index.css'

const VideoList=(props)=> {
    let {  role,videoList,currentItem,uploadFile,showEdit,dispatch } = props
    let list = useMemo(() => {
        let ret=_.concat(videoList,{})
        return _.chunk(ret, 3)
    }, [videoList])
    const [upload, setUpload] = useState({name:'',desc:''})//上传的数据
    const edit=useCallback((item)=>{
     dispatch({type:'animation/setCurrent',payload:item})
    },[])
    const nameChange=useCallback((e)=>{
     dispatch({type:'animation/setName',payload:e.target.value})
    },[])
    const descChange=useCallback((e)=>{
        dispatch({type:'animation/setDesc',payload:e.target.value})
    },[])
    const closeEditor=useCallback(()=>{
        dispatch({type:'animation/setCurrent',payload:{id:null}})
    },[])
    const play=useCallback((item)=>{
        dispatch({type:'animation/setCurrent',payload:item})
        dispatch({type:'animation/openVideo'})
    },[])
    const selectFiles=useCallback((item,e)=>{
        let file=e.target.files[0]
        dispatch({type:'animation/setUpdateFile',payload:{file}})
    },[])
    const selectUploadFile=useCallback((e)=>{
        let file=e.target.files[0]
        dispatch({type:'animation/setUploadFile',payload:{file}})
    },[])
    const uploadNameChange=useCallback((e)=>{
        dispatch({type:'animation/setUploadName',payload:{name:e.target.value}})
    },[])
    const uploadDescChange=useCallback((e)=>{
        dispatch({type:'animation/setUploadDesc',payload:{desc:e.target.value}})
    },[])
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
                            <div className={classnames(styles.editBox, { [styles.editShow]: (currentItem.id === item[0].id)&&showEdit })}>
                                <div className={styles.editLeft}>
                                    <input value={currentItem.name} onChange={nameChange} className={styles.editInput} />
                                    <textarea onChange={descChange} value={currentItem.desc} className={styles.editTextArea} />
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
                                    <img src="uploadB.png" className={styles.uploadIcon} alt="" /><input type="file" className={styles.fileUpload} accept="video/*" onChange={selectUploadFile} />
                                    <div className={styles.uploadText}>Upload video</div>
                                </div>
                                <div className={classnames(styles.editBox, styles.editShow)}>
                                    <div className={styles.editLeft}>
                                        <input value={uploadFile.name} onChange={uploadNameChange} className={styles.editInput} style={{ height: '42px' }} />
                                        <textarea onChange={uploadDescChange} value={uploadFile.desc} className={styles.editTextArea} style={{ height: '70px' }} />
                                    </div>
                                    <div className={styles.editRight}>
                                        <img src="close.png" className={styles.editClose} alt="" />
                                        <div className={styles.uploadView}><img src="uploadS.png" className={styles.editUpdate} alt="" /><input type="file" className={styles.fileUpload} accept="video/*" onChange={selectUploadFile} /></div>
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
                                <div className={classnames(styles.editBox, { [styles.editShow]: (currentItem.id === item[1].id)&&showEdit })}>
                                    <div className={styles.editLeft}>
                                        <input value={currentItem.name} onChange={nameChange} className={styles.editInput} style={{ height: '42px' }} />
                                        <textarea onChange={descChange} value={currentItem.desc} className={styles.editTextArea} style={{ height: '70px' }} />
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
                                <img src="uploadB.png" className={styles.uploadIcon} alt="" /><input type="file" className={styles.fileUpload} accept="video/*" onChange={selectUploadFile} />
                                    <div className={styles.uploadText}>Upload video</div>
                                </div>
                                <div className={classnames(styles.editBox, styles.editShow)}>
                                    <div className={styles.editLeft}>
                                        <input value={uploadFile.name} onChange={uploadNameChange} className={styles.editInput} style={{ height: '42px' }} />
                                        <textarea onChange={uploadDescChange} value={uploadFile.desc} className={styles.editTextArea} style={{ height: '70px' }} />
                                    </div>
                                    <div className={styles.editRight}>
                                        <img src="close.png" className={styles.editClose} alt="" />
                                        <div className={styles.uploadView}><img src="uploadS.png" className={styles.editUpdate} alt="" /><input type="file" className={styles.fileUpload} accept="video/*" onChange={selectUploadFile} /></div>
                                        <img src="confirm.png" className={styles.checkIcon} alt="" />
                                    </div>
                                </div>
                            </div>)}

                            {item[2]&&item[2].id!==undefined&&(<TweenOne key="box3ani" animation={{ y: '+=50',opacity: 0,type: 'from', ease: 'easeOutQuad'}} resetStyle className={styles.box3}>
                                <img src={item[2].imgUrl} className={styles.box3Img} />
                                <div className={styles.nameWrapper}><span className={styles.nameText}>{item[2].name}</span><span className={styles.dateText}>{item[2].date}</span><FullscreenOutlined className={styles.fullScreen} /></div>
                                <div className={styles.desc}>{item[2].desc}{role === 'admin' ? <img onClick={edit.bind(null, item[2])} src="editW.png" className={styles.editIcon} alt="" /> : null}</div>
                                <div className={classnames(styles.editBox, { [styles.editShow]: (currentItem.id === item[2].id)&&showEdit })}>
                                    <div className={styles.editLeft}>
                                        <input value={currentItem.name} onChange={nameChange} className={styles.editInput} style={{ height: '42px' }} />
                                        <textarea onChange={descChange} value={currentItem.desc} className={styles.editTextArea} style={{ height: '70px' }} />
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
                                <img src="uploadB.png" className={styles.uploadIcon} alt="" /><input type="file" className={styles.fileUpload} accept="video/*" onChange={selectUploadFile} />
                                <div className={styles.uploadText}>Upload video</div>
                                </div>
                                <div className={classnames(styles.editBox, styles.editShow)}>
                                    <div className={styles.editLeft}>
                                        <input value={uploadFile.name} onChange={uploadNameChange} className={styles.editInput} style={{ height: '42px' }} />
                                        <textarea onChange={uploadDescChange} value={uploadFile.desc} className={styles.editTextArea} style={{ height: '70px' }} />
                                    </div>
                                    <div className={styles.editRight}>
                                        <img src="close.png" className={styles.editClose} alt="" />
                                        <div className={styles.uploadView}><img src="uploadS.png" className={styles.editUpdate} alt="" /><input type="file" className={styles.fileUpload} accept="video/*" onChange={selectUploadFile} /></div>
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
export default connect(({animation:{videoList,currentItem,uploadFile,videoVisible},global:{role}})=>({videoList,currentItem,uploadFile,showEdit:!videoVisible,role}))(VideoList)