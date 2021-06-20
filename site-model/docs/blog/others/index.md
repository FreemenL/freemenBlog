# 博客搭建

### 简介
 dumi 是啥，啥是dumi，相信react的忠实粉，都有这么几个痛点：
 
1. 憋了几年的技术和业务积累写了一套贴合自身业务的组件库。吭哧吭哧...终于写完了。队友：看不懂大湿的代码啊。
 <img src="https://user-gold-cdn.xitu.io/2020/3/29/17125dc991807d78?w=303&h=324&f=jpeg&s=14943"/>

emmm.....好吧。这个函数是.......这个class是......这个组件要......用。

好吧看来是时候整个文档了。

搜索引擎啊，请你告诉我是一名优秀的程序员吗？

搜索引擎：嗯，算.....是吧。

我刚造了个火箭，他需要一本书起飞的说明书，帮我找个文档工具吧，要react的。

搜索引擎：抱歉，你想要的，我给不了你。

你怎么能这样？

2. 做技术好多年了，走的时候是不是该留下点什么？嗯 ，那就博客吧。来,用我最擅长的react自己的造一个. 

<img src="https://user-gold-cdn.xitu.io/2020/3/29/17125ec18523a04b?w=294&h=171&f=jpeg&s=8112"/>

不知不觉，几年过去了.....一入前端深似海啊......

<img src="https://user-gold-cdn.xitu.io/2020/3/29/17125ef525abcdca?w=215&h=234&f=jpeg&s=6905"/> 

我：&nbsp;&nbsp;&nbsp;&nbsp;他来了,他来了，他身披金甲圣衣，脚踏七彩云来娶我来了。

搜索引擎: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 他？姓甚名谁？

我：&nbsp;&nbsp;&nbsp;&nbsp;他就是dumi(嘟米)啊

搜索引擎: &nbsp;&nbsp;&nbsp;&nbsp; 嗯？一款基于 Umi 打造、为组件开发场景而生的文档工具，与 father 一起为开发者提供一站式的组件开发体验，father 负责构建，而 dumi 负责组件开发及组件文档生成 。小伙子不错，大有前途啊。我记下了。

（好了，接下来言归正传）

### 实践

我们先用它来写个博客,把之前的文章整理整理吧
首先得有 node，并确保 node 版本是 10.13 或以上。

1. 初始化一个站点模式的组件库开发脚手架
```bash
npx @umijs/create-dumi-lib --site
```

2. 安装依赖

```bash
cnpm i
```

3. 启动项目

```bash
npm start
```

