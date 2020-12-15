import React, {useEffect,useCallback } from 'react'
import classnames from 'classnames'
import TweenOne from 'rc-tween-one';
import { OverPack } from 'rc-scroll-anim';
import { useMediaQuery } from 'react-responsive'
import {connect} from 'dva'
import TeamMobile from '../mobile/Team'
import styles from './team.css'
import LoadMore from '../components/LoadMore'

const TeamPage=(props)=> {
    const {dispatch,teamData,role}=props;
    const isMobile = useMediaQuery({ maxWidth: 767 })
    const addMember=useCallback((index)=>{
        dispatch({type:'team/addMember',payload:index})
        window.scrollBy(0,1)
    },[])
    const nameChange=useCallback((index,i,e)=>{
        dispatch({type:'team/changeName',payload:{index,i,e}})
    },[])
    const jobChange=useCallback((index,i,e)=>{
        dispatch({type:'team/changeJob',payload:{index,i,e}})
    },[])
    const emailChange=useCallback((index,i,e)=>{
        dispatch({type:'team/changeEmail',payload:{index,i,e}})
    },[])
    useEffect(()=>{
  dispatch({type:'team/getTeamData'})
    },[])
    return isMobile ? (<TeamMobile />) : (
        <div className={styles.container}>
            <div className={styles.banner}>
                <img src={teamData.bannerImg} className={styles.bannerImg} alt="" />
                <div className={styles.bannerTextBox}>
                    <div className={styles.bannerTitle}>{teamData.bannerTitle}</div>
                    <div className={styles.bannerText}>{teamData.bannerText}</div>
                </div>
            </div>
            <div className={styles.midBox}>
                {teamData?.list?.map((item, index) => (
                    <div key={index} className={styles.midInnerBox}>
                        <OverPack playScale={0.3}>
                        <TweenOne animation={{opacity: 0,type: 'from', ease: 'easeInCirc'}} className={styles.listTitle}>{item.title}</TweenOne>
                        </OverPack>
                        <div className={styles.list}>
                            {item.data.map((v, i) => (
                               role==='admin' ? (
                                   <OverPack className={classnames(styles.listItem)} playScale={0.3} key={i}>
                               <TweenOne className={styles.adminBox} key={i+'listItem'} animation={{ y: '+=50',opacity: 0,type: 'from', ease: 'easeInCirc'}}>
                                    <img src="redClose.png" alt="" className={styles.closeIcon} />
                                    <input placeholder="Name" className={styles.nameInput} value={v.name} onChange={nameChange.bind(null,index,i)} />
                                    <input placeholder="Profession" className={styles.jobInput} value={v.job} onChange={jobChange.bind(null,index,i)} />
                                    <input placeholder="email" className={styles.emailInput} value={v.email} onChange={emailChange.bind(null,index,i)} />
                                    <div className={styles.confirmBtn}>Confirm</div>
                                </TweenOne>
                                </OverPack>
                                ) : 
                                (
                                    <OverPack className={classnames(styles.listItem)} playScale={0.3} key={i}>
                                <TweenOne key={i+'listItem'} animation={{ y: '+=50',opacity: 0,type: 'from', ease: 'easeInCirc'}}>
                                {/* <img src="redClose.png" alt="" className={styles.closeIcon} /> */}
                                <div className={styles.nameText}>{v.name}</div>
                                <div className={styles.jobText}>{v.job}</div>
                                <div className={styles.emailText}>{v.email}</div>
                            </TweenOne>
                            </OverPack>
                            )
                            ))}
                            {role==='admin' ?<OverPack playScale={0.3} className={classnames(styles.listItem)}><TweenOne className={styles.addBox} key="addmember" animation={{ y: '+=50',opacity: 0,type: 'from', ease: 'easeInCirc'}} onClick={addMember.bind(null,index)}>
                                <img src="addM.png" className={styles.addMIcon} alt="" />
                                <div className={styles.addText}>Add member</div>
                            </TweenOne></OverPack> :null}
                        </div>
                    </div>
                ))}
            </div>
            <LoadMore />
        </div>
    )
}
export default connect(({team:{data},global:{role}})=>({teamData:data,role}))(TeamPage)