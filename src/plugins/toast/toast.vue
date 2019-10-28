<template>
  <div class="alertBox">
    <div class="alertMask" v-if="isShowMask && show"></div>
    <transition :name="translate">
      <div class="toast-box" :class="position" v-if="show">
        <div v-if="type === 'warning'" class="warning-img">
          <img src="#assetsPublicPath#/img/Icon_toast_tips@3x.png">
        </div>
        <span v-html="text" class="text"></span>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'toast',
    props: {
      type: {
        type: String,
        default: 'text', // warning
      },
      show: {
        type: Boolean,
        default: false,
      },
      text: {
        type: String,
        default: 'loadding',
      },
      position: {
        type: String,
        default: 'middle',
      },
      isShowMask: {
        type: Boolean,
        default: false,
      },
      time: {
        type: Number,
        default: 2000,
      },
      transition: {
        type: Boolean,
        default: true,
      },
    },
    computed: {
      translate() {
        if (!this.transition) {
          return '';
        }
        if (this.position === 'top') {
          return 'translate-top';
        } else if (this.position === 'middle') {
          return 'translate-middle';
        } else if (this.position === 'bottom') {
          return 'translate-bottom';
        }
        return '';
      },
    },
    watch: {
      show(val) {
        if (val) {
          if (this.time > 0) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
              this.show = false;
            }, this.time);
          }
        } else {
          this.type = 'text';
          this.position = 'middle';
          this.text = 'loadding';
          this.isShowMask = false;
          this.time = 2000;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .alertMask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 8;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.6;
  }

  .toast-box {
    position: fixed;
    z-index: 100;
    top: 50%;
    left: 50%;
    max-width: px2rem(350);
    padding: px2rem(20);
    text-align: center;
    background: rgba(67, 67, 67, 0.9);
    transform: translateX(-50%);
    -ms-transform: translateX(-50%); /* IE 9 */
    -webkit-transform: translateX(-50%); /* Safari and Chrome */
    font-family: PingFangSC-Regular;
    color: #fff;
    font-size: px2rem(26);
    letter-spacing: 0;
    line-height: px2rem(30);
    border-radius: px2rem(85);

    @include unifiedFlexBoxStyle;

    .warning-img {
      flex: 0 0 px2rem(32);
      background: transparent;
    }

    .text {
      flex: 1 1 px2rem(200);
      background: transparent;
    }

    img {
      width: px2rem(32);
      height: px2rem(32);
      margin-right: px2rem(12);
    }
  }

  .toast-box.top {
    top: px2rem(100);
  }

  .toast-box.middle {
    top: 50%;
  }

  .toast-box.bottom {
    top: auto;
    bottom: px2rem(100);
  }

  .translate-top-enter-active,
  .translate-top-leave-active {
    transition: all 0.3s cubic-bezier(0.36, 0.66, 0.04, 1);
  }

  .translate-top-enter,
  .translate-top-leave-active {
    transform: translateY(-50%);
    opacity: 0;
  }

  .translate-middle-enter-active,
  .translate-middle-leave-active {
    transition: all 0.3s cubic-bezier(0.36, 0.66, 0.04, 1);
  }

  .translate-middle-enter,
  .translate-middle-leave-active {
    transform: translate(-50%, 80%);
    opacity: 0;
  }

  .translate-bottom-enter-active,
  .translate-bottom-leave-active {
    transition: all 0.3s cubic-bezier(0.36, 0.66, 0.04, 1);
  }

  .translate-bottom-enter,
  .translate-bottom-leave-active {
    transform: translateY(100%);
    opacity: 0;
  }
</style>
