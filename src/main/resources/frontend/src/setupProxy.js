const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8888", // 서버 URL or localhost:설정한포트번호
      changeOrigin: true,
    })
  );
};
// CORS 관련 오류를 방지하기 위한 proxy 설정
