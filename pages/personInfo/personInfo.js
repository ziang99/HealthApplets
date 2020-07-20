// pages/index/index.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import {
  f
} from '../../utils/js/common.js'

let aaa = 0
let classes = []

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '请填写您的个人信息',
    // 是否展示性别弹出层
    showGender: false,
    // 性别选择内容
    columnsGender: ['男', '女'],
    // 选择的值
    name: '',
    gender: '',
    phone: '',
    qq: '',
    classvalue: '',
    address: '',

    // 是否展示班级弹出层
    showClass: false,
    // 班级选择内容
    columnsClass: [{
        values: []
      },
      {
        values: []
      }
    ],

    // 错误提示
    nameErr: '',
    genderErr: '',
    phoneErr: '',
    qqErr: '',
    classErr: '',
    addressErr: ''
  },

  // 当点击选择性别时的下箭头
  selectgender() {
    // 打开弹出层
    this.setData({
      showGender: true
    })
  },
  // 当点击确认时
  onconfirmGender(event) {
    const {
      value
    } = event.detail
    this.setData({
      gender: value,
      showGender: false
    })
    this.setData({
      genderErr: ''
    })
  },
  // 当点击取消时
  oncancelGender() {
    this.setData({
      showGender: false
    })
  },
  // 关闭弹出层
  onCloseGender() {
    this.setData({
      showGender: false
    })
  },

  // 当点击选择班级时的下箭头
  selectclass() {
    // 打开弹出层
    this.setData({
      showClass: true
    })
  },
  // 当点击确认时
  onconfirmClass(event) {
    const {
      value
    } = event.detail
    this.setData({
      classvalue: value,
      showClass: false
    })
    this.setData({
      classErr: ''
    })
  },
  // 当点击取消时
  oncancelClass() {
    this.setData({
      showClass: false
    })
  },
  // 关闭弹出层
  onCloseClass() {
    this.setData({
      showClass: false
    })
  },
  // 当左边列内容改变时，右边联动
  onChangeClass(event) {
    const {
      picker,
      value,
      index
    } = event.detail
    let b = picker.getIndexes()
    picker.setColumnValues(1, classes[b[0]])
  },

  // 当用户输入值的时候取消错误提示信息
  isName() {
    this.setData({
      nameErr: ''
    })
  },
  isPhone() {
    this.setData({
      phoneErr: ''
    })
  },
  isqq() {
    this.setData({
      qqErr: ''
    })
  },
  isAddress() {
    this.setData({
      addressErr: ''
    })
  },

  // 当用户点击确认提交时
  async personalInfo(e) {
    // 拿到表单内容
    let infoObj = e.detail.value
    // 判断输入是否为空
    if (infoObj.name == '') {
      this.setData({
        nameErr: '请输入您的姓名'
      })
    } else if (infoObj.gender == '') {
      this.setData({
        genderErr: '请选择您的性别'
      })
    } else if (infoObj.phone == '') {
      this.setData({
        phoneErr: '请输入您的电话'
      })
    } else if (infoObj.qq == '') {
      this.setData({
        qqErr: '请输入您的QQ'
      })
    } else if (infoObj.classes == '') {
      this.setData({
        classErr: '请选择您的班级'
      })
    } else if (infoObj.address == '') {
      this.setData({
        addressErr: '请输入您的住址'
      })
    } else {
      // 若没有空值，则获取用户填写的所有信息
      // 去除用户输入内容的首尾空格
      for (let i in infoObj) {
        infoObj[i] = infoObj[i].trim()
      }
      // 将该用户的id写入到表单数据中
      infoObj.id = wx.getStorageSync('id')
      // 走接口，将信息添加进数据库
      let {
        data
      } = await f.http('addinfo', 'PUT', infoObj)
      // console.log(data)
      if (data.code !== 200 || !data) {
        Toast({
          message: '提交失败',
          forbidClick: true,
          duration: 800
        })
      } else {
        Toast.loading({
          message: '提交成功',
          forbidClick: true,
          duration: 300,
          onClose: () => {
            // 跳转到首页
            wx.redirectTo({
              url: "../index/index"
            })
          }
        })
      }
    }
  },

  // 从数据库查询班级信息
  async getclassInfo() {
    let {
      data
    } = await f.http('addinfo', 'GET')
    // console.log(data)
    if (data.code !== 200 || data.data.length == 0) {
      Toast({
        message: '班级信息获取失败',
        forbidClick: true,
        duration: 800
      })
    } else {
      let grade = []
      data.data.forEach((item) => {
        grade.push(item.name)
        let arr = item.childrens.filter((citem) => {
          return citem.pid == item.id
        })
        classes.push(arr.map(({
          name
        }) => name))
      })
      // console.log(classes)
      this.data.columnsClass[0].values = grade
      this.data.columnsClass[1].values = classes[aaa]
      this.setData({
        columnsClass: this.data.columnsClass
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    this.getclassInfo()

    // 如果已录入过信息则展示
    let id = wx.getStorageSync('id')
    let { data } = await f.http(`addinfo/checkinfo/${id}`, 'GET')
    // console.log(data)
    if(data.code !== 200 || data.data == {}){
      Toast({
        message: '加载失败',
        forbidClick: true,
        duration: 800
      })
    }else{
      if (data.data.name !== ''){
        this.setData({
          name: data.data.name,
          gender: data.data.gender,
          phone: data.data.phone,
          qq: data.data.qq,
          classvalue: data.data.class,
          address: data.data.address
        })
      }
    }


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 隐藏小房子按钮
    wx.hideHomeButton()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})