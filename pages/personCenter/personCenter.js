// pages/personCenter/personCenter.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: false
  },

  // 
  none() {
    Toast({
      message: '功能暂未开放',
      forbidClick: true,
      duration: 800
    })
  },

  // 跳转到个人信息详情页
  goinfoDetail() {
    wx.navigateTo({
      url: '../personInfo/personInfo'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    



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