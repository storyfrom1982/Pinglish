// pages/detail/index.js
import pageBehavior from '../../behaviors/page.behaviors'

const musicList = [
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
Page({
  behaviors: [pageBehavior],
  data: {
    music: musicList[0],
    albumMusicList: [{
      id: 0,
      coverImg: 'https://img1.baidu.com/it/u=3335993885,936329855&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      name: '人与自然',
      author: '梦想家'
    },
    {
      id: 1,
      coverImg: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F1aaadbe8-8925-4436-a859-7594c36c4027%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1706959097&t=2f7b1e325430761043654044eef7a405',
      name: '人与自然',
      author: '梦想家'
    },
    {
      id: 2,
      coverImg: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F9188e449-6b95-47b9-a89a-40c3dad57b82%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1706959097&t=c40606060159b817f71a0488ae44b233',
      name: '人与自然',
      author: '梦想家'
    },
    {
      id: 3,
      coverImg: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F685acb56-990a-46a2-aa26-dc125ef17537%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1706959097&t=08a7b5953adc6a32b02b95c4929579d1',
      name: '人与自然',
      author: '梦想家'
    },
    {
      id: 4,
      coverImg: 'https://img2.baidu.com/it/u=363788303,3172780378&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      name: '人与自然',
      author: '梦想家'
    },
    {
      id: 5,
      coverImg: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201810%2F04%2F20181004184115_GxhsV.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1706959097&t=ec207bcbff1c84ce735a74a501efd384',
      name: '人与自然',
      author: '梦想家'
    }]
  },

  onLoad(query) {
    const idx = query.idx
    if (idx) {
      this.setData({
        music: musicList[idx]
      })
    }
  },

  onUnload() {

  },

  onReady() {

  },


  onShow() {

  },
})