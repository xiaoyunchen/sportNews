<template>
  <div class="checkedBtn click-event" @click="checkedBtn">
    <img src="#assetsPublicPath#/img/selected.png" v-show="checked" />
    <img src="#assetsPublicPath#/img/unselect.png" v-show="!checked" />
  </div>
</template>

<script>
  export default {
    props: ['checked'],
    methods: {
      checkedBtn() {
        this.$emit('checkEvent');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .checkedBtn {
    height: px2rem(44);
    width: px2rem(44);
    overflow: hidden;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    img {
      height: px2rem(44);
    }
  }
</style>
