# 网络体系基础及实践

### 计算机网络体系结构分层

<img src="https://user-gold-cdn.xitu.io/2017/11/11/acbf43524688673455b7c0a03678a7ae?imageView2/0/w/1280/h/960/format/webp/ignore-error/1"/>

<section style="text-align:center">计算机网络体系结构分层</section><br/>

<img src="https://user-gold-cdn.xitu.io/2017/11/11/690219fae5b0587fa26e2dee545e6200?imageView2/0/w/1280/h/960/format/webp/ignore-error/1"/><br/>
<br/>
<section style="text-align:center">计算机网络体系结构分层</section><br/>


### TCP/IP模型

TCP/IP协议模型（Transmission Control Protocol/Internet Protocol），包含了一系列构成互联网基础的网络协议，是Internet的核心协议


TCP/IP协议族按照层次由上到下，层层包装。最上面的是应用层，这里面有http，ftp,等等我们熟悉的协议。而第二层则是传输层，著名的TCP和UDP协议就在这个层次。第三层是网络层，IP协议就在这里，它负责对数据加上IP地址和其他的数据以确定传输的目标。第四层是数据链路层，这个层次为待传送的数据加入一个以太网协议头，并进行CRC编码，为最后的数据传输做准备

<img src="https://user-gold-cdn.xitu.io/2017/8/10/32269df6363944b0df8fe99204e92c91?imageView2/0/w/1280/h/960/format/webp/ignore-error/1"/>

上图清楚地表示了TCP/IP协议中每个层的作用，而TCP/IP协议通信的过程其实就对应着数据入栈与出栈的过程。入栈的过程，数据发送方每层不断地封装首部与尾部，添加一些传输的信息，确保能传输到目的地。出栈的过程，数据接收方每层不断地拆除首部与尾部，得到最终传输的数据。

### TCP连接的建立与终止

#### 三次握手

TCP是面向连接的，无论哪一方向另一方发送数据之前，都必须先在双方之间建立一条连接。在TCP/IP协议中，TCP协议提供可靠的连接服务，连接是通过三次握手进行初始化的。三次握手的目的是同步连接双方的序列号和确认号并交换 TCP窗口大小信息。

<img src="https://user-gold-cdn.xitu.io/2017/8/10/6023cb46caf6ef8cdcc253cc9c827e40?imageView2/0/w/1280/h/960/format/webp/ignore-error/1"/>

###### 第一次握手： 

建立连接。客户端发送连接请求报文段，将SYN位置为1，Sequence Number为x；然后，客户端进入SYN_SEND状态，等待服务器的确认；

###### 第二次握手：

服务器收到SYN报文段。服务器收到客户端的SYN报文段，需要对这个SYN报文段进行确认，设置Acknowledgment Number为x+1(Sequence Number+1)；同时，自己自己还要发送SYN请求信息，将SYN位置为1，Sequence Number为y；服务器端将上述所有信息放到一个报文段（即SYN+ACK报文段）中，一并发送给客户端，此时服务器进入SYN_RECV状态； 

###### 第三次握手：
客户端收到服务器的SYN+ACK报文段。然后将Acknowledgment Number设置为y+1，向服务器发送ACK报文段，这个报文段发送完毕以后，客户端和服务器端都进入ESTABLISHED状态，完成TCP三次握手。


##### 为什么要三次握手？

为了防止已失效的连接请求报文段突然又传送到了服务端，因而产生错误。

具体例子：“已失效的连接请求报文段”的产生在这样一种情况下：client发出的第一个连接请求报文段并没有丢失，而是在某个网络结点长时间的滞留了，以致延误到连接释放以后的某个时间才到达server。本来这是一个早已失效的报文段。但server收到此失效的连接请求报文段后，就误认为是client再次发出的一个新的连接请求。于是就向client发出确认报文段，同意建立连接。假设不采用“三次握手”，那么只要server发出确认，新的连接就建立了。由于现在client并没有发出建立连接的请求，因此不会理睬server的确认，也不会向server发送数据。但server却以为新的运输连接已经建立，并一直等待client发来数据。这样，server的很多资源就白白浪费掉了。采用“三次握手”的办法可以防止上述现象发生。例如刚才那种情况，client不会向server的确认发出确认。server由于收不到确认，就知道client并没有要求建立连接。”

