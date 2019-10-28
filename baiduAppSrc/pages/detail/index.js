/**
 * @file index.js
 * @author swan
 */
const app = getApp()

Page({
    data: { // 页面的初始数据
        currentPageSrc: '',
    },
    onLoad(options) {
        // 监听页面加载的生命周期函数
        swan.setPageInfo({
            title: '小猪新闻看点',
            keywords: '小猪新闻看点,体育新闻,体育热点,体育看点,高清图集,视频',
            description: '小猪新闻看点为用户提供热点新闻、图集和视频等体育相关新闻、图集、视频资讯。',
            articleTitle: '看深度的原创体育资讯；追炫酷的体育潮流。',
            releaseDate: '2019-10-17 17:31:30',
            image: [
                'https://n.sinaimg.cn/sports/imgStore/download/phone.png',
                'https://n.sinaimg.cn/sports/imgStore/750x1334.png'
            ],
            success: res => {
                console.log('setPageInfo success');
            },
            fail: err => {
                console.log('setPageInfo fail', err);
            }
        })

        console.log(options);
        var pageType = options.type;
        var pageSrc = decodeURI(options.src);
        var pageId = options.docid;
        var slideid = options.slideid;
        if (pageType === '1' || pageType === '9') {
            this.setData({
                currentPageSrc: 'https://goodtool666.cn/_sportnews/wb/hotspot_news.d.html?docid=' + pageId,
            });
        } else if (pageType === '2') {
            pageId = slideid.replace('slide:', '').replace(/-/g, '_');
            console.log(pageId);
            this.setData({
                currentPageSrc: 'https://goodtool666.cn/_sportnews/wb/hotspot_slide.d.html?docid=' + pageId,
            });
        } else if (pageType === '3') {
            this.setData({
                currentPageSrc: 'https://goodtool666.cn/_sportnews/wb/hotspot_video.d.html?docid=' + pageId,
            });
        } else {
            // 其他新闻类型，通过接口转换成中间页
            swan.request({
                url: 'https://interface.sina.cn/sports/client/manage_doc.d.json?url=' + encodeURI(pageSrc),
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
    },
    onReady() {
        // 监听页面初次渲染完成的生命周期函数
    },
    onReachBottom() {
        // 页面上拉触底事件的处理函数
    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
        return {
            title: '小猪新闻看点',
            content: '看深度的原创体育资讯；追炫酷的体育潮流。',
            path: 'pages/detail/index'
        };
    },
    onURLQueryChange: function () {
        // 监听页面 URL query 改变
    },
})
