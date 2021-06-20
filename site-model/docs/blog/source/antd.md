# antd 源码 学习

因为之前自己也封装过通用组件库并上传到npm,  所以惯性驱使下直接打开了node_modules 目录 下antd的 代码翻看 可以看到如下目录结构

```
├── dist      
├── es 
├── lib 
├── node_modules
├── CHANGELOG.en-US.md
├── CHANGELOG.zh-CN.md
├── package.json 
├── README.md             
```
通过查看package.json 的信息，并从使用者的角度去思考 首先就打开了
``locale-provider`` 这个文件目录，当看到如下代码时 发现自己找错了方向

```js
 function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
```

这段代码，明显是babel 对class 编译后的产物 ，so  打开github上的代码查看后才明白 antd包里的代码确实是经过编译后的结果，就想到了自己之前的方式存在问题 

接下来开始查看antd 的代码...

>package.json

```json
{
  //项目名称
  "name": "antd",
  //版本号
  "version": "3.13.5",
  //标题
  "title": "Ant Design",
  //项目描述
  "description": "An enterprise-class UI design language and React-based implementation",
 //主页
  "homepage": "http://ant.design/",
  //关键字
  "keywords": [
    "ant",
    "design",
    "react",
    "react-component",
    "component",
    "components",
    "ui",
    "framework",
    "frontend"
  ],
  "contributors": [
    "ant"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/ant-design/ant-design"
  },
  "bugs": {
    "url": "https://github.com/ant-design/ant-design/issues"
  },
  //入口文件  commonjs模块化规范
  "main": "lib/index.js",
  //入口文件  es6模块化规范
  "module": "es/index.js",
  //文件目录
  "files": [
    "dist",
    "lib",
    "es"
  ],
  //ts 类型声明文件
  "typings": "lib/index.d.ts",
  "license": "MIT",
  //依赖版本说明
  "peerDependencies": {
    "react": ">=16.0.0",
    "react-dom": ">=16.0.0"
  },
  //生产依赖
  "dependencies": {
    "@ant-design/icons": "~1.1.16",
    "@ant-design/icons-react": "~1.1.2",
    "array-tree-filter": "^2.1.0",
    "babel-runtime": "6.x",
    "classnames": "~2.2.6",
    "create-react-class": "^15.6.3",
    "create-react-context": "0.2.2",
    "css-animation": "^1.5.0",
    "dom-closest": "^0.2.0",
    "enquire.js": "^2.1.6",
    "lodash": "^4.17.11",
    "moment": "^2.24.0",
    "omit.js": "^1.0.0",
    "prop-types": "^15.6.2",
    "raf": "^3.4.0",
    "rc-animate": "^2.5.4",
    "rc-calendar": "~9.10.3",
    "rc-cascader": "~0.17.0",
    "rc-checkbox": "~2.1.5",
    "rc-collapse": "~1.10.2",
    "rc-dialog": "~7.3.0",
    "rc-drawer": "~1.7.6",
    "rc-dropdown": "~2.4.1",
    "rc-editor-mention": "^1.1.7",
    "rc-form": "^2.4.0",
    "rc-input-number": "~4.3.7",
    "rc-menu": "~7.4.12",
    "rc-notification": "~3.3.0",
    "rc-pagination": "~1.17.7",
    "rc-progress": "~2.3.0",
    "rc-rate": "~2.5.0",
    "rc-select": "^8.6.7",
    "rc-slider": "~8.6.5",
    "rc-steps": "~3.3.0",
    "rc-switch": "~1.9.0",
    "rc-table": "~6.4.0",
    "rc-tabs": "~9.6.0",
    "rc-time-picker": "~3.6.1",
    "rc-tooltip": "~3.7.3",
    "rc-tree": "~1.14.6",
    "rc-tree-select": "~2.5.0",
    "rc-trigger": "^2.6.2",
    "rc-upload": "~2.6.0",
    "rc-util": "^4.5.1",
    "react-lazy-load": "^3.0.13",
    "react-lifecycles-compat": "^3.0.4",
    "react-slick": "~0.23.2",
    "resize-observer-polyfill": "^1.5.0",
    "shallowequal": "^1.1.0",
    "warning": "~4.0.2"
  },
  //开发依赖
  "devDependencies": {
    "@ant-design/colors": "^2.0.0",
    "@sentry/browser": "^4.5.2",
    "@types/classnames": "^2.2.6",
    "@types/prop-types": "^15.5.6",
    "@types/react": "~16.8.1",
    "@types/react-dom": "^16.0.11",
    "@types/react-intl": "^2.3.14",
    "@types/react-slick": "^0.23.2",
    "@types/warning": "^3.0.0",
    "@yesmeck/offline-plugin": "^5.0.5",
    "ansi-styles": "^3.2.1",
    "antd-theme-generator": "^1.1.4",
    "antd-tools": "^7.0.1",
    "babel-eslint": "^10.0.1",
    "bisheng": "^1.1.0",
    "bisheng-plugin-antd": "^1.0.0",
    "bisheng-plugin-description": "^0.1.4",
    "bisheng-plugin-react": "^1.0.0",
    "bisheng-plugin-toc": "^0.4.4",
    "chalk": "^2.4.1",
    "commander": "^2.18.0",
    "core-js": "^2.5.7",
    "cross-env": "^5.2.0",
    "css-split-webpack-plugin": "^0.2.6",
    "dekko": "^0.2.1",
    "docsearch.js": "^2.5.2",
    "enquire-js": "^0.2.1",
    "enzyme": "^3.7.0",
    "enzyme-adapter-react-16": "^1.6.0",
    "enzyme-to-json": "^3.3.4",
    "eslint": "^5.6.1",
    "eslint-config-airbnb": "^17.1.0",
    "eslint-config-prettier": "^4.0.0",
    "eslint-plugin-babel": "^5.2.1",
    "eslint-plugin-import": "^2.14.0",
    "eslint-plugin-jsx-a11y": "^6.1.2",
    "eslint-plugin-markdown": "~1.0.0-beta.6",
    "eslint-plugin-react": "^7.11.1",
    "eslint-tinker": "^0.5.0",
    "fetch-jsonp": "^1.1.3",
    "glob": "^7.1.3",
    "immutability-helper": "^3.0.0",
    "intersection-observer": "^0.5.0",
    "jest": "^24.0.0",
    "jsdom": "^13.0.0",
    "jsonml.js": "^0.1.0",
    "lint-staged": "^8.0.2",
    "lz-string": "^1.4.4",
    "majo": "^0.7.1",
    "mockdate": "^2.0.2",
    "pre-commit": "^1.2.2",
    "preact": "^8.3.1",
    "preact-compat": "^3.18.4",
    "prettier": "^1.15.3",
    "querystring": "^0.2.0",
    "rc-queue-anim": "^1.6.6",
    "rc-scroll-anim": "^2.5.5",
    "rc-tween-one": "^2.2.12",
    "react": "^16.5.2",
    "react-color": "^2.14.1",
    "react-copy-to-clipboard": "^5.0.1",
    "react-dnd": "^7.0.2",
    "react-dnd-html5-backend": "^7.0.2",
    "react-document-title": "^2.0.3",
    "react-dom": "^16.5.2",
    "react-github-button": "^0.1.11",
    "react-highlight-words": "^0.16.0",
    "react-infinite-scroller": "^1.2.1",
    "react-intl": "^2.7.0",
    "react-resizable": "^1.7.5",
    "react-router-dom": "^4.3.1",
    "react-sticky": "^6.0.3",
    "react-test-renderer": "^16.6.3",
    "react-virtualized": "~9.21.0",
    "remark-cli": "^6.0.1",
    "remark-frontmatter": "^1.3.0",
    "remark-lint": "^6.0.4",
    "remark-parse": "^6.0.0",
    "remark-preset-lint-recommended": "^3.0.2",
    "remark-stringify": "^6.0.0",
    "remark-yaml-config": "^4.0.2",
    "reqwest": "^2.0.5",
    "rimraf": "^2.6.2",
    "scrollama": "^1.4.4",
    "stylelint": "~9.10.1",
    "stylelint-config-prettier": "^4.0.0",
    "stylelint-config-rational-order": "^0.0.4",
    "stylelint-config-standard": "^18.2.0",
    "stylelint-declaration-block-no-ignored-properties": "^1.1.0",
    "stylelint-order": "^2.0.0",
    "typescript": "~3.3.1",
    "unified": "^7.0.0",
    "xhr-mock": "^2.4.1",
    "xhr2": "^0.1.4"
  },
  // 执行脚本
  "scripts": {
    "test": "jest --config .jest.js --verbose=false --no-cache",
    "test-node": "jest --config .jest.node.js --no-cache",
    "test-all": "./scripts/test-all.sh",
    "lint": "npm run lint:ts && npm run lint:es && npm run lint:demo && npm run lint:style",
    "lint:ts": "npm run tsc && antd-tools run ts-lint",
    "lint:es": "eslint tests site scripts components ./.*.js ./webpack.config.js --ext '.js,.jsx'",
    "lint:md": "remark components/",
    "lint:demo": "cross-env RUN_ENV=DEMO eslint components/*/demo/*.md --ext '.md'",
    "lint:style": "stylelint '{site,components}/**/*.less' --syntax less",
    "lint-fix:ts": "npm run tsc && antd-tools run ts-lint-fix",
    "lint-fix": "npm run lint-fix:code && npm run lint-fix:demo && npm run lint-fix:style",
    "lint-fix:code": "eslint --fix tests site scripts components ./.*.js ./webpack.config.js --ext '.js,.jsx'",
    "lint-fix:demo": "eslint-tinker ./components/*/demo/*.md",
    "lint-fix:style": "stylelint --fix '{site,components}/**/*.less' --syntax less",
    "sort-api": "node ./scripts/sort-api-table.js",
    "dist": "antd-tools run dist",
    "compile": "antd-tools run compile",
    "tsc": "tsc",
    "start": "rimraf _site && mkdir _site && node ./scripts/generateColorLess.js && cross-env NODE_ENV=development bisheng start -c ./site/bisheng.config.js",
    "start:preact": "node ./scripts/generateColorLess.js && cross-env NODE_ENV=development REACT_ENV=preact bisheng start -c ./site/bisheng.config.js",
    "site": "cross-env NODE_ENV=production bisheng build --ssr -c ./site/bisheng.config.js && node ./scripts/generateColorLess.js",
    "predeploy": "antd-tools run clean && npm run site && cp netlify.toml _site && cp -r .circleci _site",
    "deploy": "bisheng gh-pages --push-only",
    "deploy:china-mirror": "git checkout gh-pages && git pull origin gh-pages && git push git@gitee.com:ant-design/ant-design.git gh-pages",
    "pub": "antd-tools run pub",
    "prepublish": "antd-tools run guard",
    "pre-publish": "npm run test-all && node ./scripts/prepub",
    "authors": "git log --format='%aN <%aE>' | sort -u | grep -v 'users.noreply.github.com' | grep -v 'gitter.im' | grep -v '.local>' | grep -v 'alibaba-inc.com' | grep -v 'alipay.com' | grep -v 'taobao.com' > AUTHORS.txt",
    "lint-staged": "lint-staged",
    "lint-staged:ts": "tsc && node node_modules/tslint/bin/tslint",
    "lint-staged:es": "eslint ./.*.js ./webpack.config.js",
    "lint-staged:demo": "cross-env RUN_ENV=DEMO eslint --ext '.md'",
    "prettier": "node ./scripts/prettier.js"
  },
  //提交代码前执行的任务
  "pre-commit": [
    "lint-staged"
  ],
  //代码检查
  "lint-staged": {
    "components/**/*.tsx": [
      "npm run lint-staged:ts",
      "node ./scripts/pre-prettier.js",
      "git add"
    ],
    "{tests,site,scripts,components}/**/*.{js,jsx}": [
      "npm run lint-staged:es",
      "node ./scripts/pre-prettier.js",
      "git add"
    ],
    "{site,components}/**/*.less": [
      "stylelint --syntax less",
      "node ./scripts/pre-prettier.js",
      "git add"
    ],
    "components/*/demo/*.md": [
      "npm run lint-staged:demo"
    ]
  },
  //排除treeShaking
  "sideEffects": [
    "dist/*",
    "es/**/style/*",
    "lib/**/style/*",
    "*.less"
  ]
}

```

