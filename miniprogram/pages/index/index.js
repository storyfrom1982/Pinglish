import pageBehavior from '../../behaviors/page.behaviors'
const app = getApp()

Page({
  data: {
    behaviors: [pageBehavior],
    musicList: [
      {
        id: 0,
        coverImg: 'https://img2.baidu.com/it/u=2432961034,3223159062&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        title: '华语金典100首'
      },
      {
        id: 0,
        coverImg: 'https://img0.baidu.com/it/u=3493496650,1762484373&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        title: '好听到循环播放的热歌'
      },

    ]
  },
  onLoad() {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://developers.weixin.qq.com/miniprogram/dev/devtools/minicode.html')
  },

  goDetail(e) {
    const idx = e.currentTarget.dataset.idx
    wx.navigateTo({
      // url: `../detail/index?idx=${idx}`,
      url: `../demo/index?idx=${idx}`,
    })
  }
})
