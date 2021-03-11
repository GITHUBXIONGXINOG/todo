/*
    直接更新state的多个方法的对象
 */

import {
    RECEIVE_USER_INFO,//接收用户信息
    RECEIVE_TASK_CLASS,//接收分组信息
    SETTING_TASK_CLASS,//当前点击分类
    RECEIVE_CLSSS_PAGE,//当前的分类页
    RECEIVE_LOGIN_STATUS,//登录状态
} from './mutation-types'

export default {
    //更新用户信息到state.userInfo中
    [RECEIVE_USER_INFO] (state,{userInfo}){
        state.userInfo = userInfo
    },
    
    //更新分类信息到state.taskClass中 
    [RECEIVE_TASK_CLASS] (state,{taskClass}){
        state.taskClass = taskClass
    },
    
    //保存当前点击的分类到currentClass
    [SETTING_TASK_CLASS] (state,{currentClass}){
        state.currentClass = currentClass
    },
    //保存当前的分类页
    [RECEIVE_CLSSS_PAGE](state,{classPage}){
        state.classPage = classPage
    },
    //获取登录状态
    [RECEIVE_LOGIN_STATUS](state,{loginStatus}){
        state.loginStatus = loginStatus
    }
}