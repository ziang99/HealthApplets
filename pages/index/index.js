// pages/index/index.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import { f } from '../../utils/js/common.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listBoxHeight: '',
    // 轮播图片
    swiper: [],
    // 通知
    noticeText: '',
    // nav数据
    navList: [],
    // 阅读列表数据
    readList: []
  },

  // 当点击导航nav时
  goIn(e) {
    // 获取到点击的id
    // console.log(e.currentTarget.dataset.id)
    let navId = e.currentTarget.dataset.id
    if (navId == '1'){
      wx.navigateTo({
        url: '../healthStatus/healthStatus'
      })
    } else if (navId == '2') {
      wx.navigateTo({
        url: '../dangerArea/dangerArea'
      })
    } else if (navId == '3') {
      wx.navigateTo({
        url: '../activityTrack/activityTrack'
      })
    } else if (navId == '4') {
      wx.navigateTo({
        url: '../personCenter/personCenter'
      })
    }
  },

  // 当点击详情页时 
  goDetail(e) {
    // console.log(e.currentTarget.dataset.id)
    let detailId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../listDetail/listDetail?id=${detailId}`
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 高度适配
    wx.getSystemInfo({
      success: (res) => {
        // 获取可用窗口的高度
        let windowHeight = res.windowHeight
        // console.log(windowHeight)
        // 获取列表内容距离最上面的高度
        let query = wx.createSelectorQuery();
        query.select('.listContent').boundingClientRect(rect => {
          let top = rect.top;
          // console.log(top)
          // 计算得到列表盒子的高度
          let height = windowHeight - top
          this.setData({
            listBoxHeight: height
          })
        }).exec();
      }
    })

    // 请求首页数据
    let { data } = await f.http('home', 'GET')
    // console.log(data)
    if (data.code !== 200 || data.data.length == 0 || !data){
      Toast({
        message: '加载失败',
        forbidClick: true,
        duration: 800
      })
    }else{
      // 配置图片路径
      let banner = data.data.banner
      let nav = data.data.nav
      banner.forEach((item) => {
        item.url = app.globalData.baseURL + item.url
      })
      nav.forEach((item) => {
        item.img = app.globalData.baseURL + item.img
      })
      this.setData({
        swiper: banner,
        navList: nav
      })
      // 通告
      let noticeStr = ''
      data.data.notice.forEach((item) => {
        noticeStr += item.content + '   '
      })
      this.setData({
        noticeText: noticeStr
      })
    }

    // 请求阅读列表数据
    let { data: readlist } = await f.http('home/readlist', 'GET')
    // console.log(readlist)
    if(!readlist || readlist .code !== 200 || readlist.data.length == 0){
      Toast({
        message: '加载失败',
        forbidClick: true,
        duration: 800
      })
    }else{
      // 配置图片路径
      let read = readlist.data
      read.forEach((item) => {
        item.childrens.forEach((citem) => {
          citem.img = app.globalData.baseURL + citem.img
        })
      })
      this.setData({
        readList: read
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
    // 隐藏小房子按钮
    wx.hideHomeButton()
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