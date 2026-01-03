const THEME_LIGHT = {
  bg: '#fff',
  fg: '#000',
  bar: '',
  primary: '#07c160',
  active: '#fa5151'
}

const THEME_DARK = {
  bg: '#666',
  fg: '#fff',
  bar: '',
  primary: '#6467f0',
  active: '#fa5151'
}

const themeListeners = []

App({
  onLaunch() {

    this.globalData = {
      // systemInfo: wx.getSystemInfoSync(),
      info: wx.getAppBaseInfo(),
      device: wx.getDeviceInfo(),
      window: wx.getWindowInfo(),
      setting: wx.getSystemSetting(),
      authorize: wx.getAppAuthorizeSetting(),
    };

    this.globalData.theme = this.globalData.info.theme === 'light' ? THEME_LIGHT : THEME_DARK,

    console.log('[APP]', this.globalData)
  },

  onThemeChange({ theme }) {
    this.globalData.theme = theme === 'light' ? THEME_LIGHT : THEME_DARK,
    themeListeners.forEach((listener) => {
      listener(this.globalData.theme)
    })
  },

  addThemeListener(listener) {
    if (themeListeners.indexOf(listener) < 0) {
      themeListeners.push(listener)
    }
  },

  removeThemeListener(listener) {
    const index = themeListeners.indexOf(listener)
    if (index > -1) {
      themeListeners.splice(index, 1)
    }
  },

})
