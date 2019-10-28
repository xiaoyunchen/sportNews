<!--
 * @Description: 通用弹窗浮层
 * @Author: liufei6
 * @Date: 2019-05-20 10:45:47
 * @LastEditors: liufei6
 * @LastEditTime: 2019-07-09 12:33:04
 * @Note:  待优化 1. 可编辑背景透明度
 -->

<template>
  <div class="ss-dialog-wrap ipx-fixed-bottom" @click.self="handleClosePop">
    <div class="ss-dialog-cont">
      <slot></slot>
      <i v-show="showclose" class="ss-dialog-close" @click="handleClosePop">{{close}}</i>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: 'ss-dialog',
  props: {
      close: String, // 关闭按钮文字
      showclose: {  // 是否展示关闭按钮，默认展示
        type: Boolean,
        default: true
      },
      value: Boolean
  },
  data() {
    return {
      scrollTop: 0
    }
  },
  methods: {
    handleClosePop(e) {
      this.$emit('close', e);
    }
  }
}
</script>

<style lang="scss">
  .ss-dialog-wrap {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    background: rgba(0, 0, 0, .48);
    z-index: 999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    overflow: hidden;

    .ss-dialog-cont {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
    }

    .ss-dialog-close {
      width: 1rem;
      height: .8rem;
      // background: #ddd;
    }
  }
</style>
