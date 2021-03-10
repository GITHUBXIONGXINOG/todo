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

//5.存储文章分类
export const reqTaskClassAdd = ({taskClass}) => ajax(BASE_URL+'/tasks/class/add',{taskClass},'POST')
