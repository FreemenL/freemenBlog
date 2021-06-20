# web应用性能优化之 nginx + compression-webpack-plugin

当我们的项目越来越庞大是时候  会发现 即使做了code split  代码压缩  动态加载 等等一系列优化之后 页面的响应速度依旧很慢

这个时候时候可以使用 compression-webpack-plugin 这个插件
 
```js

new CompressionWebpackPlugin({ //gzip 压缩
      filename: '[path].gz[query]',
      test: new RegExp(
        '\\.(js|css)$'    //压缩 js 与 css
      ),
      threshold: 10240,
      minRatio: 0.8
    }),

```

具体配置参数可以到该插件的官网上查看 ，该插件的作用是 在超过限定的文件大小的 时候会生成一个跟文件同名的gz包  

这个时候我们需要在改下nginx的配置  启用gzip压缩并 开启gzip_static

```bash
location ~ .*\.(jpg|png|gif)$ {
       gzip on;
       gzip_static on;
       gzip_min_length 1k;
       gzip_http_version 1.1;
       gzip_comp_level 3;
       gzip_types image/jpeg image/png image/gif;
       root /home/dist;
    }

    location ~ .*\.(html|js|css)$ {
        gzip on;
        gzip_static on;
        gzip_min_length 1k;
        gzip_http_version 1.1;
        gzip_comp_level 9;
        gzip_types  text/css application/javascript;
        root /home/dist;
    }

```

见证奇迹的时刻到了。。。。。

但是使用Gzip压缩有一些缺点：

压缩期间服务器CPU负载增加。
数据可能需要很长时间才能处理，因为在完成压缩之前不会发送第一个字节，因此可能会使网页显示为挂起状态。
长时间到第一个字节通常会导致用户取消并重新发出对Web服务器的请求，从而导致由于顺序加载请求而导致CPU负载增加

