/*
    通过mutation间接更新state的多个方法的对象
 */
import {
  RECEIVE_USER_INFO,//接收用户信息
  RECEIVE_TASK_CLASS,//接收分组信息
  SETTING_TASK_CLASS,//当前点击分类
  RECEIVE_CLSSS_PAGE,//当前的分类页
} from './mutation-types'

import {reqTaskClass,reqTaskPage} from "../utils/api/";


export default {
  // 同步记录用户信息
  recordUser({ commit }, userInfo) {
    commit(RECEIVE_USER_INFO, { userInfo })
  },
  //记录分类
  async recordTaskClass({state,commit}) {
    let taskClass = await reqTaskClass({data:{author:state.userInfo._id}})
    commit(RECEIVE_TASK_CLASS, { taskClass })
  },
  //保存当前点击分类
  recordCurrentClass({commit},currentClass) {
    commit(SETTING_TASK_CLASS,{currentClass})
  },
  //保存当前分类页
  async recordClassPage({state,commit}) {
    let result = await reqTaskPage({data:{classtitle:state.currentClass.id}})
    commit(RECEIVE_CLSSS_PAGE,{classPage:result.classpage})
  },  
}