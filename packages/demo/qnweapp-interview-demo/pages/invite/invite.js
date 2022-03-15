// pages/invite/invite.js
import { getInterviewDetailApi } from '../../api/interview';
import { formatText } from '../../utils/dayjsFormat';
import { linkConfig } from '../../config/index';
import store from '../../store/index';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    interviewerName: '',
    goverment: '',
    career: '',
    startTime: '',
    startTimeText: ''
  },

  // 同意并加入
  onAgreeToEnter() {
    wx.navigateTo({
      url: `/pages/room/room?interviewId=${this.interviewId}`,
    })
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

  /**
   * 加载数据
   * @param {*} interviewId 
   */
  async loadContent(interviewId) {
    const { 
      interviewerName, goverment, career, startTime
    } = await getInterviewDetailApi({ interviewId });
    this.setData({
      interviewerName, goverment, career,
      startTime, startTimeText: formatText(startTime * 1000)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { interviewId, interviewToken } = options;
    this.interviewId = interviewId;
    if (interviewToken) store.setInterviewToken(interviewToken);
    this.loadContent(interviewId);
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