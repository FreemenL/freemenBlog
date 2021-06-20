# webKit的网页渲染过程

浏览器的主要作用是将用户输入的“URL”转变为可视化图像 ，其中包含两个过程：

* 其一是网页加载过程，就是```从 URL到构建DOM树```
* 其二就是网页渲染过程，```从DOM生成可视化图像```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190515175753210.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NjUzNDQ5,size_16,color_FFFFFF,t_70)

其实这两个过程也会交叉，我们可以统称为```网页的渲染过程```

  网页渲染有一个特性，通常视图比屏幕可视化面积大。所以在渲染时一般```加入滚动条```，就用户体验来说，垂直方向的滚动条效果好过水平页面的滚动条效果

这个过程中的数据和模块包括：

###### 数据：

* 网页内容
* DOM
* 内部表示和图像

###### 模块则包括

* HTML 解释器
* css 解释器
* javascript引擎
* 布局和绘图模块

##### 根据数据的流向，可以把过程分为三个阶段:

  *  第一个阶段就是从网页的URL到构建完DOM树
   *  第二个阶段是从DOM树到构建完WebKit的绘图上下文
   * 第三个阶段是从绘图上下文生成最终的图像
  ### 第一阶段   ```从网页的URL到构建完DOM树```
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190515210847611.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NjUzNDQ5,size_16,color_FFFFFF,t_70)

具体过程如下：

   1. 当用户输入网页URL时，```WebKit调用资源加载器加载该URL对应的网页```
   2. 加载器```依赖网络建立连接```，发送请求并接受答复。
   3. WebKit```接受到各种网页或者资源的链接```，其中某些资源通过同步或者异步获取
   4. 网页被交给 ```HTML解释器解释为一系列词语```
   5.  解释器```根据词语构建节点（NODE），形成DOM树```。
  6. 如果节点是```JavaScript代码就调用JavaScript引擎解释并执行```
  7. ```JavaScript代码可能会修改DOM树的结构```
  8. 如果节点需要依赖其他资源，例如````图片，css ，视频等，调用资源加载器来加载他们但这个过程异步的````，不会阻碍当前dom树的构建，如果是javascript 资源url（没有标记异步，通过async和defer）则需要停止当前DOM树的创建 。直到js资源加载并执行完毕之后才会继续DOM树的创建
  
   上述过程中，网页会发出```“DOMConent”```和```DOM onload```事件，分别在```DOM树构建完之后```，以及```DOM树建完并且网页所以来的资源都加载完```之后发生，因为某些资源的加载并不会阻碍DOM树的创建，所以这两个事件多数时候不是同时发生的
   
   DOMConentLoad:    ```DOM树构建完之后```
   onload :  ```DOM树建完并且网页所以来的资源都加载完```

### 第二阶段 ```webkit利用cssTree和DOMTree构建renderTree 直到绘图上下文```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190516133036807.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NjUzNDQ5,size_16,color_FFFFFF,t_70)

这一阶段的具体过程如下：
1. CSS文件被CSS解释器解释成内部表示结构。
2. CSS解释器工作完之后，在DOM树上附加解释后的样式信息，这就是RenderObject树
3. RenderObject节点在创建的同时,WebKit会根据网页的层次信息创建RenderLayer树,同时构建一个虚拟的绘图上下文

RenderObject树的简历并不表示DOM树会被销毁,事实上,```上图中的四个内部结构一直存在,直到网页被销毁```,因为它们对于网页的渲染起了非常大的作用
#### 第三个阶段是 ```从绘图上下文到最终的图像(主要依赖2D和3D图形库)```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190516134204696.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NjUzNDQ5,size_16,color_FFFFFF,t_70)
1. 绘图上下文是一个与平台无关的抽象类,他将绘图操作侨接到不同的具体实现类。
2. 需要Chromium的合成器来完成多进程和GPU加速机制
3. 绘图实现类将2D图像库或者3D图像库绘制的结果保存下来,交给浏览器来同浏览器界面一起显示

>上面介绍的是一个完整的渲染过程.现代网页很多是动态网页,这意味着在渲染完成之后,由于网页的动画或者用户的交互,浏览器其实一直在不同地重复执行渲染过程
