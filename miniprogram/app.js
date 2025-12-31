import themeManager from 'utils/theme-manager'

App({
  onLaunch() {
    this.globalData = {
      themeManager,
    };

    themeManager.init().then(state => {
      console.log('主题系统初始化完成:', state)
    }).catch(error => {
      console.error('主题系统初始化失败:', error)
    })
  },

})
