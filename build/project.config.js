/*
【项目配置数据，webpack配置和项目数据配置均可在此设置】
*/

const path = require('path');

/* 识别当前运行环境：线上测试环境 or 线上正式环境 */
const argv = process.argv;
let currentEnv = "local"; // 默认为local, online：线上正式环境，test:线上测试环境,
for (let ind = 0, size = argv.length; ind < size; ind++) {
  if(argv[ind].indexOf("--env") ==0 ) {
    var envStr = argv[ind].split('=');
    if (envStr && envStr[1]) {
      currentEnv = envStr[1]; // test/online
    }
  }
}

const configJs = {
  currentEnv: currentEnv,
  version: '20191028.3', // 项目版本号
  local: { // 本地开发环境
    dataApiBase: 'http://localhost:8080',
    assetsPublicPath: 'http://localhost:8080',
    routeBasePath: '/',
  },
  test: { // 线上测试环境配置参数
    dataApiBase: '//goodtool666.cn/',
    assetsPublicPath: '//goodtool666.cn/_test/_spa/sportNews', // 静态资源引用路径
    routeBasePath: '/_test/_spa/sportNews/', // 路由根地址
  },
  online: { // 线上正式环境配置参数
    dataApiBase: '//goodtool666.cn/',
    assetsPublicPath: '//goodtool666.cn/_spa/sportNews',
    routeBasePath: '/_spa/sportNews/',
  },
  ftpTest: { // 线上测试环境ftp配置
    host: '49.235.6.237', // 腾讯云服务器ip
    user: 'root',
    password: '123456',
    port: '21',
    localRoot: path.resolve(__dirname, '../dist'),  // 打包后的文件绝对路径（物理路径）,
    remoteRoot: '/_test/_spa/sportNews/', // 上传的ftp路径
    include: ['*', '**/*'],      // this would upload everything except dot files
    exclude: ['dist/**/*.map'],     // e.g. exclude sourcemaps - ** exclude: [] if nothing to exclude **
    deleteRemote: false,
    forcePasv: true
  },
  ftp: { // 线上正式环境ftp配置
    host: '49.235.6.237', // 腾讯云服务器ip
    user: 'root',
    password: '123456789',
    port: '22',
    localRoot: path.resolve(__dirname, '../dist'),  // 打包后的文件绝对路径（物理路径）,
    remoteRoot: '/_spa/sportNews/', // 上传的ftp路径
    include: ['*', '**/*'],      // this would upload everything except dot files
    exclude: ['dist/**/*.map'],     // e.g. exclude sourcemaps - ** exclude: [] if nothing to exclude **
    deleteRemote: false,
    forcePasv: true
  },
  deploy: {  // 公司外网正式部署相关配置数据(公司内网使用)
    local: path.resolve(__dirname, '../dist'),
    remote: '_spa/sportNews', // 远程地址文件夹
    msg: '发布小猪新闻看点项目', // 部署信息
    mail: 'liudan6@staff.sina.com.cn', // 邮箱地址，用于接收部署结果
    replace: true,
    'no-cache': false,
    maxCount: 500, // 一次上传最大文件数
    silent: true, // 使用安静模式：使用了危险选项时不会有提示问题，
  },
};

module.exports = configJs;
