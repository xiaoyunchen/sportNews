const path = require('path');
const copy = require('copy');

function copyFile() {
}

copyFile.prototype.apply = function(compiler) {
  compiler.plugin('done', function() {
    copy.one(path.resolve(process.cwd(), 'dist/index.html'),
      path.resolve(process.cwd(), 'online'),
      { cwd: path.resolve(process.cwd(), 'dist/')}, function(){
        console.log('online/index.html已更新');
    });
  });
};

module.exports = copyFile;
