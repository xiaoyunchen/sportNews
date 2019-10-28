<!--
 * @Description: CBA优酷视频页
 * @Author: liudan6
 -->
<template>
  <div class="videos-page">
    <iframe width="100%" frameborder="0" scrolling="auto" :src="currentPageSrc"></iframe>
    <FooterView :pageKey="'videos'" />
  </div>
</template>
<script>
  import FooterView from '$components/index/footerView';

  export default {
    data() {
      return {
        currentPageSrc: '#assetsPublicPath#/baiduApp/cbaVideos.html',
      };
    },
    components: {
      FooterView,
    },
  };
</script>
<style lang="scss">
  .videos-page {
    position: relative;
    height: 100vh;
    background-color: #f0f0f0;
    padding-bottom: px2rem(85);
    box-sizing: border-box;

    iframe {
      height: 100%;
    }
  }
</style>
