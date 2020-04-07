App({
  onLaunch () {
    let that = this
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.globalData.systeminfo = res
      },
    })
  },
  globalData: {
    // 是否保持常亮，离开小程序失效
    keepscreenon:false,
    // 存储系统信息
    systeminfo: {},
    // ak: 'your baidu map application ak',
  },
  // setGeocoderUrl (address) {
  //   return `https://api.map.baidu.com/geocoder/v2/?address=${address}&output=json&ak=${this.globalData.ak}`
  // },
})