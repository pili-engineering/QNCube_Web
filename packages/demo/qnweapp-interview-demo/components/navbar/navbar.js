// components/navbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String
    },
    leftIcon: {
      type: String
    },
    backgroundColor: {
      type: String,
      value: '#fff'
    },
    color: {
      type: String,
      value: '#000'
    },
    placeholder: {
      type: Boolean,
      value: true
    },
    event: {
      type: String,
      value: 'back'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: 0,
    navigationBarHeight: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击返回按钮
    onIconBack() {
      if (this.properties.event === 'back') {
        wx.navigateBack({
          delta: 1,
        });
      } else {
        this.triggerEvent('click')
      }
    }
  },

  lifetimes: {
    // 在组件实例进入页面节点树时执行
    attached: function() {
      // https://www.jianshu.com/p/9822d9ee168e
      const { statusBarHeight, } = wx.getSystemInfoSync();
      const capsuleButton = wx.getMenuButtonBoundingClientRect(); // 胶囊尺寸信息
      const gap = capsuleButton.top - statusBarHeight;
      this.setData({
        statusBarHeight,
        navigationBarHeight: gap * 2 + capsuleButton.height
      });
    }
  }
})
