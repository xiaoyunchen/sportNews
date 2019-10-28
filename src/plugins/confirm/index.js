/* eslint-disable */
import Vue from 'vue';
import ConfirmComponent from './confirm.vue';
let instance;
//extend 是构造一个组件的语法器.传入参数，返回一个组件
let ConfirmConstructor = Vue.extend(ConfirmComponent);

let initInstance = ()=>{
  //实例化ConfirmConstructor组件
  instance = new ConfirmConstructor({
    el: window.document.createElement('div')
  });
  //添加到body
  window.document.body.appendChild(instance.$el);
}

let Confirm = (options={}) => {
  //初始化
  initInstance();
  // 将单个 confirm instance 的配置合并到默认值（instance.$data，就是confirm.vue里面的data）中
  Object.assign(instance.$data, options);
  //返回Promise
  return new Promise((resolve, reject)=>{
    instance.show = true;
    let success = instance.success;
    let cancel = instance.cancel;
    instance.success = () => {
      //先执行instance.success（confirm.vue里面的success函数）
      success();
      //再执行自定义函数
      resolve('ok');
    },
    instance.cancel = () => {
      cancel();
      reject('cancel');
    }
  });
}

const install = function(Vue) {
  //注册全局组件
  Vue.component(confirm.name, Confirm)
  //添加全局API
  Vue.prototype.$confirm = Confirm;
}
export default install;
