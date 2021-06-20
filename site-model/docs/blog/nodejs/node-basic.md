# basic 认证机制 

基本流程 <br/>

```首次请求``` 判断请求头headers 中authorization字段的值为空，这时让用户输入

```第二次请求``` 的时候判断用户输入的值是否正确 做相应的处理

nodejs 代码

```js
const http = require('http');
const server = http.createServer(function(req,res){
  const authorization = req.headers["authorization"];
  if(!authorization){
    res.writeHead(401,{
      "content-Type":"text/plan",
      "WWW-authenticate":'Basic realm="famly"'
    })
    res.end('');
  }else{
    const str = authorization.slice(6,authorization.length);
    const resStr =new Buffer(str,"base64").toString();
    if(resStr!=="xiajiang:123"){
      res.writeHead(401,{
        "content-Type":"text/plan",
        "WWW-authenticate":'Basic realm="famly"'
      })
      res.end('');
    }else{
      res.end("aaaaaaaaaaaaa")
    }
  }
});

server.listen(8080);

```

basic 认证缺点太多，他虽然用base64 加密后传输，但是近乎铭文，一般只有在https的情况下才会使用， 为了改进basic 认证，他需要加入服务端随机数来保护认证的过程。

### 参考文献

[深入浅出Nodejs](https://book.douban.com/subject/25768396//)
