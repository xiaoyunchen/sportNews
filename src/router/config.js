// 获取页面根地址
const Config = window.PAGEDATA.Config || {};
const routeBasePath = Config.routeBasePath;
// 路由清单
const pageRouterList = {
  baseRoute: routeBasePath,
  sports: '/sports', // 体育新闻
  news: '/news', // 体育花边新闻
  photos: '/photos', // 图集新闻
  videos: '/videos', // CBA优酷视频
  cbaVideos: '/cbaVideos', // CBA优酷视频列表页
};
export default pageRouterList;

