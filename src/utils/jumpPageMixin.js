/**
 将相关页跳转方法定义在mixin中(以便后端随时调整为多页面)
 */

/* 引进项目配置文件 */
import APIList from '$config/APIList';

const routeBaseQuery = {
  __native_pull_refresh: 0
};

const jumpPageMixin = {
  methods: {
    gotoSports(_ths) {
      const ths = _ths || this;
      const routeQuery = Object.assign({}, routeBaseQuery);
      ths.$router.push({ name: 'sports', query: routeQuery });
    },
    gotoNews(_ths) {
      const ths = _ths || this;
      const routeQuery = Object.assign({}, routeBaseQuery);
      ths.$router.push({ name: 'news', query: routeQuery });
    },
    gotoPhotos(_ths) {
      const ths = _ths || this;
      const routeQuery = Object.assign({}, routeBaseQuery);
      ths.$router.push({ name: 'photos', query: routeQuery });
    },
    gotoVideos(_ths) {
      const ths = _ths || this;
      const routeQuery = Object.assign({}, routeBaseQuery);
      ths.$router.push({ name: 'videos', query: routeQuery });
    },
    gotoDetail(_ths, newsItem) {
      const ths = _ths || this;
      const pageType = newsItem.type;
      let pageSrc = decodeURI(newsItem.url);
      let pageId = newsItem.docid;
      const slideid = newsItem.f_docid;
      let currentPageSrc = '';
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
      if (pageType === 1 || pageType === 9) {
        currentPageSrc = 'https://goodtool666.cn/_sportnews/wb/pigsee_news.d.html?docid=' + pageId; // hotspot/mid
      } else if (pageType === 2) {
        if (slideid) {
          pageId = slideid.replace('slide:', '').replace(/-/g, '_');
        }
        currentPageSrc = 'https://goodtool666.cn/_sportnews/wb/pigsee_slide.d.html?docid=' + pageId;
      } else if (pageType === 3) {
        currentPageSrc = 'https://goodtool666.cn/_sportnews/wb/pigsee_video.d.html?docid=' + pageId;
      } else {
        // 其他新闻类型，通过接口转换成中间页
        ths.$ajax.get(APIList.appSharePageUrl, {
          url: encodeURI(pageSrc),
        }).then((d) => {
          if (d.data && d.data.midurl) {
            pageSrc = d.data.midurl.replace('sports.sina.cn', 'goodtool666.cn/_sportnews');
            currentPageSrc = pageSrc;
          } else {
            currentPageSrc = pageSrc;
          }
        });
      }
      if (currentPageSrc) {
        window.location.href = currentPageSrc;
      }
    },
  }
};

export default jumpPageMixin;