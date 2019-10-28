import Vue from 'vue';
import axios from 'axios';
import { logInfo } from "$utils/commonUtils";

// axios 配置
axios.defaults.timeout = 60000;
axios.defaults.withCredentials = true; // 允许携带cookie

// 设置默认请求头，使post请求发送的是formdata格式数据
// axios的header默认的Content-Type是'application/json;charset=UTF-8',
// 如果需要更改的话，可以用这种方式修改

axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'; // application/x-www-form-urlencoded;

// response 拦截
axios.interceptors.response.use((response) => {
  if (response.status === 200) {
    return Promise.resolve(response.data);
  } else if (response.status === 500) {
    Vue.prototype.$toast.show({
      text: '数据服务异常[500]',
      type: 'warning',
    });
  } else if (response.status === 404) {
    Vue.prototype.$toast.show({
      text: '数据接口未找到[404]',
      type: 'warning',
    });
  } else {
    Vue.prototype.$toast.show({
      text: '数据接口服务异常',
      type: 'warning',
    });
  }
  return Promise.resolve(response.data);
}, (error) => {
  logInfo(JSON.stringify(error));
  Vue.prototype.$toast.show({
    text: '网络请求失败，请检查网络设置',
    type: 'warning',
  });
  const responseData = {
    status: 'error',
  };
  return Promise.resolve(responseData);
});

export default axios;
