// pages/login/login.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import { f } from '../../utils/js/common.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 页面距顶部的距离
    marginTop: '',
    // 密码输入框的焦点
    pwFocus: false
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        // 获取可用窗口的高度
        let windowHeight = res.windowHeight
        // 获取页面内容的高度
        let query = wx.createSelectorQuery();
        query.select('.login_content').boundingClientRect(rect => {
          let contentHeight = rect.height;
          // 计算得到页面内容距离顶部的高度
          let marginTop = (windowHeight - contentHeight) / 2;
          this.setData({
            marginTop: marginTop
          })
        }).exec();
      }
    })
  },

  // 当输入完学号时，点击键盘上的下一个，让密码框获取焦点
  confirmNext() {
    this.setData({ pwFocus: true })
  },

  // 当点击登录时
  async userInfo(e) {
    // console.log(e.detail.value)
    // 获取到用户输入的学号和密码
    let info = e.detail.value
    if(info.username === '' || info.password === ''){
      Toast({
        message: '输入不可为空',
        forbidClick: true,
        duration: 800
      })
    }else{
      // 走接口
      let { data } = await f.http('login', 'POST', info)
      // console.log(data)
      if (data.code !== 200 || !data.data){
        Toast({
          message: '学号或密码有误',
          forbidClick: true,
          duration: 800
        })
      }else{
        // 将得到的id和token值保存在本地缓存中
        wx.setStorageSync('id', data.data.id)
        wx.setStorageSync('token', data.data.token)
        // 登录成功
        Toast.loading({
          message: '正在登录...',
          forbidClick: true,
          duration: 300,
          onClose: () => {
            // 判断是否已经录入过个人信息
            if (data.data.name == ''){
              // 跳转到个人信息页
              wx.redirectTo({
                url: "../personInfo/personInfo"
              })
            }else{
              // 跳转到首页
              wx.redirectTo({
                url: "../index/index"
              })
            }
          }
        })
      }
    }
  },

  // 跳转到注册
  goRegiste() {
    wx.navigateTo({
      url: "../registe/registe"
    })
  }

})