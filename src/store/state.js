/*
    状态对象
 */
export default {
    userInfo: {}, // 用户信息
    taskClass:[],// 分类信息
    currentClass: {//当前分类
        title: 'Myday',//分类标题
        id:'',//唯一id
    },
    classPage: [],//当前分类页
    loginStatus: false,//登录状态
    searchKey: '',//搜索词
    searchPage:[],//搜索页
    slideFlag: true,//标识是否在slidepage还是搜索页的flag
    currentTask:{},//当前点击的task
    taskInfoFlag:{
        flag:false,
        _id:''
    },//taskinfo面板标识
}