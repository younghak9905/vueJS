const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: "../src/main/resources/static",  // 빌드 타겟 디렉토리
  devServer: {
    port: 8081,
    proxy: 'http://localhost:8080',
    disableHostCheck: true
  },
  chainWebpack: config => {
    config.plugin('html')
        .tap(args => {
          args[0].minify = false // 스프링 부트 애플리케이션이 프리마커 템플릿 엔진으로 index.ftlh을 읽을 때 발생하는 오류를 방지
          args[0].interpolate = true
          return args
        })
  }
})