#### 四次挥手

当客户端和服务器通过三次握手建立了TCP连接以后，当数据传送完毕，肯定是要断开TCP连接的啊。那对于TCP的断开连接，这里就有了神秘的“四次分手”。

<img src="https://user-gold-cdn.xitu.io/2017/8/10/1fd63f511dd955e462bcdd3946e880bf?imageView2/0/w/1280/h/960/format/webp/ignore-error/1"/>


###### 第一次分手： 
 主机1（可以使客户端，也可以是服务器端），设置Sequence Number，向主机2发送一个FIN报文段；此时，主机1进入FIN_WAIT_1状态；这表示主机1没有数据要发送给主机2了；

###### 第二次分手： 
 主机2收到了主机1发送的FIN报文段，向主机1回一个ACK报文段，Acknowledgment Number为Sequence Number加1；主机1进入FIN_WAIT_2状态；主机2告诉主机1，我“同意”你的关闭请求；

###### 第三次分手： 
主机2向主机1发送FIN报文段，请求关闭连接，同时主机2进入LAST_ACK状态；

###### 第四次分手：
 主机1收到主机2发送的FIN报文段，向主机2发送ACK报文段，然后主机1进入TIME_WAIT状态；主机2收到主机1的ACK报文段以后，就关闭连接；此时，主机1等待2MSL后依然没有收到回复，则证明Server端已正常关闭，那好，主机1也可以关闭连接了。


###### 为什么要四次分手？

TCP协议是一种面向连接的、可靠的、基于字节流的运输层通信协议。TCP是全双工模式，这就意味着，当主机1发出FIN报文段时，只是表示主机1已经没有数据要发送了，主机1告诉主机2，它的数据已经全部发送完毕了；但是，这个时候主机1还是可以接受来自主机2的数据；当主机2返回ACK报文段时，表示它已经知道主机1没有数据发送了，但是主机2还是可以发送数据到主机1的；当主机2也发送了FIN报文段时，这个时候就表示主机2也没有数据要发送了，就会告诉主机1，我也没有数据要发送了，之后彼此就会愉快的中断这次TCP连接。

### http 协议
应用层 http 服务器是继承自传输层的tcp，它对请求和响应进行了包装。

1，是客户端跟的服务器沟通的一个协议<br/>
2，通过请求和响应达成通信<br/>
3，http 是一种不保存状态的协议<br/>

请求行
> HTTP/1.1      200     OK

请求头
>Host: localhost:8080
> User-Agent: curl/7.54.0
> Accept: */*
> Content-Length: 9
> Content-Type: application/x-www-form-urlencoded

请求体
### http 模块
方法|详情
--|--
http.createServer()|创建http服务

事件|详情
--|--
connection|客户端建联
request|客户端请求
close| 关闭服务器
error | 服务器错误

### http服务基础
```js
 //应用层 http 服务器是继承自传输层的tcp ；
//它对请求和响应进行了包装
const http = require("http");
const url = require("url");
//req  可读流
//res  可写流
/**
POST / HTTP/1.1
Host: localhost:8080
User-Agent: curl/7.54.0
Accept: 
Content-Length: 9
Content-Type: application/x-www-form-urlencoded
*/
const server = http.createServer();

server.on('connection',function(socket){
    console.log('客户端连接')
})

server.on('request',function(req,res){
    console.log(req.method);   //请求方法
    let urlobj = url.parse(req.url,true);//请求路径
    console.log(urlobj);
    console.log(urlobj.format(urlobj));
    console.log(req.headers);  //请求头
    let result = [];
    req.on("data",function(data){
        result.push(data);
    })
    req.on("end",function(){
       let r =  Buffer.concat(result);
       console.log(r.toString());
       res.end(r);
    })
})

server.on('close',function(req,res){
    console.log('服务器关闭')
})
server.on('error',function(error){
    console.log('服务器错误')
})
server.listen(8080,function(){
    console.log("http server started http://localhost:8080")
})

```

http 可以作为服务端也可以作为客户端  作为客户端的两个重要的应用的场景就是爬虫和做```BFF```中间层

### BFF中间层

```js
const http = require("http");
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');

