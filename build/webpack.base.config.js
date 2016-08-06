//webpack.base config
var webpack = require('webpack');
var path = require("path");
var fs = require("fs");
var glob = require('glob');
var htmlWebpackPlugin = require('html-webpack-plugin');
//提取公共文件
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
//项目名字
var projectName = "/project_one/";
//获取所有入口文件
var entries = getEntry(
    path.resolve(__dirname, '../src' + projectName + 'entrys/**/*.js'),
    path.resolve(__dirname, '../src' + projectName + 'entrys/')
);
//获得所有入口文件的key
var chunks = Object.keys(entries);
    //配置开始
var config = {
        entry: entries,
        output: {
            path: './dist',
            publicPath: '/static/',
            filename: '/js/[name].js',
            chunkFilename: "/js/[name].js"
        },
        module: {
            loaders: [{
                test: /\.vue$/,
                loader: 'vue',
                exclude: "/node_modules/"
            }, {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules|vue\/dist/
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=img/[name].[ext]?[hash]'
            }
            ]
        },
    //babel 转译  可以使用es5，也可以使用es6 写代码
    babel: {
        presets: ['es2015', 'stage-2'],
        plugins: ['transform-runtime']
    },
    //自动补全识别后缀
    resolve: {
        extensions: ['', '.js', '.vue'],
        alias: {
            pages: path.resolve(__dirname, '../src' + projectName + 'pages'),
            components: path.resolve(__dirname, '../src' + projectName + 'components'),
            assets: path.resolve(__dirname, '../src' + projectName + 'assets'),
        },
    },
    //插件
    plugins: [
        //全局注入变量
        new webpack.ProvidePlugin({
            $: "jquery",
        }),
        new CommonsChunkPlugin({
            name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
            chunks: chunks,
            minChunks: chunks.length // 提取所有entry共同依赖的模块
        }),
    ],
}

//处理所有静态html
//获得所有pages
var htmls = Object.keys(getEntry(
    path.resolve(__dirname, '../src' + projectName + 'assets/html/*.html'),
    path.resolve(__dirname, '../src' + projectName+'assets/')
));
//循环pages 自动生成html文件
htmls.forEach(function(pathname) {
    console.log(pathname)
    var pageName = pathname;
    var conf = {
        filename: pageName + '.html', //生成的html存放路径，相对于path
        template: path.resolve(__dirname, '../src' + projectName+ '/assets/' + pathname + '.html'),
        inject: false, //js插入的位置，true/'head'/'body'/false
    };
    if (pageName in config.entry) {
        conf.inject = 'body';
        conf.hash = true;
        conf.cache = true,
        conf.chunks = ['vendors'] 
    }
    console.log(conf)
    config.plugins.push(new htmlWebpackPlugin(conf));
});

//获得所有pages
var pages = Object.keys(getEntry(
    path.resolve(__dirname, '../src' + projectName + '**/*.html'),
    path.resolve(__dirname, '../src' + projectName)
));
//循环pages 自动生成html文件
pages.forEach(function(pathname) {
    var pageName = pathname.split('\\')[1];
    var conf = {
        filename: pageName + '.html', //生成的html存放路径，相对于path
        template: path.resolve(__dirname, '../src' + projectName + pathname + '.html'),
        inject: false, //js插入的位置，true/'head'/'body'/false
    };
    if (pageName in config.entry) {
        // conf.favicon = '../src/imgs/favicon.ico';
        conf.inject = 'body';
        conf.hash = true;
        conf.cache = true,
        conf.chunks = ['vendors', pageName] 
    }
    config.plugins.push(new htmlWebpackPlugin(conf));
});

//入口函数
function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
    entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.split(pathDir)[1].substring(1) : pathname;
        entries[pathname] = [entry];
    }
    return entries;
}

module.exports = config;
