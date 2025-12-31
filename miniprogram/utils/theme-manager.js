// utils/theme-manager.js

// 主题配置常量
const THEME_CONFIG = {
  STORAGE_KEY: 'app_theme',
  THEMES: {
    LIGHT: 'light',
    DARK: 'dark',
    AUTO: 'auto'
  },
  THEME_NAMES: {
    light: '浅色主题',
    dark: '深色主题',
    auto: '跟随系统'
  },
  DEFAULT_THEME: 'auto'
}

// 全局主题管理器（单例）
class ThemeManager {
  constructor() {
    // 状态
    this._state = {
      themeType: THEME_CONFIG.DEFAULT_THEME,
      currentTheme: THEME_CONFIG.DEFAULT_THEME,
      systemTheme: 'light',
      isDark: false,
      isAuto: true
    }
    
    // 监听器
    this._listeners = new Set()
    
    // 系统主题监听器
    this._systemThemeListener = null
    
    // 初始化标记
    this._initialized = false
    
    // 初始化Promise
    this._initPromise = null
  }
  
  /**
   * 初始化主题管理器（幂等操作）
   * @returns {Promise<Object>} 主题状态
   */
  init() {
    // 如果已经初始化，直接返回Promise
    if (this._initialized) {
      return Promise.resolve(this._state)
    }
    
    // 如果正在初始化，返回同一个Promise
    if (this._initPromise) {
      return this._initPromise
    }
    
    this._initPromise = new Promise((resolve, reject) => {
      try {
        // 1. 读取本地存储的主题设置
        const savedTheme = wx.getStorageSync(THEME_CONFIG.STORAGE_KEY) || 
                          THEME_CONFIG.DEFAULT_THEME
        
        // 2. 获取系统信息（同步方式）
        const systemInfo = wx.getSystemInfoSync()
        const systemTheme = systemInfo.theme === 'dark' ? 'dark' : 'light'
        
        // 3. 计算实际主题
        let actualTheme = savedTheme
        let isAuto = false
        
        if (savedTheme === 'auto') {
          actualTheme = systemTheme
          isAuto = true
        }
        
        // 4. 更新状态
        this._state = {
          themeType: savedTheme,
          currentTheme: actualTheme,
          systemTheme,
          isDark: actualTheme === 'dark',
          isAuto,
          themeName: THEME_CONFIG.THEME_NAMES[savedTheme] || savedTheme
        }
        
        // 5. 设置系统主题监听
        this._setupSystemThemeListener()
        
        // 6. 标记为已初始化
        this._initialized = true
        
        console.log('[ThemeManager] 初始化完成:', this._state)
        resolve(this._state)
      } catch (error) {
        console.error('[ThemeManager] 初始化失败:', error)
        reject(error)
      } finally {
        this._initPromise = null
      }
    })
    
    return this._initPromise
  }
  
  /**
   * 设置系统主题监听
   */
  _setupSystemThemeListener() {
    // 清理旧的监听器
    if (this._systemThemeListener && wx.offThemeChange) {
      wx.offThemeChange(this._systemThemeListener)
    }
    
    // 设置新的监听器
    if (wx.onThemeChange) {
      this._systemThemeListener = (res) => {

        const newSystemTheme = res.theme === 'dark' ? 'dark' : 'light'
        
        if (this._state.systemTheme !== newSystemTheme) {
          console.log('[ThemeManager] 系统主题变化:', newSystemTheme)
          
          // 更新系统主题
          this._state.systemTheme = newSystemTheme
          
          // 如果当前设置是auto，更新当前主题
          if (this._state.themeType === 'auto') {
            this._state.currentTheme = newSystemTheme
            this._state.isDark = newSystemTheme === 'dark'
            this._notifyListeners()
          }
        }
      }
      
      wx.onThemeChange(this._systemThemeListener)
    }
  }
  
  /**
   * 获取当前主题状态
   * @returns {Object} 主题状态
   */
  getState() {
    return { ...this._state }
  }
  
  /**
   * 获取当前主题类型
   * @returns {string} 主题类型
   */
  getThemeType() {
    return this._state.themeType
  }
  
  /**
   * 获取当前实际主题
   * @returns {string} 实际主题
   */
  getCurrentTheme() {
    return this._state.currentTheme
  }
  
  /**
   * 切换主题
   * @param {string} themeType - 主题类型
   * @returns {Object} 新的主题状态
   */
  switchTheme(themeType) {
    // 验证主题类型
    if (!Object.values(THEME_CONFIG.THEMES).includes(themeType)) {
      throw new Error(`不支持的主题类型: ${themeType}`)
    }
    
    // 计算新状态
    let actualTheme = themeType
    let isAuto = false
    
    if (themeType === 'auto') {
      actualTheme = this._state.systemTheme
      isAuto = true
    }
    
    // 更新状态
    this._state = {
      themeType,
      currentTheme: actualTheme,
      systemTheme: this._state.systemTheme,
      isDark: actualTheme === 'dark',
      isAuto,
      themeName: THEME_CONFIG.THEME_NAMES[themeType] || themeType
    }
    
    // 保存到存储
    try {
      wx.setStorageSync(THEME_CONFIG.STORAGE_KEY, themeType)
    } catch (error) {
      console.error('[ThemeManager] 保存主题设置失败:', error)
    }
    
    // 通知监听器
    this._notifyListeners()
    
    console.log('[ThemeManager] 主题切换完成:', this._state)
    return this.getState()
  }
  
  /**
   * 切换下一个主题（轮换）
   * @returns {Object} 新的主题状态
   */
  toggleTheme() {
    const themes = Object.values(THEME_CONFIG.THEMES)
    const currentIndex = themes.indexOf(this._state.themeType)
    const nextIndex = (currentIndex + 1) % themes.length
    return this.switchTheme(themes[nextIndex])
  }
  
  /**
   * 是否为深色模式
   * @returns {boolean}
   */
  isDarkMode() {
    return this._state.isDark
  }
  
  /**
   * 是否跟随系统
   * @returns {boolean}
   */
  isFollowingSystem() {
    return this._state.isAuto
  }

  // 注册监听器
  subscribe(listener) {
    if (typeof listener === 'function') {
      this._listeners.add(listener);
      
      // 立即通知当前主题
      setTimeout(() => {
        console.log('subscribe', this._state.currentTheme)
        listener(this._state.currentTheme);
      }, 0);
      
      // 返回取消订阅函数
      return () => {
        this.unsubscribe(listener);
      };
    }
  }
  
  // 取消监听
  unsubscribe(listener) {
    this._listeners.delete(listener);
  }
  
  /**
   * 通知所有监听器
   */
  _notifyListeners() {
    const state = this.getState()
    this._listeners.forEach(listener => {
      try {
        console.log('[ThemeManager] 监听器出发')
        listener(state.currentTheme)
      } catch (error) {
        console.error('[ThemeManager] 监听器执行错误:', error)
      }
    })
  }
  
  /**
   * 清理资源
   */
  destroy() {
    // 移除系统主题监听
    if (this._systemThemeListener && wx.offThemeChange) {
      wx.offThemeChange(this._systemThemeListener)
      this._systemThemeListener = null
    }
    
    // 清理所有监听器
    this._listeners.clear()
    
    // 重置状态
    this._initialized = false
    this._initPromise = null
  }
}

// 创建单例实例
const themeManager = new ThemeManager()

// 导出单例
export default themeManager