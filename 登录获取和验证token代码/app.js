const TOKEN = 'token'
App({
  globalData: {
    token: ''
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    // 1. 先从缓存中取出token
    const token = wx.getStorageSync(TOKEN)
    // 2. 判断token是否有值 
    if(token && token.lengh !== 0) { 
      // 已经有token 验证token是否过期
      this.check_token()
    } else {
      // 没有token 进行登陆操作
      this.login()
    }
  },
  // 检查token是否过期
  check_token(token) {
    wx.request({
      url: 'http://123.207.32.32:3000/auth',
      method: 'post',
      header: {
        token
      },
      success: (res)=> {
        // 检测token
        if(!res.data.errCode){
          // token没过期
          this.globalData.token = token
        } else {
          // 过期 再登录
          this.login
        }
        console.log(res)
      },
      fail: (res)=> {
        console.log(res)
      }
    })
  },
  // 登录
  login() {
    // 登录操作 code只有五分钟有效期
    wx.login({
      success: (res) => {
        console.log(res)
        // 1. 获取code
        const code = res.code;
        // 2. 将code发送给我们的服务器
        wx.request({
          url: 'http://123.207.32.32:3000/login',
          method: 'post',
          data: {
            code
          },
          success:  (res)=> {
            console.log(res)
            // 1.取出token
            const token = res.data.token;
            // 将token保存在globalData中
            this.globalData.token = token
            console.log(this.globalData.token)
            // 3. 进行本地存储
            wx.setStorageSync(TOKEN, token)
          }
        })
      }
    })
  }
})
