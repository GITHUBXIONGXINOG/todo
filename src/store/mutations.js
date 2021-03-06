/*
    直接更新state的多个方法的对象
 */

import {
    RECEIVE_USER_INFO,//接收用户信息
    RECEIVE_TASK_CLASS,//接收分组信息
    SETTING_TASK_CLASS,//当前点击分类
    RECEIVE_CLSSS_PAGE,//当前的分类页
    RECEIVE_LOGIN_STATUS,//登录状态,
    RECEIVE_CLEAR_STATE,//清空state
    SET_SEARCH_KEY,//搜索词
    RECEIVE_SEARCH_PAGE,//搜索页
    SET_SLIDE_FLAG,//slide页面标识
    SET_CURRENT_TASK,//当前点击task
    SET_TASKINFO_FLAG,//taskinfo面板标识
} from './mutation-types'

export default {
    //更新用户信息到state.userInfo中
    [RECEIVE_USER_INFO](state, { userInfo }) {
        state.userInfo = userInfo
    },

    //更新分类信息到state.taskClass中 
    [RECEIVE_TASK_CLASS](state, { taskClass }) {
        state.taskClass = taskClass
    },

    //保存当前点击的分类到currentClass
    [SETTING_TASK_CLASS](state, { currentClass }) {
        state.currentClass = currentClass
    },
    //保存当前的分类页
    [RECEIVE_CLSSS_PAGE](state, { classPage }) {
        state.classPage = classPage
    },
    //获取登录状态
    [RECEIVE_LOGIN_STATUS](state, { loginStatus }) {
        state.loginStatus = loginStatus
    },
    //清空state
    [RECEIVE_CLEAR_STATE](state) {
        state.userInfo = {}, // 用户信息
            state.taskClass = [],// 分类信息
            state.currentClass = {//当前分类
                title: 'Myday',//分类标题
                id: '',//唯一id
            },
            state.currentClass = [],//当前分类页
            state.classPage = [],//当前分类页
            state.loginStatus = false,//登录状态
            state = {}
            state.taskInfoFlag = {
                flag:false,
                _id:''
            }//taskinfo面板标识
    },
    //保存当前搜索词
    [SET_SEARCH_KEY](state, { searchKey }) {
        state.searchKey = searchKey
    },
    //搜索页
    [RECEIVE_SEARCH_PAGE](state, { searchPage }) {
        state.searchPage = searchPage
    },
    //slide页面标识
    [SET_SLIDE_FLAG](state, { slideFlag }) {
        state.slideFlag = slideFlag
    },
    //当前点击task
    [SET_CURRENT_TASK](state, { task }) {
        state.currentTask = task
    },
    //taskinfo面板标识
    [SET_TASKINFO_FLAG](state, { data }) {
        let { _id } = data
        state.taskInfoFlag = {
            flag : state.currentTask._id == _id ? !state.taskInfoFlag.flag : true,
            _id
        }
    }
}