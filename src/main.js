import Vue from 'vue'
import router from '$router/index'
import App from './App.vue'
import store from '$store/index'
import Toast from '$plugins/toast/index'
import Confirm from '$plugins/confirm/index';
import Axios from '$utils/axios';
import jsonpGet from '$utils/jsonp';
import { formatDate, isPicture } from '$utils/filters';
import jumpPageMixin from '$utils/jumpPageMixin';

/* 引入公共的静态资源 */
import 'swiper/dist/css/swiper.css';
import '$public/css/base.css';

Vue.config.productionTip = false;

// 添加实例属性
Vue.prototype.$ajax = Axios;
Vue.prototype.$jsonp = jsonpGet;

Vue.use(Toast);
Vue.use(Confirm);

// 全局混入方法，用于实现页面跳转
Vue.mixin(jumpPageMixin);

// 全局过滤器 时间处理 格式：Y/M/D
Vue.filter('formatDate', value => {
  return formatDate(value)
});
// 全局过滤器 时间处理 没有年 格式：M/D
Vue.filter('formatDateNoYear', value => {
  return formatDate(value, '/', false)
});
// 全局过滤器 默认图片展示
Vue.filter('isPicture', curImg => {
  return isPicture(curImg)
});
// 全局过滤器 默认图片展示
Vue.filter('showBirthday', birthday => {
  if (birthday) return birthday.replace(/-/g, '/');
  else return birthday;
});

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
