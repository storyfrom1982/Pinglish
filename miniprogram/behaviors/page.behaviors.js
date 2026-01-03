import themeManager from '../utils/theme-manager'

const app = getApp()

module.exports = Behavior({
  // Behavior名称
  name: 'pageBehavior',
  
  // 属性定义（可选）
  properties: {
    // 是否启用调试日志
    debug: {
      type: Boolean,
      value: false
    },
  },

  // 数据定义
  data: {
    theme: app.globalData.theme,
  },

  // observers: {
  //   'color': function(newColor) {
  //     console.log(newColor)
  //   },
  // },

  // 生命周期
  lifetimes: {
    created() {
      console.log('pageBehavior:created')
      // this.onThemeChange = this.onThemeChange.bind(this);
      this.themeListener = (theme) => {
        this.setData({theme});
      };
      app.addThemeListener(this.themeListener);
    },
    
    attached() {
      console.log('pageBehavior:attached')
    },
    
    detached() {
      console.log('pageBehavior:detached')
      app.removeThemeListener(this.themeListener)
    }
  },
  
  // 页面生命周期（如果用在Page中）
  pageLifetimes: {

    load() {
      console.log('pageBehavior:load')
      if (getCurrentPages().length === 2){
        this.getAppBar().hide()
      }
    },

    unload() {
      console.log('pageBehavior:unload')
      if (getCurrentPages().length === 2){
        this.getAppBar().show()
      }
    },

    show() {
      console.log('pageBehavior:show')
    }
  },
  
  // 方法定义
  methods: {

  }

})