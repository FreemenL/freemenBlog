# 常用模块和功能函数
### module 模块
node 中的模块化遵循的是commonjs 规范

具体实现是会把每个模块放在一个立即执行函数中执行 ，这个函数包含5个参数

|参数  | 详情 |
|--|--|
| ```exports```| 当前模块的导出对象 |
| ```require```| require方法 |
| ```module```| 当前模块|
|```__filename```| 当前文件的绝对路径|
|```__dirname```| 当前文件夹的绝对路径|

### require 的属性

|参数  | 详情 |
|--|--|
| ```resolve```| 只想知道模块的绝对路径,但又不想加载它  require.resolve  |
| ```extensions```| nodejs模块分三种  js json node { '.js': [Function], '.json': [Function], '.node': [Function] }, |
| ```main ```| 入口文件 |
|```cache```| 缓存对象 模块在缓存的时候key值为导入模块的绝对路径 |

### Buffer
```js
//解决乱码  
let buffer9 = Buffer.from("李测试");
let buffer10 = buffer9.slice(0,5);
const { StringDecoder } = require("string_decoder");
sd = new StringDecoder; //专门用来解决乱码问题的 ；
console.log(sd.write(buffer10)); // 李
console.log(sd.write(buffer11)); // 测试
```
	
### 合并buffer
```js 
const buffer1 = Buffer.from("测");
const buffer2 = Buffer.from("试");
Buffer.concat1 = function(list,total = list.reduce((len,item)=>len+item.length,0)){
    if(list.length==1){
        return list[0];
    }
    let result = Buffer.alloc(total);
    let index = 0;
    for(let buf of list){
        for(let b of buf){
            if(index<=total){
                result[index++] = b;
            }else{
                return result;
            }
        }
    }
    return result;
}

const result = Buffer.concat1([buffer1,buffer2]);

console.log(result.toString());
```
### fs模块
|params|detail|
|--|--|
| fs.rename()| 修改文件名|
| fs.truncate | 截断文件内容
|fs.unlink| 删除文件
|fs.rmdir| 删除非空目录
| fs.watchFile|监听文件改动
|fs.statSync| 获取文件信息
|fs.open|打开文件 
|fs.close |关闭文件
|fs.createReadStream | 创建可读流
|fs.createWriteStream | 创建可写流

### 异步读文件
```js
fs.readFile('./1.txt',{ encoding:"utf8",flag:"r"},function(error,data){
    if(error){
        console.log(error);
    }else{
        console.log(data);
    }
})
```
### 异步写入文件
```js
/* 
   flag:a    追加写入 
   mode      linux 权限位 
*/
fs.writeFile("./2.txt",'data',{encoding:"utf8",flag:"a",mode:0o666},function(error){
    if(error){
        console.log(error)
    }
})
```
### 追加写入
```js

fs.appendFile("./2.txt",'data1',function(error){
    if(error){
        console.log(error)
    }
})
```
### 精确的控制读取的字节
```js
//fd:file descript   文件描述符 
fs.open("./1.txt",'r',0o666,function(err,fd){
    let buffer = Buffer.alloc(4);
    // 读取文件部分内容
    fs.read(fd,buffer,1,3,1,function(err,bytesRead,buffe){
        console.log(buffe.toString());
    })
})
```
### process监听控制台输入输出
```
//监听控制台输入  标准输入
process.stdin.on("data",function(data){
    console.log(data);
})
//标准输出  consoel.log 对应 process.stdout.write
console.log('hellow');
process.stdout.write("hellow");
//错误输出  consoel.error 对应 process.stderr.write
console.error('hellow');
process.stderr.write("hellow");

```

### 边读边写 
```js
const fs = require("fs"); 
const BUFFER_SIZE = 6;
function copy(src,target) {
    const buffer = Buffer.alloc(BUFFER_SIZE)
    fs.open(src,'r',0o666,function(error,readFd){
        fs.open(target,'w',0o666,function(err,writeFd){
            !function next(){
                fs.read(readFd,buffer,0,BUFFER_SIZE,null,function(err1,bytesRead){
                    if(bytesRead>0){
                        fs.write(writeFd,buffer,0,bytesRead,null,next)
                    }
                })
            }()
        })
    })
}

copy('./2.txt','./1.txt');
```
### 创建目录  

创建目录的时候其父目录必须是存在的

