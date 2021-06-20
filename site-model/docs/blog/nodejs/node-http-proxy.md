# 使用Node实现Http代理

开发一款基于nodejs的静态资源服务 [emptyd-server](https://github.com/FreemenL/emptyd-server.git)

 代理的出现是因为浏览器同源策略的存在,服务端实现代理的例子和方法很多 比如```nginx 反向代理 ```解决生产环境的跨域问题
 再有```http-server```等一些第三方的包帮我处理 基本达到了开箱即用的体验 
 通常我们所说的代理来源于http1.1的定义，代理扮演的是「中间人」角色，对于连接到它的客户端来说，它是服务端；对于要连接的服务端来说，它是客户端。它就负责在两端之间来回传送 HTTP 报文
 假如我通过代理访问A网站，对于A来说，它会把代理当做客户端，完全察觉不到真正客户端的存在，这实现了隐藏客户端IP的目的。
但是他们到底是如何实现的 ，值得一探究竟，下面是用原生nodejs 写个Http代理

```js
const http = require("http");
const url = require("url");
//首先启动本地服务器
http.createServer(function(req, res) {
  //客户端请求有两种方式，可以是对象，也可以是url字符串
  //1.这里采取的是对象形式，包括url对象以及headers
  var options = url.parse(req.url);
  options.headers = req.headers;
  //2.如果采取字符串形式，就传入一个完整的url字符串，node会自动解析成url对象

  //通过客户端请求新建一个代理服务器
  //代理请求仿照本地请求头的数据
  var proxyRequest = http.request(options, function(proxyResponse) {     //代理请求获取的数据再返回给本地res
    proxyResponse.on('data', function(chunk) {
        console.log('proxyResponse length:', chunk.length);
        res.write(chunk, 'binary');
    });
    //当代理请求不再收到新的数据，告知本地res数据写入完毕。
    proxyResponse.on('end', function() {
      console.log('proxied request ended');
      res.end();
    });

    res.writeHead(proxyResponse.statusCode, proxyResponse.headers);
  }); 

  //data只有当请求体数据进来时才会触发
  //尽管没有请求体数据进来，data还是要写，否则不会触发end事件
  req.on('data', function(chunk) {
    console.log('in request length:', chunk.length);
    proxyRequest.write(chunk, 'binary');
  });

   req.on('end', function() {
   //向proxy发送求情，这里end方法必须被调用才能发起代理请求
   //所有的客户端请求都需要通过end来发起
    proxyRequest.end();
  });

}).listen(8080);
```
以上代码的核心思想就是用```http.request```充当了中间人的角色 帮我们去目标地址取数据然后在把得到的数据传回去。可以看作是设计模式中代理模式的一种实践
