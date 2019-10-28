<template>
  <transition name="confirm">
    <div class="confirm" v-if="show" @touchmove.prevent>
      <div class="box" ref="box">
        <div class="box-inner">
          <div v-if="title" class="title" v-html="title"></div>
          <div v-if="content" class="content" v-html="content"></div>
        </div>
        <div class="box-button">
          <span class="btn-cancel" v-if="showCancel" @click="cancel" v-html="cancelText"></span>
          <span class="btn-success" v-if="showSuccess" @click="success" v-html="submitText"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'confirm',
    data() {
      return {
        show: false,
        showCancel: true,
        showSuccess: true,
        title: '',
        content: '温馨提示~',
        submitText: '确认',
        cancelText: '取消',
      };
    },
    methods: {
      success() {
        this.show = false;
      },
      cancel() {
        this.show = false;
      },
      closeLayer(e) {
        if (!this.$refs.box.contains(e.target)) {
          this.show = false;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
.confirm {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.5);

  .box {
    position: absolute;
    top: px2rem(300);
    // left: 0;
    // right: 0;
    width: px2rem(480);
    // margin: auto;
    font-family: PingFangSC-Medium;
    background-color: #fff;
    border-radius: px2rem(25);
    box-sizing: border-box;
    margin-top: 50%;
    margin-left: 50%;
    transform: translate(-50%, -50%);

    .box-inner {
      padding: px2rem(50) px2rem(40) px2rem(44);
      border-radius: px2rem(25) px2rem(25) 0 0;
      font-size: px2rem(30);
      line-height: px2rem(40);
      color: #1e1e1e;
      letter-spacing: 0;

      .title {
        margin-bottom: px2rem(34);
        font-family: PingFangSC-Medium;
        font-size: px2rem(30);
        color: #1e1e1e;
        letter-spacing: 0;
        text-align: center;
        line-height: px2rem(30);
      }

      .content {
        font-family: PingFangSC-Regular;
        font-size: px2rem(24);
        color: #1e1e1e;
        letter-spacing: 0;
        line-height: px2rem(40);
      }
    }
  }

  .box-button {
    height: px2rem(79);
    line-height: px2rem(79);
    display: flex;
    border-top: 1px solid #ececec;
    border-radius: 0 0 px2rem(25) px2rem(25);
    font-size: px2rem(30);
    text-align: center;

    span {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
    }

    .btn-success {
      color: #7E5428;
    }

    .btn-cancel {
      color: #828282;
    }

    :nth-child(n+2) {
      border-left: 1px solid #ececec;
    }
  }
}

.enter {
  opacity: 0;

  .box {
    transform: scale(0);
  }
}

.confirm-enter-active {
  transition: opacity 0.4s;

  .box {
    transition: transform 0.4s;
  }
}

.confirm-leave-active {
  transition: opacity 0.2s;

  .box {
    transition: transform 0.2s;
  }
}

.confirm-leave-active {
  opacity: 0;
}
</style>
