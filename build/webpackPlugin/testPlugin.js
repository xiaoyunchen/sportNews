function testPlugin() {
}

testPlugin.prototype.apply = function(compiler) {
  compiler.plugin('compile', function() { // 开始编译的时候
    console.log('compile: hello');
  });

  compiler.plugin('done', function() { // 编译完成的时候
    console.log('done: hello');
  });
};

module.exports = testPlugin;
