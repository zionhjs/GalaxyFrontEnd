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
      lastIndex:0,
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
      saveMsg(state,{payload=[]}){
       return {
         ...state,
         messages: payload.map(item=>{
           let msgReg=/^From\:(system|user)\s#\s([\s\S]*)\s#\smsg\.index:(\d+)$/
           let temp=item.match(msgReg)
           let [ret,from,msg,index]=temp
           if(from=='system'){
           msg=msg.split('%')
           }else{
           msg=[msg]
           }
           return {
             from,
             msg
           }
         }),
         lastIndex:payload.length-1
       }
      },
      addMsg(state,{payload}){
       const {messages}=state;
       return {
         ...state,
         messages:messages.concat([{from:'user',msg:[payload]}])
       }
      },
      saveHeartBeat(state,{payload}){
        const {messages}=state
        let data=payload?.data?.map(item=>{
          let msgReg=/^From\:(system|user)\s#\s([\s\S]*)\s#\smsg\.index:(\d+)$/
          let temp=item.match(msgReg)
          let [ret,from,msg,index]=temp
          if(from=='system'){
            msg=msg.split('%')
          }else{
            msg=[msg]
          }
          return {
            from,
            msg
          }
        })
        let mess=messages.slice(0,payload.lastIndex+1).concat(data);
        return {
          ...state,
          messages:mess,
          lastIndex: mess.length-1
        }
      }
    },
    effects:{
      *connect({payload},{call,put,select}){
        let {email}=yield select(state=>state.chat)
        let ret=yield call(connect,{email})
      },
      *disconnect({payload},{call,put,select}){
        let {email}=yield select(state=>state.chat)
        yield call(disconnect,{email})
      },
      *beat({payload,cb},{call,put,select}){
        let {email,lastIndex}=yield select(state=>state.chat)
         let ret=yield call(heartBeat,{email,index: lastIndex})
        yield put({type:'saveHeartBeat',payload:{lastIndex,data:ret?.datas||[]}})
        if(cb)cb()
      },
        *sendMsg({payload,cb},{call,put,select}){
          let sendNode=window.document.getElementById('sendWav')
          sendNode.play();
           yield put({type:'addMsg',payload:payload.msg})
          yield put({type:'setLoading',payload:true})
            let {email}=yield select(state=>state.chat)
            let ret=yield call(sendMessage,{email,message:payload.msg})
          let result=yield call(getMessage,{email})
          yield put({type:'saveMsg',payload:result.datas||[]})
            yield put({type:'setLoading',payload:false})
            let receiveNode=window.document.getElementById('receiveWav')
            receiveNode.play();
            cb()
          sendNode=null;
            receiveNode=null;
        },
      *fetchMsg({payload},{call,put,select}){
          let {email}=yield select(state=>state.chat)
        let ret=yield call(getMessage,{email})
        yield put({type:'saveMsg',payload:ret.datas||[]})
      },
        *subscribe({payload},{call,put}){
            let {userEmail,userNumber}=payload
          yield put({type:'saveEmail',payload:userEmail})
            let result=yield call(subscribe,{userEmail,userNumber})
            if(result.code==200||result.code==400){
              yield put({type:'global/notify',payload:{type:'subscribe-success',duration:2000,message:"Successfully Subscribed from our list, you will get a quote soon!",transitionName:'subscribe'}})
              yield put({type:'global/setChatToken',payload:true})
                yield put({type:'global/closeContact'})
            }else{
              yield put({type:'global/notify',payload:{type:'subscribe-error',duration: 2000,message:'Your Email is not in correct format',transitionName: 'subscribe'}})
            }
        }
    }
}
