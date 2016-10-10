# babel-plugin-async-function-time
[![Travis][build-badge]][build] [![npm package][npm-badge]][npm]

**一个babel组件:** 包裹异步函数，生成一个新的函数，增加记录异步函数执行时间的功能，不改变原来函数的功能。（包括promise函数和异步回调函数)


## 使用

### 安装

使用 [npm](https://www.npmjs.com/):

	$ npm install babel-plugin-async-function-time -D

在`.babelrc`中配置（应该转换成json格式）或者在任何的babel queries中。

### 使用例子

#### 配置
```javascript
"plugins": [
    [
        "function-time", {
            // 一个函数，自定义的记录函数执行时间的行为，异步函数的执行时间和原函数参数作为函数的参数
            "report": "(durning, props) => console.log('count:%sms', durning)",
            // 要记录的promise函数名数组
            "promise": ["fnNameA"],
            // 要记录的异步回调函数名数组
            "async": ["fnNameB"]
        }
    ]
]

```




#### promise函数代码
```javascript
var fnNameA = function (str) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(str);
        }, 200);
    })
};

fnNameA();

// 或

function fnNameA (str) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(str);
        }, 200);
    })
};

fnNameA();

// 或

var obj = {
    fnNameA(str) {
        return new Promise(function(resolve) {
            setTimeout(function() {
                resolve(str);
            }, 200);
        })
    }
};

obj.fnNameA();

// 打印： “count:204ms”

```

#### 异步回调函数
```javascript
var fnNameB = function (fb) {
    setTimeout(function() {
        fb();
    }, 200);
};

fnNameB();

// 或

function fnNameB (fb) {
    setTimeout(function() {
        fb();
    }, 200);
};

fnNameB();

// 或

var obj = {
    fnNameB(fb) {
        setTimeout(function() {
            fb();
        }, 200);
    }
};

fnNameB();

// 打印： “count:204ms”

```


## Changelog
* [Changelog](CHANGELOG.md)

## How to Contribute

Anyone and everyone is welcome to contribute to this project. The best way to
start is by checking our [open issues](https://github.com/lanjingling0510/babel-plugin-async-function-time/issues),
[submit a new issues](https://github.com/lanjingling0510/babel-plugin-async-function-time/issues/new?labels=bug) or
[feature request](https://github.com/lanjingling0510/babel-plugin-async-function-time/issues/new?labels=enhancement),
participate in discussions, upvote or downvote the issues you like or dislike.



[npm-badge]: https://img.shields.io/npm/v/babel-plugin-async-function-time.svg?style=flat-square
[npm]: https://www.npmjs.com/package/babel-plugin-async-function-time
[build-badge]: https://img.shields.io/travis/lanjingling0510/babel-plugin-async-function-time/master.svg?style=flat-square
[build]: https://travis-ci.org/lanjingling0510/babel-plugin-async-function-time
