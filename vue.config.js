const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: 'https://d2ve0urukvvel8.cloudfront.net/'
  }
})
