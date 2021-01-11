/*
 * @Author: xingzai
 * @Date: 2020-12-16 02:54:10
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-16 02:54:10
 * @FilePath: \GalaxyFrontEnd\src\models\chat.js
 */
import _ from 'lodash'
import {updateImg} from '../service/api'
import {subscribe} from '../service/chat'
export default {
    namespace:'chat',
    state:{
        visible:false,
       messages: [{
           sender:'Bot',
           avatar:'contact.png',
           msg:'Please fill in the followinginformati- on first.',
           owner:'me'
       },{
           sender:'abcddd',
           avatar:'avatar.jpg',
           msg:'Please fill in the followinginformati- on first.',
           owner:'other'
       }
    ]
    },
    reducers:{
     addMessage(state,{payload}){
         const {messages}=state
         console.log('payload',payload)
         messages.concat(payload)
         let ret=_.concat(messages,payload)
         return {
             ...state,
             messages:ret,
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
     }

    },
    effects:{
        *sendMsg({payload,cb},{call,put}){
            yield put({type:'addMessage',payload:{owner:'other',sender:'fgdd',avatar:'avatar.jpg',msg:payload.msg}})
            cb()
        },
        *subscribe({payload},{call,put}){
            const {userEmail,userNumber}=payload
            let result=yield call(subscribe,{userEmail,userNumber})
        }
    }
}