import React, { useState,useCallback } from 'react'
import classnames from 'classnames'
import LazyLoad from 'react-lazyload';
import {connect} from 'dva'
import {Select} from 'antd'
import { OverPack } from 'rc-scroll-anim';
import TweenOne from 'rc-tween-one';
import BigImage from '../BigImage'
import Image360 from '../Image360'
import styles from './index.css'
const {Option}=Select
const Waterfall=(props)=> {
    let { col1,col2,col3,col4,currentItem,showEdit,dispatch, role,uploadImg,uploadName,uploadDesc} = props
    console.log('col1====',col1)
    const [url,seturl]=useState('')
    const nameChange=useCallback((e)=>{
        dispatch({type:'image/setName',payload:e.target.value})
    },[])
    const suffixChange=useCallback(value=>{
        dispatch({type:'image/setSuffix',payload:value})
    },[])
    const levelChange=useCallback(value=>{
        dispatch({type:'image/setLevel',payload:value})
    },[])
    const descChange=useCallback((e)=>{
        dispatch({type:'image/setDesc',payload:e.target.value})
    },[])
    const openBigImg=useCallback((item)=>{
        dispatch({type:'image/setCurrent',payload:item})
        //dispatch({type:'image/openBigImage'})
        dispatch({type:'image/openImg360'})
    },[])
    const edit=useCallback((item)=>{
        dispatch({type:'image/setCurrent',payload:item})
    },[])
    const closeEdit=useCallback(()=>{
        dispatch({type:'image/setCurrent',payload:{}})
    },[])
    const selectUploadFile=useCallback((e)=>{
        let file=e.target.files[0]
        let url;
        if (window.createObjectURL!=undefined) { // basic

            url = window.createObjectURL(file) ;

        } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;

        } else if (window.webkitURL!=undefined) { // webkit or chrome

            url = window.webkitURL.createObjectURL(file) ;

        }
        seturl(url)
        dispatch({type:'image/setuploadImg',payload:file})
    },[])
    const uploadNameChange=useCallback((e)=>{
    dispatch({type:'image/setuploadName',payload:e.target.value})
    },[])
    const uploadDescChange=useCallback(e=>{
        dispatch({type:'image/setuploadDesc',payload:e.target.value})
    },[])
    const uploadSuffixChange=useCallback(value=>{
        dispatch({type:'image/setuploadSuffix',payload:value})
    },[])
    const uploadLevelChange=useCallback(value=>{
        dispatch({type:'image/setuploadLevel',payload:value})
    },[])
    const onConfirm=useCallback(()=>{
        seturl('')
        dispatch({type:'image/upload'})
    },[])
    const updateImage=useCallback((id,e)=>{
        console.log('id',id)
        let file=e.target.files[0]
        dispatch({type:'image/updateImg',payload:{id,file}})
    },[])
    const confirmUpdate=useCallback(()=>{
        dispatch({type:'image/updateImgText'})
    },[])
    const loadMore=useCallback(()=>{
        dispatch({type:'image/getImage'})
    },[])
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
                            <div className={classnames(styles.editBox, { [styles.editShow]: (currentItem.id === item.id)&&showEdit })}>
                                <div className={styles.editLeft}>
                                    <input value={currentItem.name||''} onChange={nameChange} className={styles.editInput} />
                                    <input onChange={descChange} value={currentItem.desc||''} className={styles.editTextArea} />
                                    <Select value={currentItem.suffix} onChange={suffixChange} bordered={false} dropdownClassName={styles.dropDown} defaultValue="Interior">
                                    <Option className={styles.dropOption} value="interior">Interior</Option>
                                    <Option className={styles.dropOption} value="exterior">Exterior</Option>
                                    <Option className={styles.dropOption} value="360">360</Option>
                                    </Select>
                                    <Select value={currentItem.level} onChange={levelChange} bordered={false} dropdownClassName={styles.levelDropdown} defaultValue="star">
                                    <Option className={styles.levelDropdownoption} value="Interior">star</Option>
                                    <Option className={styles.levelDropdownoption} value="Exterior">galaxy</Option>
                                    <Option className={styles.levelDropdownoption} value="360">universe</Option>
                                    </Select>
                                </div>
                                <div className={styles.editRight}>
                                    <img onClick={closeEdit} src="close.png" className={styles.editClose} alt="" />
                                    <div className={styles.updateView}><img src="update.png" className={styles.editUpdate} alt="" /><input type="file" className={styles.fileUpload} accept="image/*" onChange={updateImage.bind(null,item.id)} /></div>
                                    <img onClick={confirmUpdate} src="confirm.png" className={styles.checkIcon} alt="" />
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
                        <div className={classnames(styles.editBox, { [styles.editShow]: (currentItem.id === item.id)&&showEdit })}>
                            <div className={styles.editLeft}>
                                <input value={currentItem.name||''} onChange={nameChange} className={styles.editInput} />
                                <input onChange={descChange} value={currentItem.desc||''} className={styles.editTextArea} />
                                <Select value={currentItem.suffix} onChange={suffixChange} bordered={false} dropdownClassName={styles.dropDown} defaultValue="Interior">
                                    <Option className={styles.dropOption} value="Interior">Interior</Option>
                                    <Option className={styles.dropOption} value="Exterior">Exterior</Option>
                                    <Option className={styles.dropOption} value="360">360</Option>
                                </Select>
                                <Select value={currentItem.level} onChange={levelChange} bordered={false} dropdownClassName={styles.levelDropdown} defaultValue="star">
                                    <Option className={styles.levelDropdownoption} value="Interior">star</Option>
                                    <Option className={styles.levelDropdownoption} value="Exterior">galaxy</Option>
                                    <Option className={styles.levelDropdownoption} value="360">universe</Option>
                                    </Select>
                            </div>
                            <div className={styles.editRight}>
                                <img onClick={closeEdit} src="close.png" className={styles.editClose} alt="" />
                                <div className={styles.updateView}><img src="update.png" className={styles.editUpdate} alt="" /><input type="file" className={styles.fileUpload} accept="image/*" onChange={updateImage.bind(null,item.id)} /></div>
                                <img onClick={confirmUpdate} src="confirm.png" className={styles.checkIcon} alt="" />
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
                        <div className={classnames(styles.editBox, { [styles.editShow]: (currentItem.id === item.id)&&showEdit })}>
                            <div className={styles.editLeft}>
                                <input value={currentItem.name||''} onChange={nameChange} className={styles.editInput} />
                                <input onChange={descChange} value={currentItem.desc||''} className={styles.editTextArea} />
                                <Select value={currentItem.suffix} onChange={suffixChange} bordered={false} dropdownClassName={styles.dropDown} defaultValue="Interior">
                                    <Option className={styles.dropOption} value="Interior">Interior</Option>
                                    <Option className={styles.dropOption} value="Exterior">Exterior</Option>
                                    <Option className={styles.dropOption} value="360">360</Option>
                                </Select>
                                <Select value={currentItem.level} onChange={levelChange} bordered={false} dropdownClassName={styles.levelDropdown} defaultValue="star">
                                    <Option className={styles.levelDropdownoption} value="Interior">star</Option>
                                    <Option className={styles.levelDropdownoption} value="Exterior">galaxy</Option>
                                    <Option className={styles.levelDropdownoption} value="360">universe</Option>
                                    </Select>
                            </div>
                            <div className={styles.editRight}>
                                <img onClick={closeEdit} src="close.png" className={styles.editClose} alt="" />
                                <div className={styles.updateView}><img src="update.png" className={styles.editUpdate} alt="" /><input type="file" className={styles.fileUpload} accept="image/*" onChange={updateImage.bind(null,item.id)} /></div>
                                <img onClick={confirmUpdate} src="confirm.png" className={styles.checkIcon} alt="" />
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
                        <div className={classnames(styles.editBox, { [styles.editShow]: (currentItem.id === item.id)&&showEdit })}>
                            <div className={styles.editLeft}>
                                <input value={currentItem.name||''} onChange={nameChange} className={styles.editInput} style={{ height: '42px' }} />
                                <input onChange={descChange} value={currentItem.desc||''} className={styles.editTextArea} />
                                <Select value={currentItem.suffix} onChange={suffixChange} bordered={false} dropdownClassName={styles.dropDown} defaultValue="Interior">
                                    <Option className={styles.dropOption} value="Interior">Interior</Option>
                                    <Option className={styles.dropOption} value="Exterior">Exterior</Option>
                                    <Option className={styles.dropOption} value="360">360</Option>
                                </Select>
                                <Select value={currentItem.level} onChange={levelChange} bordered={false} dropdownClassName={styles.levelDropdown} defaultValue="star">
                                    <Option className={styles.levelDropdownoption} value="Interior">star</Option>
                                    <Option className={styles.levelDropdownoption} value="Exterior">galaxy</Option>
                                    <Option className={styles.levelDropdownoption} value="360">universe</Option>
                                    </Select>
                            </div>
                            <div className={styles.editRight}>
                                <img onClick={closeEdit} src="close.png" className={styles.editClose} alt="" />
                                <div className={styles.updateView}><img src="update.png" className={styles.editUpdate} alt="" /><input type="file" className={styles.fileUpload} accept="image/*" onChange={updateImage.bind(null,item.id)} /></div>
                                <img onClick={confirmUpdate} src="confirm.png" className={styles.checkIcon} alt="" />
                            </div>
                        </div>
                    </TweenOne>
                    </OverPack>
                    ))}
                    { role!=='admin' ? null :   (<OverPack playScale={0.2}>
                        <TweenOne key="upload" animation={{ y: '+=50',opacity: 0,type: 'from', ease: "easeInCirc"}} className={styles.uploadBox}>
                            <div className={styles.upperBox}>
                            <input type="file" className={styles.fileUpload} accept="image/*" onChange={selectUploadFile} />
                            <img src={url} alt="" className={styles.preview} />
                                <img src="uploadB.png" className={styles.uploadIcon} alt="" />
                                <div className={styles.uploadText}>Upload image</div>
                            </div>
                            <div className={styles.uploadFooter}>
                                <div className={styles.uploadLeft}>
                                    <input value={uploadName||''} onChange={uploadNameChange} className={styles.uploadInput} />
                                    <input value={uploadDesc||''} onChange={uploadDescChange} className={styles.uploadTextArea} />
                                    <Select onChange={uploadSuffixChange} bordered={false} dropdownClassName={styles.dropDown} defaultValue="Interior">
                                    <Option className={styles.dropOption} value="Interior">Interior</Option>
                                    <Option className={styles.dropOption} value="Exterior">Exterior</Option>
                                    <Option className={styles.dropOption} value="360">360</Option>
                                </Select>
                                <Select onChange={uploadLevelChange} bordered={false} dropdownClassName={styles.levelDropdown} defaultValue="star">
                                    <Option className={styles.levelDropdownoption} value="Interior">star</Option>
                                    <Option className={styles.levelDropdownoption} value="Exterior">galaxy</Option>
                                    <Option className={styles.levelDropdownoption} value="360">universe</Option>
                                    </Select>
                                </div>
                                <div className={styles.uploadRight}>
                                    <img src="close.png" className={styles.closeIcon} />
                                    <div className={styles.uploadView}><img src="uploadS.png"  className={styles.uploadSmallIcon}/><input type="file" className={styles.fileUpload} accept="image/*" onChange={selectUploadFile} /></div>
                                    <img src="confirm.png" onClick={onConfirm} className={styles.checkIcon} />
                                </div>
                            </div>
                        </TweenOne>
                        </OverPack>)
                    }
                </div>
            </div>
            <div onClick={loadMore} className={styles.loadMore}><img src="loadMore.png" className={styles.loadMoreImg} /><img src="loadMoreText.png" className={styles.loadMoreText} /></div>
            <BigImage  />
            <Image360 />
        </div>
    )
}
export default connect(({image:{col1,col2,col3,col4,currentItem,bigImageVisible,name,desc,uploadImg},global:{role}})=>({col1,col2,col3,col4,currentItem,showEdit:!bigImageVisible&&role=='admin',role,uploadName:name,uploadDesc:desc,uploadImg}))(Waterfall)