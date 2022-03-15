// pages/interview-list/interview-list.js
import { getInterviewListApi, cancelInterviewApi } from '../../api/interview';
import dayjs from 'dayjs';
import Dialog from '/@vant/weapp/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },

  /**
   * 查看面试
   * @param {*} interviewId 
   */
  viewInterview(action, interviewId) {
    wx.navigateTo({
      url: `/pages/interview/interview?action=${action}&interviewId=${interviewId}`,
    });
  },

  /**
   * 点击面试相关按钮
   * @param {*} event 
   */
  onInterviewAction(event) {
    const { btnType, row } = event.target.dataset;
    console.log(event)
    const map = {
      1: () => this.viewInterview('update', row.id), // '修改面试'
      2: () => this.viewInterview('view', row.id), // 查看面试
      50: async () => {
         // 取消面试弹窗
        await Dialog.confirm({
          message: '确定要取消面试吗？',
          customStyle: "display:flex;flex-direction:column;justify-content: space-between;",
          confirmButtonText: '是',
          cancelButtonText: '否'
        });
        // 取消面试
        await cancelInterviewApi({
          interviewId: row.id
        });
        this.setData({
          list: []
        }, () => {
          this.pagination.pageNum = 1;
          this.loadList();
        });
      },
      100: () => {
        // 进入面试
        wx.navigateTo({
          url: `/pages/room/room?interviewId=${row.id}`,
        });
      },
      200: () => {
        // 分享面试
        console.log('点击分享面试按钮');
      }
    };
    map[btnType]();
  },

  // 点击创建面试按钮
  onCreateInterview() {
    wx.navigateTo({
      url: '/pages/interview/interview',
    })
  },

  // 加载面试列表
  async loadList(callback) {
    const res = await getInterviewListApi(this.pagination);
    if (res.list && res.list.length) {
      const { pageNum, pageSize } = this.pagination;
      this.pagination.pageNum = res.nextPageNum;
      const curList = res.list.map(v => ({
        ...v,
        startTimeText: dayjs(v.startTime * 1000).format('YYYY年MM月DD日 HH:mm'),
        endTimeText: dayjs(v.endTime * 1000).format('YYYY年MM月DD日 HH:mm')
      }));
      const prevList = this.data.list;
      // 这么做主要是为了防止最后一页的数据有更新
      const list = res.endPage ? 
      prevList.slice(0, pageSize * (pageNum - 1)).concat(...curList) : 
        prevList.concat(...curList);
      this.setData({ list }, () => {
        callback && callback();
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.pagination = {
      pageSize: 10,
      pageNum: 1
    };
    this.loadList();
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
    this.setData({
      list: []
    }, () => {
      this.pagination.pageNum = 1;
      this.loadList(() => {
        wx.stopPullDownRefresh();
      });
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      const row = res.target.dataset.detail;
      return {
        path: `/pages/invite/invite?interviewId=${row.id}`,
        imageUrl: row.shareInfo.icon
      };
    }
  }
})