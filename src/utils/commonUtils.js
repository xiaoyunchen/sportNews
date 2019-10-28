/*
 * @Description: new file
 * @Author: liufei6
 * @Date: 2019-06-28 17:58:17
 * @LastEditors: liufei6
 * @LastEditTime: 2019-09-16 11:12:57
 * @Note: 
 */


/**
 * 打印信息
 * @return {fn}
 */
export const logInfo = (function () {
  const log = /__log=1/g.test(window.location.href)
  if (log) {
    return console.log;
  } else {
    return function () {
    }
  }
})();

/**
 * 验证结果是否正确
 * @param {Object} res
 * @return {Boolean}
 */
export const isRight = res => {
  if (res.result.status.code === 0) return true
  return false
}

/**
 * 在url中增加_apptarget=_blank参数，告知APP以新的webview打开此页面
 * @param String url
 * @return String
 */
export const addAPPtarget = url => {
  let newUrl = url;
  const charA = url.indexOf('?');
  const charB = url.indexOf('#');
  if (charA > 0) {
    const newPageUrl = url.substring(0, charA);
    const params = url.substring(charA + 1);
    newUrl = newPageUrl + '?_apptarget=_blank&' + params;
  } else if (charB > 0) {
    const newPageUrl = url.substring(0, charB);
    const params = url.substring(charB + 1);
    newUrl = newPageUrl + '?_apptarget=_blank#' + params;
  }
  return newUrl
};

/**
 * double num   // 返回值类型唯一，都是字符串
 * @param {Number} num
 */
export const doubleNum = num => {
  return num < 10 ? '0' + num : '' + num
}

/**
 * timeStamp：13位时间戳
 * format: 链接格式如'.','-',/''
 */
export const formatDate = (timeStamp, format = '/') => {
  const time = new Date(timeStamp)
  const timeObj = {
    year: time.getFullYear(),
    month: time.getMonth() + 1,
    day: time.getDate(),
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds(),
    millisecond: time.getMilliseconds()
  }
  return `${timeObj.year}${format}${timeObj.month}${format}${timeObj.day} ${doubleNum(timeObj.hour)}:${doubleNum(timeObj.minute)}`
}

/**
 * 返回文件名后缀
 * @param {String} name
 */
export const getFileSuffix = name => {
  const arr = name.split('.')
  return arr[arr.length - 1]
}

/**
 * 获取查询参数
 */
export const getQueryString = (name) => {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

/**
 * @param {Number} rm  服务器取的剩余时间
 * 倒计时函数
 */
export const countDown = (rm) => {
  let interval = 1000 // 每秒更新一次
  let timer
  let count = 0 // 记录倒计时执行多少次， 用于矫正偏差
  let startTime = new Date().getTime() // 开始时间， 用于矫正偏差

  if (rm > 0) {
    _countDown() // 首先执行一次
  }

  const _countDown = function () {
    let offset = new Date().getTime() - (startTime + count * interval)
    console.log(`偏差${offset}, 还剩余${formatTime(rm)}`)
    count++

    if (offset < 0) {
      offset = 0
    }
    let wait = interval - offset
    rm -= interval

    if (rm < 0) {
      clearTimeout(timer)
    } else {
      timer = setTimeout(countDown, wait)
    }
  }
  const formatTime = (timeStamp) => {
    const h = parseInt(timeStamp / 1000 / 60 / 60)
    const m = parseInt(timeStamp / 1000 / 60 % 60)
    const s = parseInt(timeStamp / 1000 % 60)
    return `${h}:${m}:${s}`
  }
}

/**
 * @param { String } version 开始支持某个功能的版本号 eg: 4.0.0
 * @return { Boolean } 返回当前版本是否支持某功能的布尔值
 * 注： android版本格式 3.30.0.0； ios版本格式 3.30.0 ； 安卓最后一位为内测版本号，所以校验前三位就可以
 *  因为每一位的位数不是固定的，有一位或者多位，所以只能按位校验
 */
export const checkAppVersion = (version) => {
  let ua = window.navigator.userAgent
  let reg = /__sinasports__(.+?)\)/i

  let curVersionArr = ua.match(reg)[1].split('.')
  let spportVersionArr = version.split('.')

  let flag = false

  if (curVersionArr[0] > spportVersionArr[0]
    || (curVersionArr[0] === spportVersionArr[0] && curVersionArr[1] > spportVersionArr[1])
    || (curVersionArr[0] === spportVersionArr[0] && curVersionArr[1] === spportVersionArr[1] && (curVersionArr[2] > spportVersionArr[2] || curVersionArr[2] === spportVersionArr[2]))
  ) {
    flag = true
  }
  console.log('当前版本：', ua.match(reg)[1], '是否支持截图分享: ', flag)
  return flag
}

/* eslint-disable */

/**
 *
 * @param {String} str
 * @return {Number}
 * 计算字符串长度，半角为1个字符长度，全角为2个字符长度
 */
export const getLength = (str) => {
  let res = 0
  if (!str || str.length === 0) {
    return res
  } else {
    let _arr = str.split('')
    let _len = _arr.length
    for (let i = 0; i < _len; i++) {
      let s = _arr[i];
      if ((/[\u0000-\u00ff]/g).test(s)) { //半角
        res += 1;
      } else {
        res += 2;
      }
    }
    return res
  }
}
/* eslint-enable */



// 具体业务相关

/**
 * 根据不同赛事获取对应的分享信息
 * @param {String} name 赛事名称
 */
export const getShareConfig = (name) => {
  // debugger
  let result = {}
  const _shareConfig = window.PAGEDATA.Config.shareConfig
  const _type = window.PAGEDATA.Config.matchTypeMap
  if(name && _shareConfig[_type[name]]) {
    result = Object.assign(result, _shareConfig[_type[name]]) // 对应不同赛事
  } else {
    result = Object.assign(result, _shareConfig.default) // 默认
  }
  console.log('share:', result)
  return result
}

/**
 * 是否是需要默认分享信息的页面
 * @param {String} page  页面名称，根据路由配置
 */
export const isDefaultSharePage = (page) => {
  // debugger
  const _page = page.toLowerCase()
  const needDefaultSharePage = ['default', 'index', 'mymatch', 'selectevent', 'user', 'register'] // 需要使用默认分享的页面
  if(needDefaultSharePage.indexOf(_page) > -1) {
    return true
  } else {
    return false
  }
}

/**
 * 初始化app分享
 * @param {String} name 赛事名称
 */
export const initNativeShare = (name) => {
  const shareConfig = getShareConfig(name)
  window.newsAppBridge.trigger('call_reserved', [{
    __dataType: 'init_native_share',
    url: shareConfig.shareUrl,
    title: shareConfig.shareTitle,
    pic: shareConfig.sharePic,
    intro: shareConfig.shareIntro,
  }, () => {}]);
}
