<template>
  <div id="app" class="page-wrap">
    <router-view></router-view>
    <!-- 加载中的效果 -->
    <LoaddingBox :loaddingLayer="loadding"></LoaddingBox>
    <div class="ipx-space-box"></div>
  </div>
</template>

<script>

import LoaddingBox from '$components/ui/LoaddingBox';

export default {
  name: 'app',
  components: {
    LoaddingBox
  },
  computed: {
    loadding() {
      return this.$store.getters.loadding;
    },
  },
}
</script>

<style lang="scss">
  html,body {
    background: #f0f0f0;
  }
  .page-wrap {
    position: relative;
    margin: 0 auto;
    max-width: 750px;
    min-width: 320px;
    min-height: 100vh;
    background-color: #f0f0f0;

    .app-topBar-box {
      /*
      display: none;
      height: 48px; // 适配安卓端
      */
      height: 0;
      margin: 0;
      padding: 0;
      border: none;
    }
    /*  CSS specific to iOS devices
    @supports (-webkit-overflow-scrolling: touch) {

      .app-topBar-box {
        height: 68px; // 适配普通IOS端
      }
    }
    */

    .ipx-space-box {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 34px;
      background-color: #f0f0f0;
      display: none;
      box-sizing: border-box;
    }
  }

  /* 增加iphoneX适配 */
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .page-wrap {
      padding-bottom: 34px;
      // padding-bottom: constant(safe-area-inset-bottom);
      // padding-bottom: env(safe-area-inset-bottom);

      .ipx-space-box {
        display: block;
      }

      /* 适配iphonex
      .app-topBar-box {
        height: 88px;
        // height: calc(48px + constant(safe-area-inset-bottom));
        // height: calc(48px + env(safe-area-inset-bottom));
      }
      */
    }
  }

  /* 通用的样式 */
  .img-box {
    background-size: cover;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: left top;
    }
  }

  .right-box,
  .left-box {
    @include unifiedFlexBoxStyle;
  }

  .enroll-input {
    @include setItemHeight(38);
    @include unifiedItemStyle;

    margin: px2rem(41) 0 px2rem(41) 0;
  }

  .right.input-content-style, .right .input-content-style {
    color: #1e1e1e;
  }

  input.enroll-input::placeholder {
    @include unifiedItemStyle;

    line-height: px2rem(38);
  }
</style>
