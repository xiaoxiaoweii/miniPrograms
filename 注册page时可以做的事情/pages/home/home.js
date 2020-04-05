// pages/home/home.js
// 注册一个页面
// --------1. 监听页面的生命周期函数 -------------
// --------2. 初始化数据 -----------
// -------3. 监听事件 --------
// ------4. 监听其他相关事件 下拉刷新等 ------
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: '',
    message: '我大道'
  },
  handleViewClick () {
    console.log('我被点击了')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('生命周期函数 监听页面加载 onLoad')
    wx.request({
      url: 'https://api.jisuapi.com/weather/query?appkey=97c29c58f5b8932b&city=安顺',
      success: (res)=> {
        console.log(res.data.result.daily)
        const data = res.data.result.daily
        this.setData({
          list: data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('生命周期函数 监听页面初次渲染完成 onReady')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('生命周期函数 监听页面显示 onShow')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('生命周期函数 监听页面隐藏 onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('生命周期函数 监听页面卸载 onUnload')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('页面相关事件处理函数 监听用户下拉动作 onPullDownRefresh')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('页面上拉触底事件的处理函数 onReachBottom')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('用户点击右上角分享 onShareAppMessage')
  }
})