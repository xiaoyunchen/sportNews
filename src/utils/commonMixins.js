import { isDefaultSharePage } from '$utils/commonUtils';

/**
 将登录验证定义在mixin中
 */
export const beforeCreateMixin = {
  beforeCreate() {
    if (!this.$store.getters.isLogin) {
      this.$store.dispatch('checkClient').then(() => {
        // if (this.$store.getters.isAPP) {
        //   this.$store.dispatch('setShareConfig');
        // }
        this.$store.dispatch('checkLogin').then(() => {
          if (this.$store.getters.isLogin) { // 表示已经登录
            this.$store.dispatch('getUserInfo');
            // 显示数据加载中效果，避免用户此时在页面进行任何操作
            this.$store.commit('showLoadding');
            this.$store.dispatch('getAccountInfo').then(() => {
              this.$store.commit('hideLoadding');
            });
          } else { // 未登录则自动跳转到登录界面
            this.$store.dispatch('toLogin');
          }
        });
      });
    }
  },
};

/**
 * 判断是否有分赛区，是否是组队赛事
 */
export const checkQuery = {
  data() {
    let city_id = this.$route.query.cityid
    let tid = this.$route.query.tid
    return {
      isCity: (city_id !== 'undefined' && city_id !== '' && city_id) ? true : false,
      isTeam: (tid !== 'undefined' && tid !== '' && tid) ? true : false
    }
  }
}

/**
 * 获取常用信息， eventInfo, cityInfo, teamInfo等
 */
export const getCommonInfo = {
  computed: {
    // 赛事信息
    eventInfo() {
      let curPage = this.$route.name // 当前路由
      let _id = this.isCity ? this.city_id : this.cid
      let _eventInfo = this.$store.getters.getEventInfo(_id)
      // 重置分享，已经有存储的在拿到存储信息后重置
      !isDefaultSharePage(curPage) && _eventInfo && this.$store.dispatch('setShareConfig', _eventInfo.name)
      // let _sEventInfo = JSON.parse(window.sessionStorage.getItem('eventInfo')) && JSON.parse(window.sessionStorage.getItem('eventInfo'))[_id]
      
      // if(!_eventInfo && _sEventInfo) {
      //   this.$store.dispatch('recoverCommonInfo')
      // } else if(!_eventInfo && !_sEventInfo) {
      //   this.isCity && this.$store.dispatch('saveCityInfo', _id)
      //   !this.isCity && this.$store.dispatch('saveEventInfo', _id)
      // }
      if(!_eventInfo && !this.isCity) {
        this.$store.dispatch('saveEventInfo', {cid:_id, curPage:curPage})
      } 
      return this.$store.getters.getEventInfo(_id)
    },

    // 分站信息
    cityInfo() {
      // debugger
      let curPage = this.$route.name // 当前路由
      let _id = this.isCity ? this.city_id : this.cid // 有分站用city_id 取数据， 无分站用cid取数据
      let _cityInfo = this.$store.getters.getCityInfo(_id)
      // let _sCityInfo =  JSON.parse(window.sessionStorage.getItem('cityInfo')) && JSON.parse(window.sessionStorage.getItem('cityInfo'))[_id]

      // if(!_cityInfo && _sCityInfo) { // 如果刷新页面，vuex信息丢失， 则采用本地存储信息，进行恢复
      //   this.$store.dispatch('recoverCommonInfo')
      // } else if( !_cityInfo && !_sCityInfo) {
      //   this.isCity && this.$store.dispatch('saveCityInfo', _id)
      //   !this.isCity && this.$store.dispatch('saveEventInfo', _id) // 无分站时请求赛事信息
      // }
      if(!_cityInfo && this.isCity) {
        this.$store.dispatch('saveCityInfo', {'city_id':_id, 'curPage': curPage})
      }
      return this.$store.getters.getCityInfo(_id)
    },

    // 球队信息
    teamInfo() {
      if(this.isTeam) {
        let _teamInfo = this.$store.getters.getTeamAPlayerInfo(this.tid) // vuex中是否存在数据
        // let _sTeamInfo = JSON.parse(window.sessionStorage.getItem('teamInfo')) && JSON.parse(window.sessionStorage.getItem('teamInfo'))[this.tid] // 本地存储是否存在
        // if(!_teamInfo && _sTeamInfo) { // vuex 不存在，本地存在，从本地恢复到vuex
        //   this.$store.dispatch('recoverCommonInfo')
        // } else if(!_teamInfo && !_sTeamInfo){ // vuex 不存在，本地不存在，重新请求
        //   this.$store.dispatch('saveTeamAPlayerInfo', this.tid)
        // }
        if(!_teamInfo) {
          this.$store.dispatch('saveTeamAPlayerInfo', this.tid)
        }
        return this.$store.getters.getTeamAPlayerInfo(this.tid)
      }
    },

    // 赛事配置信息允许球队最大报名人数
    max() { 
        if(!this.isCity) {
          return this.eventInfo && this.eventInfo.teamconfig && this.eventInfo.teamconfig.maxpeople
        } else {
          return this.cityInfo && this.cityInfo.teamconfig && this.cityInfo.teamconfig.maxpeople
        }
    },

    // 赛事配置信息允许球队最小报名人数
    min() { 
        if(!this.isCity) {
          return this.eventInfo && this.eventInfo.teamconfig && this.eventInfo.teamconfig.minpeople
        } else {
          return this.cityInfo && this.cityInfo.teamconfig && this.cityInfo.teamconfig.minpeople
        }
    },

    // 是否是积分赛
    isbk3point() {
        if(!this.isCity) {
          return this.eventInfo && this.eventInfo.flowconfig && this.eventInfo.flowconfig.isbk3point === 'yes' ? true : false
        } else {
          return this.cityInfo && this.cityInfo.flowconfig && this.cityInfo.flowconfig.isbk3point === 'yes' ? true : false
        }
    }
  }
}

/**
 * 获取赛事介绍，竞赛章程，报名规则等信息
 */
export const getRuleDoc = {
  methods: {
    getDoc(url) {
      // vuex中是否存在数据
      let _doc = this.$store.getters.getCommonRuleDoc(url)
      if(!_doc) {
        this.$store.dispatch('saveCommonRuleDoc', url)
      }
    }
  }
}