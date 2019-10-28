/* eslint-disable */
var isDebugModel = location.href.indexOf('debug=1') !== -1;
isDebugModel && !window.jsBridge && navigator.appVersion.toLowerCase().indexOf('android') > -1 && (window.jsBridge = {
  process: function (data) {
    console.log(data)
  }
});

/*
 * @description: 与客户端的交互事件文件
 * @author: tingling@staff.sina.com.cn
 * @update: tingling (2017-02-13)
 */
(function (win, doc, undef) {
  /**
   * 工厂类
   * 事件了事件的 '绑定'、'触发' 功能
   */
  var EventFactory = function () {
    var eventMap = {};

    function initEvent(live) {
      return {
        listener: [], // {func: Function, liveIndex: 0}
        isLive: live || false,
        liveEvents: []
      };
    }
    /*
     * 
     * 添加监听
     * every 对应数组所有元素执行一个方法 , 若所有方法成立 返回true 
     * 检查对象的监听器中是否已经存在对应函数 , 若没有 则绑定
     * 返回事件绑定后的对象
     * 
     */
    function addListener(eventObj, listenFunc) {
      var listenerProxy = eventObj.listener,
        exist = false,
        listenObj = {};
      // ( 存在性检验 ) 如果对象的listener数组中 任意一个的func 与即将要绑定的函数都不同 也就是说不存在 那么返回false
      exist = !listenerProxy.every(function (tmp) {
        if (tmp.func !== listenFunc) {
          return true;
        } else {
          listenObj = tmp;
          return false;
        }
      });
      //如果不存在 那么对应绑定并添加
      if (!exist) {
        listenObj = {
          func: listenFunc,
          liveIndex: 0
        };
        listenerProxy.push(listenObj);
      }
      return listenObj;
    }

    /*
     * 
     * 
     */
    return {
      /*
       * 
       * 事件名称 , 对应方法 , isLive?
       * 进行条件性筛选 , 通过addListener 方法进行事件绑定
       * 对应事件名称 与方法相绑定
       *
       * bind
       */
      on: function (eventName, func, isLive) {
        if (!this.eventMap) {
          this.eventMap = {};
        }
        var eventMap = this.eventMap;
        var listenObj = {};
        var eventObj = null,
          listenerObj = null,
          isLive = isLive || false;
        // 如果事件列表中没有对应事件名 , 将事件名初始化一个空对象初始结构,用于接下来绑定事件
        if (!eventMap.hasOwnProperty(eventName)) {
          eventMap[eventName] = initEvent(isLive);
        }
        eventObj = eventMap[eventName];
        //  对应事件列表中的事件 绑定对应的函数 并返回 主要功能在此
        listenObj = addListener(eventMap[eventName], func);
        // live处理 live?
        if (isLive && eventObj.liveEvents.length > 0 && listenObj.liveIndex < eventObj.liveEvents.length) {
          var i = listenObj.liveIndex,
            len = eventObj.liveEvents.length;
          eventObj.liveIndex = len;
          for (; i < len; i++) {
            func.apply(window, eventObj.liveEvents[i]);
          }
          listenObj.liveIndex = eventObj.liveEvents.length;
        }
      },
      /*
       * 
       * 按照事件名称找到事件列表找的函数 并执行 , this指向window
       * 
       */
      trigger: function (eventName, params, isLive) {
        //isLive = typeof(isLive) === 'boolean' ? isLive : true;
        var eventObj = {};
        if (!this.eventMap) {
          this.eventMap = {};
        }
        eventMap = this.eventMap;
        if (util._type(params) !== 'array') {
          params = [params];
        }
        if (!eventMap.hasOwnProperty(eventName)) {
          //在h5主动执行的事件清单中
          eventObj = eventMap[eventName] = initEvent(typeof (isLive) === 'boolean' ? isLive : true);
          eventObj.liveEvents.push(params);
        } else {
          //不在h5主动执行的事件清单中
          eventObj = eventMap[eventName];
          eventObj.listener.forEach(function (listenObj) {
            try {
              listenObj.func.apply(window, params);
            } catch (err) {
              console.error && console.error(err);
            }
          });
          isLive ? eventObj.liveEvents.push(params) : '';
        }
      }
    };
  };
  /**
   * 工具类 
   * 实现了类型判断、对象扩展、获取唯一标识码
   **/
  var util = {
    _type: function (obj) {
      var tmp = typeof (obj);
      return tmp === 'object' ?
        (Object.prototype.toString.call(obj).match(/\[object (.*)\]/) ? RegExp.$1.toLowerCase() : 'other') :
        tmp;
    },
    /**
     * 扩展
     * src继承target 的对应属性方法 , 当且仅当target具有此属性并且src没有此属性的时候 
     * 执行对应属性的覆盖性继承
     */
    _extend: function (src, target, cover) {
      cover = cover || false;
      for (var i in target) {
        target.hasOwnProperty(i) && !src.hasOwnProperty(i) || !cover ? src[i] = target[i] : '';
      }
    },
    generateUid: function (key) {
      var code = ['A', 'z', 'C', 'E', 'd', 'H', 'j', 'v', 'k', 'L'],
        timestamp = (new Date()).getTime();

      function getRandomCode() {
        var org = '' + (parseInt(Math.random() * 10000));
        return [].map.call(org, function (item) {
          return code[item];
        }).join('');
      }
      key = key || '';
      return key + getRandomCode() + timestamp;
    },
    setCookie: function (key, value, expire, path, domain, extra) {
      var appendArr = [];
      appendArr.push(key + "=" + escape(value));
      if (expire) {
        var date = new Date();
        date.setTime(Date.now() + expire);
        appendArr.push("expires=" + date.toGMTString());
      }
      path && appendArr.push("path=" + path);
      domain && appendArr.push("domain=" + domain);
      extra && appendArr.push(extra);
      doc.cookie = appendArr.join(";");
    },
    getCookie: function (key) {
      if (!key) {
        console.log('missing key, get cookie abort!');
        return '';
      }
      key = key.replace(/([\.\[\]\$])/g, "\\$1");
      var mathReg = new RegExp(key + '=([^;]*)?;', 'i');
      var cookieCache = doc.cookie + ';';
      return cookieCache.match(mathReg) ? unescape(RegExp.$1) : '';
    }
  }
  /**
   * 与客户端交互的主对象
   * 包括所有的业务逻辑
   */
  var newsAppBridge = {
    get cnf() {
      !this._cnf && (this._cnf = {
        //所有与客户端交互的事件汇总list
        //通过此白名单，过滤非提前约定的事件
        actionMap: ['unknow', 'comment', 'share', 'initShareInfo', 'open_comment', 'collection', 'login', 'subscription', 'mpSubscription', 'constellation', 'skip', 'font-change', 'switch-daynight', 'update-constellation', 'car', 'scheme', 'appoint_match', 'appoint_query', 'reserved', 'search-keywords', 'forbidShowShare', 'confirmLogin', 'pageTimeout', 'get_deviceinfo', 'getDeviceStatus', 'activity-info', 'setAPPSearchKeywords', 'changeSearchKeyStatus', 'reloadPage', 'wdReadContinue', 'closePage', 'callPhone', 'searchGifInfo', 'jumpSysPushSetting', 'getSysPushSetting', 'getAppPushSetting', 'setAppPushSetting', 'onPageLifeCycle', 'refreshFeed'],
        //js调用客户端事件list call_
        methods: ['comment', 'share', 'initShareInfo', 'open_comment', 'collection', 'login', 'subscription', 'mpSubscription', 'constellation', 'skip', 'car', 'scheme', 'appoint_match', 'appoint_query', 'reserved', 'searchKeywords', 'forbidShowShare', 'confirmLogin', 'pageTimeout', 'getDeviceInfo', 'getDeviceStatus', 'activityInfo', 'setAPPSearchKeywords', 'changeSearchKeyStatus', 'reloadPage', 'wdReadContinue', 'closePage', 'callPhone', 'searchGifInfo', 'jumpSysPushSetting', 'getSysPushSetting', 'getAppPushSetting', 'setAppPushSetting', 'refreshFeed'],
        //js提供给客户端调用的事件list 
        clientEventMap: ['font-change', 'switch-daynight', 'update-constellation', 'search-keywords', 'get_deviceinfo', 'activity-info', 'searchGifInfo', 'onPageLifeCycle'],

        //IOS截获的协议
        //IOS无法直接对js提供对象，但可以截获url，通过此种方式，可以截获解析需要传递的内容
        iframeProtocol: 'jsBridge://',
        //js调用客户端list	允许回调的白名单
        whiteCB: ['share', 'initShareInfo', 'appoint_match', 'appoint_query', 'reserved', 'getDeviceStatus', 'login', 'confirmLogin', 'changeSearchKeyStatus', 'searchGifInfo', 'jumpSysPushSetting', 'getSysPushSetting', 'getAppPushSetting', 'setAppPushSetting', 'onPageLifeCycle', 'refreshFeed']
      });
      return this._cnf;
    },
    set cnf(val) {
      if (util._type(val) === 'object') {
        !this._cnf && this.cnf;
        Object.keys(val).forEach(function (key) {
          this._cnf[key] = val[key];
        });
      }
      return val;
    },
    init: function (cnf) {
      cnf && (this.cnf = cnf);
      //检验是否可以与客户端通信 , 并且将通信模式进行存储
      if (this.checkDepend()) {
        this.initListen();
      };
    },
    //初始化绑定需要使用到的事件方法
    initListen: function () {
      var cnf = this.cnf;
      var self = this;
      //初始化需要客户端调用的 trigger foreach循环遍历事件名称列表 , proxy中存储对应事件 , 进行绑定
      cnf.clientEventMap.forEach(function (clientEvent) {
        if (clientEvent) {
          //创建事件对应的请求格式 req, 将对应事件名与对应需要的参数request?
          var req = {
            method: "addEventListener",
            event: clientEvent,
            callback: "try{newsAppBridge.trigger('" + clientEvent + "',[data]);}catch(e){}"
          }
          // debugger
          //		将事件名 与 对应proxy筛选当前事件名的函数(此处非函数执行 , 参数2为预置参数) 相绑定 , 此处添加的事件为供客户端使用的事件 , 依次绑定 , proxy中存在向客户端发送事件的方法
          self.on(clientEvent, self._proxy.bind(newsAppBridge, clientEvent));
          //		向客户端发送客户端需要使用对应事件的使用方法 , 依次发送
          self._request(req);
        }
      });
      //初始化前端调用的
      cnf.methods.forEach(function (method) {
        //		绑定call_事件名  与 对应的proxy筛选当前事件名的函数(此处非函数执行 , 参数2为预置参数) 相绑定 , 存储到事件列表中 
        self.on('call_' + method, self._proxy.bind(newsAppBridge, method));
      });
    },
    /**
     * 检验前置条件，是否允许触发客户端事件
     * android用jsbridge ios用 iframe?
     * 
     */
    checkDepend: function () {
      var cnf = this.cnf;
      cnf.protolType = 'unknow';
      if (win.jsBridge && (util._type(win.jsBridge.process) === 'function')) {
        cnf.protolType = 'jsBridge';
        return this.enable = true;
      } else {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/iphone|ipod|ipad/)) {
          cnf.protolType = 'iframe';
          return this.enable = true;
        }
      }
      return false;
      //return (this.enable = win.jsBridge && (util._type(win.jsBridge.process)==='function'));
    },
    /**
     * 发出与客户端交互的事件
     * 
     * android 通过jsbridge 进行事件沟通 , 详细沟通规则参见传递的data数据
     * ios 无法截获js对象 , 通过url进行传递 特定开头为jsbridge://
     * 
     */
    _request: function (data, callback, timeout) {
      if (!this.enable) {
        return;
      }
      var cnf = this.cnf;
      timeout = timeout || 3 * 1000;
      var callbackpref = 'h5appCallback';
      var iphonepref = 'jsBridge';
      var uniKey = util.generateUid();
      var iframe = null;
      var callbackKey = null;

      if (util._type(callback) === 'function') {
        callbackKey = callbackpref + uniKey;
        win[callbackKey] = (function (data) {
          delete win[callbackKey];
          callback(data);
        }).bind(window);
        util._extend(data, {
          callback: 'try{window[\'' + callbackKey + '\']([data])}catch(err){console.log(err)}'
        });
      };
      //showLog('ready to send data'+JSON.stringify(data))
      data = JSON.stringify(data);
      if (cnf.protolType === 'jsBridge') {
        //showLog('win.jsBridge.process'+win.jsBridge.process);
        win.jsBridge.process(data);
      } else {
        var iphoneKey = iphonepref + uniKey;
        win[iphoneKey] = data;
        iframe = doc.createElement('iframe');
        iframe.src = cnf.iframeProtocol + iphoneKey;
        iframe.style.display = 'none';
        cnf.iframeProtocol && iphoneKey && doc.body.appendChild(iframe);
      }
      // console.log(data);
    },
    /**
     * 代理事件处理函数
     * 客户端代理事件与业务事件的转换函数
     * 用于确保触发事件的出错率，缓冲，提高可控性 ???
     * 
     * req为通用请求对象  , 在switch中筛选事件类型, 对应事件类型中会向req对象中添加需要的参数
     * 然后执行_request 进行客户端交互
     * 
     */
    _proxy: function (method, _data, cb) {
      var cnf = this.cnf;
      if (!cnf.actionMap || cnf.actionMap.indexOf(method) === -1) {
        return;
      }
      // var req = {
      //     data: {
      //       action: method
      //     },
      //     callback: '',
      //     method: "requestCallback"
      //   },
      //   data = typeof (_data) != 'undefined' && _data || {};
      var req = {
          data: {
            action: method
          },
          callback: '',
          method: "requestCallback"
        };
      var data = typeof (_data) != 'undefined' && _data || {};
      switch (method) {
        //分享事件
        case 'share':
          //初始化分享信息事件
          util._extend(req.data, data);
          break;
        case 'initShareInfo':
          util._extend(req.data, {
            url: data.url || location.href,
            title: data.title || doc.title,
            pic: data.pic || 'http://mjs.sinaimg.cn/wap/online/public/images/addToHome/mil_114x114_v1.png',
            intro: data.intro || doc.title
          });
          break;
          //评论事件
        case 'comment':
          util._extend(req.data, {
            url: data.url || location.href,
            newsid: data.cmntid || 'fxqaffy3538394',
            channel: data.ch || doc.title,
            mid: ''
          });
          break;
          //跳转系统设置，663
        case 'jumpSysPushSetting':
          //获取push系统设置，663  
        case 'getSysPushSetting':
          //获取app push设置，663  
        case 'getAppPushSetting':
          //设置app push设置，663  
        case 'setAppPushSetting':
          //强刷页面
        case 'reloadPage':
          //页面超时事件
        case 'pageTimeout':
          //登录事件（含确认弹窗）   
        case 'confirmLogin':
          //登录事件（不含确认弹窗）
        case 'login':
          //获取用户星座信息事件
        case 'constellation':
          //汽车事件
        case 'car':
          //获取设备信息事件
        case 'getDeviceStatus':
          break;
          //强刷feed，664android
        case 'refreshFeed':
          //页面超时事件
        case 'collection':
          //打开阅读sdk
        case 'wdReadContinue':
          //关闭H5页面
        case 'closePage':
        case 'callPhone':
          // util._extend(req.data, {newsid:"",title:"",url:"",isFavorited:""});
          util._extend(req.data, data);
          break;
          //打开评论事件
        case 'open_comment':
          util._extend(req.data, {
            url: location.href,
            newsid: 'fxqaffy3538394',
            channel: doc.title,
            title: 'test'
          });
          break;
          //设置客户端搜索关键词事件
        case 'setAPPSearchKeywords':
          util._extend(req.data, {
            newKeyWords: data
          });
          break;
          //修改搜索关键词关注状态事件
        case 'changeSearchKeyStatus':
          util._extend(req.data, {
            keyWords: data.keyWords,
            code: data.code
          });
          break;
          //禁止页面分享出现事件
        case 'forbidShowShare':
          //媒体订阅事件
        case 'mpSubscription':
          break;
          //我的订阅事件
        case 'subscription':
          util._extend(req.data, {
            //          title	: data.title,
            //          intro	: data.intro,
            //          poster	: data.poster,
            url: data.url,
            channelId: data.channelId
          });
          break;
          //搜索gif信息
        case 'searchGifInfo':
          util._extend(req.data, {
            "gifType": data.gifType,
            'gifLink': data.gifLink,
            'gifId': data.gifId,
            'gifSearchKey': data.gifSearchKey
          })
          break;
          //页面跳转事件，h5呼起native主要通过此事件
        case 'scheme':
          util._extend(req.data, data);
          break;
          //页面超时事件
        case 'skip':
          util._extend(req.data, {
            url: data.url
          });
          break;
          //获取页面生命周期
        case 'onPageLifeCycle':
          this.trigger('call_setPageLifeCycle', data);
          break;
          //更改字号事件
          //client event
        case 'font-change':
          this.trigger('call_setFontSize', data);
          break;
          //切换白天夜间模式事件
        case 'switch-daynight':
          this.trigger('call_dayNight', data);
          break;
          //更新星座信息事件
        case 'update-constellation':
          this.trigger('call_upConstellation', data);
          //console.log('data:'+JSON.stringify(data)+' no ready ToDo!');
          break;
          //客户端初始化搜索关键词事件
        case 'search-keywords':
          this.trigger('call_searchKeywords', data);
          break;
          //获取活动信息事件
        case 'activity-info':
          this.trigger('call_activityInfo', data);
          break;
          //获取设备信息事件
        case 'get_deviceinfo':
          this.trigger('call_getDeviceInfo', data);
          break;
          // case 'appoint-result':
          //   this.trigger('call_appointMatchResult',data); 
          // break;
          //比赛预约事件，客户端内嵌H5比赛列表页面使用
        case 'appoint_match':
          //比赛查询事件，客户端内嵌H5比赛列表页面使用
        case 'appoint_query':
          //保留事件
        case 'reserved':
          util._extend(req.data, data);
          break;
        default:
          return;
      }
      // debugger
      //if(method === 'share'||method ==='initShareInfo' || method === 'appoint_match' || method === 'appoint_query' || method === 'reserved' || method === 'getDeviceStatus' || method == ''){
      if (this.cnf.whiteCB.indexOf(method) > -1) {
        this._request(req, cb || function (data) {
          showLog(method + ' event CB : ' + JSON.stringify(data))
        });
      } else {
        this._request(req);
      }
    }
  }

  util._extend(newsAppBridge, EventFactory());
  newsAppBridge.init();

  function showLog(txt) {
    // alert(txt);
    // console.log(txt);
    var _$test = document.querySelector('.j_test');
    if (isDebugModel) {

      if (_$test) {
        _$test.innerHTML += txt + "<br />";
      } else {
        _$test = document.createElement('div');
        _$test.className = 'j_test';
        _$test.setAttribute('style', 'position: fixed;bottom:0;left:0;width:100%;padding:10px;background-color:rgba(0,0,0,0.8);z-index:999;font-size:14px;line-height:30px;color:#f1f1f1');
        _$test.innerHTML = txt + '<br />';
        document.body.appendChild(_$test);
      }

    }
  }


  function reloadTimes() {
    var _times = util.getCookie('reloadpagetimes') || 0;
    var _$reload = document.querySelector('[data-type="reloadPage"]');

    if (_$reload) {
      util.setCookie('reloadpagetimes', ++_times, 1000 * 60 * 60 * 24, '/', '.sina.cn');
      _$reload.innerHTML = "reload次数：" + _times;
    }

  }

  win.appointMatchResult = function (data) {
    console.log(JSON.stringify(data));
    showLog('return match data : ' + JSON.stringify(data));
  }

  win.appointMatchQuery = function (data) {
    console.log(JSON.stringify(data));
    showLog('return match data : ' + JSON.stringify(data));
  }
  win.testLogin = function (data) {
    console.log(JSON.stringify(data));
    showLog('return match data : ' + JSON.stringify(data));
  }

  function testInit() {
    reloadTimes();
    var whiteTypeList = ['scheme', 'appoint_match', 'appoint_query', 'subscription', 'collection', 'wdReadContinue', 'callPhone', 'refreshFeed'];
    doc.getElementById('main') && doc.getElementById('main').addEventListener('click', function (e) {
      var curTarget = e.target,
        _dataset = curTarget.dataset || {},
        _type = _dataset['type'],
        _infoType = whiteTypeList.indexOf(_type) > -1 ? _dataset['infotype'] : '',
        _info = _infoType && typeof (_testInfo) != 'undefined' && [_testInfo[_infoType]] || [];

      _type == 'appoint_match' && _info.push(appointMatchResult);
      _type == 'appoint_query' && _info.push(appointMatchQuery);
      _type == 'confirmLogin' && _info.push(testLogin);
      _type == 'login' && _info.push(testLogin);

      if (curTarget && curTarget.nodeName == 'BUTTON') {
        newsAppBridge.trigger('call_' + curTarget.getAttribute('data-type'), _info);
        // _type == 'appoint-match' && newsAppBridge.on('call_appointMatchResult',appointMatchResult, true);      
      }
    });


  }
  try {
    /**
     * Debug模式
     */
    if (isDebugModel) {
      testInit();
    }

  } catch (error) {
    showLog(error.message);
  }

  win.newsAppBridge = newsAppBridge;
}(window, document, undefined));
//export {newsAppBridge}


// //登录成功之后的回调
// window.testLogin = function(data){
//     console.log(JSON.stringify(data));
//     showLog('return match data : '+JSON.stringify(data));
// }
// //执行登录
// try{
//   newsAppBridge.trigger('call_login',[{},testLogin]);
//   //第一个参数，固定为"call_login",表示登录事件
//   //第二个参数，类型必须为数组，且数组中第一个参数为需要传递给客户端的参数，登录不需要参数，传递空对象即可，数组中第二个为执行成功之后的回调函数
// }catch(e){
//   console.log(e.message);
// }