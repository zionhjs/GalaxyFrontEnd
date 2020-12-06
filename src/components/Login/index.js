/*
 * @Author: xingzai
 * @Date: 2020-11-13 08:15:18
 * @LastEditors: xingzai
 * @LastEditTime: 2020-11-13 08:18:07
 * @FilePath: \test\src\components\Login\index.js
 */

import React, { useState,useEffect,useCallback } from 'react'
import {connect} from 'dva'
import {login} from '../../service/api'
import styles from './index.css'

const Login=(props)=> {
    const { visible,dispatch} = props
    const [account,setAccount]=useState('')
    const [pass,setPass]=useState('')
    function accountChange(e){
        setAccount(e.target.value)
        console.log(account)
    }
    function passwordChange(e){
        setPass(e.target.value)
        console.log(pass)
    } 
    async function Log(){
    let result=await login({username:account,password:pass})
    if(result&&result.jwt){
        await localStorage.setItem('artjwt',JSON.stringify(result.jwt))
        dispatch({type:'global/closeLogin'})
       }    
    }
    const cancel=useCallback(()=>{
        dispatch({type:'global/closeLogin'})
    },[])   

    return (
        visible ? (<div className={styles.container}>
            <div className={styles.closeWrapper}>
                <img src="purplelogo.png" className={styles.logo} alt="" />
                {/* <img src="loginClose.png" className={styles.closeIcon} onClick={handleClose} alt="" /> */}
            </div>
            <div className={styles.loginBox}>
                <div className={styles.loginTitle}>Management system</div>
                <input value={account} onChange={accountChange} placeholder="Account" className={styles.accountInput} />
                <input value={pass} onChange={passwordChange} type="password" placeholder="Password" className={styles.passwordInput} />
                <div className={styles.textWrapper}><span className={styles.regText}>Registration</span><span className={styles.forgetText}>Forget Password</span></div>
                <div onClick={Log} className={styles.loginBtn}>LOG IN</div>
                <div onClick={cancel} className={styles.cancelBtn}>CANCEL</div>
            </div>
           
        </div>):null
    )
}
export default connect(({global})=>({visible:global.loginVisible}))(Login)
