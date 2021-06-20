# Chrome DevTools 代码覆盖率功能详解

Chrome DevTools  中有一个功能查看我们的代码的覆盖率

## 打开姿势

1打开调试面板 用快捷键 shift+command+P （mac）输入 ```show Coverage ```调出相应面板

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190706143354489.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NjUzNDQ5,size_16,color_FFFFFF,t_70)
2 .点击relaod 按钮开始检测![在这里插入图片描述](https://img-blog.csdnimg.cn/20190706143521772.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NjUzNDQ5,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190706143641644.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NjUzNDQ5,size_16,color_FFFFFF,t_70)

3 点击相应文件即可查看具体的覆盖情况（绿色的为用到的代码，红色表示无用代码）

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190706143946648.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NjUzNDQ5,size_16,color_FFFFFF,t_70)
查看了当下各大网站的覆盖率普遍存在无用代码的问题 二而且网上给出的所谓treeshaking codesplit 和css样式提纯的插件 对单页应用普遍束手无策   目前我个人的思路是用puppeteer 抓取只用到的有用代码 写webpack plugin 调整编译产出  然后在应用中监听hashchange事件 把有用的样式插进去 但是这个过程有一点不好就是 破换了单一职责原则  看到文章的大佬  如果有成熟的解决方案 还望不吝赐教
