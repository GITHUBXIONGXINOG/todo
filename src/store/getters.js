import state from "./state"

// 用户的个人信息
export const userInfo = state => state.userInfo

//获取分类信息
export const taskClass = state => state.taskClass

//获得当前分类
export const currentClass = state => state.currentClass

//获取当前分类页
export const classPage = state => state.classPage

//获取登录状态
export const loginStatus = state => state.loginStatus

//获取当前的搜索词
export const searchKey = state => state.searchKey

//获取当前的搜索页
export const searchPage = state => state.searchPage

//获取搜索flag
export const slideFlag = state => state.slideFlag

//获取当前task
export const currentTask = state => state.currentTask

//获取当前taskinfo标识
export const taskInfoFlag = state => state.taskInfoFlag