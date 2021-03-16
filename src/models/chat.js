/*
 * @Author: xingzai
 * @Date: 2020-12-16 02:54:10
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-16 02:54:10
 * @FilePath: \GalaxyFrontEnd\src\models\chat.js
 */
import _ from 'lodash'
import {subscribe,sendMessage,getMessage} from '../service/chat'
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
       return {
         ...state,
         messages: payload
       }
      }

    },
    effects:{
        *sendMsg({payload,cb},{call,put,select}){
            let {email}=yield select(state=>state.chat)
            let ret=yield call(sendMessage,{email,message:payload.msg})
          console.log('ret==',ret)
            yield put({type:'saveMsg',payload:ret.datas})
            cb()
        },
        *subscribe({payload},{call,put}){
            const {userEmail,userNumber}=payload
          yield put({type:'saveEmail',payload:'admin@galaxy.com'})
            let result=yield call(subscribe,{userEmail,userNumber})
        }
    }
}