执行scripts 里的脚本后发现

dist, lib目录分别使用``npm run dist``, ``npm run compile``生成的而这两个命令最终都是调用的```antd-tools```, 因此有必须要先了解下antd-tools这个工具。但是github.com上关于这个包，只有源代码，因此，我们就从源码的层面分析下它

  
## antd-tools源码分析

antd-tools中的bin属性内容如下:
```json
"bin": {
  "antd-tools": "./bin/antd-tools.js",
  "antd-tools-run": "./bin/antd-tools-run.js"
}
```
antd-tools对应的文件内容如下:
```json
#!/usr/bin/env node
require('../lib/cli/');
```
下面看看lib/cli/index.js文件的内容:
```js
#!/usr/bin/env node
'use strict';
require('colorful').colorful();
const program = require('commander');
const packageInfo = require('../../package.json');
program
  .version(packageInfo.version)
  .command('run [name]', 'run specified task')
  .parse(process.argv);
// https://github.com/tj/commander.js/pull/260
const proc = program.runningCommand;
if (proc) {
  proc.on('close', process.exit.bind(process));
  proc.on('error', () => {
    process.exit(1);
  });
}
const subCmd = program.args[0];
if (!subCmd || subCmd !== 'run') {
  program.help();
}
```
看到了陌生的东西``colorful`` ``commander``
``colorful`` 是给命令行添加色彩
``commander.js``是TJ所写的一个工具包，其作用是让node命令行程序的制作更加简单。

