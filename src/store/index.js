import Vue from 'vue';
import Vuex from 'vuex';
import Axios from '$utils/axios';
import { getShareConfig, initNativeShare } from '$utils/commonUtils';

/* 引进项目配置文件 */
import APIList from '$config/APIList';

// 获取分享配置数据
const Config = window.PAGEDATA.Config || {};
const shareConfig = Config.shareConfig || {};

Vue.use(Vuex);

/* eslint-disable no-new */
/* eslint-disable no-param-reassign */
export default new Vuex.Store({
  state: {
    title: '小猪新闻看点',
    defaultPage: 'sports',
    version: '0.0.1', // 当前版本号
    clientType: 'wap', // 客户端标识，默认是wap,如果是微信客户端则"weixin",如果是体育客户端则"sinasports"
    isLogin: false, // 记录当前用户是否登录
    isFirstVisit: true,
    shareConfig: { // APP分享相关配置
      shareTitle: shareConfig.shareTitle,
      shareUrl: shareConfig.shareUrl,
      sharePic: shareConfig.sharePic,
      shareIntro: shareConfig.shareIntro,
    },
    usrInfo: {
      uid: '', // 登录用户微博UID，报名需要微博登录，后台会校验是否登录
      nick: '', // 昵称
      portrait_url: '', // 头像地址
      return_url: 'http://my.sina.cn/',
    },
    usrAccountInfo: {
      phone_pre: '',
      phone: '',
      name: '',
      id: '',
      extendinfo: {}
    },
    payStyleObjList: {
      appunionpay: {
        payname: '银联支付',
        paycode: 'appunionpay',
        description: '支持储蓄卡信用卡，无需开通网银',
        colour: '#999999',
        logo: '#assetsPublicPath#/static/img/appunionpay.png',
      },
      appalipay: {
        payname: '支付宝',
        paycode: 'appalipay',
        description: '简单、安全、快速',
        colour: '#999999',
        logo: '#assetsPublicPath#/static/img/malipay.png',
      },
      malipay: {
        payname: '支付宝',
        paycode: 'malipay',
        description: '简单、安全、快速',
        colour: '#999999',
        logo: '#assetsPublicPath#/static/img/malipay.png',
      },
      wxapppay: {
        payname: '微信支付',
        paycode: 'wxapppay',
        description: '亿万用户的选择，更快更安全',
        colour: '#999999',
        logo: '#assetsPublicPath#/static/img/weixin.png',
      },
      wxpayjsapi: {
        payname: '微信支付',
        paycode: 'wxpayjsapi',
        description: '',
        colour: '#999999',
        logo: '#assetsPublicPath#/static/img/weixin.png',
      },
    },
    loadding: false, // 是否显示loadding图
  },
  getters: {
    isAPP(state) {
      if (state.clientType === 'sinasports') return true;
      return false;
    },
    version(state) {
      return state.version;
    },
    clientType(state) {
      return state.clientType;
    },
    clientTypeValue(state) { // 客户端类型（5：PC，6：手机浏览器, 1：体育APP）
      let clientType;
      if (state.clientType === 'sinasports') {
        clientType = 1;
      } else if (state.clientType === 'wap') {
        clientType = 6;
      } else { // 其他客户端均认为是PC
        clientType = 5;
      }
      return clientType;
    },
    isLogin(state) {
      return state.isLogin;
    },
    isFirstVisit(state) {
      return state.isFirstVisit;
    },
    uid(state) {
      return state.usrInfo.uid;
    },
    usrInfo(state) {
      return state.usrInfo;
    },
    id(state) {
      return state.usrAccountInfo.id;
    },
    usrAccountInfo(state) {
      return state.usrAccountInfo;
    },
    extendinfo(state) { // 用户的补充资料数据
      return state.usrAccountInfo.extendinfo;
    },
    userface(state) {
      if (state.usrAccountInfo && state.usrAccountInfo.avatar) {
        return state.usrAccountInfo.avatar;
      } else {
        return state.usrInfo.userface;
      }
    },
    payChannel(state) { // 支付渠道（2：支付宝，3：微信）: 默认支付宝支付
      let payChannel;
      if (state.clientType === 'weixin') {
        payChannel = 3;
      } else { // 其他客户端均采用支付宝支付方式
        payChannel = 2;
      }
      return payChannel;
    },
    payStyle(state) { // 支付方式: 默认支付宝支付
      let payStyle;
      if (state.clientType === 'weixin') {
        payStyle = 'wxpayjsapi'; // or 'wxapppay'
      } else { // 其他客户端均采用支付宝支付方式
        payStyle = 'malipay';
      }
      return payStyle;
    },
    payStyleObjList(state) {
      return state.payStyleObjList;
    },
    loadding(state) {
      return state.loadding;
    },
  },
  mutations: {
    setTitle(state, newTitle) {
      window.document.title = newTitle;
      state.title = newTitle;
    },
    setClientType(state, clientType) {
      state.clientType = clientType;
    },
    setIsLogin(state, isLogin) {
      state.isLogin = isLogin;
    },
    setIsFirstVisit(state, isFirst) {
      state.isFirstVisit = isFirst;
    },
    setUid(state, uid) {
      state.usrInfo.uid = uid;
    },
    setUsrInfo(state, usrInfo) {
      state.usrInfo = Object.assign({}, usrInfo);
    },
    setUsrAccountInfo(state, usrInfo) {
      state.usrAccountInfo = Object.assign({}, usrInfo);
    },
    showLoadding(state) {
      state.loadding = true;
    },
    hideLoadding(state) {
      state.loadding = false;
    },
  },
  actions: {
    setTitle(context, newTitle) {
      context.commit('setTitle', newTitle);
    },
    checkClient(context) {
      return new Promise((resolve) => {
        const WebViewInfo = window.WebViewInfo || {};
        // 判断当前客户端
        const ua = WebViewInfo.ua || window.navigator.userAgent.toLowerCase();
        const isNews = WebViewInfo.isNews || (/sinanews/i).test(ua);
        const isSports = WebViewInfo.isSports || (/sinasports/i).test(ua);
        const isWeixin = WebViewInfo.isWeixin || (/micromessenger/i).test(ua) || typeof navigator.wxuserAgent !== 'undefined';

        let clientType = 'pc';

        if (isNews) {
          clientType = 'sinanews';
        } else if (isSports) {
          clientType = 'sinasports';
        } else if (isWeixin) {
          clientType = 'weixin';
        } else if (WebViewInfo.isIOS || ua.match(/iphone|ipod|ipad/ig)) {
          clientType = 'wap';
        } else if (WebViewInfo.isAndroid || ua.match(/Android/i)) {
          clientType = 'wap';
        }
        if (clientType !== 'wap') {
          context.commit('setClientType', clientType);
        }
        resolve();
      });
    },
    setShareConfig(context, eventName) {
      initNativeShare(eventName)
    }
  },
});
