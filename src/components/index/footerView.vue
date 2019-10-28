<template>
  <div class="footer-box ipx-fixed-bottom">
    <div class="item" @click="jumpSports">
      <img v-if="pageKey == 'sports'" class="page-mark" src="#assetsPublicPath#/img/tabBar/sports-active.png"/>
      <img v-else class="page-mark" src="#assetsPublicPath#/img/tabBar/sports.png"/>
      <span :class="{ 'item-active' : pageKey == 'sports' }">体育</span>
    </div>
    <div class="item" @click="jumpNews">
      <img v-if="pageKey == 'news'" class="page-mark" src="#assetsPublicPath#/img/tabBar/news-active.png"/>
      <img v-else class="page-mark" src="#assetsPublicPath#/img/tabBar/news.png"/>
      <span :class="{ 'item-active' : pageKey == 'news' }">新闻</span>
    </div>
    <div class="item" @click="jumpPhotos">
      <img v-if="pageKey == 'photos'" class="page-mark" src="#assetsPublicPath#/img/tabBar/photo-active.png"/>
      <img v-else class="page-mark" src="#assetsPublicPath#/img/tabBar/photo.png"/>
      <span :class="{ 'item-active' : pageKey == 'photos' }">图集</span>
    </div>
    <div class="item" @click="jumpVideos">
      <img v-if="pageKey == 'videos'" class="page-mark" src="#assetsPublicPath#/img/tabBar/video-active.png"/>
      <img v-else class="page-mark" src="#assetsPublicPath#/img/tabBar/video.png"/>
      <span :class="{ 'item-active' : pageKey == 'videos' }">视频</span>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'footerBox',
    props: ['pageKey'],
    methods: {
      jumpSports: function (item) {
        this.gotoSports(this, item);
      },
      jumpNews: function (item) {
        this.gotoNews(this, item);
      },
      jumpPhotos: function (item) {
        this.gotoPhotos(this, item);
      },
      jumpVideos: function (item) {
        this.gotoVideos(this, item);
      },
    }
  };
</script>
<style lang="scss">
  .footer-box {
    @include fixedBottomBox;
    @include setItemHeight(80);
    @include borderTopOrBtm(top);

    background: #fff;

    font-family: PingFangSC-Regular;
    display: flex;
    flex-wrap: nowrap;
    z-index: 10;

    .item {
      flex: 1 1 px2rem(150);
      @include unifiedFlexBoxStyle;

      img {
        width: px2rem(48);
        margin-right: px2rem(16);
      }
    }

    .item-active {
      color: #d81e06;
    }
  }
</style>
