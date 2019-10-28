/**
 * 控制页面滚动方法
 * forbiddenScroll 禁止页面滚动
 * allowScroll 允许页面滚动
 */
const WebViewInfo = window.WebViewInfo || {};

let currentPageScrollTp = 0;

function forbiddenScroll() {
  const dom = window.document.body;
  currentPageScrollTp = dom.scrollTop;
  if (WebViewInfo.isSports && WebViewInfo.isNewVersion) { // APP中告知APP禁止body的滚动事件
    window.newsAppBridge.trigger('call_reserved', [{
      __dataType: "dialog_scroll",
      forbid : true,
      scrollTop: currentPageScrollTp,
    }, function() {}]);

    if (WebViewInfo.isAndroid) {
      // 安卓端没有在dialog_scroll方法中禁止页面滚动，需要做兼容处理
      dom.style.cssText = `position: fixed; width: 100%; left: 0; right: 0; top: -${currentPageScrollTp}px`;
    }
  } else {
    // 在单个语句中设置多个样式
    dom.style.cssText = `position: fixed; width: 100%; left: 0; right: 0; top: -${currentPageScrollTp}px`;
  }
}

function allowScroll() {
  if (WebViewInfo.isSports && WebViewInfo.isNewVersion) {
    window.newsAppBridge.trigger('call_reserved', [{
      __dataType: "dialog_scroll",
      forbid : false,
      scrollTop: currentPageScrollTp,
    }, function() {}]);
    if (WebViewInfo.isAndroid) {
      const dom = window.document.body;
      dom.style.position = '';
      dom.scrollTop = currentPageScrollTp;
    }
  } else {
    const dom = window.document.body;
    dom.style.position = '';
    dom.scrollTop = currentPageScrollTp;
  }
}

export default {
  forbiddenScroll,
  allowScroll,
};
