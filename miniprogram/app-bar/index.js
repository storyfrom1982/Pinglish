// components/app-bar/index.js
const app = getApp()

const { shared, timing, Easing } = wx.worklet

Component({
  properties: {

  },

  data: {
    theme: app.globalData.theme,
    tabs: [
      {
        name: '主页',
        icon: 'home',
        selectedIcon: 'home-f',
        url: '/pages/index/index'
      },
      {
        name: '社区',
        icon: 'explore',
        selectedIcon: 'explore-f',
        url: '/pages/explore/explore'
      },
      {
        name: '',
        icon: 'play',
        selectedIcon: '',
        url: ''
      },
      {
        name: '消息',
        icon: 'message',
        selectedIcon: 'message-f',
        url: '/pages/chat/chat'
      },
      {
        name: '我的',
        icon: 'user',
        selectedIcon: 'user-f',
        url: '/pages/mine/mine'
      },
    ],
    currentPage: 0,
  },

  lifetimes: {
    created() {
      console.log('[Appbar] created')
      this.themeListener = (theme) => {
        this.setData({theme});
      };
      app.addThemeListener(this.themeListener);
    },

    attached() {
      const progress = shared(0)
      const visible = shared(true)
      const expand = shared(true)

      this.applyAnimatedStyle('.appbar', () => {
        'worklet'
        return {
          bottom: `${expand.value ? 0 : -1000}px`,
          opacity: visible.value ? 1 : 1 - progress.value
        }
      })

      this.progress = progress
      this.visible = visible
      this.expand = expand
    },

    detached() {
      console.log('Appbar:detached')
      app.removeThemeListener(this.themeListener)
    }
  },

  methods: {
    navTo(e) {
      const { item, index } = e.currentTarget.dataset
      console.log('navTo', item, index)
      this.setData({currentPage: index})
      wx.switchTab({
        url: item.url
      })
    },

    show() {
      this.expand.value = true
      this.progress.value = timing(0, {
        duration: 250,
        easing: Easing.ease
      }, () => {
        'worklet'
        this.visible.value = true
      })
    },

    hide() {
      this.visible.value = false
      this.progress.value = timing(1, {
        duration: 250,
        easing: Easing.ease
      }, () => {
        'worklet'
        this.expand.value = false
      })
    },

  },

})