/**
 * @file app.js
 * @author swan
 */

/* globals swan */

App({
    onLaunch(options) {
        console.log('SWAN launch');
        // 小程序初始化完成时触发，全局只触发一次。
        if (swan.canIUse('showFavoriteGuide')) {
            swan.showFavoriteGuide({
                type: 'bar',
                content: '关注小猪新闻看点',
                success(res) {
                    console.log(res);
                    swan.showToast({
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
            title: '小猪新闻看点',
            content: '看深度的原创体育资讯；追炫酷的体育潮流。',
            path: 'pages/sports/index'
        };
    },
    onShow: function () {
        swan.setPageInfo({
            title: '小猪新闻看点',
            keywords: '小猪新闻看点,体育新闻,体育热点,体育看点,高清图集,视频',
            description: '小猪新闻看点为用户提供热点新闻、图集和视频等体育相关新闻、图集、视频资讯。',
            articleTitle: '看深度的原创体育资讯；追炫酷的体育潮流。',
            releaseDate: '2019-10-17 17:31:30',
            image: [
                'http://n.sinaimg.cn/sports/imgStore/download/phone.png',
                'http://n.sinaimg.cn/sports/imgStore/750x1334.png'
            ],
            visit: {
                pv: '1314',
                uv: '520',
                sessionDuration: '233'
            },
            likes: '11',
            comments: '22',
            collects: '33',
            shares: '66',
            followers: '99',
            success: res => {
                console.log('setPageInfo success');
            },
            fail: err => {
                console.log('setPageInfo fail', err);
            }
        })
	},
	onHide: function () {
		console.log('SWAN当前处于后台');
	},
	onError: function () {
		console.log('SWAN发生错误');
	},
	globalData: 'SWAN'
});
