/**
 * @file index.js
 * @author swan
 */
const app = getApp()

Page({
    data: {
        currentPageSrc: 'https://goodtool666.cn/_spa/sportNews/baiduApp/cbaVideos.html',
    },
    onLoad(options) {
        swan.setPageInfo({
            title: '小猪新闻看点',
            keywords: '小猪新闻看点,CBA优酷视频',
            description: 'CBA优酷视频流。',
            articleTitle: '看深度的原创体育资讯；追炫酷的体育潮流。',
            releaseDate: '2019-10-17 17:31:30',
            image: [
                'http://n.sinaimg.cn/sports/imgStore/download/phone.png',
                'http://n.sinaimg.cn/sports/imgStore/750x1334.png'
            ],
            success: res => {
                console.log('setPageInfo success');
            },
            fail: err => {
                console.log('setPageInfo fail', err);
            }
        })
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
            title: '小猪新闻看点',
            content: '看深度的原创体育资讯；追炫酷的体育潮流。',
            path: 'pages/video/index'
        };
    },
    onURLQueryChange: function () {
        // 监听页面 URL query 改变
    },
})
