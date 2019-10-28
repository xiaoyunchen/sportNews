/**
 * @file app.js
 * @author swan
 */

/* globals swan */

App({
  onLaunch(options) {
    console.log('SWAN launch');
    // 小程序初始化完成时触发，全局只触发一次。
    if (wx.canIUse('showFavoriteGuide')) {
      wx.showFavoriteGuide({
        type: 'bar',
        content: '关注小猪爱看news',
        success(res) {
          console.log(res);
          wx.showToast({
            title: '关注成功',
          });
        },
        fail(err) {
          console.log('关注失败');
        }
      });
    }
  },
  onShareAppMessage: function () {
    // 用户点击右上角转发
    return {
      title: '小猪爱看news',
      content: '看深度的原创体育资讯；追炫酷的体育潮流。',
      path: 'pages/sports/index'
    };
  },
  onShow: function () {
  },
  onHide: function () {
    console.log('wx当前处于后台');
  },
  onError: function () {
    console.log('wx发生错误');
  },
  globalData: 'wx'
});
