
import { doubleNum } from '$utils/commonUtils'

/**
 * 日期处理
 * @param {} timeStamp 10位时间戳
 * @param {*} format 链接方式 如‘-’，‘/’
 */
export const formatDate = (timeStamp, format='/', flag=true) => {
  const time = new Date(timeStamp*1e3)
  const timeObj = {
    year: time.getFullYear(),
    month: time.getMonth() + 1,
    day: time.getDate(),
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds(),
    millisecond: time.getMilliseconds()
  }
  
  return flag 
    ? `${timeObj.year}${format}${doubleNum(timeObj.month)}${format}${doubleNum(timeObj.day)}` 
    : `${doubleNum(timeObj.month)}${format}${doubleNum(timeObj.day)}`
}

/**
 * @param {String} curImg url
 * 图片过滤器
 */
export const isPicture = (curImg) => {
  let picUrl = '#assetsPublicPath#/img/team-logo-cat.png'; // 默认图片地址
  var strFilter = ".jpeg|.gif|.jpg|.png|.bmp|.pic|";
  if (curImg && curImg.indexOf(".") > -1) {
    var startIndex = curImg.lastIndexOf(".");
    var endIndex = curImg.length;
    if (curImg.indexOf("?") > -1) {
      endIndex = curImg.lastIndexOf("?");
    }
    var strPostfix = curImg.substring(startIndex, endIndex);
    strPostfix = strPostfix.toLowerCase();
    if (strFilter.indexOf(strPostfix) > -1) {
      picUrl = curImg;
    }
  }
  return picUrl;
}