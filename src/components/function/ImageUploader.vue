<template>
  <div @click="openInput" ref="uploader" class="uploader">
    <span class="upload-text">{{ imgName || '照片小于5M'}}</span>
    <input type="file" class="upload-input" @change="handleFileChange" accept="image/*" ref="input" />
  </div>
</template>
<script>
  /* 引进项目配置文件 */
  import APIList from '@/config/APIList';

  export default {
    props: ['imgName'],
    computed: {
      uid() {
        return this.$store.getters.uid;
      },
    },
    methods: {
      handleFileChange() {
        const input = this.$refs.input;
        const files = input.files;
        this.handleFile(files);
      },
      openInput() { // 触发图片上传动作
        this.$refs.input.click();
      },
      // 处理图片
      handleFile(files) {
        const file = files[0];
        if (file.size <= 5 * 1024 * 1024) {
          this.upload(file);
          // this.handlePhoto(file);
        } else {
          this.$toast.show({
            text: '照片大于5M',
            type: 'warning',
          });
        }
      },
      // 上传的图片
      upload(file) {
        this.$store.commit('showLoadding');
        const formData = new FormData();
        formData.append('uid', this.uid);
        formData.append('file', file);
        this.$ajax.post(APIList.upImg, formData).then((response) => {
          this.$store.commit('hideLoadding');
          if (response.status === 'success') {
            const data = response.data;
            if (data) {
              this.$emit('onChange', data); // 文件选择事件
            }
          }
        });
      },
      /*
      // 识别图片是否出现旋转
      handlePhoto(file) {
        const EXIF = window.EXIF;
        EXIF.getData(file, function () {
          const Orientation = EXIF.getTag(this, 'Orientation');
          // 转换成base64
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function (e) {
            if (Orientation !== 1) {
              const uploadBase64 = new Image();
              uploadBase64.src = e.target.result;

              uploadBase64.onload = function () {
                // 修正旋转图片
                const expectWidth = uploadBase64.width;
                const expectHeight = uploadBase64.height;

                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = expectWidth;
                canvas.height = expectHeight;

                ctx.drawImage(uploadBase64, 0, 0, expectWidth, expectHeight);

                if (Orientation !== '' && Orientation !== 1) {
                  switch (Orientation) {
                    case 6:
                      // 顺时针旋转270度
                      this.rotateImg(uploadBase64, 'left', canvas);
                      break;
                    case 8:
                      // 顺时针旋转90度
                      this.rotateImg(uploadBase64, 'right', canvas);
                      break;
                    case 3:
                      // 顺时针旋转180度
                      this.rotateImg(uploadBase64, 'horizen', canvas);
                      break;
                    default:
                      break;
                  }
                  // 输出转换后的base64图片
                  const base64 = canvas.toDataURL(file.type, 1);

                  // 输出转换后的流
                  const newBlob = this.convertBase64UrlToBlob(base64, file.type);
                  console.log(newBlob);
                }
              };
            }
          };
        });
      },
      // 对图片旋转处理
      rotateImg(img, direction, canvas) {
        const newCanvas = canvas;
        // 开始旋转图片
        // 图片旋转4次后回到原方向
        if (img == null) return;
        const height = img.height;
        const width = img.width;
        let step = 2;

        if (direction === 'right') {
          step += 1;
        } else if (direction === 'left') {
          step -= 1;
        } else if (direction === 'horizen') {
          step = 2; // 不处理
        }
        // 旋转角度以弧度值为参数
        const degree = (step * 90 * Math.PI) / 180;
        const ctx = newCanvas.getContext('2d');
        switch (step) {
          case 0:
            newCanvas.width = width;
            newCanvas.height = height;
            ctx.drawImage(img, 0, 0);
            break;
          case 1:
            newCanvas.width = height;
            newCanvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, 0, -height);
            break;
          case 2:
            newCanvas.width = width;
            newCanvas.height = height;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, -height);
            break;
          case 3:
            newCanvas.width = height;
            newCanvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, 0);
            break;
          default:
            break;
        }
        // 结束旋转图片
      },
      */
    },
  };
</script>

<style lang="scss">
  .uploader {
    width: px2rem(450);
    text-align: right;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  img.upload-img {
    height: px2rem(35);
  }

  .upload-text {
    display: inline-block;
    font-family: PingFangSC-Regular;
    font-size: px2rem(28);
    color: #828282;
    letter-spacing: 0;
    line-height: px2rem(28);
  }

  .upload-input {
    display: none;
    height: 100%;
    width: 100%;
  }

</style>
