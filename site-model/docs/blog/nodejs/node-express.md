# express 基本原理

express 是基于nodejs 的http 模块封装的一个框架

### 极简用例

```js
const express = require("express");
const app = express();

app.param('userid', function(req, res, next, userid) {
    req.user = getUser(userid);
    next();
});

app.use("/water",function(req,res,next){
    console.log("middle");
    next();
});

function getUser(userId){
    return {
        userId, 
        age:8,
        name:"freemen"
    }
}

function setUser(user){

}

app.get('/username/:userid/:name',function(req,res){
    console.log(req.user);
    console.log(req.params);
    req.user.name = req.params.name;
    setUser(req.user);
    res.end("update username success!");
});

app.get('/username/:userid/:age',function(req,res){
    req.user.age = req.params.age;
    setUser(req.user);
    res.end("update username success!");
});


app.get("/user",function(req,res){
    console.log(req.query);
    console.log(req.path);
    console.log(req.hostname);
});

app.listen(8888);
```
试着实现下它的这些功能 主要是路由和中间件部分：
### ```核心思想```
导出一个httpServer 函数 给这个函数定义一个名为listen 的属性 他要干的事情就是 在调用的时候用http启一个服务并监听相应的端口
```js
 app.listen = (...rest)=>{
        const server = http.createServer(app);
        server.listen(...rest);
  }
```
路由和中间件都放在同一个队列当中 ， 用```迭代器模式```循环执行回调函数。
路由和中间件的区别在于中间件是拿到了迭代的权利即next函数 而且当这个next函数传进来错误值的时候把这个错误值做一层穿透 

关于路由参数的处理
```js
app.param('userid', function(req, res, next, userid) {
    req.user = getUser(userid);
    next();
});
```

首先分析这种需要处理参数的情况和普通的路由唯一的区别就是路由的地址有所区别
```/username/:userid/:name```
其实就是需要对```:```后面的的值进行处理 那就在定义的时候把有用的值存下来
```js
http.METHODS.forEach( method => {
        const methods = method.toLocaleLowerCase();
        app[ methods ] = function(path,cb){
            const layer = { methods, path, cb };
            if(path.includes(":")){
               let paramsNames = [];
               path = path.replace(/:([^\/]+)/g,function(){
                   paramsNames.push(arguments[1]);
                   return '([^\/]+)'
               })
               layer.path = new RegExp(path);
               layer.paramsNames = paramsNames;
            }
            app.routers.push(layer)
        }
    })
```
然后定义一个对象来保存这些param的参数 键名为路由的参数键值为相应的回调 
```js
app.paramhandlers = {};
app.param = function(name,handler){
    app.paramhandlers[name] = handler;
}
```
然后在迭代的时候添加相应的判断逻辑 取出之前存的参数并传进相应的值
```js
if(route.paramsNames){
      let machers = pathname.match(path);
      if(machers){
          let params = {};
          for(let i=0; i < route.paramsNames.length;i++){
              params[route.paramsNames[i]] = machers[i+1];
          }
          req.params = params;
          for(let j=0;j<route.paramsNames.length;j++){
              let name = route.paramsNames[j];
              let handle = app.paramhandlers[route.paramsNames[j]];
              if(handle){
                  return handle(req,res,()=>route.cb(req,res),req.params[name]);
              }
          }
      }else{
          next();
      }
  }
```
完整实现如下
```js
const http = require("http");
const url = require("url");
//首先需要我们导出一个函数 这个函数会返回一个对象 有listen use param 等方法 我们暂且把它和这些属性写个app 这个函数上 
function httpServer(){
    const app = (req,res)=>{
        const { pathname } = url.parse(req.url,true);
        let index = 0;
        function next(err){
            if(index >= app.routers.length){
                return res.end(`cannot find ${req.method}---${pathname}`);
            }
            let route = app.routers[index++];
            const { methods ,cb ,path} = route;
            if(err){
                if( methods == "middle" ){
                    if(path=='/'||pathname.startsWith(path+"/")||path==pathname){
                        if(cb.length==4){
                           cb(err,req,res,next);
                        }else{
                            next(err);
                        }
                    }
                }else{
                    next(err);
                }
            }else{
                if( methods=="middle" ){
                    cb(req,res,next);
                }else{
                    if(route.paramsNames){
                        let machers = pathname.match(path);
                        if(machers){
                            let params = {};
                            for(let i=0; i < route.paramsNames.length;i++){
                                params[route.paramsNames[i]] = machers[i+1];
                            }
                            req.params = params;
                            for(let j=0;j<route.paramsNames.length;j++){
                                let name = route.paramsNames[j];
                                let handle = app.paramhandlers[route.paramsNames[j]];
                                if(handle){
                                    return handle(req,res,()=>route.cb(req,res),req.params[name]);
                                }
                            }
                        }else{
                            next();
                        }
                    }
                    if((route["path"] == pathname||route["path"]=="*")&&(req.method.toLocaleLowerCase() == route["methods"]|| route['methods']== "all" )){
                        return cb(req,res);
                    }else{
                        next();
                    }
                }
            }
        }
        next();
    }

    app.paramhandlers = {};
    app.param = function(name,handler){
        app.paramhandlers[name] = handler;
    }

    app.routers = [];

    app.listen = (...rest)=>{
        const server = http.createServer(app);
        server.listen(...rest);
    }
    
    http.METHODS.forEach( method => {
        const methods = method.toLocaleLowerCase();
        app[ methods ] = function(path,cb){
            const layer = { methods, path, cb };
            if(path.includes(":")){
               let paramsNames = [];
               path = path.replace(/:([^\/]+)/g,function(){
                   paramsNames.push(arguments[1]);
                   return '([^\/]+)'
               })
               layer.path = new RegExp(path);
               layer.paramsNames = paramsNames;
            }
            app.routers.push(layer)
        }
    })

    app.all = function(path,cb){
        app.routers.push({
            methods:"all",
            path,
            cb
        })
    }
    app.use = function(path,cb){
        if(typeof cb !=="function"){
            let middle = path;
            cb = middle;
            path = '/';
        }
        app.routers.push({
            methods:"middle",
            path,
            cb
        })
    }
    // 内置中间件用来提供格式化后的请求参数
    app.use(function(req,res,next){
        const urlObj = url.parse(req.url,true);
        req.query  = urlObj.query;
        req.path  = urlObj.pathname;
        req.hostname  = req.headers['host'].split(":")[0];
        next();
    })
    return app;
}

module.exports = httpServer;
```
