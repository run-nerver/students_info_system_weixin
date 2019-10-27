//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    servers: []
  },
  
  onLoad: function () {
    var listService = [
      {
        title: '请选择您要申请的类目',
        items: [{
          name: '复学证明',
          url: '/pages/fuxue/fuxue',
          icon: '/images/fuxue.png',
          code: '11'
        },{
          name: '休学证明',
          url: '/pages/xiuxue/xiuxue',
          icon: '/images/xiuxue.png',
          code: '11'
        },{
          name: '退学证明',
          url: '/pages/tuixue/tuixue',
          icon: '/images/tuixue.png',
          code: '11'
        },{
          name: '保留学籍',
          url: '/pages/baoliuxueji/baoliuxueji',
          icon: '/images/baoliu.png',
          code: '11'
        },{
          name: '学籍证明',
          url: '/pages/xuejizhengming/xuejizhengming',
          icon: '/images/zaixiao.png',
          code: '11'
        },{
          name: '学历证明',
          url: '/pages/xueli/xueli',
          icon: '/images/xueli.png',
          code: '11'
        },{
          name: '转专业',
          url: '/pages/zhuanzhuanye/zhuanzhuanye',
          icon: '/images/zhuanye.png',
          code: '11'
        },{
          name: '注销学籍',
          url: '/pages/zhuxiao/zhuxiao',
          icon: '/images/zhuxiao.png',
          code: '11'
        },{
          name: '反馈建议',
          url: '/pages/about/about',
          icon: '/images/guanyu.png',
          code: '11'
        }
        ]
      },
    ]
    this.setData({
      servers: listService
    })
  },
  bindNavigator: function (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.path,
    })
    },
  formSubmit: function(e) {
    var input = e.detail.value.input
    wx.request({
      url: 'http://127.0.0.1:5000/test',
      data: {
        input: JSON.stringify(input)
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8'
      },
      success: function(res) {
        console.log(res.data)
        wx.showToast({
          title: res.data,
          icon: 'success',
          duration: 1000
        })
      }
    })
  },
  formReset:function(){
    
  }

})