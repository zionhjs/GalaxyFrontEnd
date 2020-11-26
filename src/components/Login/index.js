/*
 * @Author: xingzai
 * @Date: 2020-11-13 08:15:18
 * @LastEditors: xingzai
 * @LastEditTime: 2020-11-13 08:18:07
 * @FilePath: \test\src\components\Login\index.js
 */

import React, { useState,useEffect } from 'react'
import {login} from '../../service/api'
import styles from './index.css'

export default function (props) {
    const { visible, close } = props
    const [account,setAccount]=useState('')
    const [pass,setPass]=useState('')
    
    function handleClose() {
        close()
    }
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
        close()
       }
    
    }   

    return (
        visible ? (<div className={styles.container}>
            <div className={styles.closeWrapper}>
                <img src="purplelogo.png" className={styles.logo} alt="" />
                <img src="loginClose.png" className={styles.closeIcon} onClick={handleClose} alt="" />
            </div>
            <div className={styles.loginBox}>
                <div className={styles.loginTitle}>Management system</div>
                <input value={account} onChange={accountChange} placeholder="Account" className={styles.accountInput} />
                <input value={pass} onChange={passwordChange} type="password" placeholder="Password" className={styles.passwordInput} />
                <div className={styles.textWrapper}><span className={styles.regText}>Registration</span><span className={styles.forgetText}>Forget Password</span></div>
                <div onClick={Log} className={styles.loginBtn}>LOG IN</div>
            </div>
           
        </div>):null
    )
}
