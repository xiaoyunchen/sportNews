/**
 * @file index.js
 * @author wx
 */
const app = getApp()

Page({
    data: {
        currentPageSrc: 'https://goodtool666.cn/_spa/sportNews/cbaVideos',// 'https://goodtool666.cn/_spa/sportNews/wxapp/cbaVideos.html',
    },
    onLoad(options) {
        // 监听页面加载的生命周期函数
        this.setData({
          currentPageSrc: this.data.currentPageSrc,
        });
    },
    onReady() {
        // 监听页面初次渲染完成的生命周期函数
    },
    onReachBottom() {
        // 页面上拉触底事件的处理函数
    },
    onHide() {
    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
        return {
            title: '小猪爱看news',
            content: '看深度的原创体育资讯；追炫酷的体育潮流。',
            path: 'pages/video/index'
        };
    },
    onURLQueryChange: function () {
        // 监听页面 URL query 改变
    },
})
