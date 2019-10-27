import WxValidate from '../../utils/WxValidate.js'
var app = getApp()
Page({
  data: {
    form: {
      name: '',
      number: '',
      per_tel: '',
      home_tel: '',
      home_address: '',
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
    var per_tel = e.detail.value.per_tel
    var home_tel = e.detail.value.home_tel
    var home_address = e.detail.value.home_address
    var reason = e.detail.value.reason
    wx.request({
      url: app.globalData.urlBase +'/weixin_back/tuixue',
      data: {
        name: JSON.stringify(name),
        number: JSON.stringify(number),
        per_tel: JSON.stringify(per_tel),
        home_tel: JSON.stringify(home_tel),
        home_address: JSON.stringify(home_address),
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
      per_tel: {
        required: true,
        digits: true
      },
      home_tel: {
        required: true,
        digits: true
      },
      home_address: {
        required: true,
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
      per_tel: {
        required: '请输入个人联系方式',
        digits: '请输入正确的联系方式'
      },
      home_tel: {
        required: '请输入家庭联系方式',
        digits: '请输入正确的联系方式'
      },
      home_address: {
        required: '请输入通讯地址',
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