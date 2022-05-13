import dayjs from 'dayjs';
// pages/interview/interview.js
import { delayTime, formatText } from '../../utils/dayjsFormat';
import { validateForm } from '../../utils/validate';
import Toast from '/@vant/weapp/toast/toast';
import { createInterviewApi, getInterviewDetailApi, updateInterviewApi } from '../../api/interview';
import { buildRandomStr } from '../../utils/builder';

const rules = [
  { name: 'title', rules: [ {required: true, message: '请输入面试标题'} ] },
  { name: 'startTime', rules: [ {required: true, message: '请输入开始时间'} ] },
  { name: 'endTime', rules: [ {required: true, message: '请输入结束时间'} ] },
  { name: 'goverment', rules: [ {required: true, message: '请输入公司/部门'} ] },
  { name: 'career', rules: [ {required: true, message: '请输入职位名称'} ] },
  { name: 'candidateName', rules: [ {required: true, message: '请输入姓名'} ] },
  { name: 'candidatePhone', rules: [ {required: true, message: '请输入手机号'} ] }
]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: false,
    hideAuthCode: false,
    currentDate: Date.now(),
    showDateTimePciker: false,
    startTimeText: '',
    endTimeText: '',
    minDate: Date.now(),
    navbarTitle: '',

    // 以下为与接口相关的字段
    title: '',
    startTime: '',
    endTime: '',
    goverment: '',
    career: '',
    candidateName: '',
    candidatePhone: '',
    isAuth: false,
    authCode: '',
    isRecorded: false,
  },

  // 输入姓名联动面试标题
  onChangeCandidateName() {
    const { candidateName } = this.data;
    const title = candidateName ? `${candidateName}的面试` : '';
    this.setData({ title });
  },

  // 切换是否开启面试录制
  onChangeSwitch(event) {
    const { switchField } = event.target.dataset;
    const updatedSwitch = !this.data[switchField];
    const updatedValue = switchField === 'isAuth' ? {
      authCode: updatedSwitch ? buildRandomStr(4) : '',
      [switchField]: updatedSwitch
    } : {
      [switchField]: updatedSwitch
    };
    this.setData(updatedValue);
  },

  /**
   * 打开时间选择器选择时间
   * @param {*} event 
   */
  onSetDateTime(event) {
    this.dateTimeType = event.target.dataset.dateTimeType;
    console.log(this.data[this.dateTimeType])
    const currentDate = this.data[this.dateTimeType] ? this.data[this.dateTimeType] : Date.now();
    this.setData({
      showDateTimePciker: true,
      currentDate
    });
  },

  // 关闭时间选择弹窗
  onCloseDateTimePickerPopup() {
    this.setData({
      showDateTimePciker: false
    }, () => {
      this.dateTimeType = null;
    });
  },

  /**
   * 确定选择的时间
   * @param {*} event 
   */
  onConfirmDateTime(event) {
    const cur = event.detail;
    if (this.dateTimeType === 'startTime') {
      this.setData({ 
        startTime: delayTime(cur), 
        endTime: delayTime(cur, 60 * 60 * 1000), 
        startTimeText: formatText(cur),
        endTimeText: formatText(cur, 60 * 60 * 1000),
        showDateTimePciker: false
      });
    }
    if (this.dateTimeType === 'endTime') {
      this.setData({ 
        endTime: delayTime(cur), 
        endTimeText: formatText(cur),
        showDateTimePciker: false 
      });
    }
  },

  // 点击完成按钮
  onSubmit() {
    const interview = {
      title: this.data.title,
      startTime: this.data.startTime,
      endTime: this.data.endTime,
      goverment: this.data.goverment,
      career: this.data.career,
      candidateName: this.data.candidateName,
      candidatePhone: this.data.candidatePhone,
      isAuth: this.data.isAuth,
      authCode: this.data.authCode,
      isRecorded: this.data.isRecorded,
    };
    const { errors } = validateForm(interview, rules);
    if (errors.length) {
      Toast.fail(errors[0])
    } else {
      (async () => {
        // 创建/修改面试
        const commonData = {
          ...interview,
          startTime: Math.floor(interview.startTime/1000),
          endTime: Math.floor(interview.endTime/1000),
        };
        const mapReq = {
          update: {
            apiFunc: updateInterviewApi,
            reqData: {
              ...commonData,
              interviewId: this.interviewId
            }
          },
          create: {
            apiFunc: createInterviewApi,
            reqData: commonData
          },
        }
        const sendReq = mapReq[this.formAction] || mapReq.create;
        await sendReq.apiFunc(sendReq.reqData);
        wx.navigateTo({
          url: '/pages/interview-list/interview-list'
        });
      })();
    }
  },

  // 切换显示/隐藏密码
  onToggleHideAuthCode() {
    this.setData({
      hideAuthCode: !this.data.hideAuthCode
    })
  },

  /**
   * 获取面试详情
   * @param {*} interviewId 
   */
  async getInterviewDetail(interviewId) {
    const res = await getInterviewDetailApi({ interviewId });
    const {
      title, startTime, endTime, goverment, 
      career, candidateName, candidatePhone,
      isAuth, authCode, isRecorded
    } = res;
    return {
      title, startTime: startTime * 1000, endTime: endTime * 1000,
      goverment, career, candidateName,
      candidatePhone, isAuth, authCode, isRecorded,
      startTimeText: formatText(startTime * 1000), endTimeText: formatText(endTime * 1000),
      disabled: this.formAction === 'view'
    }
  },

  async render(options) {
    const { action, interviewId } = options;
    const mapNavbarTitle = {
      create: '创建面试',
      update: '修改面试',
      view: '查看面试'
    };
    this.formAction = action;
    this.interviewId = interviewId;
    let interviewDetail = {};
    if (this.interviewId) {
      interviewDetail = await this.getInterviewDetail(interviewId);
    }
    this.setData({
      ...interviewDetail,
      navbarTitle: mapNavbarTitle[this.formAction] || mapNavbarTitle.create
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.render(options);
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