const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app: any) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://mygadgets.herokuapp.com/', // APIのベースURLに変更する
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // 必要に応じてパスのリライトを設定する
      },
    })
  );
};
