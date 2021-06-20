# 使用 ECharts GL 实现基础的三维可视化

ECharts GL （后面统一简称 GL）为 ECharts 补充了丰富的三维可视化组件，这篇文章我们会简单介绍如何基于 GL 实现一些常见的三维可视化作品。实际上如果你对 ECharts 有一定了解的话，也可以很快的上手 GL，GL 的配置项完全是按照 ECharts 的标准和上手难度来设计的。

在看完文章之后，你可以前往 [官方示例](https://www.echartsjs.com/examples/zh/index.html#chart-type-globe) 和 [Gallery](https://gallery.echartsjs.com/explore.html#tags=echarts-gl~sort=rank~timeframe=all~author=all) 去了解更多使用 GL 制作的示例，对于文章中我们没法解释到的代码，也可以前往 [GL 配置项手册](https://www.echartsjs.com/zh/option-gl.html#globe) 查看具体的配置项使用方法。

### 如何下载和引入 ECharts GL

为了不再增加已经很大了的 ECharts 完整版的体积，我们将 GL 作为扩展包的形式提供，和诸如水球图这样的扩展类似，如果要使用 GL 里的各种组件，只需要在引入```echarts.min.js```的基础上再引入一个```echarts-gl.min.js```。你可以从 [官网](https://www.echartsjs.com/zh/download.html) 下载最新版的 GL，然后在页面中通过标签引入：

```html
<script src="lib/echarts.min.js"></script>
<script src="lib/echarts-gl.min.js"></script>
```
如果你的项目使用 webpack 或者 rollup 来打包代码的话，也可以通过 npm 安装后引入

```bash
npm install echarts
npm install echarts-gl
```

```js
// 通过 ES6 的 import 语法引入 ECharts 和 ECharts GL
import echarts from 'echarts';
import 'echarts-gl';
```

### 声明一个基础的三维笛卡尔坐标系

引入 ECharts 和 ECharts GL 后，我们先来声明一个基础的三维笛卡尔坐标系用于绘制三维的散点图，柱状图，曲面图等常见的统计图.

在 ECharts 中我们有 [grid](https://www.echartsjs.com/zh/option.html#grid) 组件用于提供一个矩形的区域放置一个二维的笛卡尔坐标系，以及笛卡尔坐标系上上的 x 轴（[xAxis](https://www.echartsjs.com/zh/option.html#xAxis)）和 y 轴（[yAxis](https://www.echartsjs.com/zh/option.html#yAxis)）。对于三维的笛卡尔坐标系，我们在 GL 中提供了 [grid3D](https://www.echartsjs.com/zh/option-gl.html#grid3D) 组件用于划分一块三维的笛卡尔空间，以及放置在这个 [grid3D](https://www.echartsjs.com/zh/option-gl.html#grid3D) 上的 [xAxis3D](https://www.echartsjs.com/zh/option-gl.html#xAxis3D), [yAxis3D](https://www.echartsjs.com/zh/option-gl.html#yAxis3D), [zAxis3D](https://www.echartsjs.com/zh/option-gl.html#zAxis3D)。

> 小提示：在 GL 中我们对除了 globe 之外所有的三维组件和系列都加了 3D 的后缀用以区分，例如三维的散点图就是 scatter3D，三维的地图就是 map3D 等等。

下面这段代码就声明了一个最简单的三维笛卡尔坐标系.

```js
var option = {
    // 需要注意的是我们不能跟 grid 一样省略 grid3D
    grid3D: {},
    // 默认情况下, x, y, z 分别是从 0 到 1 的数值轴
    xAxis3D: {},
    yAxis3D: {},
    zAxis3D: {}
}
```
效果如下

<img src="https://static.bookstack.cn/projects/ECharts3Tutorial/57d49ea448bfd3fd870495c1075ba63c.png"/>

跟二维的笛卡尔坐标系一样，每个轴都会有多种类型，默认是数值轴，如果需要是类目轴的话，简单的设置为 type: 'category'就行了。

### 绘制三维的散点图

声明好笛卡尔坐标系后，我们先试试用一份程序生成的正态分布数据在这个三维的笛卡尔坐标系中画散点图。

下面这段是生成正态分布数据的代码，你可以先不用关心这段代码是怎么工作的，只需要知道它生成了一份三维的正态分布数据放在data数组中。

```js
function makeGaussian(amplitude, x0, y0, sigmaX, sigmaY) {
    return function (amplitude, x0, y0, sigmaX, sigmaY, x, y) {
        var exponent = -(
                ( Math.pow(x - x0, 2) / (2 * Math.pow(sigmaX, 2)))
                + ( Math.pow(y - y0, 2) / (2 * Math.pow(sigmaY, 2)))
            );
        return amplitude * Math.pow(Math.E, exponent);
    }.bind(null, amplitude, x0, y0, sigmaX, sigmaY);
}
// 创建一个高斯分布函数
var gaussian = makeGaussian(50, 0, 0, 20, 20);
var data = [];
for (var i = 0; i < 1000; i++) {
    // x, y 随机分布
    var x = Math.random() * 100 - 50;
    var y = Math.random() * 100 - 50;
    var z = gaussian(x, y);
    data.push([x, y, z]);
}
```

生成的正态分布的数据大概长这样:

```js
[
  [46.74395071259907, -33.88391024738553, 0.7754030099768191],
  [-18.45302873809771, 16.88114775416834, 22.87772504105404],
  [2.9908128281121336, -0.027699444453467947, 49.44400635911886],
  ...
]
```

每一项都包含了x, y, z三个值，这三个值会分别被映射到笛卡尔坐标系的 x 轴，y 轴和 z 轴上。

然后我们可以使用 GL 提供的 [scatter3D](https://www.echartsjs.com/zh/option-gl.html#series-scatter3D) 系列类型把这些数据画成三维空间中正态分布的点。

```js
option = {
    grid3D: {},
    xAxis3D: {},
    yAxis3D: {},
    zAxis3D: { max: 100 },
    series: [{
        type: 'scatter3D',
        data: data
    }]
}
```

<img src="https://static.bookstack.cn/projects/ECharts3Tutorial/0e1d99108ed639b7a809f425379e6b35.png">

### 使用真实数据的三维散点图

接下来我们来看一个使用真实多维数据的三维散点图例子。

可以先从 http://www.echartsjs.com/examples/data/asset/data/life-expectancy-table.json 获取这份数据。

格式化一下可以看到这份数据是很传统转成 JSON 后的表格格式。第一行是每一列数据的属性名，可以从这个属性名看出来每一列数据的含义，分别是人均收入，人均寿命，人口数量，国家和年份。

```js
[
["Income", "Life Expectancy", "Population", "Country", "Year"],
[815, 34.05, 351014, "Australia", 1800],
[1314, 39, 645526, "Canada", 1800],
[985, 32, 321675013, "China", 1800],
[864, 32.2, 345043, "Cuba", 1800],
[1244, 36.5731262, 977662, "Finland", 1800],
...
]
```

在 ECharts 4 中我们可以使用 dataset 组件非常方便地引入这份数据。如果对 dataset 还不熟悉的话可以看[dataset使用教程](https://www.echartsjs.com/zh/tutorial.html#%E4%BD%BF%E7%94%A8%20dataset%20%E7%AE%A1%E7%90%86%E6%95%B0%E6%8D%AE)


```js
$.get('data/asset/data/life-expectancy-table.json', function (data) {
    myChart.setOption({
        grid3D: {},
        xAxis3D: {},
        yAxis3D: {},
        zAxis3D: {},
        dataset: {
            source: data
        },
        series: [
            {
                type: 'scatter3D',
                symbolSize: 2.5
            }
        ]
    })
});
```

<img src="https://static.bookstack.cn/projects/ECharts3Tutorial/f45e5652b509ffa9b9d5a0943b5eabb1.png"/>


默认会把前三列，也就是收入（Income），人均寿命（Life Expectancy），人口（Population）分别放到 x、 y、 z 轴上。

使用 encode 属性我们还可以将指定列的数据映射到指定的坐标轴上，从而省去很多繁琐的数据转换代码。例如我们将 x 轴换成是国家（Country），y 轴换成年份（Year），z 轴换成收入（Income），可以看到不同国家不同年份的人均收入分布。

```js
myChart.setOption({
    grid3D: {},
    xAxis3D: {
        // 因为 x 轴和 y 轴都是类目数据，所以需要设置 type: 'category' 保证正确显示数据。
        type: 'category'
    },
    yAxis3D: {
        type: 'category'
    },
    zAxis3D: {},
    dataset: {
        source: data
    },
    series: [
        {
            type: 'scatter3D',
            symbolSize: 2.5,
            encode: {
                // 维度的名字默认就是表头的属性名
                x: 'Country',
                y: 'Year',
                z: 'Income',
                tooltip: [0, 1, 2, 3, 4]
            }
        }
    ]
});
```
### 利用 visualMap 组件对三维散点图进行视觉编码

刚才多维数据的例子中，我们还有几个维度（列）没能表达出来，利用 ECharts 内置的 [visualMap](https://www.echartsjs.com/zh/option.html#visualMap) 组件我们可以继续将第四个维度编码成颜色。

```js
myChart.setOption({
    grid3D: {
        viewControl: {
            // 使用正交投影。
            projection: 'orthographic'
        }
    },
    xAxis3D: {
        // 因为 x 轴和 y 轴都是类目数据，所以需要设置 type: 'category' 保证正确显示数据。
        type: 'category'
    },
    yAxis3D: {
        type: 'log'
    },
    zAxis3D: {},
    visualMap: {
        calculable: true,
        max: 100,
        // 维度的名字默认就是表头的属性名
        dimension: 'Life Expectancy',
        inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
        }
    },
    dataset: {
        source: data
    },
    series: [
        {
            type: 'scatter3D',
            symbolSize: 5,
            encode: {
                // 维度的名字默认就是表头的属性名
                x: 'Country',
                y: 'Population',
                z: 'Income',
                tooltip: [0, 1, 2, 3, 4]
            }
        }
    ]
})
```

这段代码中我们又在刚才的例子基础上加入了 [visualMap](https://www.echartsjs.com/zh/option.html#visualMap) 组件，将Life Expectancy这一列数据映射到了不同的颜色。

除此之外我们还把原来默认的透视投影改成了正交投影。正交投影在某些场景中可以避免因为近大远小所造成的表达错误。

<img src="https://static.bookstack.cn/projects/ECharts3Tutorial/b656dbced0535b6f4024482727f4e0e6.png"/>

当然，除了 visualMap 组件，还可以利用其它的 ECharts 内置组件并且充分利用这些组件的交互效果，比如 legend。也可以像 [三维散点图和散点矩阵结合使用](https://www.echartsjs.com/examples/zh/editor.html?c=scatter3d-scatter&gl=1) 这个例子一样实现二维和三维的系列混搭。

在实现 GL 的时候我们尽可能地把 WebGL 和 Canvas 之间的差异屏蔽了到最小，从而让 GL 的使用可以更加方便自然。
