const path = require('path');
// const copy = require('copy');
const FtpDeploy = require('ftp-deploy');
// const autoDeploy = require('@ssfe/stand-in-cli'); // 自动部署工具，仅限公司内网使用
const opn = require('opn');

function deplayWebpackPlugin(options) {
  // 用户自定义配置
  this.projectConfig = options;
}

// 在插件函数的 prototype 上定义一个 `apply` 方法。
deplayWebpackPlugin.prototype.apply = function(compiler) {
  const _this = this;
  // 指定一个挂载到 webpack 自身的事件钩子。
  compiler.plugin('done', function(compilation) {
    if (_this.projectConfig.currentEnv === 'test') {
      // 上传到线上测试环境中
      let ftpDeploy = new FtpDeploy();
      ftpDeploy.deploy(_this.projectConfig.ftpTest, err => {
        if (err) {
          console.log(err);
        } else {
          console.log('代码成功上传至线上测试服务器：');
          // 自动打开线上的主页面
          opn('http:' + _this.projectConfig.test.assetsPublicPath + '/index.html');
        }
      });
    } else if (_this.projectConfig.currentEnv === 'online') {
      /*
      // 将编译完成的页面（dist/index.html）复制到 online/目录下
      copy.one(path.resolve(process.cwd(), 'dist/index.html'),
        path.resolve(process.cwd(), 'online'),
        { cwd: path.resolve(process.cwd(), 'dist/')}, function(){
          console.log('online/index.html已更新');
        });
      */
      // 上传到线上正式环境中
      let ftpDeploy = new FtpDeploy();
      ftpDeploy.deploy(_this.projectConfig.ftp, err => {
        if (err) {
          console.log(err);
        } else {
          console.log('代码成功上传至线上测试服务器：');
          opn('http:' + _this.projectConfig.online.assetsPublicPath + '/index.html');
        }
      });

      // 部署到线上
      // autoDeploy(_this.projectConfig.deploy);
      // 自动打开线上的主页面
      opn('http:' + _this.projectConfig.online.assetsPublicPath + '/index.html');
    }
  });
};

module.exports = deplayWebpackPlugin;