接下来看```commander```
```js
var program = require('commander');

program
  .version('0.1.0')
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq-sauce', 'Add bbq sauce')
  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .parse(process.argv);

console.log('you ordered a pizza with:');
if (program.peppers) console.log('  - peppers');
if (program.pineapple) console.log('  - pineapple');
if (program.bbqSauce) console.log('  - bbq');
console.log('  - %s cheese', program.cheese);
```

这是官方给出demo 

首先我是想彻底研究懂 所以我就也照葫芦画瓢建了一个 own-tools 的目录 把上面的代码放入

lib/cli/index.js

并在package.json 的bin 字段添加如下代码
```js
"bin": {
    "own-tools": "./bin/own-tools.js",
    "own-tools-run": "./bin/own-tools-run.js"
},
```
bin/own-tools.js
```js
#!/usr/bin/env node
require('../lib/cli/');
```
新建 bin/own-tools-run.js  （空文件）

然后执行```npm run link```建立软连接

然后执行 ```own-tools -p```输出如下：
```bash
 you ordered a pizza with:
  - peppers
  - marble cheese 1
```
执行```own-tools -c name```输出如下：
```bash
you ordered a pizza with:
  - name cheese
```
由此可见 
```js
commander的option选项
用户：.option('-n, --name <name>', 'your name', 'GK')

第一个参数是选项定义，分为短定义和长定义。用|，,，连接。
参数可以用<>或者[]修饰，前者意为必须参数，后者意为可选参数。
第二个参数为选项描述
第三个参数为选项参数默认值，可选。
```

