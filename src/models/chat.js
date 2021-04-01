/*
 * @Author: xingzai
 * @Date: 2020-12-16 02:54:10
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-16 02:54:10
 * @FilePath: \GalaxyFrontEnd\src\models\chat.js
 */
import _ from 'lodash'
import {subscribe,sendMessage,getMessage,connect} from '../service/chat'
export default {
    namespace:'chat',
    state:{
        visible:false,
      email:'',
      messages: []
    },
    reducers:{
     openChat(state){
         return {
             ...state,
             visible:true
         }
     },
     closeChat(state){
         return {
             ...state,
             visible:false
         }
     },
     toggleChat(state){
         return {
             ...state,
             visible:!state.visible
         }
     },
      saveEmail(state,{payload}){
       return {
         ...state,
         email:payload
       }
      },
      saveMsg(state,{payload}){
       let msgReg=/^From\:(system|user)\s#\s([^\s]*)\s#\smsg\.index:(\d+)$/
       return {
         ...state,
         messages: payload.map(item=>{
           let [ret,from,msg,index]=item.match(msgReg)
           return {
             from,
             msg,index
           }
         })
       }
      },
      receiveMsg(state,{payload}){
       const {messages}=state;
        let msgReg=/^From\:(system|user)\s#\s([^\s]*)\s#\smsg\.index:(\d+)$/
        let [ret,from,msg,index]=payload[0].match(msgReg)
       return {
         ...state,
         messages:messages.concat([{from,msg,index}])
       }
      }

    },
    effects:{
        *sendMsg({payload,cb},{call,put,select}){
            let {email}=yield select(state=>state.chat)
            let ret=yield call(sendMessage,{email,message:payload.msg})
          console.log('ret==',ret)
            yield put({type:'receiveMsg',payload:ret.datas})
            cb()
        },
      *fetchMsg({payload},{call,put,select}){
          let {email}=yield select(state=>state.chat)
        let ret=yield call(getMessage,{email})
        yield put({type:'saveMsg',payload:ret.datas})
      },
        *subscribe({payload},{call,put}){
            let {userEmail,userNumber}=payload
          userEmail='admin@xingzai.com'
          userNumber=2138224642
          yield put({type:'saveEmail',payload:userEmail})
            let result=yield call(subscribe,{userEmail,userNumber})
            yield put({type:'global/setChatToken',payload:true})

            let ret=yield call(connect,{email:userEmail})
          if(ret.code==200||ret.code==400){
           yield put({type:'openChat'})
           yield put({type:'global/closeContact'})
          }
        }
    }
}
