/*
 * @Author: xingzai
 * @Date: 2020-12-16 02:54:10
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-16 02:54:10
 * @FilePath: \GalaxyFrontEnd\src\models\chat.js
 */
import _ from 'lodash'
import {subscribe,sendMessage,getMessage,connect,disconnect,heartBeat} from '../service/chat'
export default {
    namespace:'chat',
    state:{
        visible:false,
      email:'',
      messages: [],
      loading:false,
      len:0
    },
    reducers:{
      setLoading(state,{payload}){
        return {
          ...state,
          loading:payload
        }
      },
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
        let len=payload?.length||0
       return {
         ...state,
         len,
         messages: payload.map(item=>{
           let msgReg=/^From\:(system|user)\s#\s(.*)\s#\smsg\.index:(\d+)$/
           let temp=item.match(msgReg)
           console.log('reg',temp)
           let [ret,from,msg,index]=temp
           return {
             from,
             msg
           }
         })
       }
      },
      receiveMsg(state,{payload}){
       const {messages}=state;
        let msgReg=/^From\:(system|user)\s#\s(.*)\s#\smsg\.index:(\d+)$/
        let [ret,from,msg,index]=payload[0].match(msgReg)
       return {
         ...state,
         messages:messages.concat([{from,msg}])
       }
      },
      addMsg(state,{payload}){
       const {messages}=state;
       return {
         ...state,
         messages:messages.concat([{from:'user',msg:payload}])
       }
      }
    },
    effects:{
        *sendMsg({payload,cb},{call,put,select}){
          let sendNode=window.document.getElementById('sendWav')
          sendNode.play();
           yield put({type:'addMsg',payload:payload.msg})
          yield put({type:'setLoading',payload:true})
            let {email,len}=yield select(state=>state.chat)
            let ret=yield call(sendMessage,{email,message:payload.msg})
          let heartRes=yield call(heartBeat,{email,index:len})
          let result=yield call(getMessage,{email})
          yield put({type:'saveMsg',payload:result.datas||[]})
            yield put({type:'setLoading',payload:false})
            let receiveNode=window.document.getElementById('receiveWav')
            receiveNode.play();
           // yield put({type:'receiveMsg',payload:ret.datas})
            cb()
        },
      *fetchMsg({payload},{call,put,select}){
          let {email}=yield select(state=>state.chat)
        let ret=yield call(getMessage,{email})
        yield put({type:'saveMsg',payload:ret.datas||[]})
      },
        *subscribe({payload},{call,put}){
            let {userEmail,userNumber}=payload
         userEmail='447166939@xingzai.com'
          userNumber=2138224642
          yield put({type:'saveEmail',payload:userEmail})
          window.addEventListener('beforeunload',function() {
            disconnect({email:userEmail})
          })
            let result=yield call(subscribe,{userEmail,userNumber})
            if(result.code==200||result.code==400){
              //yield put({type:'global/notify',payload:{type:'subscribe-error',duration: 2000,message:'Your Email is not in correct format',transitionName: 'subscribe'}})
              yield put({type:'global/notify',payload:{type:'subscribe-success',duration:2000,message:"Successfully Subscribed from our list, you will get a quote soon!",transitionName:'subscribe'}})
              yield put({type:'global/setChatToken',payload:true})
              let ret=yield call(connect,{email:userEmail})
              if(ret.code==200||ret.code==400){
                yield put({type:'openChat'})
                yield put({type:'global/closeContact'})
              }
            }else{
              yield put({type:'global/notify',payload:{type:'subscribe-error',duration: 2000,message:'Your Email is not in correct format',transitionName: 'subscribe'}})
            }
        }
    }
}
