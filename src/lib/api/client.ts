// import axios from "axios";

// const client = axios.create({
//   baseURL: "https://mygadgets.herokuapp.com/"
//   // baseURL: "http://localhost:3001"
// })

// export default client

import axios from "axios";
import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer();

proxy.on('proxyRes', function (proxyRes, req, res) {
  // レスポンスヘッダーを変更する場合はここで行う
  proxyRes.headers['Access-Control-Allow-Origin'] = '*';
});

const client = axios.create({
  baseURL: "http://localhost:3001" // APIサーバーのベースURLに変更する
});

client.interceptors.request.use((config) => {
  config.headers['Referer'] = 'http://localhost:3000';
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // 401エラーの処理
    }
    return Promise.reject(error);
  }
);

const proxyClient = (req: any, res: any) => {
  proxy.web(req, res, {
    target: 'https://mygadgets.herokuapp.com', // プロキシ先のURLに変更する
    changeOrigin: true
  });
};

export { client, proxyClient };
