/*
    通过mutation间接更新state的多个方法的对象
 */
import {
  RECEIVE_USER_INFO,//接收用户信息
  RECEIVE_TASK_CLASS,//接收分组信息
  SETTING_TASK_CLASS,//当前点击分类
  RECEIVE_CLSSS_PAGE,//当前的分类页
  RECEIVE_LOGIN_STATUS,//登录状态
  RECEIVE_CLEAR_STATE,//清空state
  SET_SEARCH_KEY,//搜索词
  RECEIVE_SEARCH_PAGE,//搜索页
  SET_SLIDE_FLAG,//slide页面标识
  SET_CURRENT_TASK,//当前点击task
  SET_TASKINFO_FLAG,//taskinfo面板标识

} from './mutation-types'

import {reqLoginStatus, reqTaskClass,reqTaskPage,reqTaskInfo} from "../utils/api/";


export default {
  // 同步记录用户信息
  recordUser({ commit }, userInfo) {
    commit(RECEIVE_USER_INFO, { userInfo })
  },
  //记录分类
  async recordTaskClass({state,commit}) {
    let taskClass = await reqTaskClass({data:{author:state.userInfo._id}})
    // localStorage.setItem('currentCLass',JSON.stringify(result))
    state.currentClass = {
      title: taskClass[0].taskClass,
      _id: taskClass[0]._id,
    } 
    commit(RECEIVE_TASK_CLASS, { taskClass })
  },
  //获取并保存当前点击分类
  recordCurrentClass({commit},currentClass) {
    commit(SETTING_TASK_CLASS,{currentClass})
  },
  //获取并保存当前分类页
  async recordClassPage({state,commit}) {
      // console.log(state);
      let result = await reqTaskPage({data:{
        classtitle:state.currentClass._id ,
        title: state.currentClass.title
      }})
      commit(RECEIVE_CLSSS_PAGE,{classPage:result.classpage})
 
  },  
  //获取登录状态
  async getLoginStatus({state,commit}){
    let result = await reqLoginStatus()
    localStorage.setItem('userInfo',JSON.stringify(result))
    // console.log('获取登录状态');
    commit(RECEIVE_LOGIN_STATUS,{loginStatus: result.loginStatus})
  },
  //退出清空state
  clearState({commit}){
    commit(RECEIVE_CLEAR_STATE)
  },
  //存储搜索词
  setSearchKey({commit},searchKey){
    commit(SET_SEARCH_KEY,{searchKey})
  },
  //存储搜索页
  setSearchPage({commit},searchPage){
    commit(RECEIVE_SEARCH_PAGE,{searchPage})
  },
  //slide页面标识
  setSlideFlag({commit},slideFlag){
    commit(SET_SLIDE_FLAG,{slideFlag})
  },
  //当前点击task
  setCurrentTask({commit},task){
    commit(SET_CURRENT_TASK,{task})
  },
  //taskinfo面板标识
  setTaskInfoFlag({commit},data){
    commit(SET_TASKINFO_FLAG,{data})
  },
  //更新当前的task
 async updateCurrentTask({state,commit}){
    await reqTaskInfo({data:state.currentTask._id}).then((req,res)=>{
      // console.log(req.classpage[0]);
      commit(SET_CURRENT_TASK,{task:req.classpage[0]})

    })
  }

}