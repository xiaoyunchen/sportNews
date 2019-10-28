// import Vue from 'vue';
// import jsonp from 'jsonp'
import jsonp from './jsonpModule'
import { logInfo, isRight } from '$utils/commonUtils'

const md5 = require('md5')
/**
 * @param {Object} params 
 * params.url: 接口url, 
 * params.data: 请求参数
 * params.cache: 是否有缓存, 有缓存时，callbackName必须且为固定值
 * cb: 默认为false，接口code码不为0时不需要特殊判断；cb 为true时接口code码不为0, 需要进行不同回调
 */
const jsonpGet = params => new Promise((resolve) => { // , reject
    let queryString = '?'
    params.data && Object.keys(params.data).forEach(item => {
      queryString = `${queryString}${item}=${params.data[item]}&`
    })
    let url = `${params.url}${queryString}`.slice(0,-1)
    // url = url.indexOf('?') > 0 ? `${url}&dpc=1` : `${url}?dpc=1`
    return jsonp(url, {
      param: 'callback',
      timeout: params.timeout || 60000,
      name: params.cache ? `cb_${md5(params.callbackName)}` : (params.callbackName || `cb_${+new Date()}`),
      cache: params.cache
    }, (err, data) => {
      logInfo('url=', params.url)
      
      if(err) {
        logInfo('error=', err)
        /*
        Vue.prototype.$toast.show({
          text: err.indexOf('Timeout') > -1 ? `${err}, ${params.url}` : err,
          type: 'warning',
        });
        */
        // reject(err)
      } else {
        logInfo('data=', data)
        // let msg = data.result.status.msg
        if(!params.cb) { // code 不为0 时不需要特殊回调
          if(isRight(data)) {
            resolve(data.result)
          } else {
            /*
            Vue.prototype.$toast.show({
              text: msg.indexOf('Timeout') > -1 ? `${msg}, ${params.url}` : msg,
              type: 'warning',
            });
            */
            // reject(data.result)
          }
        } else {
          resolve(data.result)
        }
      }
    })
})

export default jsonpGet