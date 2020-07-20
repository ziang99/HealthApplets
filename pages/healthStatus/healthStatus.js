// pages/healthStatus/healthStatus.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import { f } from '../../utils/js/common.js'
Page({

  // 页面的初始数据
  data: {
    title: '填写健康状况',
    contactStatus: false,
    coldStatus: false,
    symptomStatus: false,
    dangerousStatus: false,
    active: 0,
    steps: [
      {
        // desc: '开始'
      },
      {
        
      },
      {
        
      },
      {
        
      },
      {
        
      },
      {
        // desc: '完成'
      },
    ],
  },

  // 当切换 '是否接触' 时
  onContact({ detail }) {
    this.setData({ contactStatus: detail, active: 1 });
  },
  // 当切换 '是否有症状' 时
  onCold({ detail }) {
    this.setData({ coldStatus: detail, active: 2 });
  },
  // 当切换 '是否有喘憋..' 时
  onSymptom({ detail }) {
    this.setData({ symptomStatus: detail, active: 3 });
  },
  // 当切换 '是否经过高风险区域时' 时
  onDangerous({ detail }) {
    this.setData({ dangerousStatus: detail, active: 4 });
  },

  // 设置步骤条
  tempFocus() {
    this.setData({ active: 5 });
  },

  // 当点击确认提交时
  async healthInfo(e) {
    // console.log(e.detail.value)
    let info = e.detail.value
    let temperature = info.temperature.trim()
    if (temperature == ''){
      Toast({
        message: '请输入您的体温',
        forbidClick: true,
        duration: 800
      })
    }else{
      info.temperature = temperature.trim()
      for (let i in info) {
        if (info[i] === true) {
          info[i] = 1
        } else if (info[i] === false) {
          info[i] = 0
        }
      }
      info.temperature = info.temperature + '℃'
      info.id = wx.getStorageSync('id')
      // console.log(info)
      // 走接口，将表单数据写入数据库
      let { data } = await f.http('healthstatus', 'PUT', info)
      // console.log(data)
      if(data.code !== 200 || !data){
        Toast({
          message: '提交失败',
          forbidClick: true,
          duration: 800
        })
      }else{
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

})