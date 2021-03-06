/**
 * @file index.js
 * @author swan
 */
const app = getApp()

Page({
    data: { // 页面的初始数据
        newsList: [],
        docidList: [],
        newsListObj: {},
        tipText: '上划或点击查看更多',
        isLoad: false,
        isFirstVisit: true,
        page: 0,
        page_size: 15,
        params: {
            length: 15, // 请求的推荐列表长度,取非负整数，默认值为20，最大值为100,规则：offset+length<=100
            pageurl: '',
            cateid: '2L', // 栏目列表
            cre: 'sptapp', // 这两个参数主要用于描述产品位，需要statics=1激活这两个参数
            mod: 'r',
            merge: 3, // 显示推荐原因
            statics: 1,
            this_page: 1, // 是否过滤当前页
            rfunc: 105, // 应用场景参数
            dedup: 1, // 去重标志
            app_type: 112, // 客户端类型: 110-新闻app，111-财经app，112-体育app
        },
    },
    onLoad() {
        // 监听页面加载的生命周期函数
        this.getNews();
        this.setData({
            isFirstVisit: false,
        });
    },
    onReady() {
        // 监听页面初次渲染完成的生命周期函数
    },
    onReachBottom() {
        // 页面上拉触底事件的处理函数
        this.getMoreNews();
    },
    onClickBottom() {
        // 底部查看更多点击事件的处理函数
        this.getMoreNews();
    },
    onPullDownRefresh() {
        // 监听用户下拉动作
        wx.showToast('数据加载中。。。');
    },
    getMoreNews() {
        this.setData({
            page: this.data.page + 1,
        });
        this.getNews();
    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
        return {
            title: '小猪爱看news',
            content: '看深度的原创体育资讯；追炫酷的体育潮流。',
            path: 'pages/news/index'
        };
    },
    onURLQueryChange: function () {
        // 监听页面 URL query 改变
    },
    getNews: function () {
        if (this.data.isLoad) return;
        this.setData({
            isLoad: true,
        });
        /*
         type	指定item返回类型
         1新闻,2高清图,3视频,4博文,5悦读,6长微博,
         7抓站文章,8产品库页面,9看点文章,10秒拍,11微信公众号,12 精读, 13 专栏
         14 专题
         15 直播
         16 H5页面
         注：type=2的新闻页在百度小程序中打不开
         app_type	客户端类型	110-新闻app，111-财经app，112-体育app
        */
        wx.request({
            url: 'https://goodtool666.cn/_dataApi_api1/api/v3/get?offset=' + this.data.page * this.data.page_size + '&timstamp=' + new Date().getTime(),
            header: {
                'content-type': 'application/json'
            },
            data: this.data.params,
            success: res => {
                var newsDataList = [], dataList = res.data.data || [];
                var newdocidList = [];
                for (var ind = 0, size = dataList.length; ind < size; ind++) {
                    var item = dataList[ind];
                    if (this.data.docidList.toString().indexOf(item.docid) < 0) {
                        item.agreeDataFormat = this.agreeDataFormat(item.comment_count);
                        var beginTime = new Date('2019.10.29 13:15').getTime() + 3*60*60*1000;
                        var nowTime = new Date().getTime();
                        // 当前三小时内过滤视频相关新闻
                        if ((item.type !== 3 || nowTime >= beginTime)) {
                          newsDataList.push(item);
                        }
                        newdocidList.push(item.docid);
                        this.data.newsListObj[item.docid] = item;
                    }
                }
                if (newsDataList.length !== 0) {
                    newsDataList = this.data.newsList.concat(newsDataList);
                    newdocidList = this.data.docidList.concat(newdocidList);
                    this.setData({
                        newsList: newsDataList,
                    });
                    this.setData({
                        docidList: newdocidList,
                    });
                    this.setData({
                        newsListObj: this.data.newsListObj,
                    });
                    this.setData({
                        isLoad: false,
                    });
                } else {
                    this.setData({
                        isLoad: false,
                    });
                    this.setData({
                        tipText: '没有更多了哟',
                    });
                }
            },
            fail: err => {
                this.setData({
                    isLoad: false,
                });
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
    },
    jumpPage: function (e) {
        var eventData = e.currentTarget.dataset;
        var currentNewsItem = this.data.newsListObj[eventData.docid];
        wx.navigateTo({
            url: '/pages/detail/index?docid=' + currentNewsItem.docid + '&slideid='
                + currentNewsItem.f_docid + '&type=' + currentNewsItem.type + '&src=' + encodeURI(currentNewsItem.url),
        });
    },
    agreeDataFormat: function (agreeData) {
        if (agreeData && agreeData <= 9999) {
            return agreeData;
        } else if (agreeData && agreeData > 9999) {
            return Math.floor(agreeData / 1000) / 10 + 'w';
        }
    }
})
