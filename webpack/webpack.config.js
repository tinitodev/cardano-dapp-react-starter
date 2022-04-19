const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

module.exports = ({ env }) => {
  const environmentConfig = require(`./webpack.${env}.js`)
  return merge(commonConfig, environmentConfig)
}
