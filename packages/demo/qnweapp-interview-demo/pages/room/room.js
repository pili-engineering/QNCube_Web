// pages/room/room.js
import { endInterviewApi, joinInterviewApi, leaveInterviewApi, heartBeatApi } from '../../api/interview';
import * as QNRTC from 'pili-rtc-wxapp';
import store from '../../store/index';
import * as QNIM from '../../im/qnweapp-im';
import { setWatcher, isAudioTrack, isCameraTrack, isScreenTrack, sendTextMessage } from '../../utils/index';

const isString = v => typeof v === 'string';

const log = (...args) => {
  console.log('QNIM', ...args);
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    messages: [],
    inputValue: '', // 输入消息input
    mutedSpeaker: false, // 扬声器
    showLeaveInterview: false, // 是否有权限结束面试
    showLeavePopup: false,
    navbarTitle: '', // 导航栏标题
    publishPath: '', // 推流
    mutedMicro: true, // 麦克风
    mutedCamera: true, // 摄像头
    subscribeList: [], // 订阅
    shareScreen: false, // 屏幕共享
    whiteBoard: false, // 白板
    chat: false, // 聊天
    interview: null,
    userInfo: null, 
    roomToken: null, 
    onlineUserList: null, 
    allUserList: null,
    remoteUser: null,
    activeDot: 0, // 当前大屏
    mutedRemoteCamera: false,
    smallWin: 'local',
    bigWin: 'remote-0',
  },

  // 合流转推
  mergeTracks() {
    if (this.data.interview.roleCode === 1) {
      console.log('开始合流转推');
      // 获取所有远程媒体流和本地媒体流
      const { localTracks, tracks: subscribeTracks } = this.roomSession;
      console.log('localTracks', localTracks);
      localTracks.forEach(pubTrack => {
        const { trackid: trackId } = pubTrack;
        if (isCameraTrack(pubTrack)) {
          this.roomSession.addMergeTracks([
            { trackId, x: 500, y: 40, w: 100, h: 100, z: 3  }
          ]);
        }
        if (isAudioTrack(pubTrack)) {
          this.roomSession.addMergeTracks([
            { trackId  }
          ]);
        }
      });
      console.log('subscribeTracks', subscribeTracks);
      subscribeTracks.forEach(subTrack => {
        const { trackid: trackId } = subTrack;
        if (isCameraTrack(subTrack)) {
          this.roomSession.addMergeTracks([
            { trackId, x: 0, y: 0, w: 640, h: 480 }
          ]);
        }
        if (isAudioTrack(subTrack)) {
          this.roomSession.addMergeTracks([
            { trackId  }
          ]);
        }
        if (isScreenTrack(subTrack)) {
          this.roomSession.addMergeTracks([
            { trackId, x: 0, y: 0, w: 640, h: 480, z: 2 }
          ]);
        }
      }) 
    }
  },

  /**
   * 大小屏切换
   * @param {*} event 
   */
  onToggleWin(event) {
    const { winId } = event.currentTarget.dataset;
    const { smallWin, bigWin, activeDot } = this.data;
    if (winId === 'local' && !bigWin && !smallWin) { // 首次点击切换
      this.setData({
        bigWin: 'local',
        smallWin: `remote-${activeDot}`
      });
    }
    if (smallWin && bigWin && smallWin === winId) { // 大小屏切换
      this.setData({
        bigWin: smallWin,
        smallWin: bigWin
      });
    }
  },

  /**
   * 触摸开始
   * @param {*} event 
   */
  onPlayerTouchstart(event) {
    this.playerTouchstartX = event.changedTouches[0].clientX;
  },

  /**
   * 触摸结束
   * @param {*} event 
   */
  onPlayerTouchend(event) {
    if (this.data.subscribeList.length < 2) return; 
    this.playerTouchendX = event.changedTouches[0].clientX;
    const diff = this.playerTouchendX - this.playerTouchstartX;
    const allWin = ['local', 'remote-0', 'remote-1'];
    if (diff < -100 && this.data.activeDot !== this.data.subscribeList.length - 1) {
      this.setData({
        activeDot: 1,
        bigWin: allWin.filter(win => win !== this.data.bigWin && win !== this.data.smallWin)[0]
      })
      console.log('左滑')
    }
    if (diff > 100 && this.data.activeDot !== 0) {
      this.setData({
        activeDot: 0,
        bigWin: allWin.filter(win => win !== this.data.bigWin && win !== this.data.smallWin)[0]
      })
      console.log('右滑')
    }
  },

  // 屏幕共享
  onToggleShareScreen() {
    const shareScreen = !this.data.shareScreen;
    this.setData({
      shareScreen
    });
  },

  // 白板
  onToggleWhiteBoard() {
    const whiteBoard = !this.data.whiteBoard;
    this.setData({
      whiteBoard
    });
  },

  // 聊天
  onToggleChat() {
    const chat = !this.data.chat;
    this.setData({
      chat
    });
  },

  // 扬声器
  onToggleLoudspeaker() {
    const mutedSpeaker = !this.data.mutedSpeaker;
    this.setData({
      mutedSpeaker
    });
  },

  /**
   * 订阅
   */
  initSubscribes() {
    this.roomSession.users
      .filter(v => v.playerid !== this.roomSession.userId)
      .forEach(v => this.subscribe(v.playerid));
    console.log('this.roomSession.users', this.roomSession.users);
    this.mergeTracks();
  },


  /**
   * 订阅某个流
   * @param {*} playerid 
   */
  subscribe(playerid) {
    const { subscribeList } = this.data;
    const addressList = this.roomSession.getSubscribeAddressList(playerid);
    console.log('addressList addressList addressList', addressList);
    if (addressList && addressList.length > 0) {
      const sub = subscribeList.filter(v => v.userid !== playerid);
      const urlList = [];
      addressList.map(((item, index)=> {
        urlList.push(Object.assign({}, item, {
          key: playerid + Math.random().toString(36).slice(-8),
          userid: playerid
        }));
      }));
      urlList.forEach(e => {
        sub.push(e)
      });
      this.setData({
        subscribeList: sub,
      }, () => {
        console.log('subscribeList:', this.data.subscribeList)
      });
    }
  },

  // 点击navbar的icon
  onNavbarIconClick() {
    this.roomSession.leaveRoom();
    endInterviewApi({ interviewId: this.interviewId });
  },

  // 离开房间
  onLeaveRoom() {
    this.setData({
      showLeavePopup: true
    });
    wx.navigateBack({
      delta: 1,
    });
    this.roomSession.leaveRoom();
    leaveInterviewApi({ interviewId: this.interviewId });
  },

  // 关闭离开弹窗
  onCloseLeavePopup() {
    this.setData({
      showLeavePopup: false
    })
  },

  /**
   * 渲染页面
   * @param {*} options 
   */
  async render(options) {
    const { interviewId } = options;
    this.interviewId = interviewId;
    const { 
      interview, userInfo, roomToken, onlineUserList, allUserList, publishUrl,
      imConfig
    } = await joinInterviewApi({ interviewId });
    this.imGroupId = imConfig.imGroupId;
    this.setData({
      navbarTitle: interview.title,
      interview, userInfo, roomToken, onlineUserList, allUserList,
      remoteUser: allUserList.find(v => v.accountId !== userInfo.accountId),
      publishUrl,
    }, () => {
      this.initRTCRoom();
      this.initIM();
      this.heartBeat();
    });
  },

  // 房间心跳
  async heartBeat() {
    const { 
      onlineUserList, interval, options 
    } = await heartBeatApi({ interviewId: this.interviewId });
    this.setData({
      onlineUserList,
      showLeaveInterview: options.showLeaveInterview
    }, () => {
      setTimeout(() => {
        this.heartBeat();
      }, interval * 1000)
    });
  },

  // 初始化IM
  initIM() {
    log('初始化IM')
    const im = QNIM.init({
      appid: 'cigzypnhoyno',
      autoLogin: false
    });
    if (im && im.isReady && im.isReady()) {
      log('初始化IM成功')
      this.watcher.im = im;
      return;
    }
    // IM 未初始化完成重新初始化
    if (this.retryCount < 20) {
      this.initIMTimer = setTimeout(() => {
        this.retryCount++;
        this.initIM();
      }, 1000);
    } else {
      console.error('QNIM 初始化失败，请重新初始化');
    }
  },

  loginSuccess() {
    log('登录成功')
    this.watcher.loginStatus = 2;
  },

  /**
   * 登录失败回调
   * @param {string} errMsg 
   */
  loginFail(errMsg) {
    log('登录失败', errMsg);
  },

  /**
   * 消息接收
   * @param {*} message 
   */
  onGroupMessage(message) {
    log('消息接收', message)
    this.setData({
      messages: this.data.messages.concat({
        ...message,
        content: JSON.parse(message.content)
      })
    })
  },

  // 设置 IM 消息监听
  setIMEventListeners(im) {
    im.on({
      loginSuccess: this.loginSuccess, 
      loginFail: this.loginFail, 
      onGroupMessage: this.onGroupMessage
    });
  },

  // 清除 IM 事件监听
  clearIMEventListeners() {
    const im = this.watcher.im;
    im.off({
      loginSuccess: this.loginSuccess, 
      loginFail: this.loginFail, 
      onGroupMessage: this.onGroupMessage
    })
  },

  // 初始化房间
  async initRTCRoom() {
    this.roomSession = new QNRTC.RoomSession();
    this.roomMonitor(this.roomSession);
    await this.roomSession.joinRoomWithToken(this.data.roomToken);
    this.publish();
    this.initSubscribes();
  },

  // 监听房间各种事件
  roomMonitor(session) {
    session.on('track-add', tracks => {
      console.log('track-add', tracks)
      // const remoteTracks = this.data.remoteTracks
      const set = {}
      for (const track of tracks) {
        // remoteTracks.push(track.trackid)
        // 每个 playerid 只订阅一次
        if (!set[track.playerid]) {
          set[track.playerid] = true
          this.subscribe(track.playerid)
        }
      }
      // this.setData({ remoteTracks })
      this.mergeTracks();
    })
    session.on('track-remove', (tracks) => {
      console.log('track-remove', tracks)
      // const {remoteTracks, subscribeList} = this.data
      const { subscribeList } = this.data
      for (const track of tracks) {
        // const idx = remoteTracks.indexOf(track.trackid)
        // if (idx !== -1) {
        //   remoteTracks.splice(idx, 1)
        // }
        subscribeList.map((ele, index) => {
          if (ele.url.indexOf(track.trackid) !== -1) {
            return subscribeList.splice(index, 1)
          }
        })
      }
      // this.setData({ remoteTracks, subscribeList })
      this.setData({ 
        subscribeList, activeDot: 0,  
        smallWin: 'local', bigWin: 'remote-0'
      }, () => {
        this.mergeTracks();
      })
      console.log('track-remove-data', this.data)
    })
    session.on('user-leave', (user) => {
      console.log('user-leave', user)
      console.log('leave subscribeList', this.data.subscribeList)
      const userInfo = this.data.allUserList.find(v => v.accountId === user.playerid) || {};
      sendTextMessage({
        im: this.watcher.im,
        imGroupId: this.imGroupId,
        content: {
          action: 'quit_room',
          msgStr: { senderName: userInfo.nickname, msgContent: '离开了房间' }
        }
      })
      this.setData({
        subscribeList: this.data.subscribeList.filter(v => v.userid !== user.playerid),
      })
      console.log('user-leave`subscribeList:', this.data.subscribeList)
    })
    session.on('user-join', (user) => {
      console.log('user-join', user);
    })
    session.on('local-track-add', (tracks) => {
      // const remoteTracks = this.data.remoteTracks
      console.log('local-track-add', tracks)
      for (const track of tracks) {
        // remoteTracks.push(track.trackid)
        // 每个 playerid 只订阅一次
      }
      // this.setData({ remoteTracks })
      this.mergeTracks();
    })
    session.on('local-track-remove', (tracks) => {
      // const remoteTracks = this.data.remoteTracks
      console.log('local-track-remove', tracks)
      for (const track of tracks) {
        // const idx = remoteTracks.indexOf(track.trackid)
        // if (idx !== -1) {
        //   remoteTracks.splice(idx, 1)
        // }
      }
      // this.setData({ remoteTracks })
      this.mergeTracks();
    })
    session.on('disconnect', (res) => {
      let title = '已离开房间'
      if (res.code === 10006) {
        // title = '被踢出房间'
        title = '面试已结束'
      }
      wx.reLaunch({
        url: '/pages/interview-list/interview-list',
        success: () => {
          wx.showToast({
            title,
            icon: 'none',
            fail: data => console.log('fail', data)
          })
        },
      })
    })
    session.on('error', (res) => {
      console.log('session error', res)
      // this.reconnect()
    })
    session.on('reconnecting', () => {
      console.log('尝试重连中...')
      wx.showToast({
        title: '尝试重连中...',
        icon: 'loading',
        mask: true,
        fail: data => console.log('fail', data)
      })
    })
    session.on('reconnected', () => {
      this.startPush()
      for (const track of this.data.subscribeList) {
        const ctx = wx.createLivePlayerContext(track.key)
        if (ctx) {
          ctx.play()
        }
      }
      wx.hideToast({
        fail: () => {
          console.log('消息隐藏失败')
        }
      })
    })
    session.on('mute-tracks', (tracks) => {
      console.log('mute-tracks', tracks);
      console.log('session.tracks', session.tracks);
      session.tracks.forEach(st => {
        tracks.forEach(t => {
          if (t.trackid === st.trackid) { // track匹配中
            if (isCameraTrack(st)) {
              this.setData({
                mutedRemoteCamera: t.muted
              });
            }
          }
        })
      });
      console.log('session.tracks', session.tracks);
      console.log('mute-tracks', tracks);
    })
  },

  /**
   * 发布流
   */
  publish() {
    this.pushContext = wx.createLivePusherContext();
    const path = this.roomSession.publish();
    this.setData({ publishPath: path }, () => {
      this.pushContext.start({
        success: () => {
          console.log('推流成功');
          this.setData({
            mutedMicro: false,
            mutedCamera: false
          });
        },
        fail: () => {
          wx.showModal({
            title: '推流失败',
            content: '请退出重进或者手动打开摄像头/麦克风'
          })
        }
      })
    });
  },

  // 点击切换麦克风按钮
  onToggleMicro() {
    console.log('toggle micro');
    const mutedMicro = !this.data.mutedMicro;
    this.setData({
      mutedMicro
    });
    const tracks = this.roomSession.localTracks
      .filter(t => t.kind === 'audio')
      .map(ele => ({trackid: ele.trackid, muted: mutedMicro}));
    this.roomSession.muteTracks(tracks);
  },

  // 点击挂断按钮
  onToggleHangup() {
    this.setData({
      showLeavePopup: true
    });
  },

  // 点击摄像头按钮
  onToggleCamera() {
    console.log('toggle video');
    const mutedCamera = !this.data.mutedCamera;
    this.setData({
      mutedCamera
    });
    const tracks = this.roomSession.localTracks
      .filter(t => t.kind === 'video')
      .map(ele => ({trackid: ele.trackid, muted: mutedCamera}));
    this.roomSession.muteTracks(tracks);
  },

  /**
   * 发送消息
   * @param {*} event 
   */
  async onSendMessage(event) {
    const text = event.detail.value;
    log('消息发送', text)
    sendTextMessage({
      im: this.watcher.im,
      imGroupId: this.imGroupId,
      content: {
        action: 'pub_chat_text',
        msgStr: { senderName: this.data.userInfo.nickname, msgContent: text }
      }
    })
    this.setData({
      inputValue: ''
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initWatcher();
    this.retryCount = 0;
    this.loginInfo = {
      name: store.getIMConfig().imUsername,
      password: store.getIMConfig().imPassword
    }
    this.render(options);
  },

  initWatcher() {
    this.watcher = setWatcher(this);
    // 0-未登录、1-登录中、2-已登录
    this.watcher.loginStatus = 0; 
    this.watcher.im = null; 
    this.watcher.chatroomJoined = false;
  },

  watch: {
    im(im) {
      if (im) {
        this.setIMEventListeners(im);
        this.loginIM(im)
      }
    },
    /**
     * 登录状态
     * @param {number} status 
     */
    loginStatus(status) {
      log('登录状态', status)
      const im = this.watcher.im;
      if (status === 2) {
        im.chatroomManage
          .join(this.imGroupId)
          .then(res => {
            log('聊天室加入成功', res);
            this.watcher.chatroomJoined = true;
          })
          .catch((error) => {
            console.log('error', error);
            if (error.data.code === 20017) {
              log('聊天室加入成功');
              this.watcher.chatroomJoined = true;
            } else {
              log('聊天室加入失败')
              return Promise.reject(error);
            }
          });
      }
    },
    /**
     * 是否加入聊天室
     * @param {boolean} joined 
     */
    chatroomJoined(joined) {
      log('chatroomJoined', joined)
      if (joined) {
        sendTextMessage({
          im: this.watcher.im,
          imGroupId: this.imGroupId,
          content: {
            action: 'welcome',
            msgStr: { senderName: this.data.userInfo.nickname, msgContent: '进入了房间' }
          }
        })
      }
    }
  },

  /**
   * IM 登录
   * @param {*} im 
   */
  loginIM(im) {
    const { name, password } = this.loginInfo;
    this.watcher.loginStatus = 1;
    im.login({ name, password });
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
    this.initIMTimer && clearTimeout(this.initIMTimer);
    this.clearIMEventListeners();
    this.roomSession.leaveRoom();
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