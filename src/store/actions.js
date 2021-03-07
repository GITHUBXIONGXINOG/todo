/*
    通过mutation间接更新state的多个方法的对象
 */
import {
    RECEIVE_USER_INFO,//接收用户信息
} from './mutation-types'


export default {
// 同步记录用户信息
  recordUser({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },

 

}