import WxValidate from '../../utils/WxValidate.js'
var app = getApp()
Page({
  data: {
    form: {
      name: '',
      number: '',
      identity: '',
      leng_school: '',
      reason: ''
    },
    array: ['四年制', '三年制', '两年制'],
    index: 0,
  },
  formSubmit: function (e) {
    // var leng_school = e.detail.value.leng_school
    var leng_school = this.data.array
    leng_school = leng_school[e.detail.value.leng_school]
    
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
    var identity = e.detail.value.identity
    // var leng_school = e.detail.leng_school
    var reason = e.detail.value.reason
    wx.request({
      url: app.globalData.urlBase +'/weixin_back/xuejizhengming',
      data: {
        name: JSON.stringify(name),
        number: JSON.stringify(number),
        identity: JSON.stringify(identity),
        leng_school: JSON.stringify(leng_school),
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
          duration: 3000
        }),
          setTimeout(function () {
            wx.redirectTo({
              url: '../index/index',
            })
          }, 3000)
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
      identity: {
        required: true,
        digits: true
      },
      leng_school: {
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
      identity: {
        required: '请输入身份证号',
        digits: '请输入正确的身份证号'
      },
      leng_school: {
        required: '请输入学制',
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
  },

  bindPickerChange: function (e) {
    this.setData({
      // index: this.data.array[e.detail.value]
      index: e.detail.value
    })
  },

})