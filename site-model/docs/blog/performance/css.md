# 在CSS动画中启用硬件加速

近些年，我们总是听到硬件加速，以及它如何帮助我们提升网页的动画性能，让网页动画变得更好，在移动端更流畅。但是我想一大部分经验少的工程师是不知道硬件加速是如何工作的以及我们如何使用它来帮助我们让动画变得更流畅。

### 在GPU渲染元素

并不是所有的CSS属性变化都会直接在GPU处理。只有下面的属性会这样处理：

*  transform
*  opacity
*  filter

因此为了页面更加流畅，高性能的动画，我们需要尽可能的使用GPU来处理

#### ```通过-webkit-transform:transition3d/translateZ开启GPU硬件加速的适用范围```

* 使用很多大尺寸图片(尤其是PNG24图)进行动画的页面。
* 页面有很多大尺寸图片并且进行了css缩放处理，页面可以滚动时。
* 使用background-size:cover设置大尺寸背景图，并且页面可以滚动时。(详见:https://coderwall.com/p/j5udlw)
* 编写大量DOM元素进行CSS3动画时(transition/transform/keyframes/absTop&Left)
* 使用很多PNG图片拼接成CSS Sprite时

### 使用硬件加速需要注意的地方

天下没有免费的午餐。对于硬件加速，目前有几个问题

###### Memory

大部分重要的问题都是关于内存。```GPU处理过多的内容会导致内存问题。```这在移动端和移动端浏览器会导致崩溃和消耗更多的电量。 因此，通常不会对所有的元素使用硬件加速。

###### Font rendering

在GPU渲染字体会导致抗锯齿无效。这是因为GPU和CPU的算法不同。因此如果你不在动画结束的时候关闭硬件加速，会产生字体模糊

### The Near Future

有必要使用transform hack的地方是提高性能。浏览器自身也提供了优化的功能，这也就是will-change属性。这个功能允许你告诉浏览器这个属性会发生变化，因此浏览器会在开始之前对其进行优化。

### ```will-chang属性需要注意的地方```

1. 不要将 will-change 应用到太多元素上：浏览器已经尽力尝试去优化一切可以优化的东西了。有一些更强力的优化，如果与 will-change 结合在一起的话，有可能会消耗很多机器资源，如果过度使用的话，可能导致页面响应缓慢或者消耗非常多的资源。

2. 有节制地使用：通常，当元素恢复到初始状态时，浏览器会丢弃掉之前做的优化工作。但是如果直接在样式表中显式声明了 will-change 属性，则表示目标元素可能会经常变化，浏览器会将优化工作保存得比之前更久。所以最佳实践是当元素变化之前和之后通过脚本来切换 will-change 的值
3. 不要过早应用 will-change 优化：如果你的页面在性能方面没什么问题，则不要添加 will-change 属性来榨取一丁点的速度。 will-change 的设计初衷是作为最后的优化手段，用来尝试解决现有的性能问题。它不应该被用来预防性能问题。过度使用 will-change 会导致大量的内存占用，并会导致更复杂的渲染过程，因为浏览器会试图准备可能存在的变化过程。这会导致更严重的性能问题。
4. 给它足够的工作时间：这个属性是用来让页面开发者告知浏览器哪些属性可能会变化的。然后浏览器可以选择在变化发生前提前去做一些优化工作。所以给浏览器一点时间去真正做这些优化工作是非常重要的。使用时需要尝试去找到一些方法提前一定时间获知元素可能发生的变化，然后为它加上 will-change 属性。

```css
.sidebar {
  will-change: transform;
}
```

以上示例在样式表中直接添加了 will-change 属性，```会导致浏览器将对应的优化工作一直保存在内存中```，这其实是不必要的，前面我们已经看过为什么应该避免这样的做法。下面是另一个展示如何使用脚本正确地应用 will-change 属性的示例，在大部分的场景中，你都应该这样做。

```js
var el = document.getElementById('element');

// 当鼠标移动到该元素上时给该元素设置 will-change 属性
el.addEventListener('mouseenter', hintBrowser);
// 当 CSS 动画结束后清除 will-change 属性
el.addEventListener('animationEnd', removeHint);

function hintBrowser() {
  // 填写上那些你知道的，会在 CSS 动画中发生改变的 CSS 属性名们
  this.style.willChange = 'transform, opacity';
}

function removeHint() {
  this.style.willChange = 'auto';
}

```

但是，如果某个应用在按下键盘的时候会翻页，比如相册或者幻灯片一类的，它的页面很大很复杂，此时在样式表中写上 will-change 是合适的。这会使浏览器提前准备好过渡动画，当键盘按下的时候就能立即看到灵活轻快的动画。
```css
.slide {
  will-change: transform;
}
```

