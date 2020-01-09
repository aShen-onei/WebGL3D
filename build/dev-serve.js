const webpack  = require("webpack");
const path = require("path");
const express = require("express");
const devMiddleWare = require("webpack-dev-middleware");
const hotMiddleWare = require("webpack-hot-middleware");

const app = express(); // 初始化express服务
const port = 8080; // 使用8080端口
const webpackDevConfig = require("./webpack.config.dev"); // 初始化webpack配置

const compiler = webpack(webpackDevConfig); // webpack打包

// 使用webpack-dev-server启动webpack打包的文件
// 其中opts参数就是devServer的参数，详见webpack文档
const webpackDevServer = devMiddleWare(compiler, {
  publicPath:webpackDevConfig.output.publicPath,
  port:8080,
  open: true,
  hot: true,
  stats:{
    all: false,
    assets: true,
    assetsSort: "field",
    builtAt: true,
    errors: true,
    warnings: true
  }
});

app.use(webpackDevServer); // 使用dev-server

// 使用热更新
const hotModule = hotMiddleWare(compiler, {
  log: () => {}
});

app.use(hotModule);

// express服务上加载静态文件
app.use('/model', express.static(path.join(__dirname, '../static/model')));

// express服务地址
let url = 'http://localhost:' + port;

// 使用dev-server的信息打印
console.log('> Now Starting Server...');
webpackDevServer.waitUntilValid(() => {
  console.log('> Server running at\t' + url);
});

// 服务启动监听
let server = app.listen(port);

module.exports = {
  close: () => {
    server.close();
  }
};
// var _resolve;
// var readyPromise = new Promise(resolve => {
//   _resolve = resolve
// });
//
// console.log('> Starting dev server...');
// devMiddleware.waitUntilValid(() => {
//   console.log('> Listening at ' + uri + '\n');
//   // when env is testing, don't need open it
//   _resolve()
// });
//
// var server = app.listen(port);
//
// module.exports = {
//   ready: readyPromise,
//   close: () => {
//     server.close()
//   }
// };