const options = {
    host: "localhost",
    port: 8080,
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    }
}
const req = http.request(options);

req.on("response",function(res){
    console.log(res.statusCode);
    console.log(res.headers);
    const result = [];
    res.on("data",function(data){
        result.push(data);
    })
    res.on("end",function(data){
        const str = Buffer.concat(result);
        console.log(decoder.write(str));
    })

})
req.write(`{"name":"xiajiang"}`);

req.end();
```

### 做服务端

```js
const http = require('http');
const querystring = require('querystring');
const server = http.createServer();

server.on("request",function(req,res){
    const result = [];
    req.on("data",function(data){
        result.push(data);
    })
    req.on("end",function(){
        console.log("dara");
        const str = Buffer.concat(result).toString();
        console.log("dara");
        const contentType = req.headers["content-type"];
        const handle = {
            "application/x-www-form-urlencoded":function(datas){
                return querystring.parse(datas);
            },
            "application/json":function(datas){
                return JSON.parse(datas);
            }
        }
        const response = handle[contentType](str);
        res.end(JSON.stringify(response));

    })
    // res.end(`{"name":"夏季昂"}`);
})

server.listen(8080);
```

### 浏览器缓存

###### 缓存的作用
* 减少了冗余数据的传输，节省了网费。
* 减少了服务器的负担，提高网站的性能

缓存分为强制缓存和协商缓存 


* 强缓存如果生效不需要再和服务器发生交互，对比缓存不管生不生效都需要与服务端发生交互
* 两类缓存可以同时存在，强缓存的优先级高于对比缓存

### 协商缓存
##### 1.协商缓存之Last-Modified


 1. 通过最后修改时间来判断缓存是否可用(Last-Modified)：
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190306104238259.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NjUzNDQ5,size_16,color_FFFFFF,t_70)

```js
/** 
 * 1.第一次访问服务器的时候，服务器会返回资源和缓存的标识，客户端则会把此资源缓存在本地的缓存数据库中。
 * 2.第二次客户端需要此数据的时候，要取得缓存的标识，然后去问下服务器我的资源是否是最新的。
 * 如果是最新的则直接使用缓存数据，如果不是最新的则服务器返回新的资源和缓存规则，客户端根据新的规则缓存新的数据
 */
const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const mime  = require("mime");

http.createServer(function(req,res){
    const { pathname } = url.parse(req.url,true);
    const filepath = path.join(__dirname,pathname);
    fs.stat(filepath,(err,stat)=>{
        if(err){
           return sendErr(req,res)
        }else{
            const ifModifiedSince = req.headers['if-modified-since'];
            const LastModified = stat.ctime.toGMTString();
            if(ifModifiedSince == LastModified){
                res.writeHead(304);
                res.end();
            }else{
                return send(req,res,filepath,stat)
            }
        }
    })
}).listen(8080);

function sendErr(req,res){
    res.end('Not Found');
}
function send(req,res,filepath,stat){
    res.setHeader("Content-Type",mime.getType(filepath));
    //把文件的最后修改时间发给客户端，客户端会把此时间保存起来 ，次再获取此资源的时候会把这个时间再发给服务器
    res.setHeader("Last-Modified",stat.ctime.toGMTString());
    fs.createReadStream(filepath).pipe(res);
}
```
>该方法存在的问题：

>1. ```某些服务器拿不到文件的最后修改时间，无法判断```
>2. ```某些文件修改的非常频繁，在秒以下的时间内进行修改 ，Last-Modified 只能精确到秒```
>3. ```一些文件修改时间改了，但内容没变，我们不希望客户端认为这个文件修改了```
>4. ```同一个文件处于多个CDN服务器上的时候，内容虽然一样但最后修改时间不一样```

#####  2.协商缓存之Etag
Etag是实体标签的缩写，根据实体内容生成一段hash字符串，可以标识资源的状态，资源发生改变时Etag也随之发生改变，ETag由服务端产生发给客户端。

* 第一次服务器返回的时候，会把文件的内容算出来一个标识（通常是md5值），发给客户端，
* 客户端看到Etag的时候，会把此标识符存在客户端，下次再访问服务器的时候，发给服务器
*  服务器根据两次的值对比判断是否返回新的内容。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190306111617873.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NjUzNDQ5,size_16,color_FFFFFF,t_70)
```js
const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const mime  = require("mime");

