// // 注册小程序示例
// App({

//   /**
//    * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
//    */
//   onLaunch: function () {
//     console.log('小程序初始化完成')
//     // 异步调用
//     // 获取用户信息
//     wx.getUserInfo({
//       // 数据拿到之后再进行回调
//       success: function(res) {
//         console.log(res)
//       }
//     })
//   },

//   /**
//    * 当小程序启动，或从后台进入前台显示，会触发 onShow
//    */
//   onShow: function (options) {
//     console.log("界面显示出来：onShow")
//     // 判断小程序的进入场景
//     console.log(options)
//     switch(options.scene) {
//       case 1001:
//         break;
//       case 1005:
//         break
//     }

//     // 1. 获取用户信息
//     wx.getUserInfo({
//       // 数据拿到之后再进行回调
//       success: function(res) {
//         console.log(res.userInfo.nickName)
//       }
//     })
//   },

//   /**
//    * 当小程序从前台进入后台，会触发 onHide
//    */
//   onHide: function () {
//     console.log("小程序被隐藏")
//   },

//   /**
//    * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
//    */
//   onError: function (msg) {
//     console.log("小程序发生错误时")
//   },
//   // 定义的全局数据全页面共享
//   globalData: {
//     name: 'xiaoxiaoweii',
//     age: 18
//   }
// })
