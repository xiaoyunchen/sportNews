/**
 * @file index.js
 * @author wx
 */
const app = getApp()

Page({
    data: { // 页面的初始数据
        currentPageSrc: '',
    },
    onLoad(options) {
        // 监听页面加载的生命周期函数
        var pageType = options.type;
        var pageSrc = decodeURI(options.src);
        var pageId = options.docid;
        var slideid = options.slideid;
        if (pageType === '1' || pageType === '9') {
            this.setData({
                currentPageSrc: 'https://goodtool666.cn/_sportnews/wb/pigsee_news.d.html?docid=' + pageId,
            });
        } else if (pageType === '2') {
            pageId = slideid.replace('slide:', '').replace(/-/g, '_');
            console.log(pageId);
            this.setData({
                currentPageSrc: 'https://goodtool666.cn/_sportnews/wb/pigsee_slide.d.html?docid=' + pageId,
            });
        } else if (pageType === '3') {
            this.setData({
                currentPageSrc: 'https://goodtool666.cn/_sportnews/wb/pigsee_video.d.html?docid=' + pageId,
            });
        } else {
            // 其他新闻类型，通过接口转换成中间页
            wx.request({
                url: 'https://goodtool666.cn/_dataApi_api2/sports/client/manage_doc.d.json?url=' + encodeURI(pageSrc),
                header: {
                    'content-type': 'application/json'
                },
                success: d => {
                    if (d.data && d.data.midurl) {
                        pageSrc = d.data.midurl.replace('sports.sina.cn', 'goodtool666.cn/_sportnews');
                        this.setData({
                            currentPageSrc: pageSrc,
                        });
                    } else {
                        this.setData({
                            currentPageSrc: 'https://goodtool666.cn/sportNews/baiduApp.html?redirect=' + pageSrc,
                        });
                    }
                },
                fail: err => {
                    this.setData({
                        currentPageSrc: 'https://goodtool666.cn/baiduApp.html?redirect=' + pageSrc,
                    });
                    console.log('错误码：' + err.errCode);
                    console.log('错误信息：' + err.errMsg);
                }
            });
        }
    },
    onShow() {
      wx.hideShareMenu();
    },
    onReady() {
        // 监听页面初次渲染完成的生命周期函数
    },
    onReachBottom() {
        // 页面上拉触底事件的处理函数
    },
    onURLQueryChange: function () {
        // 监听页面 URL query 改变
    },
})