```js
const fs = require("fs");
fs.mkdir('a',0o666,function(error){
    console.log(error);
})
```
### 递归删除非空目录 
```js
const fs = require("fs");
//递归删除非空目录   
function rmdir(dir){
    let files = fs.readdirSync(dir);
    files.forEach((file)=>{
        let current = dir+"/"+file;
        let child = fs.statSync(current);
        if(child.isDirectory()){
            rmdir(current);
        }else{
            fs.unlinkSync(current);
        }
    })
    fs.rmdirSync(dir)
}
rmdir('a');
```
### 监听文件变动
```js
fs.watchFile('./a.txt',(newStat,preStat)=>{
    if(Date.parse(preStat.ctime)==0){
        console.log("create");
    }else if(Date.parse(preStat.ctime)!==Date.parse(newStat.ctime)){
        console.log("update")
    }else{
        console.log('delete');
    }
})
```
### 可读流
```js
const fs = require("fs");
//可读流
const rs = fs.createReadStream('./a.txt',{
    mode:0o666,
    encoding:"utf8",
    flags:"r",
    start:3,
    end:8,
    highWaterMark:3
});
rs.on("open",function(data){
    console.log('open');
});
rs.on("data",function(data){
    console.log(data);
    rs.pause();
    setTimeout(function(){  
        rs.resume();
    },2000)
})
rs.on("end",function(data){
    console.log('end');
})

rs.on("error",function(data){
    console.log('error');
})
rs.on("close",function(data){
    console.log('close');
})
```
```js
const fs  = require("fs");
const path = require("path");
fs.readdir('./a',function(err,files){
    files.forEach(file=>{
        let child = path.join("a",file);
        fs.stat(child,function(err,stat){
            console.log(stat);
            //stat  文件信息
            // {
            //     dev: 16777220, //设备号
            //     mode: 16877,  
            //     nlink: 2,   
            //     uid: 501,  // 用户id
            //     gid: 20,   //用户组id
            //     rdev: 0,
            //     blksize: 4194304,
            //     ino: 8880296,
            //     size: 64,
            //     blocks: 0,
            //     atimeMs: 1551535852915.9565,
            //     mtimeMs: 1551535852801.7656,
            //     ctimeMs: 1551535852801.7656,  //
            //     birthtimeMs: 1551535852801.7656,
            //     atime: 2019-03-02T14:10:52.916Z,  //文件访问事件
            //     mtime: 2019-03-02T14:10:52.802Z,  //文件更新事件
            //     ctime: 2019-03-02T14:10:52.802Z,   // 文件内容更新事件
            //     birthtime: 2019-03-02T14:10:52.802Z } //创建时间
        })
    })
})
```
### 可写流
```js
const fs = require("fs");
const str = "学习";

fs.open('1.txt','w',0o666,(err,fd)=>{
    let buff = Buffer.from(str);
    //当我们用write 方法写文件的时候，并不会直接写入物理文件，而是先写入缓存区，再批量写入物理文件
    fs.write(fd,buff,0,3,0,(err,bytesWritten)=>{
        fs.write(fd,buff,3,3,3,(error,bytesWritten2)=>{
            //fs.fsync  迫使操作系统立马把缓存区的内容写入物理文件 
            fs.fsync(fd,()=>{
                fs.close(fd,()=>{
                    console.log('关闭完成!');
                })
            })
        })
    })
})
```

```js
const fs = require('fs');
//可写流 
const ws = fs.createWriteStream('./2.txt',{
    flags:"w",
    start:0,
    highWaterMark:3,
    mode:0o666
});

let flag = ws.write("1");
console.log(flag)
flag = ws.write("2");
console.log(flag)
flag = ws.write("3");
console.log(flag)
flag = ws.write("4");
console.log(flag)
flag = ws.write("5");
console.log(flag)
```

