const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const deployPlugin = require('./build/webpackPlugin/deploy');

const projectConfig = require('./build/project.config'); // 引进项目级配置文件
// 获取当前环境的配置
const currentConfig = projectConfig[projectConfig.currentEnv];

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  pages: {
    index: './src/main.js',
  },
  filenameHashing: true, // 静态资源是否加hash值，控制缓存
  publicPath: currentConfig.assetsPublicPath,
  productionSourceMap: false,
  css: {
    sourceMap: false,
  },

  chainWebpack: config => {

    if(projectConfig.currentEnv === 'test') { // 测试环境不压缩代码
      // config.optimization.minimize(false);
    }
    // 全局注入scss
    const oneOfsMap = config.module.rule('scss').oneOfs.store;
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: [
            './src/assets/css/mixin.scss',
            './src/assets/css/common.scss',
          ]
        })
        .end()
    });

    // 配置别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('$assets', resolve('src/assets'))
      .set('$public', resolve('public'))
      .set('$components', resolve('src/components'))
      .set('$pages', resolve('src/pages'))
      .set('$router', resolve('src/router'))
      .set('$store', resolve('src/store'))
      .set('$config', resolve('src/config'))
      .set('$plugins', resolve('src/plugins'))
      .set('$utils', resolve('src/utils'));

    // 新增html-loader: 用于处理html文件(string-replace-loader中处理html文件需要)
    config.module
      .rule('html-loader')
      .test(/\.html$/)
      .use('html-loader')
      .loader('html-loader')
      .end();

    // 新增string-replace-loader
    config.module
      .rule('string-replace')
      .enforce('pre')
      .test(/\.(js|vue|css|html)$/)
      .use('string-replace-loader')
      .loader('string-replace-loader')
      .options({
        multiple: [
          {search: '#version#', replace: projectConfig.version, flags: 'g'}, // 本地开发
          {search: '#assetsPublicPath#', replace: currentConfig.assetsPublicPath, flags: 'g'},
          {search: '#dataApiBase#', replace: currentConfig.dataApiBase, flags: 'g'},
          {search: '#routeBasePath#', replace: currentConfig.routeBasePath, flags: 'g'},
        ]
      })
      .end()
  },

  configureWebpack: (config) => {

    let pluginsPro = [
      // 配置生成的html
      new htmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        minify: { // 配置html不压缩， 默认压缩
          removeComments: false,
          collapseWhitespace: false,
          removeAttributeQuotes: false,
          minifyCSS: true // 压缩内联css
        }
      }),
      new deployPlugin(projectConfig),
    ];
    if (process.env.NODE_ENV === 'production') {
      config.plugins = [...config.plugins, ...pluginsPro]
    }

  },

  devServer: {
    host: 'dev.sina.cn',
    port: '8080',
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/unify': {
        // target: 'http://jintao5.feral.sports.sina.cn',
        target: 'http://feral.sports.sina.cn', // 正式接口
        ws: true,
        changeOrigin: true
      }
    }
  }

}