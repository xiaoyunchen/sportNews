// 获取数据API的根地址
const _protocal = location.protocol;

const APIList = {
  recommend: _protocal + '//goodtool666.cn/_dataApi_api1/api/v3/get', // 相关推荐:cre.dp.sina.cn
  comment: _protocal + '//interface.sina.cn/wap_api/article_getall.d.json', // 热门评论
  support: _protocal + '//comment5.news.sina.com.cn/cmnt/vote', // 点赞
  appSharePageUrl: _protocal + '//goodtool666.cn/_dataApi_api2/sports/client/manage_doc.d.json' // 普通页地址转成分享:interface.sina.cn
};

export default APIList;