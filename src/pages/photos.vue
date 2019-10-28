<!--
 * @Description: 首页
 * @Author: liudan6
 -->
<template>
  <div class="photos-page clearfix">
    <div class="newsList" id="newsBox">
      <template v-for="(item, index) in newsList" :key="item.docid">
        <div v-if='item.type === 1 || item.type === 2 || item.type === 3 || item.type === 9' class="news-item"
             @click='jumpPage(index)'>
          <div class="news-title">{{item.title}}</div>
          <div v-if='item.thumbs.length === 1' class='item-imgbox'>
            <img class="news-img" :src="item.thumbs[0]" mode='aspectFill'
                   lazy-load />
          </div>
          <swiper v-else :options="swiperOption" :swiperData="item.thumbs">
            <swiper-slide v-for="thumb in item.thumbs" :key="thumb">
              <div class='item-imgbox'>
                <div class="news-img" :style="{ backgroundImage: 'url(' + item.thumb + ')'}" mode='aspectFill' lazy-load></div>
              </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination" v-show="item.thumbs && item.thumbs.length !== 1"></div>
          </swiper>
          <div class="news-info">
            <div class="left media-mark">{{item.media || '新浪体育'}}</div>
            <div v-if='item.comment_count && item.comment_count != 0' class="cmt-num right">
              {{agreeDataFormat(item.comment_count)}}评
            </div>
          </div>
        </div>
      </template>
      <div class="loadRecommend" v-if='isLoad'>
        <img class="loadding-img" src="https://n.sinaimg.cn/sports/imgStore/appSharePage/loadding.gif" />正在加载中
      </div>
      <div class="moreRecommend" v-else @click='onClickBottom'>
        {{ tipText }}
      </div>
    </div>
    <FooterView :pageKey="'photos'" />
  </div>
</template>
<script>
  import FooterView from '$components/index/footerView';
  import {swiper, swiperSlide} from 'vue-awesome-swiper';
  import 'swiper/dist/css/swiper.css';
  import scrollToBottom from '$utils/scrollToBottom';

  /* 引进项目配置文件 */
  import APIList from '$config/APIList';

  export default {
    data() {
      return {
        newsList: [],
        tipText: '上划或点击查看更多',
        isLoad: false,
        isFirstVisit: true,
        page: 0,
        page_size: 10,
        params: {
          length: 10, // 请求的推荐列表长度,取非负整数，默认值为20，最大值为100,规则：offset+length<=100
          pageurl: '',
          cateid: '2L', // 栏目列表
          cre: 'sptapp', // 这两个参数主要用于描述产品位，需要statics=1激活这两个参数
          mod: 'r',
          merge: 3, // 显示推荐原因
          statics: 1,
          this_page: 1, // 是否过滤当前页
          rfunc: 105, // 应用场景参数
          dedup: 1, // 去重标志
          app_type: 112, // 客户端类型: 110-新闻app，111-财经app，112-体育app
        },
        swiperOption: {
          notNextTick: true,
          // 循环
          loop: false,
          // 设定初始化时slide的索引
          initialSlide: 0,
          // 自动播放
          autoplay: false,
          // autoplay: {
          //     delay: 3000,
          //     stopOnLastSlide: false,
          //     disableOnInteraction: true,
          // },
          // 设置轮播
          effect: 'slide', //（位移切换）
          //滑动速度
          speed: 800,
          // 滑动方向
          direction: 'horizontal',
          // 小手掌抓取滑动
          grabCursor: true,
          // 分页器设置
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        },
      };
    },
    components: {
      FooterView,
      swiper,
      swiperSlide,
    },
    created() {
      this.getNews();
    },
    mounted() {
      this.isFirstVisit = false;
      // 滚动到底部自动加载更多
      const scrollHelper = scrollToBottom({
        container: window,
        target: '#newsBox',
        triggerDistance: 100,
        callBack: this.getMoreNews,
        time: 30
      });
      scrollHelper.start();
    },
    methods: {
      onReachBottom() {
        // 页面上拉触底事件的处理函数
        this.getMoreNews();
      },
      onClickBottom() {
        // 底部查看更多点击事件的处理函数
        this.getMoreNews();
      },
      getMoreNews() {
        this.page = this.page + 1;
        this.getNews();
      },
      getNews: function () {
        if (this.isLoad) return;
        this.isLoad = true;
        /*
         type	指定item返回类型
         3新闻,1高清图,2视频,4博文,5悦读,6长微博,
         7抓站文章,8产品库页面,9看点文章,10秒拍,11微信公众号,12 精读, 13 专栏
         14 专题
         15 直播
         16 H5页面
         注：type=2的新闻页在百度小程序中打不开
         app_type	客户端类型	110-新闻app，111-财经app，112-体育app
        */
        this.$ajax.get(APIList.recommend,  {
            params: Object.assign({
              type: 1,
              offset: this.page * this.page_size,
              timstamp: new Date().getTime(),
            }, this.params)
          }).then((response) => {
          if (response && response.data) {
            var resultData = response.data;
            if (resultData.length !== 0) {
              this.newsList.push(...resultData);
              this.newsList = Object.assign([], this.newsList);
            } else {
              this.tipText = '没有更多了哟';
            }
          }
          this.isLoad = false;
        });
      },
      jumpPage: function (index) {
        this.gotoDetail(this, this.newsList[index]);
      },
      agreeDataFormat: function (agreeData) {
        if (agreeData && agreeData <= 9999) {
          return agreeData;
        } else if (agreeData && agreeData > 9999) {
          return Math.floor(agreeData / 1000) / 10 + 'w';
        }
      }
    },
  };
</script>
<style lang="scss">
  .photos-page {
    position: relative;
    background-color: #fff;
    padding-bottom: px2rem(85);
    min-height: 100vh;
    box-sizing: border-box;


    .newsList {
      position: relative;
      padding: px2rem(28) px2rem(20);
      box-sizing: border-box;
    }

    .newsList:first-child {
      margin-top: 0;
      border-top: none;
    }

    .news-item {
      position: relative;
      box-sizing: border-box;
      border-bottom: 1px solid #ececec;
      margin: 0 px2rem(20) px2rem(28);
      padding: 0 0 px2rem(28);
    }

    .news-title {
      font-family: PingFangSC-Regular;
      font-size: px2rem(30);
      line-height: px2rem(48);
    }

    .item-imgbox, swan-swiper {
      position: relative;
      margin-top: px2rem(12);
      height: px2rem(395);
      background: #f0f0f0;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      overflow: hidden;
    }

    .swiper-pagination-bullet-active {
      opacity: 1;
      background: #d81e06 !important;
    }

    .item-imgbox .news-img {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      background-size: cover;
    }

    .news-info {
      font-family: PingFangSC-Light;
      height: px2rem(28);
      margin-top: px2rem(12);
      box-sizing: border-box;
    }

    .media-mark,.cmt-num {
      display: inline-block;
      height: px2rem(28);
      font-family: PingFangSC-Light;
      font-size: px2rem(24);
      color: #828282;
    }


    .moreRecommend,
    .loadRecommend {
      font-family: PingFangSC-Regular;
      font-size: px2rem(26);
      color: #405d7f;
      text-align: center;
      line-height: px2rem(35);
      height: px2rem(50);
      padding-bottom: px2rem(15);
      cursor: pointer;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .loadding-img {
      height: px2rem(35);
      width: px2rem(35);
      margin: 0 px2rem(8);
    }

  }
</style>
