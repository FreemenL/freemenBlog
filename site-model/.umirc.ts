import { defineConfig } from 'dumi';
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

export default defineConfig({
  dynamicImport:{
  },
  title: '十三先生',
  mode: 'site',
  hash: true,
  styles:[
    `.__dumi-default-layout-footer-meta{
      display:none!important;
    }`
  ],
  logo: "https://wxonebyone.oss-cn-beijing.aliyuncs.com/files/dev/cms/resource/uploaded/1583683639203_pinterest_profile_image.png",
  favicon: "https://wxonebyone.oss-cn-beijing.aliyuncs.com/files/dev/cms/resource/uploaded/1583683639203_pinterest_profile_image.png",
  menus: {
    '/blog': [
      {
        title: '简介',
      },{
        title: 'ECharts',
        children: ['blog/echarts/min','blog/echarts/webpack','blog/echarts/mobile','blog/echarts/event','blog/echarts/styles','blog/echarts/ownstyle','blog/echarts/canvas','blog/echarts/gl'],
      },{
        title: 'Node.js',
        children: ['blog/nodejs/node-func','blog/nodejs/nodejs','blog/nodejs/node-internet','blog/nodejs/node-basic','blog/nodejs/node-http-proxy.md','blog/nodejs/settimeout.md','blog/nodejs/node-ejs','blog/nodejs/node-express','blog/nodejs/node-recommend'],
      },{
        title: 'Webkit',
        children: ['blog/webkit/render', 'blog/webkit/base', 'blog/webkit/sped', 'blog/webkit/style','blog/webkit/html'],
      },{
        title: '源码解析',
        children: ['blog/source/bind', 'blog/source/promise','blog/source/promiseall','blog/source/webpack','blog/source/hooks','blog/source/antd','blog/source/cra','blog/source/react-dom','blog/source/babel','blog/source/class','blog/source/v8stack'],
      },{
        title: '数据结构算法',
        children: ['blog/structure/base','blog/structure/array','blog/structure/map','blog/structure/tree','blog/structure/drawing','blog/structure/linked','blog/structure/arithmetic'],
      },{
        title: '工程化',
        children: ['blog/project/lerna','blog/project/shrinkwrap','blog/project/babel','blog/project/postcss'],
      },{
        title: '性能优化',
        children: ['blog/performance/dingwei', 'blog/performance/plugin','blog/performance/tools','blog/performance/css','blog/performance/recommend'],
      },{
        title: 'react',
        children: ['blog/react/base','blog/react/redux'],
      },{
        title: 'vue',
        children: ['blog/vue/vuex','blog/vue/mvvm'],
      },{
        title: '设计模式',
        children: ['blog/design/index'],
      },{
        title: '其他',
        children: ['blog/others/index'],
      }
    ],
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
  ],
  navs: [
    { title: '博客', path: '/blog'},
    { title: '开源项目', path: 'https://github.com/FreemenL/emptyd-admin-webpack'},
    { title: '博主出品', path: '/resource'},
    { title: '每周导读', path: '/week'},
    { title: '精品资源', path: '/jingpin'},
    { title: '友情链接', path: '/face'},
  ],
  chainWebpack: function (config, { env, webpack, createCSSRule }) {
    config.merge({
      plugins:[
        new PrerenderSPAPlugin({
          routes: ['/','/blog']
        }),
        new CompressionWebpackPlugin({ //gzip 压缩
          filename: '[path].gz[query]',
          test: new RegExp(
            '\\.(js|css)$'    //压缩 js 与 css
          ),
          threshold: 10240,
          minRatio: 0.8
        }),
      ],
      optimization: {
        minimize: true,
        splitChunks: {
          chunks: 'async',
          minSize: 30000,
          minChunks: 3,
          automaticNameDelimiter: '.',
          cacheGroups: {
            vendor: {
                name: 'vendors',
                test: /^.*node_modules[\\/](?!ag-grid-|lodash|wangeditor|react-virtualized|rc-select|rc-drawer|rc-time-picker|rc-tree|rc-table|rc-calendar|antd).*$/,
                chunks: "all",
                priority: 10,
            },
            virtualized: {
                name: "virtualized",
                test: /[\\/]node_modules[\\/]react-virtualized/,
                chunks: "all",
                priority: 10
            },
            rcselect: {
                name: "rc-select",
                test: /[\\/]node_modules[\\/]rc-select/,
                chunks: "all",
                priority: 10
            },
            rcdrawer: {
              name: "rcdrawer",
              test: /[\\/]node_modules[\\/]rc-drawer/,
              chunks: "all",
              priority: 10
            },
            rctimepicker: {
              name: "rctimepicker",
              test: /[\\/]node_modules[\\/]rc-time-picker/,
              chunks: "all",
              priority: 10
            },
            ag: {
              name: "ag",
              test: /[\\/]node_modules[\\/]ag-grid-/,
              chunks: "all",
              priority: 10
            },
            antd: {
              name: "antd",
              test: /[\\/]node_modules[\\/]antd[\\/]/,
              chunks: "all",
              priority: 9
            },
            rctree: {
              name: "rctree",
              test: /[\\/]node_modules[\\/]rc-tree/,
              chunks: "all",
              priority: -1
            },
            rccalendar: {
                name: "rccalendar",
                test: /[\\/]node_modules[\\/]rc-calendar[\\/]/,
                chunks: "all",
                priority: -1
            },
            rctable: {
                name: "rctable",
                test: /[\\/]node_modules[\\/]rc-table[\\/]es[\\/]/,
                chunks: "all",
                priority: -1
            },
            wang: {
                name: "wang",
                test: /[\\/]node_modules[\\/]wangeditor[\\/]/,
                chunks: "all",
                priority: -1
            },
            lodash: {
                name: "lodash",
                test: /[\\/]node_modules[\\/]lodash[\\/]/,
                chunks: "all",
                priority: -2
            },
            bizcharts: {
              name: "bizcharts",
              test: /[\\/]node_modules[\\/]bizcharts[\\/]/,
              chunks: "all",
              priority: 10
            },
            xlsx: {
              name: "xlsx",
              test: /[\\/]node_modules[\\/]xlsx[\\/]/,
              chunks: "async",
              priority: 10
            }
          },
        }
      }
    });
  },
  exportStatic: {}
});
