// pages/home/home.js
import request from '../../service/network.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // ------------1.原生的方式发送网络请求
    this.get_data_origin()
    // ------------2.使用封装request发送网络请求
    request({
      url: 'https://api.jisuapi.com/area/province',
    }).then(res=>{
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  get_data_origin() {
    // 发送网络请求
    wx.request({
      url: 'https://api.jisuapi.com/area/province',
      method: 'GET',
      data: {
        appkey: '97c29c58f5b8932b'
      },
      success: function(res) {
        console.log(res.data.result)
      },
      fail: function(err) {
        console.log(err)
      }
    })
  }
})