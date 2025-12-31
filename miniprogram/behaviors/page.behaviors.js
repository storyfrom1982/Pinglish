import themeManager from '../utils/theme-manager'

module.exports = Behavior({
  // Behavior名称
  name: 'pageBehavior',
  
  // 数据定义
  data: {
    theme: 'light',
  },
  
  // 属性定义（可选）
  properties: {
    // 是否启用调试日志
    debug: {
      type: Boolean,
      value: false
    },
  },
  
  // 生命周期
  lifetimes: {
    created() {
      console.log('pageBehavior:created')
      this.unsubscribe = themeManager.subscribe((theme) => {
        this.setData({theme})
      });
    },
    
    attached() {
      console.log('pageBehavior:attached')
    },
    
    detached() {
      console.log('pageBehavior:detached')
      if (this.unsubscribe) {
        this.unsubscribe();
      }
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
    toggleTheme() {
      themeManager.toggleTheme()
    }
  }

})