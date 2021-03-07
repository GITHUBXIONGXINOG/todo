/*
    直接更新state的多个方法的对象
 */

import {
    RECEIVE_USER_INFO,//接收用户信息
} from './mutation-types'

export default {
    //更新用户信息到state.userInfo中
    [RECEIVE_USER_INFO] (state,{userInfo}){
        state.userInfo = userInfo
    }
}