## 逐行读文件内容
```js
const fs = require("fs");
const EventEmitter = require("events");
const util = require("util");

const NEW_LINE = 0x0A; // /n换行
const RETURN = 0x0D;  // /r 回车
function lineReader(path,encoding){
    EventEmitter.call(this);
    this.encoding = encoding;
    this._reader = fs.createReadStream(path);
    this.on("newListener",(type,listener)=>{
        if(type === "newLine" ){
            let buffer = []
            this._reader.on("readable",()=>{
                let char; //Buffer 
                while(null != (char=this._reader.read(1))){
                    switch(char[0]){
                        case NEW_LINE:
                            this.emit('newLine',Buffer.from(buffer).toString(this.encoding));
                            buffer.length = 0;
                            break;
                        case RETURN:
                            this.emit('newLine',Buffer.from(buffer).toString(this.encoding));
                            buffer.length = 0;
                            let newChar = this._reader.read(1);
                            if(newChar[0]!=NEW_LINE){
                                buffer.push(newChar[0]);
                            }
                            break;
                        default:
                            buffer.push(char[0]);
                            break;
                    }
                }
            });
            this._reader.on("end",()=>{
                this.emit('newLine',Buffer.from(buffer).toString(this.encoding))
                this.emit('end');
            });
        }
    })
}

util.inherits(lineReader,EventEmitter);
module.exports = lineReader;
//=======================================================
const lineReader  = require('./lineReader');
const reader = new lineReader('./1.txt','utf8');

reader.on("newLine",(data)=>{
    console.log(data);
})
reader.on("end",(data)=>{
    console.log("over");;
})
```
### 对象流
```js
const { Transform } = require("stream");
const fs = require('fs');
const rs = fs.createReadStream("./test.json");

const toJSON = Transform({
    readableObjectMode:true, //可以往可读流里放对象 
    transform(chunk,encoding,cb){
        this.push(JSON.parse(chunk.toString()));
    }
})

const outJSON = Transform({
    writableObjectMode:true, //可以往可写流里放对象 
    transform(chunk,encoding,cb){
        console.log(chunk);
        cb();
    }
})
rs.pipe(toJSON).pipe(outJSON);
```
### path模块
|参数|详情|
|--|--|
|path.delimiter|环境变量路径分隔符
|path.win32.delimiter|环境变量路径分隔符
|path.posix.delimiter|环境变量路径分隔符
path.sep)|文件路径分隔符
path.win32.sep)|文件路径分隔符
path.posix.sep)|文件路径分隔符
path.relative | 获取两个路径之间的相对路径
path.basename | 获取文件绝对路径
path.extname('ll.jpg')| 获取文件拓展名 
path.resolve()|将路径或路径片段的序列解析为绝对路径

### stream 
```js
let { Duplex } = require("stream");
let index = 0;
//双工流  
let s = Duplex({
    read(){
        while(index++<3){
            this.push('a');
        }
        this.push(null);
    },
    write(chunk,encoding,cb){
        console.log(chunk.toString().toUpperCase());
        cb();
    }
});

process.stdin.pipe(s).pipe(process.stdout);

```
### 对象流
```js
//
const { Transform } = require("stream");
const fs = require('fs');
const rs = fs.createReadStream("./test.json");

const toJSON = Transform({
    readableObjectMode:true, //可以往可读流里放对象 
    transform(chunk,encoding,cb){
        this.push(JSON.parse(chunk.toString()));
    }
})

const outJSON = Transform({
    writableObjectMode:true, //可以往可写流里放对象 
    transform(chunk,encoding,cb){
        console.log(chunk);
        cb();
    }
})
rs.pipe(toJSON).pipe(outJSON);
```
```js
const { Writable , Readable } = require('stream');
let i = 0;
let rs = Readable({
    highWaterMark:2,
    read(){
        if(i<10){
            this.push(""+i++);
        }else{
            this.push(null);
        }
    }
})
let ws = Writable({
    highWaterMark:2,
    write(chunk,encoding,callback){
        console.log(chunk.toString())
        callback()
    }
});

rs.pipe(ws);

setTimeout(function(){
    console.log(rs._readableState.length);
    console.log(ws._writableState.length);
})
```
### 转换流
```js
const { Transform } = require("stream");
// 转换流是实现数据转换的  
let t = Transform({
    transform(chunk,encoding,cb){
        this.push(chunk.toString().toUpperCase());
        cb()
    }
})
process.stdin.pipe(t).pipe(process.stdout);
```

### yargs 获取命令行参数
node 原生可以使用 process.argv  来获取 但操作起来不是很方便 所以可以使用像```yargs```
```commander```
等一些第三方的模块

```js
//yargs
#!/usr/bin/env node
const yargs = require("yargs");
let argv = yargs.options('n',{
    alias:"name",//别名
    demand:true,//必填
    default:'lxj',
    description:"请输入姓名"
})
.usage("hello [options]")
.help()
.example("hello -n lxj","执行hello 传入参数为lxj")
.alias("h","help")
.argv;

console.log(argv);
console.log(argv.name);
```

### commander 获取命令行参数

```js

const program = require('commander');
program
  .version(packageInfo.version)
  .command('run [name]', 'run specified task')
  .parse(process.argv);

```

