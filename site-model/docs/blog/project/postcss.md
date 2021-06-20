# postcss 插件 开发

> PostCSS 是一个使用JavaScript转换CSS的工具

总之来说是一个非常不错的工具 ，弊端的话暂时没有发现 。总的来说他可以极大的提高我们的开发效率 ，加入用过他的话 你可能对以下这些插件比较熟悉
* rucksack-css
* postcss-import
* cssnano
* atcss
* postcss-url
* precss
...等等 

但插件究竟干了啥，值得我们研究以下，其实感觉和babel 的插件机制类似但又不一样，写起来相对更加简单
以```rucksack-css```这个插件为例 ，他有一个功能就是让你定义一些自己的属性别名

```css
@alias{
    bd: border;
    bg: background;
    bg-i: background-image;
    bg-c: background-color;
    bg-p: background-position;
    bg-s: background-size;
    bg-o: background-origin;
    l-h: line-height;
    t-a: text-align;
}
```

类似这样 让你写更少的代码他去帮你编译 ，那它是如何实现这中黑魔法的，我们来一探究竟
我们把```ta:center```转换成	```text-aligin:center```

```js
const postcss = require('postcss');
const less = require("less");

// 要转换的语法
const parseProps = {
    ta:'text-align'
}

// 策略模式转换语法
const parseRules = (rule,props)=> {
    if(parseProps[props]){
        rule['nodes'][0]['prop'] = parseProps[props];
    }
}

//定义插件
const postcssPlugin = postcss.plugin("postcssPlugin", (opts) => {
    // 在这里配置你的选项
    opts = opts || {};
    return root => {
        // root.walkRules 遍历容器的后代节点，为每个规则节点调用回调，如果传递过滤器，迭代将仅发生在具有匹配选择器的规则上。
        root.walkRules((rule)=>{
            parseRules(rule,rule['nodes'][0]['prop'])
        }); 
    };
});

postcss([postcssPlugin])
.process(`a{
    ta : center;
    }`, {
    parser: less.parser,
    from: './style.less',
}).then((css)=>{
    // 转换后的内容
    console.log(css);
})
```

整个代码就这些  当然你的插件也可以依赖别人的插件

[参考文献](https://github.com/postcss/postcss/blob/master/docs/writing-a-plugin.md)
