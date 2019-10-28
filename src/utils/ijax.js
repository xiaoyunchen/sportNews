import Vue from 'vue';

/**
 * ijax返回格式简单封装
 */

export default function $ijax(url, parasObject, callback) {
  window.document.domain = 'sina.cn';
  window.ijax(url, parasObject, (res) => {
    if (res.result && res.result.status) {
      const code = res.result.status.code;
      const msg = res.result.status.msg;
      if (code === 0 || code === '0') {
        if (typeof callback === 'function') {
          const responseData = res.result.data;
          callback(responseData);
        }
      } else if (code === 10100 || code === '10100') {
        Vue.prototype.$toast.show({
          text: '参数不合法',
          type: 'warning',
        });
      } else if (code === 10101 || code === '10101') {
        Vue.prototype.$toast.show({
          text: '参数格式不合法',
          type: 'warning',
        });
      } else if (code === 10200 || code === '10200') {
        Vue.prototype.$toast.show({
          text: '未获取到',
          type: 'warning',
        });
      } else if (msg) {
        Vue.prototype.$toast.show({
          text: msg,
          type: 'warning',
        });
      }
    } else {
      Vue.prototype.$toast.show({
        text: '接口返回数据格式有误，请联系开发人员。',
        type: 'warning',
      });
    }
  });
}
