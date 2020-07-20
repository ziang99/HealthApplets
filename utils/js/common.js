class F {
  constructor() {
    this.baseUrl = 'http://192.168.0.102:3000/index/',
    this.ajaxTimes = 0
  }
  http(url, method, data) {
    this.ajaxTimes++;
    if (url !== 'login' && url !== 'healthstatus' && url !== 'addinfo'){
      // 显示加载中效果
      wx.showLoading({
        title: '加载中',
        mask: true
      })
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseUrl + url,
        method,
        data,
        header: {
          token: wx.getStorageSync('token')
        },
        success(res){
          resolve(res)
        },
        fail(err) {
          reject(err)
        },
        complete: () => {
          this.ajaxTimes--;
          if (this.ajaxTimes === 0){
            // 关闭加载中效果
            wx.hideLoading()
          } 
        }
      })
    })
  }
}
let f = new F()
export { f }













