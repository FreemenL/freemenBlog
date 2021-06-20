# 定位解决web开发中的性能问题

运行时性能是页面在运行时执行的方式，而不是加载。本教程将教您如何使用Chrome DevTools Performance面板分析运行时性能。就RAIL模型而言，您在本教程中学到的技能对于分析页面的响应，动画和空闲阶段非常有用

###### 在本教程中，您将在实时页面上打开DevTools，并使用“performance”面板查找页面上的性能瓶颈

1. 以隐身模式打开Goog​​le Chrome 。隐身模式可确保Chrome以干净的状态运行。例如，如果安装了大量扩展，那么这些扩展可能会在性能测量中产生影响
2. 在“隐身”窗口中加载以下页面。这是您要分析的演示。该页面显示了一堆上下移动的小蓝方块   https://googlechrome.github.io/devtools-samples/jank/
3. 按Command+ Option+ I（Mac）或 Control+ Shift+ I（Windows，Linux）打开DevTools

![在这里插入图片描述](https://img-blog.csdnimg.cn/2019060200454782.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NjUzNDQ5,size_16,color_FFFFFF,t_70)

##### 找到瓶颈 

打开chrome Performance 面板，单击“ 录制” 记录。DevTools在页面运行时捕获性能指标，等几秒钟 然后点击停止
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190602005351952.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NjUzNDQ5,size_16,color_FFFFFF,t_70)

###### 分析结果

* 分析每秒帧数
>测量任何动画性能的主要指标是每秒帧数（FPS）。当动画以60 FPS运行时，用户会很高兴
1. 看看FPS图表。每当你看到FPS上方的红色条形时 ，就意味着帧速率下降得太低，可能会损害用户体验。通常，绿色条越高，FPS越高。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190602005530645.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NjUzNDQ5,size_16,color_FFFFFF,t_70)
2. 在FPS图表下方，您可以看到CPU图表。中相应的颜色 CPU图表对应于颜色摘要选项卡，在性能板的底部。CPU图表充满颜色的事实意味着CPU在录制期间被最大化。每当你看到CPU长时间达到最大值时，就会找到减少工作量的方法。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190602005641712.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NjUzNDQ5,size_16,color_FFFFFF,t_70)
3. 将鼠标悬停在FPS，CPU或NET图表上。DevTools显示该页面的截图。左右移动鼠标以重放录制内容。这称为擦洗，它可用于手动分析动画的进展
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190602005752281.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NjUzNDQ5,size_16,color_FFFFFF,t_70)
4.在“ frames”部分中，将鼠标悬停在其中一个绿色方块上。DevTools向您显示该特定帧的FPS。每帧可能远低于60 FPS的目标。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190602005828290.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NjUzNDQ5,size_16,color_FFFFFF,t_70)

###### 定位解决性能问题

1请注意summary选项卡。如果未选择任何事件，此选项卡会显示活动明细。该页面大部分时间都在渲染。由于性能是减少工作量的艺术，因此您的目标是减少渲染工作所花费的时间。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190602010045710.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NjUzNDQ5,size_16,color_FFFFFF,t_70)
2.展开主要部分。随着时间的推移，DevTools会向您显示主线程上的活动火焰图。x轴表示随时间的记录。每个酒吧代表一个活动。更宽的条形意味着事件需要更长时间。y轴表示调用堆栈。当您看到事件堆叠在彼此之上时，意味着上层事件导致较低事件

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190602010138128.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NjUzNDQ5,size_16,color_FFFFFF,t_70)
3.录制中有很多数据。通过在Overview（包括 FPS，CPU和NET图表）上单击，按住并拖动鼠标，放大单个Animation Frame Fired事件。“ main”部分和“ summary” 选项卡仅显示录制的选定部分的信息。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190602010241172.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NjUzNDQ5,size_16,color_FFFFFF,t_70)
4.请注意Animation Frame Fired 事件右上角的红色三角形。每当您看到红色三角形时，都会警告可能存在与此事件相关的问题
5.单击动画帧触发事件。“ summary”选项卡现在显示有关该事件的信息。注意reveal链接。单击它会导致DevTools突出显示启动 动画帧触发事件的事件。另请注意app.js：94链接。单击它会跳转到源代码中的相关行
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190602010505146.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NjUzNDQ5,size_16,color_FFFFFF,t_70)
6.在app.update事件下，有一堆紫色事件。如果它们更宽，看起来每个人都可能有一个红色三角形。现在单击其中一个紫色布局事件。DevTools在“ summary”选项卡中提供有关该事件的更多信息。实际上，有关于强制回流的警告（布局的另一个词）。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190602010649781.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NjUzNDQ5,size_16,color_FFFFFF,t_70)
7. 在“ summary”选项卡中，单击“ 布局强制”下的app.js：70链接。DevTools将您带到强制布局的代码行

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190602010734787.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NjUzNDQ5,size_16,color_FFFFFF,t_70)
