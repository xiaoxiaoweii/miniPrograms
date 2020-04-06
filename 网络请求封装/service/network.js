// 封装网络请求函数
export default function request(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: options.url,
      method: options.method || 'get',
      data: options.data || {},
      success:function(res) {
        resolve(res)
      },
      fail: function(res) {
        reject(err)
      }
    })
  })
}