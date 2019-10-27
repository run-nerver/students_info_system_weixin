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
    },
    sex:['男','女'],
    array: ['四年制', '三年制', '两年制'],
    entrance_date:'请输入入学日期',
    leave_date:'请输入离校日期',
    index: 0,
    multiArray: [['龙子湖校区', '英才校区', '北林校区'],
      ["包装与印刷工程学院",
        "动物科技学院",
        "艺术学院（公共艺术教学部）",
        "动物医药学院",
        "旅游学院",
        "外国语学院",
        "食品与生物工程学院（酒业学院）",
        "经济与贸易学院",
        "艺术学院",
        "信息工程学院（软件学院）",
        "能源与智能工程学院",
        "信息工程学院（软件学院）",
        "金融与会计学院",
        "物流与电商学院",
        "国际教育学院",
        "信息工程学院（软件学院）",
        "文法学院",
        "工商管理学院",
        "经济与贸易学院",
        "外国语学院"]],
    multiIndex: [0, 0],
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
    var leng_school = this.data.array
    leng_school = leng_school[e.detail.value.leng_school]
    var array = this.data.multiArray
    var array_num = e.detail.value.dom_campus
    var xiaoqu = array[0][array_num[0]]
    var yuanxi = array[1][array_num[1]]
    var name = e.detail.value.name
    var sex = this.data.sex
    sex = sex[e.detail.value.sex]
    var number = e.detail.value.number
    var major = e.detail.value.major
    var code = e.detail.value.code
    var reason = e.detail.value.reason
    var entrance_school = e.detail.value.entrance_school
    var leave_school = e.detail.value.leave_school
    wx.request({
      url: app.globalData.urlBase +'/weixin_back/xueli',
      data: {
        name: JSON.stringify(name),
        number: JSON.stringify(number),
        sex: JSON.stringify(sex),
        xiaoqu: JSON.stringify(xiaoqu),
        yuanxi: JSON.stringify(yuanxi),
        leng_school: JSON.stringify(leng_school),
        major: JSON.stringify(major),
        code: JSON.stringify(code),
        entrance_school: JSON.stringify(entrance_school),
        leave_school: JSON.stringify(leave_school),
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
      sex: {
        required: true,
      },
      dom_campus: {
        required: true,
      },
      major: {
        required: true,
      },
      code: {
        required: true,
      },
      leng_school: {
        required: true,
      },
      entrance_school: {
        required: true,
      },
      leave_school: {
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
      sex: {
        required: '请输入性别'
      },
      dom_campus: {
        required: '请输入院系'
      },
      major: {
        required: '请输入专业'
      },
      code: {
        required: '请输入证书编号'
      },
      leng_school: {
        required: '请输入学制'
      },
      entrance_school: {
        required: '请输入入学时间'
      },
      leave_school: {
        required: '请输入离校时间'
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

  bindMultiPickerChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange(e) {
    const data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    }
    data.multiIndex[e.detail.column] = e.detail.value
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ["包装与印刷工程学院",
              "动物科技学院",
              "艺术学院（公共艺术教学部）",
              "动物医药学院",
              "旅游学院",
              "外国语学院",
              "食品与生物工程学院（酒业学院）",
              "经济与贸易学院",
              "艺术学院",
              "信息工程学院（软件学院）"]
            break
          case 1:
            data.multiArray[1] = ["金融与会计学院",
              "物流与电商学院",
              "国际教育学院",
              "信息工程学院（软件学院）",
              "文法学院",
              "工商管理学院",
              "经济与贸易学院",
              "外国语学院"]
            break
          case 2:
            data.multiArray[1] = ["能源与智能工程学院",
              "信息工程学院（软件学院）"]
            break
        }
        data.multiIndex[1] = 0
        break
    }
    this.setData(data)
  },
  bindPickerChange: function (e) {
    this.setData({
      // index: this.data.array[e.detail.value]
      index: e.detail.value
    })
  },
  bindDateChange1: function (e) {
    this.setData({
      entrance_date: e.detail.value
    })
  },
  bindDateChange2: function (e) {
    this.setData({
      leave_date: e.detail.value
    })
  },
  bindSexChange: function (e) {
    this.setData({
      // index: this.data.array[e.detail.value]
      index: e.detail.value
    })
  },
})