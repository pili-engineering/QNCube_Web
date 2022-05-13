class Store {
  constructor() {
    this.userInfo = wx.getStorageSync('userInfo') || null;
    this.interviewToken = wx.getStorageSync('interviewToken') || null;
    this.imConfig = this.userInfo?.imConfig || null;
  }

  getIMConfig() {
    const userInfo = wx.getStorageSync('userInfo') || null;
    return userInfo?.imConfig || {};
  }
  /**
   * 设置用户信息
   * @param info
   */
  setUserInfo(info) {
    const newUserInfo = {
      ...this.userInfo,
      ...info
    };
    wx.setStorageSync('userInfo', newUserInfo);
    this.userInfo = newUserInfo;
  }

  /**
   * 设置interviewToken
   * interviewToken从链接中获取
   * @param {*} interviewToken 
   */
  setInterviewToken(interviewToken) {
    wx.setStorageSync('interviewToken', interviewToken);
    this.interviewToken = interviewToken;
  }
}

export default new Store();