![](https://user-gold-cdn.xitu.io/2020/3/29/1712619591964373?w=2876&h=1580&f=png&s=354285)

哇哇哇！！！ 惊艳到了.... 果然是美美的。
#### 项目结构简介

![](https://user-gold-cdn.xitu.io/2020/3/29/1712620a3e52cefd?w=588&h=1086&f=png&s=405896)

既然是写博客，做内容输出，我们先来改吧改吧。

首先改下主页的内容：

1. 打开 ```docs/index.md```修改如下

```md
---
hero:
  title: XXX的博客
  desc: XXX的简介
  actions:
    - text: 开始启动
      link: /blog
features:
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png
    title: Feature 1
    desc: 高内聚
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png
    title: Feature 2
    desc: 低耦合
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png
    title: Feature 3
    desc: 可伸缩
footer: Open-source MIT Licensed | Copyright © 2020<br />Powered by [dumi](https://d.umijs.org)
---
```
2. 修改```.umirc.ts```如下

```bash
import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'xxx的博客',
  mode: 'site',
  // more config: https://d.umijs.org/config
});

```
 保存看效果：
 
![](https://user-gold-cdn.xitu.io/2020/3/29/171262bceaf7aa13?w=2878&h=1584&f=png&s=344177)
首页有了，我们得有内容吧？ ok ，某问题。

1. 添加菜单路由```.umirc.ts```

```ts
import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'xxx的博客',
  mode: 'site',
  menus: {
    '/blog': [
      {
        title: '简介',
      },{
        title: '辟邪剑谱',
        children: ['blog/sword/test'],
      },{
        title: '降龙十八掌',
        children: ['blog/eighteen/test'],
      }
    ],
  }
});

```

2. 新建文件

```blog/sword/test.md```

```md
# 辟邪剑谱

欲练此功，必先.....先........
```
<br/>

```blog/eighteen/test.md```
<br/>

```md
# 降龙十八掌

### 亢龙有悔

说着左腿微屈，右臂内弯，右掌划了个圆圈，呼的一声，向外推去，手掌扫到面前一棵松树，喀喇一响，松 树应手断折。
他左手划个半圆，右手一掌推出，正是生平得意之作“降龙十八掌”中的「亢龙有悔」。
大丑不及逃避，明知这一招不能硬接，却也只得双掌一并，奋力抵挡。

### 飞龙在天

洪七公把“降龙十八掌”中的第二招「飞龙在天」教了郭靖。
这一招跃起半空，居高下击，威力奇大，郭靖花了三天工夫，方才学会。

### 见龙在田

郭靖见他越逼越近，早有提防，当他右手离黄蓉身前尺许之际，左掌圆劲，右掌直势，使招「见龙在田」，挡在黄蓉身前。
这一招纯是防御，却是在黄蓉与渔人之间布了一道坚壁，敌来则挡，敌不至则消于无形。

### 潜龙勿用

郭靖暗叫：“不好！”全身已感酸麻，危急中右手屈起食中两指，半拳半掌，向她胸口打去，那是「潜龙勿用」的半招，本来左手同时向里钩拿，右推左钩，敌人极难闪避，现下左腕被拿，只得使了半招。

### 震惊百里

欧阳锋叫声：“好！”第二推又已迅速异常的赶到，前劲未衰，后劲继至。
郭靖猛觉得劲风罩上身来，心知不妙，一招「震惊百里」，也是双掌向前平推，这是降龙十八掌中威力极大的一招。

### 或跃在渊

这第二掌「或跃在渊」，却再也不敢留力，吸一口气，呼的一响，左掌前探，右掌倏地从左掌底下穿了出去，直击他小腹。

### 突如其来

郭靖听得她呼叫，精神忽振，左掌拍出，那是降龙十八掌中的第十一掌「突如其来」。

### 双龙取水

郭靖刚从小艇艇首爬上甲板，眼见势急，已自不及抢上相救，双掌齐发，一招「双龙取水」，猛击欧阳锋后腰

### 神龙摆尾

黎生听得背后风响，衣上也已微有所感，就在这一瞬之间，反手横劈，仍是刚才使过的“降龙十八掌”中那一招「神龙摆尾」。

### 利涉大川、鸿渐于陆

郭靖连发两招「利涉大川」、「鸿渐于陆」，将梅超风远远逼开，抬头只见黄蓉绕着柱子而奔，连打手势，一时还不明白。

### 密云不雨

郭靖使一招「密云不雨」，双掌交替连拍，击向裘千仞头顶，左臂格开篙头，身子续向敌船落去。

```

ok 保存最后我们来看效果。

![](https://user-gold-cdn.xitu.io/2020/3/29/17126494e592bbf4?w=2878&h=1582&f=png&s=1493315)

怎么样是不是应有尽有....<br/>
ok，博客写好了，我们得找台服务器部署上去吧，正好[腾讯云](https://www.aliyun.com/minisite/goods?userCode=7duih2sz&share_source=copy_link)最近也在做大额的优惠活动，有需要的话可以选择性购买。好了，话说回来根据dumi的官方文档介绍，它是负责组件开发及组件文档生成的一个工具，做博客是大才小用了。那么小伙伴们就要问了？博客写好了，那我们看下组件试试吧？ok。

#### 组件

首先我们需要在```.umirc.ts```文件中添加一个新的components导航代码如下
 ```
import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'xxx的博客',
  mode: 'site',
  menus: {
    '/blog': [
      {
        title: '简介',
      },
      {
        title: '辟邪剑谱',
        children: ['blog/sword/test'],
      },
      {
        title: '降龙十八掌',
        children: ['blog/eighteen/test'],
      },
    ],
    '/components': [
      {
        title: '简介',
      },
    ]
  },
});

 ```
ok 新增两步走，此时我们需要新建```docs/components/index.md```内容如下：
 ```md
    # antd 组件

    ```jsx | inline
    
    import React from 'react';
    import { Button } from 'antd';
    
    export default () => {
      return (
      <>
        <Button type="primary" >点我吧</Button>
      </>
    )}
    
    ```

 ```
ok, 保存文件后在浏览器查看效果如下

![](https://user-gold-cdn.xitu.io/2020/4/1/17133bf73be19a21?w=2878&h=808&f=png&s=244028)
<hr/>

![](https://user-gold-cdn.xitu.io/2020/4/1/17133cae2bb55b53?w=294&h=360&f=png&s=106322)
Button该有的样式呢？是不是有点摸不着头脑。ok，别着急。你还记得antd组件按组件加载的babel插件嘛？没错 babel-plugin-import 就是他，但是此处我们不需要额外下载他，只需要在```.umirc.ts```中增加如下extraBabelPlugins配置即可
 ```
  ...
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
...
 ```
 保存之后我们在次刷新页面即可看到我们想要的结果了

![](https://user-gold-cdn.xitu.io/2020/4/1/17133d6318eb1d62?w=2878&h=770&f=png&s=206001)


感谢dumi团队的开源。
（如有任何使用上的问题欢迎留言区评论，我们一起探讨）<br/>

### 最后附上

[我的个人博客](http://fe.shisan.cf/)<br/>
[本文代码](https://github.com/FreemenL/dumi_test)<br/>
[dumi(嘟米)官方文档](https://d.umijs.org/guide)<br/>
[腾讯云购买链接](https://www.aliyun.com/minisite/goods?userCode=7duih2sz&share_source=copy_link)
