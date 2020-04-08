// pages/home/home.js
// 日期格式化函数
let utils = require('../../utils/util')
// 获取百度地图对象
let bmap = require('../../assets/bmap-wx')
// 获取全局数据
let globalData = getApp().globalData
// 获取全局数据中定义的用户系统信息
let SYSTEMINFO = globalData.systeminfo
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 城市天气数据
    cityDatas: {},
    // 温馨提示 图标
    icons: ['/assets/images/clothing.png', '/assets/images/carwashing.png', '/assets/images/pill.png', '/assets/images/running.png', '/assets/images/sun.png'],
  },
  // 初始化百度地图数据
  init(params) {
    // 新建百度地图对象
    let BMap = new bmap.BMapWX({
      // 使用全局定义的百度地图ak
      ak: globalData.ak,
    })
    // 发起weather请求 
    BMap.weather({
      // 当地经纬度 如果不传 默认本地天气
      location: params.location,
      // 返回失败数据
      fail: this.fail,
      // 返回成功数据
      success: this.success
    })
  },
  // 处理成功返回的天气数据
  success(data) {
    // 停止下拉刷新
    wx.stopPullDownRefresh()
    // 新建日期对象
    let now = new Date()
    // 当前事件
    data.updateTime = now.getTime()
    // 当前事件格式化
    data.updateTimeFormat = utils.formatDate(now, "MM-dd hh:mm")
    
    // 将pm登记存储到data中
    let results = data.originalData.results[0] || {}
    data.pm = this.calcPM(results['pm25'])
    // 当天实时温度 只要其中的数字 \d 数字 g全局匹配 [2]两位数字
    data.temperature = `${results.weather_data[0].date.match(/\d+/g)[2]}`
    // 将天气数据存储到本地内存
    console.log(data.pm)
    wx.setStorage({
      key: 'cityDatas',
      data: data,
    })
    // 将成功返回的城市天气数据交给 cityDatas
    this.setData({
      cityDatas: data,
    })
    console.log(this.data.cityDatas)
  },
  // 返回天气数据失败
  fail (res) {
    // 停止下拉刷新
    wx.stopPullDownRefresh()
    // 获取失败信息
    let errMsg = res.errMsg || ''
    // 拒绝授权地理位置权限
    if (errMsg.indexOf('deny') !== -1 || errMsg.indexOf('denied') !== -1) {
      wx.showToast({
        title: '需要开启地理位置权限',
        icon: 'none',
        duration: 2500,
        success: (res) => {
          if (this.canUseOpenSettingApi()) {
            let timer = setTimeout(() => {
              clearTimeout(timer)
              wx.openSetting({})
            }, 2500)
          } else {
            // this.setData({
            //   openSettingButtonShow: true,
            // })
            console.log("打开定位")
          }
        },
      })
    } else {
      wx.showToast({
        title: '网络不给力，请稍后再试',
        icon: 'none',
      })
    }
  },
  // 根据数值计算pm等级
  calcPM(value) {
    if (value > 0 && value <= 50) {
      return {
        val: value,
        desc: '优',
        detail: '今天天气不错',
      }
    } else if (value > 50 && value <= 100) {
      return {
        val: value,
        desc: '良',
        detail: '今天天气良',
      }
    } else if (value > 100 && value <= 150) {
      return {
        val: value,
        desc: '轻度污染',
        detail: '对敏感人群不健康',
      }
    } else if (value > 150 && value <= 200) {
      return {
        val: value,
        desc: '中度污染',
        detail: '不健康',
      }
    } else if (value > 200 && value <= 300) {
      return {
        val: value,
        desc: '重度污染',
        detail: '非常不健康',
      }
    } else if (value > 300 && value <= 500) {
      return {
        val: value,
        desc: '严重污染',
        detail: '有毒物',
      }
    } else if (value > 500) {
      return {
        val: value,
        desc: '爆表',
        detail: '快进屋',
      }
    }
  },
  // 下拉刷新获取数据
  onPullDownRefresh(res) {
    this.init({})
  },
  // 显示页面
  onShow() {
    this.init({})
  },
  // 分享
  onShareAppMessage (res) {
    return {
      title: '晓晓天气预报',
      path: `/pages/home/home`,
      // imageUrl: '',
      success() {},
      // 分享失败弹出信息
      fail(e) {
        let errMsg = e.errMsg || ''
        // 对不是用户取消转发导致的失败进行提示
        let msg = '分享失败，可重新分享'
        if (errMsg.indexOf('cancel') !== -1) {
          msg = '取消分享'
        }
        wx.showToast({
          title: msg,
          icon: 'none',
        })
      }
    }
  },
})