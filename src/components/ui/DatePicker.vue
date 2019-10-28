<template>
  <div class="date-picker" @touchmove.prevent>
    <transition name="fadeIn">
      <div v-if="selectPickerLayer" class="mask" @touchmove.prevent @click="closeLayer"></div>
    </transition>
    <transition name="translate-bottom">
      <div v-if="selectPickerLayer" class="layer-container">
        <div class="return-num" ref="optArea">
          <div class="title">
            <div class="left" @click="cancel">取消</div>
            <div class="center">{{title}}</div>
            <div class="right" @click="sure">确定</div>
          </div>
          <div class="box">
            <smooth-picker class="picker" ref='smoothPicker' :dataList="data" :change="dataChange"/>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import SmoothPicker from '$components/function/SmoothPicker';

  /* eslint-disable */
  export default {
    props: {
      defaultVal: {
        type: String,
        default: '1991-1-1',
      },
      selectPickerLayer: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        default: '日期选择',
      },
    },
    data () {
      const nowYear = (new Date()).getFullYear();
      const years = [];
      for (let i = 1949; i <= nowYear; i++) {
        years.push(i+' 年')
      }
      return {
        data: [
          {
            currentIndex: parseInt((nowYear - 1991) / 2),
            flex: 3,
            list: years,
            textAlign: 'center',
            className: 'row-group'
          },
          {
            currentIndex: 8,
            flex: 3,
            list: [...Array(12)].map((m, i) => i + 1+' 月'),
            textAlign: 'center',
            className: 'row-group'
          },
          {
            currentIndex: 1,
            flex: 3,
            list: [...Array(30)].map((d, i) => i + 1+' 日'),
            onClick: this.clickOnDay,
            textAlign: 'center',
            className: 'item-group'
          }
        ]
      }
    },
    components: {
      SmoothPicker,
    },
    created() {
      let defaultValue = this.defaultVal;
      if (!defaultValue) defaultValue = '1991-1-1';
      const reg = /\d+/g;
      const nowYear = defaultValue.match(reg)[0];
      const nowMonth = defaultValue.match(reg)[1];
      const nowDay = defaultValue.match(reg)[2];
      this.data[0].currentIndex = parseInt(nowYear) - 1949;
      this.data[1].currentIndex = parseInt(nowMonth) - 1;
      this.data[2].currentIndex = parseInt(nowDay) - 1;
    },
    methods: {
      isLeapYear (year) { // 判断是否闰年
        return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)
      },
      dataChange (gIndex, iIndex) {
        const ciList = this.$refs.smoothPicker.getCurrentIndexList();
        if (gIndex === 0 || gIndex === 1) { // year or month changed
          let currentIndex = 15;
          let monthCount = 30;
          let month = iIndex + 1; // month
          if (gIndex === 0) { // year
            month = this.data[1].list[ciList[1]];
          }
          switch (month) {
            case 2:
              let selectedYear = this.data[0].list[ciList[0]] // month
              if (gIndex === 0) { // year
                selectedYear = this.data[0].list[iIndex]
              }
              let isLeapYear = false
              if (this.isLeapYear(selectedYear)) {
                isLeapYear = true
              }
              monthCount = 28;
              currentIndex = 14;
              if (isLeapYear) {
                monthCount = 29;
                currentIndex = 15;
              }
              break;
            case 4:
            case 6:
            case 9:
            case 11:
              monthCount = 30;
              currentIndex = 15;
              break;
            default:
              monthCount = 31;
              currentIndex = 16;
          }
          const list = [...Array(monthCount)].map((d, i) => i + 1+' 日');
          this.$refs.smoothPicker.setGroupData(2, { ...this.data[2], ...{ currentIndex, list }});
        }
      },
      sure() {
        const ciList = this.$refs.smoothPicker.getCurrentIndexList()
        const year = this.data[0].list[ciList[0]];
        const month = this.data[1].list[ciList[1]];
        const day = this.data[2].list[ciList[2]];
        const newDate = year +'-'+ month + '-' + day;
        let birDate = newDate.replace(/\s+[\u4e00-\u9fa5]/g, "");
        const time = new Date(birDate.replace(/-/g,'/')).getTime();
        const nowTime = (new Date()).getTime();
        if(time > nowTime) {
          birDate = '1979-1-1';
        }
        this.$emit('getCurrentValue', birDate);
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
        const reg = /\d+/g;
        const nowYear = this.defaultVal.match(reg)[0];
        const nowMonth = this.defaultVal.match(reg)[1];
        const nowDay = this.defaultVal.match(reg)[2];
        this.data[0].currentIndex = parseInt(nowYear) - 1949;
        this.data[1].currentIndex = parseInt(nowMonth) - 1;
        this.data[2].currentIndex = parseInt(nowDay) - 1;
      },
    },
  }
</script>

<style lang="scss" scoped>
  .date-picker {
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
