<template>
  <div class="select-picker" @touchmove.prevent>
    <transition name="fadeIn">
      <div v-if="selectPickerLayer" class="mask" @touchmove.prevent @click="closeLayer"></div>
    </transition>
    <transition name="translate-bottom">
      <div v-if="selectPickerLayer" class="layer-container">
        <div class="return-num ipx-fixed-bottom" ref="optArea">
          <div class="title">
            <div class="left" @click="cancel">取消</div>
            <div class="center">{{title || '选择'}}</div>
            <div class="right" @click="sure">确定</div>
          </div>
          <div class="box">
            <smooth-picker class="picker" ref='smoothPicker' :dataList="dataObjList" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import SmoothPicker from '$components/function/SmoothPicker';

export default {
  name: 'SelectPicker',
  data() {
    return {
      dataObjList: [
        {
          currentIndex: 0,
          list: [],
          textAlign: 'center',
        },
      ],
    };
  },
  props: ['selectPickerLayer', 'itemList', 'defaultVal', 'title'],
  components: {
    SmoothPicker,
  },
  created() {
    this.dataObjList[0].list = this.itemList;
    if (this.defaultVal) {
      this.dataObjList[0].currentIndex = this.itemList.indexOf(this.defaultVal);
    }
  },
  methods: {
    sure() {
      const ciList = this.$refs.smoothPicker.getCurrentIndexList();
      const currentValue = this.dataObjList[0].list[ciList[0]];
      this.$emit('getCurrentValue', currentValue);
      this.hide();
    },
    closeLayer(e) {
      if (!this.$refs.optArea.contains(e.target)) {
        this.hide();
      }
    },
    hide() {
      this.$emit('hidePickerLayer');
    },
    cancel() {
      this.hide();
    },
  },
  watch: {
    defaultVal() {
      this.dataObjList[0].currentIndex = this.itemList.indexOf(this.defaultVal);
    },
  },
};
</script>

<style lang="scss" scoped>
.select-picker {
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0);

  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 200;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .layer-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 210;
  }
}

.return-num {
  position: fixed;
  width: 100%;
  height: px2rem(420);
  left: 0;
  bottom: 0;
  background-color: #fff;
  overflow: hidden;
  display: flex;
  justify-content: center;
  flex-direction: column;

  .title {
    flex: 0 0 px2rem(88);
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    font-family: PingFangSC-Regular;
    line-height: px2rem(88);

    .left {
      flex: 0 0 px2rem(120);
      text-align: center;
      font-size: px2rem(30);
      color: #1e1e1e;
      letter-spacing: 0;
      cursor: pointer;
      background: #f0f0f0;
    }

    .center {
      flex: 1 1 px2rem(510);
      font-size: px2rem(26);
      color: #828282;
      letter-spacing: 0;
      text-align: center;
      background: #f0f0f0;
    }

    .right {
      flex: 0 0 px2rem(120);
      text-align: center;
      font-size: px2rem(30);
      color: #ff3934;
      letter-spacing: 0;
      cursor: pointer;
      background: #f0f0f0;
    }
  }

  .box {
    flex: 1 1 px2rem(332);
    background: #fff;
  }
}
</style>
