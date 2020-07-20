// pages/registe/registe.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import { f } from '../../utils/js/common.js'

Page({

  // 页面的初始数据
  data: {
    marginTop: '',        // 页面距顶部的距离
    pwFocus: false,       // 密码输入框的焦点
    conpwFocus: false     // 确认密码输入框的焦点
  },

  // 页面加载，适配屏幕高度
  onLoad: function () {
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

  // 当输入完密码时，点击键盘上的下一个，让确认密码框获取焦点
  conNext() {
    this.setData({ conpwFocus: true })
  },

  // 当点击登录时
  async userInfo(e) {
    // console.log(e.detail.value)
    // 获取到用户输入的学号和密码
    let info = e.detail.value
    if(info.username === '' || info.password === '' || info.confirmPwd === ''){
      Toast({
        message: '输入不可为空',
        forbidClick: true,
        duration: 800
      })
    } else if(info.password !== info.confirmPwd){
      Toast({
        message: '两次密码输入不一致',
        forbidClick: true,
        duration: 800
      })
    } else{
      // 走接口
      let { data } = await f.http('registe', 'POST', info)
      // console.log(data)
      if (data.code === 412){
        Toast({
          message: '该学号已注册',
          forbidClick: true,
          duration: 800
        })
      }else if(data.code === 200) {
        Toast({
          message: '注册成功！快去登陆吧~',
          forbidClick: true,
          duration: 1500
        })
      }else{
        Toast({
          message: '注册失败',
          forbidClick: true,
          duration: 800
        })
      }
    }
  },

  // 返回登录
  goLogin() {
    wx.navigateTo({
      url: "../login/login"
    })
  }
  
})