**尤其注意 commander 的子命令模式**
```.command('run [name]', 'run specified task')：```
	
官方解释如下：
>当 .command() 带有描述参数时，不能采用 .action(callback) 来处理子命令，否则会出错。这告诉 commander，你将采用单独的可执行文件作为子命令，就像 git(1) 和其他流行的工具一样。 Commander 将会尝试在入口脚本（例如 ./examples/pm）的目录中搜索 program-command 形式的可执行文件，例如 pm-install, pm-search。

具体意思就是说当``.command`` 函数有第二个参数时不能用.action(callback) 来处理子命令,他将进入子命令模式 ，那```什么是子命令模式？```

```js
program
  .version(packageInfo.version)
  .command('run [name]', 'run specified task')
  .parse(process.argv);
```
以上面代码为例  ，假如我在命令行执行	```own-tools  run```那么程序将在我们之前package.json中bin字段配置的文件根目录下寻找名为own-tools-run.js 的文件来执行  
### 在看antd-tools 的代码就容易理解了
```js
'use strict';
// 命令行添加色彩
require('colorful').colorful();
// commander.js是TJ所写的一个工具包，其作用是让node命令行程序的制作更加简单
const program = require('commander');
const packageInfo = require('../../package.json');

program
  .version(packageInfo.version)
  .command('run [name]', 'run specified task')
  .parse(process.argv);

// https://github.com/tj/commander.js/pull/260
const proc = program.runningCommand;
if (proc) {
  proc.on('close', process.exit.bind(process));
  proc.on('error', () => {
    process.exit(1);
  });
}

const subCmd = program.args[0];
if (!subCmd || subCmd !== 'run') {
  program.help();
}
```
上面代码比较简单，使用tj大神的commander.js工具，关键在于parse方法上。该方法解析argv, 设置options, 如果有定义命令，则调用它。

这里输入 own-tools run dist 执行的是commander 的子命令模式 就是去
./bin/    目录下寻找一个叫own-tools-run.js 的文件 给他传一个 dist 参数
```own-tools-run.js```最终执行的是```lib/cli/run.js```

