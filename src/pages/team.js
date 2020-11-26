import React, { useMemo,useState,useEffect } from 'react'
import classnames from 'classnames'
import styles from './team.css'
import LoadMore from '../components/LoadMore'
import teamJson from '../data/team.json'

const role="admn"
export default function (props) {
    function addMember(index){
     teamData.list[index].data.push({name:'',job:'',email:''})
     setTeamData({...teamData})
    }
    function nameChange(index,i,e)
    {
        teamData.list[index]['data'][i]['name']=e.target.value
        setTeamData({...teamData})
    }
    function jobChange(index,i,e){
        teamData.list[index]['data'][i]['job']=e.target.value
        setTeamData({...teamData})
    }
    function emailChange(index,i,e){
        teamData.list[index]['data'][i]['email']=e.target.value
        setTeamData({...teamData})
    }
    const [teamData,setTeamData]=useState({})
    useEffect(()=>{
  setTeamData(teamJson)
    },[])
    return (
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
                        <div className={styles.listTitle}>{item.title}</div>
                        <div className={styles.list}>
                            {item.data.map((v, i) => (
                               role==='admin' ? (<div key={i} className={classnames(styles.listItem,styles.adminBox)}>
                                    <img src="redClose.png" alt="" className={styles.closeIcon} />
                                    <input placeholder="Name" className={styles.nameInput} value={v.name} onChange={nameChange.bind(null,index,i)} />
                                    <input placeholder="Profession" className={styles.jobInput} value={v.job} onChange={jobChange.bind(null,index,i)} />
                                    <input placeholder="email" className={styles.emailInput} value={v.email} onChange={emailChange.bind(null,index,i)} />
                                    <div className={styles.confirmBtn}>Confirm</div>
                                </div>) : 
                                (<div key={i} className={classnames(styles.listItem)}>
                                <img src="redClose.png" alt="" className={styles.closeIcon} />
                                <div className={styles.nameText}>{v.name}</div>
                                <div className={styles.jobText}>{v.job}</div>
                                <div className={styles.emailText}>{v.email}</div>
                            </div>)
                            ))}
                            {role==='admin' ?<div onClick={addMember.bind(null,index)} className={classnames(styles.addBox,styles.listItem)}>
                                <img src="addM.png" className={styles.addMIcon} alt="" />
                                <div className={styles.addText}>Add member</div>
                            </div> :null}
                        </div>
                    </div>
                ))}
            </div>
            <LoadMore />
        </div>
    )
}