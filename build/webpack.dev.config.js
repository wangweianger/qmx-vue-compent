//开发环境
var webpack = require('webpack')
var config = require('./webpack.base.config')

config.devtool = '#source-map'

module.exports = config