```js
#!/usr/bin/env node

'use strict';

require('colorful').colorful();
const gulp = require('gulp');
const program = require('commander');

program.on('--help', () => {
  console.log('  Usage:'.to.bold.blue.color);
  console.log();
});

program.parse(process.argv);

function runTask(toRun) {
  const metadata = { task: toRun };
  // Gulp >= 4.0.0 (doesn't support events)
  const taskInstance = gulp.task(toRun);
  if (taskInstance === undefined) {
    gulp.emit('task_not_found', metadata);
    return;
  }
  const start = process.hrtime();
  gulp.emit('task_start', metadata);
  try {
    taskInstance.apply(gulp);
    metadata.hrDuration = process.hrtime(start);
    gulp.emit('task_stop', metadata);
    gulp.emit('stop');
  } catch (err) {
    err.hrDuration = process.hrtime(start);
    err.task = metadata.task;
    gulp.emit('task_err', err);
  }
}

const task = program.args[0];

if (!task) {
  program.help();
} else {
  console.log('antd-tools run', task);

  require('../gulpfile');

  runTask(task);
}

```
这里就是调用该脚本，task 为own-tools run 的时候传进来的值。

```js
#!/usr/bin/env node

'use strict';

require('colorful').colorful();
const gulp = require('gulp');
const program = require('commander');

program.on('--help', () => {
  console.log('  Usage:'.to.bold.blue.color);
  console.log();
});

program.parse(process.argv);

function runTask(toRun) {
  const metadata = { task: toRun };
  // Gulp >= 4.0.0 (doesn't support events)
  const taskInstance = gulp.task(toRun);
  if (taskInstance === undefined) {
    gulp.emit('task_not_found', metadata);
    return;
  }
  const start = process.hrtime();
  gulp.emit('task_start', metadata);
  try {
    taskInstance.apply(gulp);
    metadata.hrDuration = process.hrtime(start);
    gulp.emit('task_stop', metadata);
    gulp.emit('stop');
  } catch (err) {
    err.hrDuration = process.hrtime(start);
    err.task = metadata.task;
    gulp.emit('task_err', err);
  }
}

const task = program.args[0];

if (!task) {
  program.help();
} else {
  console.log('antd-tools run', task);

  require('../gulpfile');

  runTask(task);
}

```
这里去require('../gulpfile') 执行task 
```js

const { getProjectPath, injectRequire } = require('./utils/projectHelper'); // eslint-disable-line import/order
//如果当前包的目录里面没有所需依赖 统一到最外层的node_modules 目录下读取 
injectRequire();
// 将多个流按顺序或并行合并为一个流 
const merge2 = require('merge2');
//child_process 是node的原生模块  用于新建子进程。子进程的运行结果储存在系统缓存之中（最大200KB），等到子进程运行结束以后，主进程再用回调函数读取子进程的运行结果。
//execSync 可以接受两个参数，第一个参数是所要执行的命令，第二个参数用来配置执行环境。
//会阻塞 Node.js 事件循环
/*
  execSync(‘cnpm i freetool’, {
    cwd: process.cwd()
  });
 */
const { execSync } = require('child_process');

const through2 = require('through2');
const webpack = require('webpack');
const babel = require('gulp-babel');
const argv = require('minimist')(process.argv.slice(2));
const chalk = require('chalk');
const path = require('path');
const watch = require('gulp-watch');
const ts = require('gulp-typescript');
const gulp = require('gulp');
const fs = require('fs');
const rimraf = require('rimraf');
const stripCode = require('gulp-strip-code');
const install = require('./install');
const runCmd = require('./runCmd');
const getBabelCommonConfig = require('./getBabelCommonConfig');
const transformLess = require('./transformLess');
const getNpm = require('./getNpm');
const selfPackage = require('../package.json');
const getNpmArgs = require('./utils/get-npm-args');
const { cssInjection } = require('./utils/styleUtil');
const tsConfig = require('./getTSCommonConfig')();
const replaceLib = require('./replaceLib');

const packageJson = require(getProjectPath('package.json'));

const tsDefaultReporter = ts.reporter.defaultReporter();
const cwd = process.cwd();
const libDir = getProjectPath('lib');
const esDir = getProjectPath('es');

function dist(done) {
  rimraf.sync(getProjectPath('dist'));
  process.env.RUN_ENV = 'PRODUCTION';
  const webpackConfig = require(getProjectPath('webpack.config.js'));
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    const buildInfo = stats.toString({
      colors: true,
      children: true,
      chunks: false,
      modules: false,
      chunkModules: false,
      hash: false,
      version: false,
    });
    console.log(buildInfo);
    done(0);
  });
}

function tag() {
  console.log('tagging');
  const { version } = packageJson;
  execSync(`git tag ${version}`);
  execSync(`git push origin ${version}:${version}`);
  execSync('git push origin master:master');
  console.log('tagged');
}

gulp.task(
  'check-git',
  gulp.series(done => {
    runCmd('git', ['status', '--porcelain'], (code, result) => {
      if (/^\?\?/m.test(result)) {
        return done(`There are untracked files in the working tree.\n${result}
      `);
      }
      if (/^([ADRM]| [ADRM])/m.test(result)) {
        return done(`There are uncommitted changes in the working tree.\n${result}
      `);
      }
      return done();
    });
  })
);

gulp.task('clean', () => {
  rimraf.sync(getProjectPath('_site'));
  rimraf.sync(getProjectPath('_data'));
});

gulp.task(
  'dist',
  gulp.series(done => {
    dist(done);
  })
);

gulp.task(
  'ts-lint',
  gulp.series(done => {
    const tslintBin = require.resolve('tslint/bin/tslint');
    const tslintConfig = path.join(__dirname, './tslint.json');
    const args = [tslintBin, '-c', tslintConfig, 'components/**/*.tsx'];
    runCmd('node', args, done);
  })
);

gulp.task(
  'ts-lint-fix',
  gulp.series(done => {
    const tslintBin = require.resolve('tslint/bin/tslint');
    const tslintConfig = path.join(__dirname, './tslint.json');
    const args = [tslintBin, '-c', tslintConfig, 'components/**/*.tsx', '--fix'];
    runCmd('node', args, done);
  })
);

const tsFiles = ['**/*.ts', '**/*.tsx', '!node_modules/**/*.*', 'typings/**/*.d.ts'];

function compileTs(stream) {
  return stream
    .pipe(ts(tsConfig))
    .js.pipe(
      through2.obj(function(file, encoding, next) {
        // console.log(file.path, file.base);
        file.path = file.path.replace(/\.[jt]sx$/, '.js');
        this.push(file);
        next();
      })
    )
    .pipe(gulp.dest(process.cwd()));
}

gulp.task('tsc', () =>
  compileTs(
    gulp.src(tsFiles, {
      base: cwd,
    })
  )
);

gulp.task(
  'watch-tsc',
  gulp.series('tsc', () => {
    watch(tsFiles, f => {
      if (f.event === 'unlink') {
        const fileToDelete = f.path.replace(/\.tsx?$/, '.js');
        if (fs.existsSync(fileToDelete)) {
          fs.unlinkSync(fileToDelete);
        }
        return;
      }
      const myPath = path.relative(cwd, f.path);
      compileTs(
        gulp.src([myPath, 'typings/**/*.d.ts'], {
          base: cwd,
        })
      );
    });
  })
);

function babelify(js, modules) {
  const babelConfig = getBabelCommonConfig(modules);
  delete babelConfig.cacheDirectory;
  if (modules === false) {
    babelConfig.plugins.push(replaceLib);
  } else {
    babelConfig.plugins.push(require.resolve('babel-plugin-add-module-exports'));
  }
  let stream = js.pipe(babel(babelConfig)).pipe(
    through2.obj(function z(file, encoding, next) {
      this.push(file.clone());
      if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
        const content = file.contents.toString(encoding);
        if (content.indexOf("'react-native'") !== -1) {
          // actually in antd-mobile@2.0, this case will never run,
          // since we both split style/index.mative.js style/index.js
          // but let us keep this check at here
          // in case some of our developer made a file name mistake ==
          next();
          return;
        }

        file.contents = Buffer.from(cssInjection(content));
        file.path = file.path.replace(/index\.js/, 'css.js');
        this.push(file);
        next();
      } else {
        next();
      }
    })
  );
  if (modules === false) {
    stream = stream.pipe(
      stripCode({
        start_comment: '@remove-on-es-build-begin',
        end_comment: '@remove-on-es-build-end',
      })
    );
  }
  return stream.pipe(gulp.dest(modules === false ? esDir : libDir));
}

function compile(modules) {
  rimraf.sync(modules !== false ? libDir : esDir);
  const less = gulp
    .src(['components/**/*.less'])
    .pipe(
      through2.obj(function(file, encoding, next) {
        this.push(file.clone());
        if (
          file.path.match(/(\/|\\)style(\/|\\)index\.less$/) ||
          file.path.match(/(\/|\\)style(\/|\\)v2-compatible-reset\.less$/)
        ) {
          transformLess(file.path)
            .then(css => {
              file.contents = Buffer.from(css);
              file.path = file.path.replace(/\.less$/, '.css');
              this.push(file);
              next();
            })
            .catch(e => {
              console.error(e);
            });
        } else {
          next();
        }
      })
    )
    .pipe(gulp.dest(modules === false ? esDir : libDir));
  const assets = gulp
    .src(['components/**/*.@(png|svg)'])
    .pipe(gulp.dest(modules === false ? esDir : libDir));
  let error = 0;
  const source = ['components/**/*.tsx', 'components/**/*.ts', 'typings/**/*.d.ts'];
  // allow jsx file in components/xxx/
  if (tsConfig.allowJs) {
    source.unshift('components/**/*.jsx');
  }
  const tsResult = gulp.src(source).pipe(
    ts(tsConfig, {
      error(e) {
        tsDefaultReporter.error(e);
        error = 1;
      },
      finish: tsDefaultReporter.finish,
    })
  );

  function check() {
    if (error && !argv['ignore-error']) {
      process.exit(1);
    }
  }

  tsResult.on('finish', check);
  tsResult.on('end', check);
  const tsFilesStream = babelify(tsResult.js, modules);
  const tsd = tsResult.dts.pipe(gulp.dest(modules === false ? esDir : libDir));
  return merge2([less, tsFilesStream, tsd, assets]);
}

function publish(tagString, done) {
  let args = ['publish', '--with-antd-tools', '--access=public'];
  if (tagString) {
    args = args.concat(['--tag', tagString]);
  }
  const publishNpm = process.env.PUBLISH_NPM_CLI || 'npm';
  runCmd(publishNpm, args, code => {
    if (!argv['skip-tag']) {
      tag();
    }
    done(code);
  });
}

function pub(done) {
  dist(code => {
    if (code) {
      done(code);
      return;
    }
    const notOk = !packageJson.version.match(/^\d+\.\d+\.\d+$/);
    let tagString;
    if (argv['npm-tag']) {
      tagString = argv['npm-tag'];
    }
    if (!tagString && notOk) {
      tagString = 'next';
    }
    if (packageJson.scripts['pre-publish']) {
      runCmd('npm', ['run', 'pre-publish'], code2 => {
        if (code2) {
          done(code2);
          return;
        }
        publish(tagString, done);
      });
    } else {
      publish(tagString, done);
    }
  });
}

gulp.task('compile-with-es', done => {
  console.log('[Parallel] Compile to es...');
  compile(false).on('finish', done);
});

gulp.task('compile-with-lib', done => {
  console.log('[Parallel] Compile to js...');
  compile().on('finish', done);
});

gulp.task('compile', gulp.parallel('compile-with-es', 'compile-with-lib'));

gulp.task(
  'install',
  gulp.series(done => {
    install(done);
  })
);

gulp.task(
  'pub',
  gulp.series('check-git', 'compile', done => {
    pub(done);
  })
);

gulp.task(
  'update-self',
  gulp.series(done => {
    getNpm(npm => {
      console.log(`${npm} updating ${selfPackage.name}`);
      runCmd(npm, ['update', selfPackage.name], c => {
        console.log(`${npm} update ${selfPackage.name} end`);
        done(c);
      });
    });
  })
);

function reportError() {
  console.log(chalk.bgRed('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'));
  console.log(chalk.bgRed('!! `npm publish` is forbidden for this package. !!'));
  console.log(chalk.bgRed('!! Use `npm run pub` instead.        !!'));
  console.log(chalk.bgRed('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'));
}

gulp.task(
  'guard',
  gulp.series(done => {
    const npmArgs = getNpmArgs();
    if (npmArgs) {
      for (let arg = npmArgs.shift(); arg; arg = npmArgs.shift()) {
        if (/^pu(b(l(i(sh?)?)?)?)?$/.test(arg) && npmArgs.indexOf('--with-antd-tools') < 0) {
          reportError();
          done(1);
          return;
        }
      }
    }
    done();
  })
);

```
