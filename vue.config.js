const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: "dist",  // 빌드 타겟 디렉토리
  devServer: {
    proxy: {

      '/posts/list': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: { '^/posts/list': '/posts/list' }
      },
    }

  }})
