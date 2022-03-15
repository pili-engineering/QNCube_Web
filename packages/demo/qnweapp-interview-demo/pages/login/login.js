// pages/login/login.js
import {
  validateForm
} from '../../utils/validate';
import Toast from '/@vant/weapp/toast/toast';
import {
  signUpOrInApi,
  getSmsCodeApi
} from '../../api/common';
import { linkConfig } from '../../config/index';
import store from '../../store/index';

const validatePhone = {
  name: 'phone',
  rules: [{
    required: true,
    message: '请输入手机号'
  }]
};
const validateSmsCode = {
  name: 'smsCode',
  rules: [{
    required: true,
    message: '请输入验证码'
  }]
};
const validatePolicy = {
  name: 'policy',
  rules: [{
    checked: true,
    message: '请阅读并同意七牛云服务用户协议和隐私权政策'
  }]
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: null,
    smsCode: null,
    checked: false,
    loginLoading: false,
    smsCodeLoading: false,
    count: 0
  },

  /**
   * 点击跳转到webview页面
   * @param {*} event 
   */
  onNavigateTo(event) {
    const { id } = event.target.dataset;
    wx.navigateTo({
      url: `/pages/webview/webview?webviewUrl=${linkConfig[id]}`,
    })
  },

  // 倒计时
  startCount() {
    const { count } = this.data;
    const newCount = count === 0 ? 59 : count - 1;
    this.setData({
      count: newCount
    }, () => {
      this.timer = setTimeout(() => {
        const {count} = this.data;
        if (count - 1 < 0) {
          clearTimeout(this.timer)
        } else {
          this.startCount();
        }
      }, 1000);
    });
  },

  // 取消/勾选阅读并同意协议
  onChecked() {
    this.setData({
      checked: !this.data.checked
    });
  },

  // 点击获取验证码按钮
  async getSmsCode() {
    try {
      const {
        phone
      } = this.data;
      const {
        errors
      } = validateForm({
        phone
      }, [validatePhone]);
      if (errors.length) {
        Toast.fail(errors[0])
      } else {
        this.setData({
          smsCodeLoading: true
        });
        await getSmsCodeApi({
          phone
        });
        Toast.success('验证码发送成功');
        this.startCount();
      }
    } catch (e) {
      console.error('获取验证码出错', e);
    } finally {
      this.setData({
        smsCodeLoading: false
      });
    }
  },

  // 点击登录按钮
  async onSubmit() {
    try {
      const {
        phone,
        smsCode,
        checked
      } = this.data;
      const {
        errors
      } = validateForm({
        phone,
        smsCode,
        policy: checked
      }, [validatePhone, validateSmsCode, validatePolicy]);
      if (errors.length) {
        Toast.fail(errors[0]);
      } else {
        this.setData({
          loginLoading: true
        });
        const res = await signUpOrInApi({
          phone,
          smsCode
        });
        store.setUserInfo(res);
        wx.navigateTo({
          url: '/pages/interview-list/interview-list',
        })
      }
    } catch (e) {
      console.error('登录报错', e);
    } finally {
      this.setData({
        loginLoading: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})