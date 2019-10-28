<template>
  <div class="status-btn click-event suc" :class="{ 'error': status === 'error', 'gradual': bType === 'gradual' }" @click="clickBtn">
    {{text}}
  </div>
</template>

<script>
  export default {
    props: {
      bType: {
        type: String,
        default: 'common' // common: 普通按钮，gradual: 渐变按钮
      },
      status: {
        type: String,
        default: 'suc' // suc: 正常流程状态，error: 拒绝类状态
      },
      text: {
        type: String,
        default: '组队中' // suc: 正常流程状态，error: 拒绝类状态
      },
    },
    methods: {
      clickBtn() {
        this.$emit('clickEvent');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .status-btn {
    position: relative;
    display: inline-block;
    height: px2rem(44);
    line-height: px2rem(44);
    min-width: px2rem(172);
    text-align: center;
    font-family: PingFangSC-Medium;
    font-size: px2rem(22);
    letter-spacing: 0;
    border-radius: 24px;
  }

  .status-btn.suc {
    /*
    background: rgba(252,210,76,0.18);
    color: #845b13;
    */
    @include btnSuc;
  }

  .status-btn.suc.gradual {
    /*
    background-image: linear-gradient(-224deg, #f7e6c3 0%, #edd5a1 42%, #d8bb7a 100%);
    color: #845b13;
    */
    @include btnSucGra;
  }

  .status-btn.error {
    /*
    background: rgba(245,117,104,0.18);
    color: #F57568;
    */
    @include btnErr;
  }

  .status-btn.error.gradual {
    /*
    background-image: linear-gradient(90deg, #efbaa3 0%, #f19990  30%);
    color: #c35e54;
    */
    @include btnErrGra;
  }
</style>
