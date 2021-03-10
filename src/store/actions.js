/*
    通过mutation间接更新state的多个方法的对象
 */
import {
  RECEIVE_USER_INFO,//接收用户信息
  RECEIVE_TASK_CLASS,//接收分组信息
} from './mutation-types'

import {reqTaskClass} from "../utils/api/";


export default {
  // 同步记录用户信息
  recordUser({ commit }, userInfo) {
    commit(RECEIVE_USER_INFO, { userInfo })
  },
  //记录分类
  async recordTaskClass({state,commit}) {
    let taskClass = await reqTaskClass({data:{author:state.userInfo._id}})
    commit(RECEIVE_TASK_CLASS, { taskClass })
  }
}