# 浏览器内核之 CSS 解释器和样式布局

从整个网页的加载和渲染过程来看，```CSS 解释器和规则匹配处于 DOM 树建立之后，RenderObject 树建立之前，CSS 解释器解释后的结果会保存起来```，然后```RenderObject 树基于该结果来进行规范匹配和布局计算```。当网页有用户交互或者动画等动作的时候，通过 CSSDOM 等技术，JavaScript 代码同样可以非常方便地修改 CSS 代码，WebKit 此时需要重新解释样式并重复以上这一过程。


在css 出现之前或者更早，HTML 网页设计者们因为要设计不同风格样式的元素，所以规范不停的加入更多心的元素来表示网页布局，例如p span等元素。所以规范不停的加入更多新的元素来表示网页布局，这可能存在一些问题```其一，表格经常内嵌表格，导致网页内容较大，占用带宽；其二被搜索引擎解析后，网页的内容将会变得杂乱无章 。```

###### 包含块模型

当 WebKit 计算元素的盒子的位置和大小时，WebKit 需要计算该元素和另外一个矩形区域的相对位置，这个矩形区域称为该元素的包含块。上面介绍的框模型就是在包含块内计算和确定各个元素的，包含块的具体定义如下

* 根元素的包含块称为初始包含块，通常它的大小就是可视区域（Viewport）的大小。
* 对于其他位置属性设置为 “static” 或者 “relative” 的元素，它的包含块就是最近祖先的箱子模型中的内容区域（Content）。
* 如果元素的位置属性为 “fixed” ，那么该元素的包含快脱离 HTML 文档，因定在可视区域的某个特定位置。
* 如果元素的位置属性为 “absolute” ,那么该元素的包含块由最近的含有属性 “absolute”、“relative”、或者 “fixed” 的祖先决定，具体规则如下：如果一个元素具有 “inline” 属性，那么元素的包含块是该祖先的第一个和最近一个 inline 框的内边距的区域；否则，包含块则是该祖先的内边距所包围的区域。


###### CSSOM（CSS Object Model）
CSSOM 称为 CSS 对象模型。它思想是在 DOM 中的一些节点接口中，加入获取和操作 CSS 属性或者接口的 JavaScript 接口，因而 JavaScript 可以动态操作 CSS 样式。DOM 提供了接口让 JavaScript 修改 HTML 文档，同理，CSSOM 提供了接口让 JavaScript 获得和修改 CSS 代码设置的样式信息。

对于内部和外部样式表，CSSOM 定义了样式表的接口，称为 “CSSStyleSheet”, 这是一个可以在 JavaScript 代码中访问的接口。借助这个接口，开发者可以在 JavaScript 中获取样式表的各种信息，例如 CSS 的 “href”、样式表类型 “type”、规则信息 “cssRules” 等，甚至可以获取样式表中的 CSS 规则列表。这个接口同 DOM 中的 “Script” 节点或者 “Link” 节点不一样，它是 CSSOM 定义的新接口。开发者可以通过 ```document.styleSheets 查看当前网页中包含的所有 CSS 样式表```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190606152647371.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NjUzNDQ5,size_16,color_FFFFFF,t_70)
可以看到通过link标签加载的```外部样式和style 标签创建的内部样式在属性值上的区别```

W3C 还定义了另外一个规范是 CSSDOM View，它的基本含义是增加一些新的属性到 Window、Document、Element、HTMLElement 和 MouseEvent 等接口，这些 CSS 的属性能够让 JavaScript 获取视图信息，用于表示跟视图相关的特征，例如窗口大小，网页滚动位移，元素的框位置、鼠标事件的坐标等信息。下面是以 CSSDOM View 对 Window 的扩展

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190606152848609.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NjUzNDQ5,size_16,color_FFFFFF,t_70)

##### 理解cssDOM 和选择器 

在控制台中输入document.styleSheets查看所有样式表。然后输入	
```js
 document.styleSheets[0].disabled = true
 ```
 可以看到第一张样式表中的内容全部失效了。
 
 ######  CSS解释器和规则匹配
 
在了解了css 的基本概念之后，下面来理解webkit 如何来解释css 代码并选择相应的规则

```CSS 解释过程是指从 CSS 字符串经过 CSS 解释器处理后变成渲染引擎内部规则的表示过程。```

###### JavaScript 设置样式

大致的过程是，```JavaScript 引擎调用设置属性值的公共处理函数，然后该函数调用属性值解析函数```，在这个例子中则是 CSS 的 JavaScript 绑定函数。而后```WebKit 将解释后的信息设置到元素的 “style” 属性的样式 “webkitTransform” 中，然后设置标记表明该元素需要重新计算样式，并触发重新计算布局。最后是 WebKit 的重新绘图```

总结

* 匹配算法结合 CSS 规则来设置样式
* 选择器就是选中某个元素的
* 框模型就是常说的盒子模型，包含 margin、border、padding、content
* CSSOM 称为 CSS 对象模型，JavaScript 可以获取和操作 CSS 属性。
* CSS 解释过程是指从 CSS 字符串经过 CSS 解释器处理后变成渲染引擎内部规则的表示过程。
* 当 WebKit 创建 RenderObject 对象之后，每个对象是不知道自己的位置、大小等信息的，WebKit 根据框模型（Frame 类的 FrameView）来计算它们的位置，大小等信息的过程称为布局计算
* 布局计算是一个递归的过程，而且还会发生重新布局。
