// pages/dangerArea/dangerArea.js
// 引入SDK核心类
let QQMapWX = require('../../utils/js/qqmap-wx-jssdk');
// 实例化API核心类
let qqmapsdk = new QQMapWX({
  key: 'HKZBZ-RPHR3-LMN3F-34CQT-3N45Z-O7BRO'
});

Page({

  // 页面的初始数据
  data: {
    title: '危险区域',
    dangerAreaHeight: '',
    latitude: '',     // 维度
    longitude: '',    // 经度
    markers: [],      // 当前位置的marker点
    mapId: "myMap",   // 页面中的map的Id值
    scale: '16',      // 缩放级别，默认16
    polygons: []      // 多边形
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    // 获取可用屏幕高度
    const res = wx.getSystemInfoSync()
    this.setData({
      dangerAreaHeight: res.windowHeight
    })
    // 获取当前用户地理位置信息
    wx.getLocation({
      type: 'gcj02',
      isHighAccuracy: true,
      highAccuracyExpireTime: 8000,
      success: res => {
        const latitude = res.latitude   // 纬度
        const longitude = res.longitude   // 经度 
        this.setData({
          latitude: latitude,
          longitude: longitude,
          markers: [{
            iconPath: "../../utils/image/location.png",
            id: 1,
            latitude: latitude,
            longitude: longitude,
            width: '80rpx',
            height: '80rpx'
          }]
        })
      }
    })
  },

  // 回到当前的位置
  moveTolocation() {
    let Id = this.data.mapId
    var mapCtx = wx.createMapContext(Id);
    mapCtx.moveToLocation();
    this.setData({ scale: 16 })   // 还原默认缩放
  },

  // 当拖动地图时，使定位图标一直处于中心位置
  regionChange(e) {
    if (e.type == "end") {
      let Id = this.data.mapId
      var mapCtx = wx.createMapContext(Id);
      // 获取到当前地图中心的经纬度
      mapCtx.getCenterLocation({
        success: res => {
          // 更新marker点的经纬度
          this.setData({
            markers: [{
              latitude: res.latitude,
              longitude: res.longitude,
              iconPath: "../../utils/image/location.png",
              id: 1,
              width: '80rpx',
              height: '80rpx'
            }]
          })
        }
      })
    }
  },

  // 高风险地区
  dangerZone() {
    const latitude = this.data.latitude // 纬度
    const longitude = this.data.longitude // 经度 
    qqmapsdk.reverseGeocoder({
      location: { latitude, longitude },
      get_poi: 1,
      success: res => {
        // console.log(res.result.pois);
        let pois = res.result.pois;
        let pointsArr = [];
        for (const item of pois) {
          pointsArr.push(item.location)
        }
        // console.log(pointsArr)
        const newPointsArr = pointsArr.map((item) => {
          return {
            latitude: item['lat'],
            longitude: item['lng']
          }
        })
        // console.log(newPointsArr)
        // 绘制多边形区域
        this.setData({
          polygons: [{
            points: [
              newPointsArr[0],
              newPointsArr[8],
              newPointsArr[7],
              newPointsArr[3],
            ],
            strokeWidth: 4,
            strokeColor: '#999',
            fillColor: '#ea9a9b'
          }]
        })
      },
      fail: function (error) {
        console.error(error);
      }
    })
  },



})