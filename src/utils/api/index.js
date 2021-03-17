/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
// const BASE_URL = 'http://localhost:3000'
const BASE_URL = '/api'

//1.用户注册
export const reqPwdRegist = ({account, password}) => ajax(BASE_URL+'/user/register', {account, password}, 'POST')
//2.用户登录
export const reqPwdLogin = ({account, password}) => ajax(BASE_URL+'/user/login', {account, password}, 'POST')
// 3、根据会话获取用户信息
export const reqUserInfo = () => ajax(BASE_URL+'/userinfo')
// 4、用户登出
export const reqLogout = () => ajax(BASE_URL+'/logout')
//传输task
export const reqStorageTask = ({task,steps,today,pick,files,note}) => ajax(BASE_URL+'/task',{task,steps,today,pick,files,note},'POST')

//5.创建存储文章分类
export const reqTaskClassAdd = ({data}) => ajax(BASE_URL+'/tasks/class/add',{data},'POST')
//6.获取文章分类
export const reqTaskClass = ({data}) => ajax(BASE_URL+'/tasks/class/get',{data},'POST')
//7.创建文章内容
export const reqTaskAdd = ({data}) =>  ajax(BASE_URL+'/task_add',{data},'POST')
//获取当前分类页
export const reqTaskPage = ({data}) => ajax(BASE_URL+'/task_get',{data},'POST')
//登录状态
export const reqLoginStatus = () => ajax(BASE_URL+'/loginstatus','POST')
//搜索task
export const reqSearchTask = ({keyword}) => ajax(BASE_URL+'/search',{keyword})
//更新task状态
export const reqTaskUpdate = ({data}) => ajax(BASE_URL+'/task_update',{data})
//删除task
export const reqTaskDelete = ({keyword}) => ajax(BASE_URL+'/task_del',{keyword})
//获取当前taskinfo
export const reqTaskInfo = ({data}) =>   ajax(BASE_URL+'/taskinfo_get',{data})
//头像
export const reqImgInfo = ({data}) =>    ajax(BASE_URL+'/api/img_upload',{data})


