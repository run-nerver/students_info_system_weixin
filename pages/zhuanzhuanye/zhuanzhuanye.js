import WxValidate from '../../utils/WxValidate.js'
var app = getApp()
Page({
  data: {
    form: {
      name: '',
      number: '',
      dom_dorm:'',
      reason: ''
    }
  },
  formSubmit: function (e) {
    
    const params = e.detail.value
    e.detail.value.osscation_address = this.data.osscation_address
    e.detail.value.date = this.data.date
    
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    var name = e.detail.value.name
    var number = e.detail.value.number
    var dom_dorm = e.detail.value.dom_dorm
    var reason = e.detail.value.reason
    wx.request({
      url: app.globalData.urlBase +'/weixin_back/zhuanzhuanye',
      data: {
        name: JSON.stringify(name),
        number: JSON.stringify(number),
        dom_dorm:JSON.stringify(dom_dorm),
        reason: JSON.stringify(reason)
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8'
      },
      success: function (res) {
       
        wx.showToast({
          title: res.data,
          icon: 'success',
          duration: 1000
        }),
          setTimeout(function () {
            wx.redirectTo({
              url: '../index/index',
            })
          }, 1000)
      }
    })
  },
  formReset: function () {

  },

  initValidate: function () {
    const rules = {
      name: {
        required: true,
        maxlength: 10,
      },
      number: {
        required: true,
        digits: true
      },
      dom_dorm:{
        required: true
      },
      reason: {
        required: true
      }
    }

    const messages = {
      name: {
        required: '请输入姓名',
        maxlength: '请输入正确的姓名'
      },
      number: {
        required: '请输入学号',
        digits: '请输入正确的学号'
      },
      dom_dorm: {
        required: '请输入宿舍号'
      },
      reason: {
        required: '请输入申请原因'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },

  showModal(error) {
    wx.showModal({
      content: error.msg
    })
  },

  onLoad: function (options) {
    this.initValidate();
  }

})