http.createServer(function(req,res){
    const { pathname } = url.parse(req.url,true);
    const filepath = path.join(__dirname,pathname);
    fs.stat(filepath,(err,stat)=>{
        if(err){
           return sendErr(req,res)
        }else{
            const ifNoneMatch = req.headers['if-none-match'];
            const out = fs.createReadStream(filepath);
            const md5 = crypto.createHash("md5");
            out.on("data",function(data){
                md5.update(data)
            })
            out.on("end",function(data){
                /**
                * mad5 ：
                * 相同的输入 相同的输出。
                * 不同的输入不同的输出。
                * 不能从输出反推输入
                */
               const Etag = md5.digest("hex");
               if(ifNoneMatch == Etag){
                   res.writeHead(304);
                   res.end();
               }else{
                   return send(req,res,filepath,Etag)
               }
            })
        }
    })
}).listen(8080);

function sendErr(req,res){
    res.end('Not Found');
}

function send(req,res,filepath,Etag){
    res.setHeader("Content-Type",mime.getType(filepath));
    //第一次服务器返回的时候，会把文件的内容算出来一个标识，发给客户端，
    //客户端看到Etag的时候，会把此标识符存在客户端，下次再访问服务器的时候，发给服务器
    res.setHeader("Etag",Etag);
    fs.createReadStream(filepath).pipe(res);
}
```
### 强缓存  
* 把资源缓存在客户端，如果客户端需要再次使用此资源的时候，先获取到缓存中的数据，看是否过期 如果过期了再请求服务器 
Cache-Control的值
no-cache  ： 不使用强缓存
no-store： 强缓存和协商缓存都不使用
关键代码 ，在响应头中设置
```js
res.setHeader("Cache-Control","max-age=30");
```
具体实现
```js
/** 
 * 强缓存
 * 把资源缓存在客户端，如果客户端需要再次使用此资源的时候，先获取到缓存中的数据，看是否过期
 * 如果过期了再请求服务器。
 */
const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const mime  = require("mime");

http.createServer(function(req,res){
    const { pathname } = url.parse(req.url,true);
    const filepath = path.join(__dirname,pathname);
    fs.stat(filepath,(err,stat)=>{
        if(err){
           return sendErr(req,res)
        }else{
            return send(req,res,filepath,stat)
        }
    })
}).listen(8080);

function sendErr(req,res){
    res.end('Not Found');
}
function send(req,res,filepath,stat){
    res.setHeader("Content-Type",mime.getType(filepath));
    res.setHeader("Cache-Control","max-age=30");
    fs.createReadStream(filepath).pipe(res);
}
```

### url 模块解析url参数

* url.parse  解析路径信息为对象
* url.format   还原路径 
  

```js
const http = require("http");
/**
< HTTP/1.1 200 OK   
< Date: Mon, 04 Mar 2019 09:43:59 GMT   默认就有
< Connection: keep-alive
< Content-Length: 9
<  Transfer-Encoding: chunked  // 分块传输 
 */
const server = http.createServer(function(req,res){
    //writeHead 一旦调用会向客户端发送  setHeader 不会
    res.writeHead(200,"ok",{
        "Content-Type":"text/html;charset=utf8"
    });

    //当调用 writeHead 或者 write的时候向客户端发响应

    // res.statusCode = 200; // 设置状态码 
    // res.sendDate = false; // 响应头默认会设置 
    // res.setHeader("Content-Type","text/html;charset=utf8");
    // console.log(res.getHeader('Content-Type'));
    // res.removeHeader('Content-Type');
    // console.log(res.getHeader('Content-Type'));
    // res.write("hello");
    // res.write("world");
    // res.end();
});

server.listen(8080,function(){
    console.log("http server started http://localhost:8080")
})
```


##### 参考文献

[一篇文章带你熟悉 TCP/IP 协议（网络协议篇二)](https://juejin.im/post/5a069b6d51882509e5432656)
