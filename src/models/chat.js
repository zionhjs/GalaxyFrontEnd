/*
 * @Author: xingzai
 * @Date: 2020-12-16 02:54:10
 * @LastEditors: xingzai
 * @LastEditTime: 2020-12-16 02:54:10
 * @FilePath: \GalaxyFrontEnd\src\models\chat.js
 */
import _ from 'lodash'
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
     }

    },
    effects:{
        *sendMsg({payload,cb},{call,put}){
            yield put({type:'addMessage',payload:{owner:'other',sender:'fgdd',avatar:'avatar.jpg',msg:payload.msg}})
            cb()
        }
    }
}