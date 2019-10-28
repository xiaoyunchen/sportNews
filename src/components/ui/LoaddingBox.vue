<template>
  <div v-show="loaddingLayer" class="loadding-box" @click.prevent.stop @touchmove.prevent>
    <div class="loadding-panel"></div>
    <div class="loadding">
      <img src="#assetsPublicPath#/img/loadding.gif" />
    </div>
  </div>
</template>
<script>
  export default {
    name: 'loaddingBox',
    props: ['loaddingLayer'],
  };
</script>
<style lang="scss" scoped>
  .loadding-box {
    .loadding-panel {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 800;
      width: 100%;
      height: 100%;
      background-color: #efefef;
      opacity: 0.5;
    }

    .loadding {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 900;
      width: 100%;
      height: 100%;
      background: transparent;

      @include unifiedFlexBoxStyle;

      img {
        width: px2rem(50);
      }
    }
  }
</style>
