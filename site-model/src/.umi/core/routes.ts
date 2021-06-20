// @ts-nocheck
import { ApplyPluginsType, dynamic } from '/Users/jiayali/Desktop/old/dumi-test/site-model/node_modules/_@umijs_runtime@3.2.20@@umijs/runtime';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": (props) => require('react').createElement(require('../../../node_modules/_@umijs_preset-dumi@1.0.34@@umijs/preset-dumi/lib/themes/default/layout.js').default, {
      ...{"menus":{"*":{"*":[{"path":"/","title":"十三先生 | react | webpack | Node.js | webkit | 最新干货分享","meta":{}}],"/blog":[{"title":"简介"},{"title":"ECharts","children":[{"path":"/blog/echarts/min","title":"3 分钟上手 ECharts"},{"path":"/blog/echarts/webpack","title":"在 webpack 中使用 ECharts"},{"path":"/blog/echarts/mobile","title":"移动端自适应"},{"path":"/blog/echarts/event","title":"ECharts的事件和行为"},{"path":"/blog/echarts/styles","title":"ECharts 中的样式简介"},{"path":"/blog/echarts/ownstyle","title":"个性化图表的样式"},{"path":"/blog/echarts/canvas","title":"使用 Canvas 或者 SVG 渲染"},{"path":"/blog/echarts/gl","title":"使用 ECharts GL 实现基础的三维可视化"}]},{"title":"Node.js","children":[{"path":"/blog/nodejs/node-func","title":"常用模块和功能函数"},{"path":"/blog/nodejs/nodejs","title":"Node.js 进程"},{"path":"/blog/nodejs/node-internet","title":"网络体系基础及实践"},{"path":"/blog/nodejs/node-basic","title":"basic 认证机制"},{"path":"/blog/nodejs/node-http-proxy","title":"使用Node实现Http代理"},{"path":"/blog/nodejs/settimeout","title":"setImmediate 和setTimeout的区别"},{"path":"/blog/nodejs/node-ejs","title":"ejs 模版实现原理"},{"path":"/blog/nodejs/node-express","title":"express 基本原理"},{"path":"/blog/nodejs/node-recommend","title":"推荐课程"}]},{"title":"Webkit","children":[{"path":"/blog/webkit/render","title":"webKit的网页渲染过程"},{"path":"/blog/webkit/base","title":"webkit 之 javaScript 引擎"},{"path":"/blog/webkit/sped","title":"浏览器之硬件加速机制"},{"path":"/blog/webkit/style","title":"浏览器内核之 CSS 解释器和样式布局"},{"path":"/blog/webkit/html","title":"HTML 解释器"}]},{"title":"源码解析","children":[{"path":"/blog/source/bind","title":"js中 bind 函数的原理"},{"path":"/blog/source/promise","title":"promise 原理解析"},{"path":"/blog/source/promiseall","title":"promise.all"},{"path":"/blog/source/webpack","title":"webpack 阉割版实现"},{"path":"/blog/source/hooks","title":"webpack之tapable库中hooks"},{"path":"/blog/source/antd","title":"antd 源码 学习"},{"path":"/blog/source/cra","title":"create-react-app 源码解读"},{"path":"/blog/source/react-dom","title":"react 虚拟dom 浅析"},{"path":"/blog/source/babel","title":"babel 之 按需加载"},{"path":"/blog/source/class","title":"ES6中 class跟普通function的区别"},{"path":"/blog/source/v8stack","title":"深入v8提供的堆栈跟踪"}]},{"title":"数据结构算法","children":[{"path":"/blog/structure/base","title":"时间复杂度和大O表示法"},{"path":"/blog/structure/array","title":"数组( 队列，栈，矩阵 )"},{"path":"/blog/structure/map","title":"集合，字典和散列表"},{"path":"/blog/structure/tree","title":"树"},{"path":"/blog/structure/drawing","title":"图"},{"path":"/blog/structure/linked","title":"链表"},{"path":"/blog/structure/arithmetic","title":"基础算法"}]},{"title":"工程化","children":[{"path":"/blog/project/lerna","title":"lerna管理前端packages的最佳实践"},{"path":"/blog/project/shrinkwrap","title":"npm shrinkwrap"},{"path":"/blog/project/babel","title":"babel7相关"},{"path":"/blog/project/postcss","title":"postcss 插件 开发"}]},{"title":"性能优化","children":[{"path":"/blog/performance/dingwei","title":"定位解决web开发中的性能问题"},{"path":"/blog/performance/plugin","title":"web应用性能优化之 nginx + compression-webpack-plugin"},{"path":"/blog/performance/tools","title":"Chrome DevTools 代码覆盖率功能详解"},{"path":"/blog/performance/css","title":"在CSS动画中启用硬件加速"},{"path":"/blog/performance/recommend","title":"推荐课程"}]},{"title":"react","children":[{"path":"/blog/react/base","title":"react  中的 function Component"},{"path":"/blog/react/redux","title":"redux思想"}]},{"title":"vue","children":[{"path":"/blog/vue/vuex","title":"vuex 源码解读"},{"path":"/blog/vue/mvvm","title":"vue mvvm 原理"}]},{"title":"设计模式","children":[{"path":"/blog/design","title":"设计模式及原则"}]},{"title":"其他","children":[{"path":"/blog/others","title":"博客搭建"}]}],"/face":[{"path":"/face","title":"十三先生 | react | webpack | Node.js | webkit | 最新干货分享","meta":{}}],"/jingpin":[{"path":"/jingpin","title":"十三先生 | react | webpack | Node.js | webkit | 最新干货分享","meta":{}}],"/resource":[{"path":"/resource","title":"十三先生 | react | webpack | Node.js | webkit | 最新干货分享","meta":{}}],"/week":[{"path":"/week","title":"十三先生 | react | webpack | Node.js | webkit | 最新干货分享","meta":{}}]}},"locales":[],"navs":{"*":[{"title":"博客","path":"/blog"},{"title":"开源项目","path":"https://github.com/FreemenL/emptyd-admin-webpack"},{"title":"博主出品","path":"/resource"},{"title":"每周导读","path":"/week"},{"title":"精品资源","path":"/jingpin"},{"title":"友情链接","path":"/face"}]},"title":"十三先生","logo":"https://wxonebyone.oss-cn-beijing.aliyuncs.com/files/dev/cms/resource/uploaded/1583683639203_pinterest_profile_image.png","mode":"site"},
      ...props,
    }),
    "routes": [
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__index.md' */'../../../docs/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/index.md",
          "updatedTime": 1603268969405,
          "title": "十三先生 | react | webpack | Node.js | webkit | 最新干货分享",
          "hero": {
            "title": "十三先生的博客",
            "desc": "<div class=\"markdown\"><p>自律给我自由</p></div>",
            "actions": [
              {
                "text": "getStarted",
                "link": "/blog"
              }
            ]
          },
          "features": [
            {
              "icon": "https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png",
              "title": "精品博客",
              "desc": "<div class=\"markdown\"><p>持续输出中...</p></div>"
            },
            {
              "icon": "https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png",
              "title": "开源项目",
              "desc": "<div class=\"markdown\"><p>打造职业核心竞争力</p></div>"
            },
            {
              "icon": "https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png",
              "title": "每周导读",
              "desc": "<div class=\"markdown\"><p>实时更新前沿精品文章导读</p></div>"
            }
          ],
          "footer": "<div class=\"markdown\"><p>本站部署在<a href=\"https://curl.qcloud.com/nlc1vDH0\" target=\"_blank\" rel=\"noopener noreferrer\">腾讯云<svg xmlns=\"http://www.w3.org/2000/svg\" aria-hidden x=\"0px\" y=\"0px\" viewBox=\"0 0 100 100\" width=\"15\" height=\"15\" class=\"__dumi-default-external-link-icon\"><path fill=\"currentColor\" d=\"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z\"></path><polygon fill=\"currentColor\" points=\"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9\"></polygon></svg></a>，新老用户购买服务器有优惠，<a href=\"https://curl.qcloud.com/nlc1vDH0\" target=\"_blank\" rel=\"noopener noreferrer\">访问链接<svg xmlns=\"http://www.w3.org/2000/svg\" aria-hidden x=\"0px\" y=\"0px\" viewBox=\"0 0 100 100\" width=\"15\" height=\"15\" class=\"__dumi-default-external-link-icon\"><path fill=\"currentColor\" d=\"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z\"></path><polygon fill=\"currentColor\" points=\"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9\"></polygon></svg></a></p></div>",
          "slugs": []
        },
        "title": "十三先生 | react | webpack | Node.js | webkit | 最新干货分享"
      },
      {
        "path": "/blog",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__index.md' */'../../../docs/blog/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/index.md",
          "updatedTime": 1606812562409,
          "slugs": [
            {
              "depth": 2,
              "value": "简介",
              "heading": "简介"
            },
            {
              "depth": 3,
              "value": "笔名起源:",
              "heading": "笔名起源"
            },
            {
              "depth": 3,
              "value": "诗和远方:",
              "heading": "诗和远方"
            }
          ],
          "title": "简介",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          }
        },
        "title": "简介"
      },
      {
        "path": "/blog/design",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__design__index.md' */'../../../docs/blog/design/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/design/index.md",
          "updatedTime": 1584031125127,
          "slugs": [
            {
              "depth": 1,
              "value": "设计模式及原则",
              "heading": "设计模式及原则"
            },
            {
              "depth": 3,
              "value": "单例模式",
              "heading": "单例模式"
            },
            {
              "depth": 3,
              "value": "策略模式",
              "heading": "策略模式"
            },
            {
              "depth": 3,
              "value": "代理模式",
              "heading": "代理模式"
            },
            {
              "depth": 3,
              "value": "迭代器模式",
              "heading": "迭代器模式"
            },
            {
              "depth": 3,
              "value": "发布订阅模式",
              "heading": "发布订阅模式"
            },
            {
              "depth": 3,
              "value": "命令模式",
              "heading": "命令模式"
            },
            {
              "depth": 3,
              "value": "组合模式",
              "heading": "组合模式"
            },
            {
              "depth": 3,
              "value": "模板方法模式",
              "heading": "模板方法模式"
            },
            {
              "depth": 3,
              "value": "享元模式",
              "heading": "享元模式"
            },
            {
              "depth": 3,
              "value": "职责链模式",
              "heading": "职责链模式"
            },
            {
              "depth": 3,
              "value": "中介者模式",
              "heading": "中介者模式"
            },
            {
              "depth": 3,
              "value": "装饰者模式",
              "heading": "装饰者模式"
            },
            {
              "depth": 3,
              "value": "状态模式",
              "heading": "状态模式"
            },
            {
              "depth": 3,
              "value": "适配器模式",
              "heading": "适配器模式"
            },
            {
              "depth": 3,
              "value": "设计原则",
              "heading": "设计原则"
            },
            {
              "depth": 5,
              "value": "拓展",
              "heading": "拓展"
            }
          ],
          "title": "设计模式及原则",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Design",
            "path": "/blog/design"
          }
        },
        "title": "设计模式及原则"
      },
      {
        "path": "/blog/echarts/canvas",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__echarts__canvas.md' */'../../../docs/blog/echarts/canvas.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/echarts/canvas.md",
          "updatedTime": 1585993537330,
          "slugs": [
            {
              "depth": 1,
              "value": "使用 Canvas 或者 SVG 渲染",
              "heading": "使用-canvas-或者-svg-渲染"
            },
            {
              "depth": 3,
              "value": "选择哪种渲染器",
              "heading": "选择哪种渲染器"
            },
            {
              "depth": 3,
              "value": "如何使用渲染器",
              "heading": "如何使用渲染器"
            }
          ],
          "title": "使用 Canvas 或者 SVG 渲染",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Echarts",
            "path": "/blog/echarts"
          }
        },
        "title": "使用 Canvas 或者 SVG 渲染"
      },
      {
        "path": "/blog/echarts/event",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__echarts__event.md' */'../../../docs/blog/echarts/event.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/echarts/event.md",
          "updatedTime": 1585889820677,
          "slugs": [
            {
              "depth": 1,
              "value": "ECharts的事件和行为",
              "heading": "echarts的事件和行为"
            },
            {
              "depth": 3,
              "value": "鼠标事件的处理",
              "heading": "鼠标事件的处理"
            },
            {
              "depth": 3,
              "value": "组件交互",
              "heading": "组件交互"
            },
            {
              "depth": 3,
              "value": "组件行为",
              "heading": "组件行为"
            }
          ],
          "title": "ECharts的事件和行为",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Echarts",
            "path": "/blog/echarts"
          }
        },
        "title": "ECharts的事件和行为"
      },
      {
        "path": "/blog/echarts/gl",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__echarts__gl.md' */'../../../docs/blog/echarts/gl.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/echarts/gl.md",
          "updatedTime": 1585994724268,
          "slugs": [
            {
              "depth": 1,
              "value": "使用 ECharts GL 实现基础的三维可视化",
              "heading": "使用-echarts-gl-实现基础的三维可视化"
            },
            {
              "depth": 3,
              "value": "如何下载和引入 ECharts GL",
              "heading": "如何下载和引入-echarts-gl"
            },
            {
              "depth": 3,
              "value": "声明一个基础的三维笛卡尔坐标系",
              "heading": "声明一个基础的三维笛卡尔坐标系"
            },
            {
              "depth": 3,
              "value": "绘制三维的散点图",
              "heading": "绘制三维的散点图"
            },
            {
              "depth": 3,
              "value": "使用真实数据的三维散点图",
              "heading": "使用真实数据的三维散点图"
            },
            {
              "depth": 3,
              "value": "利用 visualMap 组件对三维散点图\b进行视觉编码",
              "heading": "利用-visualmap-组件对三维散点图\b进行视觉编码"
            }
          ],
          "title": "使用 ECharts GL 实现基础的三维可视化",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Echarts",
            "path": "/blog/echarts"
          }
        },
        "title": "使用 ECharts GL 实现基础的三维可视化"
      },
      {
        "path": "/blog/echarts/min",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__echarts__min.md' */'../../../docs/blog/echarts/min.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/echarts/min.md",
          "updatedTime": 1585888524844,
          "slugs": [
            {
              "depth": 1,
              "value": "3 分钟上手 ECharts",
              "heading": "3-分钟上手-echarts"
            },
            {
              "depth": 3,
              "value": "获取 ECharts",
              "heading": "获取-echarts"
            },
            {
              "depth": 3,
              "value": "引入 ECharts",
              "heading": "引入-echarts"
            },
            {
              "depth": 3,
              "value": "绘制一个简单的图表",
              "heading": "绘制一个简单的图表"
            }
          ],
          "title": "3 分钟上手 ECharts",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Echarts",
            "path": "/blog/echarts"
          }
        },
        "title": "3 分钟上手 ECharts"
      },
      {
        "path": "/blog/echarts/mobile",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__echarts__mobile.md' */'../../../docs/blog/echarts/mobile.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/echarts/mobile.md",
          "updatedTime": 1585995674044,
          "slugs": [
            {
              "depth": 3,
              "value": "移动端自适应",
              "heading": "移动端自适应"
            },
            {
              "depth": 3,
              "value": "ECharts组件的定位和布局",
              "heading": "echarts组件的定位和布局"
            },
            {
              "depth": 3,
              "value": "center/radius 定位方式：",
              "heading": "centerradius-定位方式："
            },
            {
              "depth": 3,
              "value": "横向（horizontal）和纵向（vertical）",
              "heading": "横向（horizontal）和纵向（vertical）"
            },
            {
              "depth": 3,
              "value": "Media Query",
              "heading": "media-query"
            },
            {
              "depth": 5,
              "value": "多个 query 被满足时的优先级：",
              "heading": "多个-query-被满足时的优先级："
            },
            {
              "depth": 5,
              "value": "默认 query：",
              "heading": "默认-query："
            },
            {
              "depth": 5,
              "value": "容器大小实时变化时的注意事项",
              "heading": "容器大小实时变化时的注意事项"
            },
            {
              "depth": 5,
              "value": "『复合 option』 中的 media 不支持 merge",
              "heading": "『复合-option』-中的-media-不支持-merge"
            }
          ],
          "title": "移动端自适应",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Echarts",
            "path": "/blog/echarts"
          }
        },
        "title": "移动端自适应"
      },
      {
        "path": "/blog/echarts/ownstyle",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__echarts__ownstyle.md' */'../../../docs/blog/echarts/ownstyle.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/echarts/ownstyle.md",
          "updatedTime": 1585993059106,
          "slugs": [
            {
              "depth": 1,
              "value": "个性化图表的样式",
              "heading": "个性化图表的样式"
            },
            {
              "depth": 3,
              "value": "绘制南丁格尔图",
              "heading": "绘制南丁格尔图"
            },
            {
              "depth": 3,
              "value": "阴影的配置",
              "heading": "阴影的配置"
            },
            {
              "depth": 3,
              "value": "深色背景和浅色标签",
              "heading": "深色背景和浅色标签"
            },
            {
              "depth": 3,
              "value": "设置扇形的颜色",
              "heading": "设置扇形的颜色"
            }
          ],
          "title": "个性化图表的样式",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Echarts",
            "path": "/blog/echarts"
          }
        },
        "title": "个性化图表的样式"
      },
      {
        "path": "/blog/echarts/styles",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__echarts__styles.md' */'../../../docs/blog/echarts/styles.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/echarts/styles.md",
          "updatedTime": 1585987348040,
          "slugs": [
            {
              "depth": 1,
              "value": "ECharts 中的样式简介",
              "heading": "echarts-中的样式简介"
            },
            {
              "depth": 3,
              "value": "颜色主题",
              "heading": "颜色主题"
            },
            {
              "depth": 3,
              "value": "调色盘",
              "heading": "调色盘"
            },
            {
              "depth": 3,
              "value": "直接的样式设置 itemStyle, lineStyle, areaStyle, label, …",
              "heading": "直接的样式设置-itemstyle-linestyle-areastyle-label-"
            },
            {
              "depth": 3,
              "value": "高亮的样式：emphasis",
              "heading": "高亮的样式：emphasis"
            },
            {
              "depth": 3,
              "value": "通过 visualMap 组件设定样式",
              "heading": "通过-visualmap-组件设定样式"
            }
          ],
          "title": "ECharts 中的样式简介",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Echarts",
            "path": "/blog/echarts"
          }
        },
        "title": "ECharts 中的样式简介"
      },
      {
        "path": "/blog/echarts/webpack",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__echarts__webpack.md' */'../../../docs/blog/echarts/webpack.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/echarts/webpack.md",
          "updatedTime": 1585994928307,
          "slugs": [
            {
              "depth": 1,
              "value": "在 webpack 中使用 ECharts",
              "heading": "在-webpack-中使用-echarts"
            },
            {
              "depth": 3,
              "value": "npm 安装 ECharts",
              "heading": "npm-安装-echarts"
            },
            {
              "depth": 3,
              "value": "引入 ECharts",
              "heading": "引入-echarts"
            },
            {
              "depth": 3,
              "value": "按需引入 ECharts 图表和组件",
              "heading": "按需引入-echarts-图表和组件"
            }
          ],
          "title": "在 webpack 中使用 ECharts",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Echarts",
            "path": "/blog/echarts"
          }
        },
        "title": "在 webpack 中使用 ECharts"
      },
      {
        "path": "/blog/nodejs/node-basic",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__nodejs__node-basic.md' */'../../../docs/blog/nodejs/node-basic.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/nodejs/node-basic.md",
          "updatedTime": 1584031640879,
          "slugs": [
            {
              "depth": 1,
              "value": "basic 认证机制",
              "heading": "basic-认证机制"
            },
            {
              "depth": 3,
              "value": "参考文献",
              "heading": "参考文献"
            }
          ],
          "title": "basic 认证机制",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Nodejs",
            "path": "/blog/nodejs"
          }
        },
        "title": "basic 认证机制"
      },
      {
        "path": "/blog/nodejs/node-ejs",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__nodejs__node-ejs.md' */'../../../docs/blog/nodejs/node-ejs.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/nodejs/node-ejs.md",
          "updatedTime": 1583914725913,
          "slugs": [
            {
              "depth": 1,
              "value": "ejs 模版实现原理",
              "heading": "ejs-模版实现原理"
            }
          ],
          "title": "ejs 模版实现原理",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Nodejs",
            "path": "/blog/nodejs"
          }
        },
        "title": "ejs 模版实现原理"
      },
      {
        "path": "/blog/nodejs/node-express",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__nodejs__node-express.md' */'../../../docs/blog/nodejs/node-express.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/nodejs/node-express.md",
          "updatedTime": 1584013363036,
          "slugs": [
            {
              "depth": 1,
              "value": "express 基本原理",
              "heading": "express-基本原理"
            },
            {
              "depth": 3,
              "value": "极简用例",
              "heading": "极简用例"
            },
            {
              "depth": 3,
              "value": "核心思想",
              "heading": "核心思想"
            }
          ],
          "title": "express 基本原理",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Nodejs",
            "path": "/blog/nodejs"
          }
        },
        "title": "express 基本原理"
      },
      {
        "path": "/blog/nodejs/node-func",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__nodejs__node-func.md' */'../../../docs/blog/nodejs/node-func.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/nodejs/node-func.md",
          "updatedTime": 1583914725914,
          "slugs": [
            {
              "depth": 1,
              "value": "常用模块和功能函数",
              "heading": "常用模块和功能函数"
            },
            {
              "depth": 3,
              "value": "module 模块",
              "heading": "module-模块"
            },
            {
              "depth": 3,
              "value": "require 的属性",
              "heading": "require-的属性"
            },
            {
              "depth": 3,
              "value": "Buffer",
              "heading": "buffer"
            },
            {
              "depth": 3,
              "value": "合并buffer",
              "heading": "合并buffer"
            },
            {
              "depth": 3,
              "value": "fs模块",
              "heading": "fs模块"
            },
            {
              "depth": 3,
              "value": "异步读文件",
              "heading": "异步读文件"
            },
            {
              "depth": 3,
              "value": "异步写入文件",
              "heading": "异步写入文件"
            },
            {
              "depth": 3,
              "value": "追加写入",
              "heading": "追加写入"
            },
            {
              "depth": 3,
              "value": "精确的控制读取的字节",
              "heading": "精确的控制读取的字节"
            },
            {
              "depth": 3,
              "value": "process监听控制台输入输出",
              "heading": "process监听控制台输入输出"
            },
            {
              "depth": 3,
              "value": "边读边写",
              "heading": "边读边写"
            },
            {
              "depth": 3,
              "value": "创建目录",
              "heading": "创建目录"
            },
            {
              "depth": 3,
              "value": "递归删除非空目录",
              "heading": "递归删除非空目录"
            },
            {
              "depth": 3,
              "value": "监听文件变动",
              "heading": "监听文件变动"
            },
            {
              "depth": 3,
              "value": "可读流",
              "heading": "可读流"
            },
            {
              "depth": 3,
              "value": "可写流",
              "heading": "可写流"
            },
            {
              "depth": 2,
              "value": "逐行读文件内容",
              "heading": "逐行读文件内容"
            },
            {
              "depth": 3,
              "value": "对象流",
              "heading": "对象流"
            },
            {
              "depth": 3,
              "value": "path模块",
              "heading": "path模块"
            },
            {
              "depth": 3,
              "value": "stream",
              "heading": "stream"
            },
            {
              "depth": 3,
              "value": "对象流",
              "heading": "对象流-1"
            },
            {
              "depth": 3,
              "value": "转换流",
              "heading": "转换流"
            },
            {
              "depth": 3,
              "value": "yargs 获取命令行参数",
              "heading": "yargs-获取命令行参数"
            },
            {
              "depth": 3,
              "value": "commander 获取命令行参数",
              "heading": "commander-获取命令行参数"
            }
          ],
          "title": "常用模块和功能函数",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Nodejs",
            "path": "/blog/nodejs"
          }
        },
        "title": "常用模块和功能函数"
      },
      {
        "path": "/blog/nodejs/node-http-proxy",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__nodejs__node-http-proxy.md' */'../../../docs/blog/nodejs/node-http-proxy.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/nodejs/node-http-proxy.md",
          "updatedTime": 1583914725913,
          "slugs": [
            {
              "depth": 1,
              "value": "使用Node实现Http代理",
              "heading": "使用node实现http代理"
            }
          ],
          "title": "使用Node实现Http代理",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Nodejs",
            "path": "/blog/nodejs"
          }
        },
        "title": "使用Node实现Http代理"
      },
      {
        "path": "/blog/nodejs/node-internet",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__nodejs__node-internet.md' */'../../../docs/blog/nodejs/node-internet.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/nodejs/node-internet.md",
          "updatedTime": 1583914725914,
          "slugs": [
            {
              "depth": 1,
              "value": "网络体系基础及实践",
              "heading": "网络体系基础及实践"
            },
            {
              "depth": 3,
              "value": "计算机网络体系结构分层",
              "heading": "计算机网络体系结构分层"
            },
            {
              "depth": 3,
              "value": "TCP/IP模型",
              "heading": "tcpip模型"
            },
            {
              "depth": 3,
              "value": "TCP连接的建立与终止",
              "heading": "tcp连接的建立与终止"
            },
            {
              "depth": 4,
              "value": "三次握手",
              "heading": "三次握手"
            },
            {
              "depth": 5,
              "value": "为什么要三次握手？",
              "heading": "为什么要三次握手？"
            },
            {
              "depth": 4,
              "value": "四次挥手",
              "heading": "四次挥手"
            },
            {
              "depth": 3,
              "value": "http 协议",
              "heading": "http-协议"
            },
            {
              "depth": 3,
              "value": "http 模块",
              "heading": "http-模块"
            },
            {
              "depth": 3,
              "value": "http服务基础",
              "heading": "http服务基础"
            },
            {
              "depth": 3,
              "value": "BFF中间层",
              "heading": "bff中间层"
            },
            {
              "depth": 3,
              "value": "做服务端",
              "heading": "做服务端"
            },
            {
              "depth": 3,
              "value": "浏览器缓存",
              "heading": "浏览器缓存"
            },
            {
              "depth": 3,
              "value": "协商缓存",
              "heading": "协商缓存"
            },
            {
              "depth": 5,
              "value": "1.协商缓存之Last-Modified",
              "heading": "1协商缓存之last-modified"
            },
            {
              "depth": 5,
              "value": "2.协商缓存之Etag",
              "heading": "2协商缓存之etag"
            },
            {
              "depth": 3,
              "value": "强缓存",
              "heading": "强缓存"
            },
            {
              "depth": 3,
              "value": "url 模块解析url参数",
              "heading": "url-模块解析url参数"
            },
            {
              "depth": 5,
              "value": "参考文献",
              "heading": "参考文献"
            }
          ],
          "title": "网络体系基础及实践",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Nodejs",
            "path": "/blog/nodejs"
          }
        },
        "title": "网络体系基础及实践"
      },
      {
        "path": "/blog/nodejs/node-recommend",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__nodejs__node-recommend.md' */'../../../docs/blog/nodejs/node-recommend.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/nodejs/node-recommend.md",
          "updatedTime": 1586001911313,
          "slugs": [
            {
              "depth": 3,
              "value": "推荐课程",
              "heading": "推荐课程"
            },
            {
              "depth": 3,
              "value": "内容概要",
              "heading": "内容概要"
            }
          ],
          "title": "推荐课程",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Nodejs",
            "path": "/blog/nodejs"
          }
        },
        "title": "推荐课程"
      },
      {
        "path": "/blog/nodejs/nodejs",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__nodejs__nodejs.md' */'../../../docs/blog/nodejs/nodejs.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/nodejs/nodejs.md",
          "updatedTime": 1583914725918,
          "slugs": [
            {
              "depth": 1,
              "value": "Node.js 进程",
              "heading": "nodejs-进程"
            },
            {
              "depth": 5,
              "value": "进程和线程的区别及优劣：",
              "heading": "进程和线程的区别及优劣："
            },
            {
              "depth": 4,
              "value": "服务模型的变迁：",
              "heading": "服务模型的变迁："
            },
            {
              "depth": 4,
              "value": "那么nodejs是如何充分利用多核cup 服务器的？",
              "heading": "那么nodejs是如何充分利用多核cup-服务器的？"
            },
            {
              "depth": 3,
              "value": "创建子进程",
              "heading": "创建子进程"
            },
            {
              "depth": 3,
              "value": "进程间通信",
              "heading": "进程间通信"
            },
            {
              "depth": 3,
              "value": "parent.js",
              "heading": "parentjs"
            },
            {
              "depth": 3,
              "value": "sub.js",
              "heading": "subjs"
            },
            {
              "depth": 3,
              "value": "进程间通信原理",
              "heading": "进程间通信原理"
            },
            {
              "depth": 5,
              "value": "句柄传递",
              "heading": "句柄传递"
            },
            {
              "depth": 5,
              "value": "主进程代码如下所示",
              "heading": "主进程代码如下所示"
            },
            {
              "depth": 5,
              "value": "子进程代码如下所示:",
              "heading": "子进程代码如下所示"
            },
            {
              "depth": 5,
              "value": "句柄发送与还原",
              "heading": "句柄发送与还原"
            },
            {
              "depth": 5,
              "value": "端口共同监听",
              "heading": "端口共同监听"
            },
            {
              "depth": 3,
              "value": "多个进程可以监听到 相同的端口而不引起EADDRINUSE异常?",
              "heading": "多个进程可以监听到-相同的端口而不引起eaddrinuse异常"
            },
            {
              "depth": 5,
              "value": "集群稳定之路",
              "heading": "集群稳定之路"
            },
            {
              "depth": 4,
              "value": "进程事件",
              "heading": "进程事件"
            },
            {
              "depth": 3,
              "value": "自动重启",
              "heading": "自动重启"
            },
            {
              "depth": 3,
              "value": "自杀信号",
              "heading": "自杀信号"
            },
            {
              "depth": 3,
              "value": "负载均衡",
              "heading": "负载均衡"
            },
            {
              "depth": 3,
              "value": "状态共享",
              "heading": "状态共享"
            },
            {
              "depth": 3,
              "value": "Cluster 事件",
              "heading": "cluster-事件"
            },
            {
              "depth": 3,
              "value": "node 正确使用process 结束进程的方式",
              "heading": "node-正确使用process-结束进程的方式"
            },
            {
              "depth": 3,
              "value": "参考文献",
              "heading": "参考文献"
            }
          ],
          "title": "Node.js 进程",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Nodejs",
            "path": "/blog/nodejs"
          }
        },
        "title": "Node.js 进程"
      },
      {
        "path": "/blog/nodejs/settimeout",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__nodejs__settimeout.md' */'../../../docs/blog/nodejs/settimeout.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/nodejs/settimeout.md",
          "updatedTime": 1583914725914,
          "slugs": [
            {
              "depth": 1,
              "value": "setImmediate 和setTimeout的区别",
              "heading": "setimmediate-和settimeout的区别"
            }
          ],
          "title": "setImmediate 和setTimeout的区别",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Nodejs",
            "path": "/blog/nodejs"
          }
        },
        "title": "setImmediate 和setTimeout的区别"
      },
      {
        "path": "/blog/others",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__others__index.md' */'../../../docs/blog/others/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/others/index.md",
          "updatedTime": 1603268748461,
          "slugs": [
            {
              "depth": 1,
              "value": "博客搭建",
              "heading": "博客搭建"
            },
            {
              "depth": 3,
              "value": "简介",
              "heading": "简介"
            },
            {
              "depth": 3,
              "value": "实践",
              "heading": "实践"
            },
            {
              "depth": 4,
              "value": "项目结构简介",
              "heading": "项目结构简介"
            },
            {
              "depth": 4,
              "value": "组件",
              "heading": "组件"
            },
            {
              "depth": 3,
              "value": "最后附上",
              "heading": "最后附上"
            }
          ],
          "title": "博客搭建",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Others",
            "path": "/blog/others"
          }
        },
        "title": "博客搭建"
      },
      {
        "path": "/blog/performance/css",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__performance__css.md' */'../../../docs/blog/performance/css.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/performance/css.md",
          "updatedTime": 1584021819688,
          "slugs": [
            {
              "depth": 1,
              "value": "在CSS动画中启用硬件加速",
              "heading": "在css动画中启用硬件加速"
            },
            {
              "depth": 3,
              "value": "在GPU渲染元素",
              "heading": "在gpu渲染元素"
            },
            {
              "depth": 4,
              "value": "通过-webkit-transform:transition3d/translateZ开启GPU硬件加速的适用范围",
              "heading": "通过-webkit-transformtransition3dtranslatez开启gpu硬件加速的适用范围"
            },
            {
              "depth": 3,
              "value": "使用硬件加速需要注意的地方",
              "heading": "使用硬件加速需要注意的地方"
            },
            {
              "depth": 3,
              "value": "The Near Future",
              "heading": "the-near-future"
            },
            {
              "depth": 3,
              "value": "will-chang属性需要注意的地方",
              "heading": "will-chang属性需要注意的地方"
            }
          ],
          "title": "在CSS动画中启用硬件加速",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Performance",
            "path": "/blog/performance"
          }
        },
        "title": "在CSS动画中启用硬件加速"
      },
      {
        "path": "/blog/performance/dingwei",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__performance__dingwei.md' */'../../../docs/blog/performance/dingwei.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/performance/dingwei.md",
          "updatedTime": 1583943820750,
          "slugs": [
            {
              "depth": 1,
              "value": "定位解决web开发中的性能问题",
              "heading": "定位解决web开发中的性能问题"
            },
            {
              "depth": 5,
              "value": "找到瓶颈",
              "heading": "找到瓶颈"
            }
          ],
          "title": "定位解决web开发中的性能问题",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Performance",
            "path": "/blog/performance"
          }
        },
        "title": "定位解决web开发中的性能问题"
      },
      {
        "path": "/blog/performance/plugin",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__performance__plugin.md' */'../../../docs/blog/performance/plugin.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/performance/plugin.md",
          "updatedTime": 1583944108271,
          "slugs": [
            {
              "depth": 1,
              "value": "web应用性能优化之 nginx + compression-webpack-plugin",
              "heading": "web应用性能优化之-nginx--compression-webpack-plugin"
            }
          ],
          "title": "web应用性能优化之 nginx + compression-webpack-plugin",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Performance",
            "path": "/blog/performance"
          }
        },
        "title": "web应用性能优化之 nginx + compression-webpack-plugin"
      },
      {
        "path": "/blog/performance/recommend",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__performance__recommend.md' */'../../../docs/blog/performance/recommend.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/performance/recommend.md",
          "updatedTime": 1586009881394,
          "slugs": [
            {
              "depth": 3,
              "value": "推荐课程",
              "heading": "推荐课程"
            },
            {
              "depth": 3,
              "value": "作者介绍",
              "heading": "作者介绍"
            },
            {
              "depth": 3,
              "value": "内容概要",
              "heading": "内容概要"
            },
            {
              "depth": 3,
              "value": "适宜人群",
              "heading": "适宜人群"
            }
          ],
          "title": "推荐课程",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Performance",
            "path": "/blog/performance"
          }
        },
        "title": "推荐课程"
      },
      {
        "path": "/blog/performance/tools",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__performance__tools.md' */'../../../docs/blog/performance/tools.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/performance/tools.md",
          "updatedTime": 1584014004770,
          "slugs": [
            {
              "depth": 1,
              "value": "Chrome DevTools 代码覆盖率功能详解",
              "heading": "chrome-devtools-代码覆盖率功能详解"
            },
            {
              "depth": 2,
              "value": "打开姿势",
              "heading": "打开姿势"
            }
          ],
          "title": "Chrome DevTools 代码覆盖率功能详解",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Performance",
            "path": "/blog/performance"
          }
        },
        "title": "Chrome DevTools 代码覆盖率功能详解"
      },
      {
        "path": "/blog/project/babel",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__project__babel.md' */'../../../docs/blog/project/babel.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/project/babel.md",
          "updatedTime": 1584020945093,
          "slugs": [
            {
              "depth": 1,
              "value": "babel7相关",
              "heading": "babel7相关"
            },
            {
              "depth": 3,
              "value": "babel-polyfill",
              "heading": "babel-polyfill"
            },
            {
              "depth": 3,
              "value": "babel-runtime",
              "heading": "babel-runtime"
            },
            {
              "depth": 3,
              "value": "babel-register",
              "heading": "babel-register"
            },
            {
              "depth": 3,
              "value": "babel-node",
              "heading": "babel-node"
            }
          ],
          "title": "babel7相关",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Project",
            "path": "/blog/project"
          }
        },
        "title": "babel7相关"
      },
      {
        "path": "/blog/project/lerna",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__project__lerna.md' */'../../../docs/blog/project/lerna.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/project/lerna.md",
          "updatedTime": 1584014547039,
          "slugs": [
            {
              "depth": 1,
              "value": "lerna管理前端packages的最佳实践",
              "heading": "lerna管理前端packages的最佳实践"
            },
            {
              "depth": 2,
              "value": "背景",
              "heading": "背景"
            },
            {
              "depth": 2,
              "value": "什么是lerna",
              "heading": "什么是lerna"
            },
            {
              "depth": 2,
              "value": "常用命令",
              "heading": "常用命令"
            },
            {
              "depth": 3,
              "value": "全局安装lerna",
              "heading": "全局安装lerna"
            },
            {
              "depth": 3,
              "value": "为所有项目安装依赖，类似于npm/yarn i",
              "heading": "为所有项目安装依赖，类似于npmyarn-i"
            },
            {
              "depth": 3,
              "value": "提交对项目的更新",
              "heading": "提交对项目的更新"
            },
            {
              "depth": 3,
              "value": "为packages文件夹下的package安装依赖",
              "heading": "为packages文件夹下的package安装依赖"
            },
            {
              "depth": 3,
              "value": "卸载依赖",
              "heading": "卸载依赖"
            },
            {
              "depth": 3,
              "value": "检查对包是否发生过变更（前提是git代码已经提交）",
              "heading": "检查对包是否发生过变更（前提是git代码已经提交）"
            },
            {
              "depth": 3,
              "value": "lerna run",
              "heading": "lerna-run"
            },
            {
              "depth": 3,
              "value": "lerna.json解析",
              "heading": "lernajson解析"
            },
            {
              "depth": 2,
              "value": "环境配置",
              "heading": "环境配置"
            },
            {
              "depth": 5,
              "value": "lerna 我们需要全局安装lerna工具",
              "heading": "lerna-我们需要全局安装lerna工具"
            },
            {
              "depth": 5,
              "value": "初始化一个lerna工程",
              "heading": "初始化一个lerna工程"
            },
            {
              "depth": 5,
              "value": "初始化 通过cmd进入相关目录，进行初始化",
              "heading": "初始化-通过cmd进入相关目录，进行初始化"
            },
            {
              "depth": 2,
              "value": "lerna最佳实践",
              "heading": "lerna最佳实践"
            },
            {
              "depth": 2,
              "value": "bug",
              "heading": "bug"
            }
          ],
          "title": "lerna管理前端packages的最佳实践",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Project",
            "path": "/blog/project"
          }
        },
        "title": "lerna管理前端packages的最佳实践"
      },
      {
        "path": "/blog/project/postcss",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__project__postcss.md' */'../../../docs/blog/project/postcss.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/project/postcss.md",
          "updatedTime": 1584021402117,
          "slugs": [
            {
              "depth": 1,
              "value": "postcss 插件 开发",
              "heading": "postcss-插件-开发"
            }
          ],
          "title": "postcss 插件 开发",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Project",
            "path": "/blog/project"
          }
        },
        "title": "postcss 插件 开发"
      },
      {
        "path": "/blog/project/shrinkwrap",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__project__shrinkwrap.md' */'../../../docs/blog/project/shrinkwrap.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/project/shrinkwrap.md",
          "updatedTime": 1584020612558,
          "slugs": [
            {
              "depth": 1,
              "value": "npm shrinkwrap",
              "heading": "npm-shrinkwrap"
            },
            {
              "depth": 3,
              "value": "什么是 npm shrinkwrap？",
              "heading": "什么是-npm-shrinkwrap？"
            },
            {
              "depth": 3,
              "value": "为什么需要它？",
              "heading": "为什么需要它？"
            },
            {
              "depth": 3,
              "value": "对于我的项目，我需要做什么？",
              "heading": "对于我的项目，我需要做什么？"
            },
            {
              "depth": 3,
              "value": "trouble-shooting",
              "heading": "trouble-shooting"
            }
          ],
          "title": "npm shrinkwrap",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Project",
            "path": "/blog/project"
          }
        },
        "title": "npm shrinkwrap"
      },
      {
        "path": "/blog/react/base",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__react__base.md' */'../../../docs/blog/react/base.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/react/base.md",
          "updatedTime": 1584022343969,
          "slugs": [
            {
              "depth": 1,
              "value": "react  中的 function Component",
              "heading": "react--中的-function-component"
            },
            {
              "depth": 1,
              "value": "class Component 和 function Component 的区别",
              "heading": "class-component-和-function-component-的区别"
            },
            {
              "depth": 2,
              "value": "function Component",
              "heading": "function-component"
            },
            {
              "depth": 3,
              "value": "Hooks 也具有 capture value特性",
              "heading": "hooks-也具有-capture-value特性"
            },
            {
              "depth": 5,
              "value": "怎么替代 componentDidUpdate",
              "heading": "怎么替代-componentdidupdate"
            },
            {
              "depth": 4,
              "value": "聚合管理 State",
              "heading": "聚合管理-state"
            },
            {
              "depth": 3,
              "value": "获取上一个props",
              "heading": "获取上一个props"
            },
            {
              "depth": 3,
              "value": "性能注意事项",
              "heading": "性能注意事项"
            }
          ],
          "title": "react  中的 function Component",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "React",
            "path": "/blog/react"
          }
        },
        "title": "react  中的 function Component"
      },
      {
        "path": "/blog/react/redux",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__react__redux.md' */'../../../docs/blog/react/redux.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/react/redux.md",
          "updatedTime": 1584022677897,
          "slugs": [
            {
              "depth": 1,
              "value": "redux思想",
              "heading": "redux思想"
            }
          ],
          "title": "redux思想",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "React",
            "path": "/blog/react"
          }
        },
        "title": "redux思想"
      },
      {
        "path": "/blog/source/antd",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__source__antd.md' */'../../../docs/blog/source/antd.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/source/antd.md",
          "updatedTime": 1583945745606,
          "slugs": [
            {
              "depth": 1,
              "value": "antd 源码 学习",
              "heading": "antd-源码-学习"
            },
            {
              "depth": 2,
              "value": "antd-tools源码分析",
              "heading": "antd-tools源码分析"
            },
            {
              "depth": 3,
              "value": "在看antd-tools 的代码就容易理解了",
              "heading": "在看antd-tools-的代码就容易理解了"
            }
          ],
          "title": "antd 源码 学习",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Source",
            "path": "/blog/source"
          }
        },
        "title": "antd 源码 学习"
      },
      {
        "path": "/blog/source/babel",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__source__babel.md' */'../../../docs/blog/source/babel.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/source/babel.md",
          "updatedTime": 1583977632027,
          "slugs": [
            {
              "depth": 1,
              "value": "babel 之 按需加载",
              "heading": "babel-之-按需加载"
            }
          ],
          "title": "babel 之 按需加载",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Source",
            "path": "/blog/source"
          }
        },
        "title": "babel 之 按需加载"
      },
      {
        "path": "/blog/source/bind",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__source__bind.md' */'../../../docs/blog/source/bind.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/source/bind.md",
          "updatedTime": 1583945371846,
          "slugs": [
            {
              "depth": 1,
              "value": "js中 bind 函数的原理",
              "heading": "js中-bind-函数的原理"
            }
          ],
          "title": "js中 bind 函数的原理",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Source",
            "path": "/blog/source"
          }
        },
        "title": "js中 bind 函数的原理"
      },
      {
        "path": "/blog/source/class",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__source__class.md' */'../../../docs/blog/source/class.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/source/class.md",
          "updatedTime": 1583981105489,
          "slugs": [
            {
              "depth": 1,
              "value": "ES6中 class跟普通function的区别",
              "heading": "es6中-class跟普通function的区别"
            },
            {
              "depth": 3,
              "value": "分析编译后结果如下",
              "heading": "分析编译后结果如下"
            }
          ],
          "title": "ES6中 class跟普通function的区别",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Source",
            "path": "/blog/source"
          }
        },
        "title": "ES6中 class跟普通function的区别"
      },
      {
        "path": "/blog/source/cra",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__source__cra.md' */'../../../docs/blog/source/cra.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/source/cra.md",
          "updatedTime": 1583946040974,
          "slugs": [
            {
              "depth": 1,
              "value": "create-react-app 源码解读",
              "heading": "create-react-app-源码解读"
            },
            {
              "depth": 2,
              "value": "细节如下",
              "heading": "细节如下"
            },
            {
              "depth": 3,
              "value": "代码注释",
              "heading": "代码注释"
            },
            {
              "depth": 3,
              "value": "代码注释",
              "heading": "代码注释-1"
            }
          ],
          "title": "create-react-app 源码解读",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Source",
            "path": "/blog/source"
          }
        },
        "title": "create-react-app 源码解读"
      },
      {
        "path": "/blog/source/hooks",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__source__hooks.md' */'../../../docs/blog/source/hooks.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/source/hooks.md",
          "updatedTime": 1583947457957,
          "slugs": [
            {
              "depth": 1,
              "value": "webpack之tapable库中hooks",
              "heading": "webpack之tapable库中hooks"
            },
            {
              "depth": 3,
              "value": "compiler 对象",
              "heading": "compiler-对象"
            },
            {
              "depth": 3,
              "value": "compilation 对象",
              "heading": "compilation-对象"
            },
            {
              "depth": 3,
              "value": "简单的流程图",
              "heading": "简单的流程图"
            },
            {
              "depth": 3,
              "value": "SyncHook",
              "heading": "synchook"
            },
            {
              "depth": 3,
              "value": "AsyncSeriesHook",
              "heading": "asyncserieshook"
            }
          ],
          "title": "webpack之tapable库中hooks",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Source",
            "path": "/blog/source"
          }
        },
        "title": "webpack之tapable库中hooks"
      },
      {
        "path": "/blog/source/promise",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__source__promise.md' */'../../../docs/blog/source/promise.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/source/promise.md",
          "updatedTime": 1583944631104,
          "slugs": [
            {
              "depth": 1,
              "value": "promise 原理解析",
              "heading": "promise-原理解析"
            }
          ],
          "title": "promise 原理解析",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Source",
            "path": "/blog/source"
          }
        },
        "title": "promise 原理解析"
      },
      {
        "path": "/blog/source/promiseall",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__source__promiseall.md' */'../../../docs/blog/source/promiseall.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/source/promiseall.md",
          "updatedTime": 1583982278809,
          "slugs": [
            {
              "depth": 1,
              "value": "promise.all",
              "heading": "promiseall"
            },
            {
              "depth": 3,
              "value": "promise定义：",
              "heading": "promise定义："
            },
            {
              "depth": 3,
              "value": "简单使用",
              "heading": "简单使用"
            }
          ],
          "title": "promise.all",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Source",
            "path": "/blog/source"
          }
        },
        "title": "promise.all"
      },
      {
        "path": "/blog/source/react-dom",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__source__react-dom.md' */'../../../docs/blog/source/react-dom.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/source/react-dom.md",
          "updatedTime": 1583946530237,
          "slugs": [
            {
              "depth": 3,
              "value": "react 虚拟dom 浅析",
              "heading": "react-虚拟dom-浅析"
            },
            {
              "depth": 3,
              "value": "dom diff",
              "heading": "dom-diff"
            }
          ],
          "title": "react 虚拟dom 浅析",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Source",
            "path": "/blog/source"
          }
        },
        "title": "react 虚拟dom 浅析"
      },
      {
        "path": "/blog/source/v8stack",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__source__v8stack.md' */'../../../docs/blog/source/v8stack.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/source/v8stack.md",
          "updatedTime": 1584020225812,
          "slugs": [
            {
              "depth": 1,
              "value": "深入v8提供的堆栈跟踪",
              "heading": "深入v8提供的堆栈跟踪"
            },
            {
              "depth": 3,
              "value": "Error作为函数使用",
              "heading": "error作为函数使用"
            },
            {
              "depth": 3,
              "value": "Error 类型",
              "heading": "error-类型"
            },
            {
              "depth": 3,
              "value": "基本堆栈跟踪",
              "heading": "基本堆栈跟踪"
            },
            {
              "depth": 4,
              "value": "改变堆栈帧数",
              "heading": "改变堆栈帧数"
            },
            {
              "depth": 3,
              "value": "堆栈跟踪收集自定义异常",
              "heading": "堆栈跟踪收集自定义异常"
            },
            {
              "depth": 3,
              "value": "使用场景",
              "heading": "使用场景"
            }
          ],
          "title": "深入v8提供的堆栈跟踪",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Source",
            "path": "/blog/source"
          }
        },
        "title": "深入v8提供的堆栈跟踪"
      },
      {
        "path": "/blog/source/webpack",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__source__webpack.md' */'../../../docs/blog/source/webpack.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/source/webpack.md",
          "updatedTime": 1583978998173,
          "slugs": [
            {
              "depth": 1,
              "value": "webpack 阉割版实现",
              "heading": "webpack-阉割版实现"
            },
            {
              "depth": 2,
              "value": "整体思路：",
              "heading": "整体思路："
            },
            {
              "depth": 2,
              "value": "webpack 中的 hooks",
              "heading": "webpack-中的-hooks"
            },
            {
              "depth": 2,
              "value": "具体实现步骤：",
              "heading": "具体实现步骤："
            }
          ],
          "title": "webpack 阉割版实现",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Source",
            "path": "/blog/source"
          }
        },
        "title": "webpack 阉割版实现"
      },
      {
        "path": "/blog/structure/arithmetic",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__structure__arithmetic.md' */'../../../docs/blog/structure/arithmetic.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/structure/arithmetic.md",
          "updatedTime": 1583924731223,
          "slugs": [
            {
              "depth": 1,
              "value": "基础算法",
              "heading": "基础算法"
            },
            {
              "depth": 5,
              "value": "排序算法",
              "heading": "排序算法"
            },
            {
              "depth": 3,
              "value": "冒泡排序",
              "heading": "冒泡排序"
            },
            {
              "depth": 3,
              "value": "选择排序",
              "heading": "选择排序"
            },
            {
              "depth": 3,
              "value": "插入排序：",
              "heading": "插入排序："
            },
            {
              "depth": 3,
              "value": "归并排序:",
              "heading": "归并排序"
            },
            {
              "depth": 3,
              "value": "快排",
              "heading": "快排"
            },
            {
              "depth": 3,
              "value": "二分搜索",
              "heading": "二分搜索"
            },
            {
              "depth": 3,
              "value": "斐波那契数列",
              "heading": "斐波那契数列"
            },
            {
              "depth": 3,
              "value": "动态规划",
              "heading": "动态规划"
            },
            {
              "depth": 3,
              "value": "能用动态规划解决问题",
              "heading": "能用动态规划解决问题"
            },
            {
              "depth": 3,
              "value": "贪心算法",
              "heading": "贪心算法"
            }
          ],
          "title": "基础算法",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Structure",
            "path": "/blog/structure"
          }
        },
        "title": "基础算法"
      },
      {
        "path": "/blog/structure/array",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__structure__array.md' */'../../../docs/blog/structure/array.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/structure/array.md",
          "updatedTime": 1583916384652,
          "slugs": [
            {
              "depth": 1,
              "value": "数组( 队列，栈，矩阵 )",
              "heading": "数组-队列，栈，矩阵-"
            },
            {
              "depth": 3,
              "value": "数组",
              "heading": "数组"
            },
            {
              "depth": 3,
              "value": "矩阵(二维和多维数组)",
              "heading": "矩阵二维和多维数组"
            },
            {
              "depth": 3,
              "value": "栈",
              "heading": "栈"
            },
            {
              "depth": 3,
              "value": "队列",
              "heading": "队列"
            },
            {
              "depth": 3,
              "value": "优先队列",
              "heading": "优先队列"
            },
            {
              "depth": 3,
              "value": "循环队列——击鼓传花 ",
              "heading": "循环队列击鼓传花"
            }
          ],
          "title": "数组( 队列，栈，矩阵 )",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Structure",
            "path": "/blog/structure"
          }
        },
        "title": "数组( 队列，栈，矩阵 )"
      },
      {
        "path": "/blog/structure/base",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__structure__base.md' */'../../../docs/blog/structure/base.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/structure/base.md",
          "updatedTime": 1583916797457,
          "slugs": [
            {
              "depth": 1,
              "value": "时间复杂度和大O表示法",
              "heading": "时间复杂度和大o表示法"
            },
            {
              "depth": 2,
              "value": "所以究竟什么是算法？",
              "heading": "所以究竟什么是算法？"
            },
            {
              "depth": 2,
              "value": "O(1)— 常量时间",
              "heading": "o1-常量时间"
            },
            {
              "depth": 2,
              "value": "O (log n)— 对数时间",
              "heading": "o-log-n-对数时间"
            },
            {
              "depth": 3,
              "value": "O(n²)— 二次方时间",
              "heading": "on²-二次方时间"
            },
            {
              "depth": 3,
              "value": "基础算法",
              "heading": "基础算法"
            },
            {
              "depth": 3,
              "value": "最终总结：",
              "heading": "最终总结："
            }
          ],
          "title": "时间复杂度和大O表示法",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Structure",
            "path": "/blog/structure"
          }
        },
        "title": "时间复杂度和大O表示法"
      },
      {
        "path": "/blog/structure/drawing",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__structure__drawing.md' */'../../../docs/blog/structure/drawing.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/structure/drawing.md",
          "updatedTime": 1583923635158,
          "slugs": [
            {
              "depth": 1,
              "value": "图",
              "heading": "图"
            },
            {
              "depth": 5,
              "value": "有向图和无向图",
              "heading": "有向图和无向图"
            },
            {
              "depth": 5,
              "value": "关联矩阵",
              "heading": "关联矩阵"
            },
            {
              "depth": 4,
              "value": "邻接表",
              "heading": "邻接表"
            }
          ],
          "title": "图",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Structure",
            "path": "/blog/structure"
          }
        },
        "title": "图"
      },
      {
        "path": "/blog/structure/linked",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__structure__linked.md' */'../../../docs/blog/structure/linked.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/structure/linked.md",
          "updatedTime": 1583923770860,
          "slugs": [
            {
              "depth": 1,
              "value": "链表",
              "heading": "链表"
            },
            {
              "depth": 3,
              "value": "双向链表",
              "heading": "双向链表"
            },
            {
              "depth": 3,
              "value": "循环链表",
              "heading": "循环链表"
            }
          ],
          "title": "链表",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Structure",
            "path": "/blog/structure"
          }
        },
        "title": "链表"
      },
      {
        "path": "/blog/structure/map",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__structure__map.md' */'../../../docs/blog/structure/map.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/structure/map.md",
          "updatedTime": 1583916951742,
          "slugs": [
            {
              "depth": 1,
              "value": "集合，字典和散列表",
              "heading": "集合，字典和散列表"
            },
            {
              "depth": 3,
              "value": "集合",
              "heading": "集合"
            },
            {
              "depth": 3,
              "value": "字典和散列表",
              "heading": "字典和散列表"
            },
            {
              "depth": 3,
              "value": "字典",
              "heading": "字典"
            },
            {
              "depth": 3,
              "value": "散列表",
              "heading": "散列表"
            },
            {
              "depth": 3,
              "value": "处理散列表中的冲突",
              "heading": "处理散列表中的冲突"
            },
            {
              "depth": 3,
              "value": "线性探查",
              "heading": "线性探查"
            },
            {
              "depth": 2,
              "value": "创建更好的散列函数",
              "heading": "创建更好的散列函数"
            }
          ],
          "title": "集合，字典和散列表",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Structure",
            "path": "/blog/structure"
          }
        },
        "title": "集合，字典和散列表"
      },
      {
        "path": "/blog/structure/tree",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__structure__tree.md' */'../../../docs/blog/structure/tree.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/structure/tree.md",
          "updatedTime": 1583917017628,
          "slugs": [
            {
              "depth": 1,
              "value": "树",
              "heading": "树"
            },
            {
              "depth": 4,
              "value": "树的相关术语",
              "heading": "树的相关术语"
            },
            {
              "depth": 3,
              "value": "二叉树和二叉搜索树",
              "heading": "二叉树和二叉搜索树"
            },
            {
              "depth": 5,
              "value": "创建BinarySearchTree类",
              "heading": "创建binarysearchtree类"
            },
            {
              "depth": 3,
              "value": "中序遍历的结果如下",
              "heading": "中序遍历的结果如下"
            },
            {
              "depth": 3,
              "value": "先序遍历",
              "heading": "先序遍历"
            },
            {
              "depth": 3,
              "value": "后序遍历",
              "heading": "后序遍历"
            },
            {
              "depth": 3,
              "value": "搜索最小值和最大值",
              "heading": "搜索最小值和最大值"
            },
            {
              "depth": 3,
              "value": "搜索一个特定的值",
              "heading": "搜索一个特定的值"
            },
            {
              "depth": 3,
              "value": "移除一个节点",
              "heading": "移除一个节点"
            },
            {
              "depth": 3,
              "value": "二叉搜索树 完整代码",
              "heading": "二叉搜索树-完整代码"
            }
          ],
          "title": "树",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Structure",
            "path": "/blog/structure"
          }
        },
        "title": "树"
      },
      {
        "path": "/blog/vue/mvvm",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__vue__mvvm.md' */'../../../docs/blog/vue/mvvm.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/vue/mvvm.md",
          "updatedTime": 1609567971119,
          "slugs": [
            {
              "depth": 1,
              "value": "vue mvvm 原理",
              "heading": "vue-mvvm-原理"
            },
            {
              "depth": 3,
              "value": "前言",
              "heading": "前言"
            },
            {
              "depth": 3,
              "value": "实现原理",
              "heading": "实现原理"
            }
          ],
          "title": "vue mvvm 原理",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Vue",
            "path": "/blog/vue"
          }
        },
        "title": "vue mvvm 原理"
      },
      {
        "path": "/blog/vue/vuex",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__vue__vuex.md' */'../../../docs/blog/vue/vuex.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/vue/vuex.md",
          "updatedTime": 1609567961535,
          "slugs": [
            {
              "depth": 1,
              "value": "vuex 源码解读",
              "heading": "vuex-源码解读"
            },
            {
              "depth": 3,
              "value": "前言",
              "heading": "前言"
            },
            {
              "depth": 3,
              "value": "vuex中的数据流向",
              "heading": "vuex中的数据流向"
            },
            {
              "depth": 3,
              "value": "源码解读:",
              "heading": "源码解读"
            }
          ],
          "title": "vuex 源码解读",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Vue",
            "path": "/blog/vue"
          }
        },
        "title": "vuex 源码解读"
      },
      {
        "path": "/blog/webkit/base",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__webkit__base.md' */'../../../docs/blog/webkit/base.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/webkit/base.md",
          "updatedTime": 1583941963522,
          "slugs": [
            {
              "depth": 1,
              "value": "webkit 之 javaScript 引擎",
              "heading": "webkit-之-javascript-引擎"
            }
          ],
          "title": "webkit 之 javaScript 引擎",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Webkit",
            "path": "/blog/webkit"
          }
        },
        "title": "webkit 之 javaScript 引擎"
      },
      {
        "path": "/blog/webkit/html",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__webkit__html.md' */'../../../docs/blog/webkit/html.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/webkit/html.md",
          "updatedTime": 1583942612622,
          "slugs": [
            {
              "depth": 1,
              "value": "HTML 解释器",
              "heading": "html-解释器"
            },
            {
              "depth": 5,
              "value": "解释过程",
              "heading": "解释过程"
            },
            {
              "depth": 5,
              "value": "词法分析",
              "heading": "词法分析"
            },
            {
              "depth": 5,
              "value": "XSSAuditor 验证词语",
              "heading": "xssauditor-验证词语"
            },
            {
              "depth": 5,
              "value": "词语到节点",
              "heading": "词语到节点"
            },
            {
              "depth": 5,
              "value": "节点到 DOM 树",
              "heading": "节点到-dom-树"
            },
            {
              "depth": 5,
              "value": "JavaScript 的执行",
              "heading": "javascript-的执行"
            },
            {
              "depth": 5,
              "value": "DOM 事件机制",
              "heading": "dom-事件机制"
            },
            {
              "depth": 5,
              "value": "WebKit 的事件处理机制",
              "heading": "webkit-的事件处理机制"
            },
            {
              "depth": 5,
              "value": "影子（Shadow）DOM",
              "heading": "影子（shadow）dom"
            },
            {
              "depth": 5,
              "value": "使用shadowDOM",
              "heading": "使用shadowdom"
            }
          ],
          "title": "HTML 解释器",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Webkit",
            "path": "/blog/webkit"
          }
        },
        "title": "HTML 解释器"
      },
      {
        "path": "/blog/webkit/render",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__webkit__render.md' */'../../../docs/blog/webkit/render.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/webkit/render.md",
          "updatedTime": 1583943095406,
          "slugs": [
            {
              "depth": 1,
              "value": "webKit的网页渲染过程",
              "heading": "webkit的网页渲染过程"
            },
            {
              "depth": 5,
              "value": "根据数据的流向，可以把过程分为三个阶段:",
              "heading": "根据数据的流向，可以把过程分为三个阶段"
            },
            {
              "depth": 3,
              "value": "第一阶段   从网页的URL到构建完DOM树",
              "heading": "第一阶段---从网页的url到构建完dom树"
            },
            {
              "depth": 3,
              "value": "第二阶段 webkit利用cssTree和DOMTree构建renderTree 直到绘图上下文",
              "heading": "第二阶段-webkit利用csstree和domtree构建rendertree-直到绘图上下文"
            },
            {
              "depth": 4,
              "value": "第三个阶段是 从绘图上下文到最终的图像(主要依赖2D和3D图形库)",
              "heading": "第三个阶段是-从绘图上下文到最终的图像主要依赖2d和3d图形库"
            }
          ],
          "title": "webKit的网页渲染过程",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Webkit",
            "path": "/blog/webkit"
          }
        },
        "title": "webKit的网页渲染过程"
      },
      {
        "path": "/blog/webkit/sped",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__webkit__sped.md' */'../../../docs/blog/webkit/sped.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/webkit/sped.md",
          "updatedTime": 1583942247140,
          "slugs": [
            {
              "depth": 1,
              "value": "浏览器之硬件加速机制",
              "heading": "浏览器之硬件加速机制"
            },
            {
              "depth": 5,
              "value": "硬件渲染过程",
              "heading": "硬件渲染过程"
            }
          ],
          "title": "浏览器之硬件加速机制",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Webkit",
            "path": "/blog/webkit"
          }
        },
        "title": "浏览器之硬件加速机制"
      },
      {
        "path": "/blog/webkit/style",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__blog__webkit__style.md' */'../../../docs/blog/webkit/style.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/blog/webkit/style.md",
          "updatedTime": 1583942334528,
          "slugs": [
            {
              "depth": 1,
              "value": "浏览器内核之 CSS 解释器和样式布局",
              "heading": "浏览器内核之-css-解释器和样式布局"
            },
            {
              "depth": 5,
              "value": "理解cssDOM 和选择器",
              "heading": "理解cssdom-和选择器"
            }
          ],
          "title": "浏览器内核之 CSS 解释器和样式布局",
          "nav": {
            "path": "/blog",
            "title": "Blog"
          },
          "group": {
            "title": "Webkit",
            "path": "/blog/webkit"
          }
        },
        "title": "浏览器内核之 CSS 解释器和样式布局"
      },
      {
        "path": "/face",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__face__index.md' */'../../../docs/face/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/face/index.md",
          "updatedTime": 1609566539101,
          "title": "十三先生 | react | webpack | Node.js | webkit | 最新干货分享",
          "hero": {
            "title": "友情链接"
          },
          "footer": "<div class=\"markdown\"><p>本站部署在<a href=\"https://curl.qcloud.com/nlc1vDH0\" target=\"_blank\" rel=\"noopener noreferrer\">腾讯云<svg xmlns=\"http://www.w3.org/2000/svg\" aria-hidden x=\"0px\" y=\"0px\" viewBox=\"0 0 100 100\" width=\"15\" height=\"15\" class=\"__dumi-default-external-link-icon\"><path fill=\"currentColor\" d=\"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z\"></path><polygon fill=\"currentColor\" points=\"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9\"></polygon></svg></a>，新老用户购买服务器有优惠，<a href=\"https://curl.qcloud.com/nlc1vDH0\" target=\"_blank\" rel=\"noopener noreferrer\">访问链接<svg xmlns=\"http://www.w3.org/2000/svg\" aria-hidden x=\"0px\" y=\"0px\" viewBox=\"0 0 100 100\" width=\"15\" height=\"15\" class=\"__dumi-default-external-link-icon\"><path fill=\"currentColor\" d=\"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z\"></path><polygon fill=\"currentColor\" points=\"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9\"></polygon></svg></a></p></div>",
          "slugs": [],
          "nav": {
            "path": "/face",
            "title": "Face"
          }
        },
        "title": "十三先生 | react | webpack | Node.js | webkit | 最新干货分享"
      },
      {
        "path": "/jingpin",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__jingpin__index.md' */'../../../docs/jingpin/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/jingpin/index.md",
          "updatedTime": 1609566535176,
          "title": "十三先生 | react | webpack | Node.js | webkit | 最新干货分享",
          "hero": {
            "title": "精品资源",
            "desc": "<div class=\"markdown\"><p>持续更新中...</p></div>"
          },
          "footer": "<div class=\"markdown\"><p>本站部署在<a href=\"https://curl.qcloud.com/nlc1vDH0\" target=\"_blank\" rel=\"noopener noreferrer\">腾讯云<svg xmlns=\"http://www.w3.org/2000/svg\" aria-hidden x=\"0px\" y=\"0px\" viewBox=\"0 0 100 100\" width=\"15\" height=\"15\" class=\"__dumi-default-external-link-icon\"><path fill=\"currentColor\" d=\"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z\"></path><polygon fill=\"currentColor\" points=\"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9\"></polygon></svg></a>，新老用户购买服务器有优惠，<a href=\"https://curl.qcloud.com/nlc1vDH0\" target=\"_blank\" rel=\"noopener noreferrer\">访问链接<svg xmlns=\"http://www.w3.org/2000/svg\" aria-hidden x=\"0px\" y=\"0px\" viewBox=\"0 0 100 100\" width=\"15\" height=\"15\" class=\"__dumi-default-external-link-icon\"><path fill=\"currentColor\" d=\"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z\"></path><polygon fill=\"currentColor\" points=\"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9\"></polygon></svg></a></p></div>",
          "slugs": [],
          "nav": {
            "path": "/jingpin",
            "title": "Jingpin"
          }
        },
        "title": "十三先生 | react | webpack | Node.js | webkit | 最新干货分享"
      },
      {
        "path": "/resource",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__resource__index.md' */'../../../docs/resource/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/resource/index.md",
          "updatedTime": 1603268967267,
          "title": "十三先生 | react | webpack | Node.js | webkit | 最新干货分享",
          "hero": {
            "title": "博主出品",
            "desc": "<div class=\"markdown\"><p>持续更新中...</p></div>"
          },
          "footer": "<div class=\"markdown\"><p>本站部署在<a href=\"https://curl.qcloud.com/nlc1vDH0\" target=\"_blank\" rel=\"noopener noreferrer\">腾讯云<svg xmlns=\"http://www.w3.org/2000/svg\" aria-hidden x=\"0px\" y=\"0px\" viewBox=\"0 0 100 100\" width=\"15\" height=\"15\" class=\"__dumi-default-external-link-icon\"><path fill=\"currentColor\" d=\"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z\"></path><polygon fill=\"currentColor\" points=\"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9\"></polygon></svg></a>，新老用户购买服务器有优惠，<a href=\"https://curl.qcloud.com/nlc1vDH0\" target=\"_blank\" rel=\"noopener noreferrer\">访问链接<svg xmlns=\"http://www.w3.org/2000/svg\" aria-hidden x=\"0px\" y=\"0px\" viewBox=\"0 0 100 100\" width=\"15\" height=\"15\" class=\"__dumi-default-external-link-icon\"><path fill=\"currentColor\" d=\"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z\"></path><polygon fill=\"currentColor\" points=\"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9\"></polygon></svg></a></p></div>",
          "slugs": [],
          "nav": {
            "path": "/resource",
            "title": "Resource"
          }
        },
        "title": "十三先生 | react | webpack | Node.js | webkit | 最新干货分享"
      },
      {
        "path": "/week",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__week__index.md' */'../../../docs/week/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/week/index.md",
          "updatedTime": 1609248566046,
          "title": "十三先生 | react | webpack | Node.js | webkit | 最新干货分享",
          "hero": {
            "title": "每周导读"
          },
          "footer": "<div class=\"markdown\"><p>本站部署在<a href=\"https://curl.qcloud.com/nlc1vDH0\" target=\"_blank\" rel=\"noopener noreferrer\">腾讯云<svg xmlns=\"http://www.w3.org/2000/svg\" aria-hidden x=\"0px\" y=\"0px\" viewBox=\"0 0 100 100\" width=\"15\" height=\"15\" class=\"__dumi-default-external-link-icon\"><path fill=\"currentColor\" d=\"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z\"></path><polygon fill=\"currentColor\" points=\"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9\"></polygon></svg></a>，新老用户购买服务器有优惠，<a href=\"https://curl.qcloud.com/nlc1vDH0\" target=\"_blank\" rel=\"noopener noreferrer\">访问链接<svg xmlns=\"http://www.w3.org/2000/svg\" aria-hidden x=\"0px\" y=\"0px\" viewBox=\"0 0 100 100\" width=\"15\" height=\"15\" class=\"__dumi-default-external-link-icon\"><path fill=\"currentColor\" d=\"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z\"></path><polygon fill=\"currentColor\" points=\"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9\"></polygon></svg></a></p></div>",
          "slugs": [],
          "nav": {
            "path": "/week",
            "title": "Week"
          }
        },
        "title": "十三先生 | react | webpack | Node.js | webkit | 最新干货分享"
      },
      {
        "path": "/blog/echarts",
        "meta": {},
        "exact": true,
        "redirect": "/blog/echarts/canvas"
      },
      {
        "path": "/blog/nodejs",
        "meta": {},
        "exact": true,
        "redirect": "/blog/nodejs/node-basic"
      },
      {
        "path": "/blog/performance",
        "meta": {},
        "exact": true,
        "redirect": "/blog/performance/css"
      },
      {
        "path": "/blog/project",
        "meta": {},
        "exact": true,
        "redirect": "/blog/project/babel"
      },
      {
        "path": "/blog/react",
        "meta": {},
        "exact": true,
        "redirect": "/blog/react/base"
      },
      {
        "path": "/blog/source",
        "meta": {},
        "exact": true,
        "redirect": "/blog/source/antd"
      },
      {
        "path": "/blog/structure",
        "meta": {},
        "exact": true,
        "redirect": "/blog/structure/arithmetic"
      },
      {
        "path": "/blog/vue",
        "meta": {},
        "exact": true,
        "redirect": "/blog/vue/mvvm"
      },
      {
        "path": "/blog/webkit",
        "meta": {},
        "exact": true,
        "redirect": "/blog/webkit/base"
      }
    ],
    "title": "十三先生"
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
