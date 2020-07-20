// pages/listDetail/listDetail.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import { f } from '../../utils/js/common.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '内容详情',
    image: '',
    ctitle: '',
    date: '',
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 接受传过来的id参数
    // console.log(options.id)
    let id = options.id
    // 请求详情页面数据
    let { data } = await f.http(`detail/${id}`, 'GET')
    // console.log(data)
    if (data.code !== 200 || data.data.length == 0){
      Toast({
        message: '加载失败',
        forbidClick: true,
        duration: 800
      })
    }else{
      // 配置图片路径
      let read = data.data
      let arr = read.map(({ img }) => img)
      arr[0] = app.globalData.baseURL + arr[0]
      
      let ctitle = read.map(({ title }) => title)
      let date = read.map(({ date }) => date)
      let str = date[0]
      let flag = "T";
      let start = str.indexOf(flag);//获得字符串的开始位置
      let result = str.substring(0, start);//截取字符串
      // console.log(result)
      let content = read.map(({ content }) => content)
      this.setData({
        image: arr[0],
        ctitle: ctitle,
        date: result,
        content: content
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})